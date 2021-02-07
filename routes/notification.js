const auth = require("./auth");
const router = require("express").Router();
const { db } = require("../database");

router.use(auth);

// her istekte database'e read isteği göndermemek için cache metodu implement et
let notifCache = null;
async function getNotifications() {
    if(notifCache === null) return await db().collection("notifications").find().sort({date: -1}).limit(20).toArray();
    else return notifCache;
}

router.get("/get", async (req, res) => {
    let notifs = await getNotifications();
    let checkDate = new Date(req.query.checkDate);

    // doğru bir tarih girildiğinden emin ol
    if(req.query.fullCheck !== "true" && isNaN(checkDate.getTime())) {
        res.status(400).send({error: "BAD_PARAMS"});
        return;
    }
    res.send({
        // sadece yeni bildirimleri mi yoksa hepsini mi çekeceğine göre işlem yap
        notifications: req.query.fullCheck ? notifs : notifs.filter(notif => notif.date.getTime() > checkDate.getTime())
    });
         
});

module.exports = router;