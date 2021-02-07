const fs = require("fs");
const router = require("express").Router();
const path = require("path");
const { db } = require("../database");

let adminFile = fs.readFileSync(path.join(__dirname, "adminpage.html"));

router.get("/", (req, res) => {
    res.type("html").send(adminFile);
});

// gelen isteğin admin tarafından yapıldığını kontrol et
router.use((req, res, next) => {
    if(req.body.password !== "1234qwer") {
        res.status(401).send({error: "BAD_AUTH"});
        return;
    }
    next();
})


router.post("/insert", async (req, res) => {

    // title ve message field'larını al
    let title = req.body.title;
    let message = req.body.message;
    
    // database injection attack ihtimali yüzünden string olduğundan emin ol
    if(typeof(title) !== "string" || typeof(message) !== "string") {
        res.status(400).send({error: "BAD_PARAMS"});
        return;
    }

    // veritabanına işlem yap
    db().collection("notifications").insertOne({
        date: new Date(),
        title,
        message
    });

    // cache'ı resetle
    notifCache = null;

    res.send({status: "SUCCESS"});
});

module.exports = router;