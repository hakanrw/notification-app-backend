const router = require("express").Router();
const { db } = require("../database");
const md5 = require("md5");

// stack overflow üzerinden alınmış rastgele string (token) üretme kodu
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// stack overflow üzerinden alınmış mail kontrol etme kodu
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

router.post("/register", async (req, res) => {
    
    const mail = req.body.mail;
    const password = req.body.password;

    console.log(req.body)
    if(typeof(mail) !== "string" || typeof(password) !== "string" || validateEmail(mail) === false) {
        res.status(400).send({error: "BAD_PARAMS"});
        return;
    }

    const user = await db().collection("users").findOne({mail: mail});
    if(user !== null) {
        res.status(401).send({error: "USER_ALREADY_REGISTERED"});
        return;
    }

    db().collection("users").insertOne({
        mail: mail,
        password: md5(password),
        token: makeid(35)
    })

    res.send({
        status: "SUCCESS" 
    });
});

router.post("/login", async (req, res) => {

    const mail = req.body.mail;
    const password = req.body.password;

    if(typeof(mail) !== "string" || typeof(password) !== "string") {
        res.status(400).send({error: "BAD_PARAMS"});
        return;
    }

    const user = await db().collection("users").findOne({mail: mail, password: md5(password)});

    if(user === null) {
        res.status(401).send({error: "BAD_AUTH"});
        return;
    }

    // kullanıcıya token'i gönder
    res.send({
        status: "SUCCESS",
        token: (await db().collection("users").findOne({mail: mail})).token 
    });
});

module.exports = router;