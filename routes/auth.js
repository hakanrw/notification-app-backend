const { db } = require("../database");
const sessions = new Map();

async function getSessionByToken(token) {
    let cache = sessions.get(token);
    if(cache === undefined) {
        let exist = await db().collection("users").findOne({token: token}) !== null;
        if(exist === false) return null;
        sessions.set(token, {token: token});
        return sessions.get(token);
    }
    else return cache;
}

async function handleAuth(req, res, next) {
    let token = req.cookies["SESSION_M"];
    if(typeof(token) !== "string") {
        res.status(401).send({error: "BAD_SESSION"});
        return;
    }
    let session = await getSessionByToken(token);
    if(session === null) {
        res.status(401).send({error: "BAD_SESSION"});
        return;
    }
    req.session = session;
    req.session.lastRequest = new Date();
    next();
}

setInterval(async () => {
    let now = new Date();

    Array.from(sessions.entries()).forEach(sessionEntry => {
        if(now.getTime() - sessionEntry[1].lastRequest.getTime() > 1000 * 60 * 5)
            sessions.delete(sessionEntry[0]);
    
    });
}, 1000 * 60);

module.exports = handleAuth;
