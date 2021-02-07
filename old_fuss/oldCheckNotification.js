router.get("/get", async (req, res) => {
    let notifs = await getNotifications();
    let lastNotificationDate = (notifs[0] && notifs[0].date) || new Date(0); // notifs[0] == undefined olma ihtimalinde hata engellemek için null-safety implement et

    // her istekte veritabanına read isteği oluşturmamak için (checkDate)'ı session map'ine kaydet 
    if(req.session.checkDate === undefined) {
        req.session.checkDate = (await db().collection("users").findOne({token: req.session.token})).checkDate || lastNotificationDate;
    }

    res.send({
        // sadece yeni bildirimleri mi yoksa hepsini mi çekeceğine göre işlem yap
        notifications: req.query.fullCheck ? notifs : notifs.filter(notif => notif.date.getTime() > req.session.checkDate.getTime())
    });
         
    // eğer yeni bir bildirim gelmiş ise (checkDate) field'ını veritabanında güncelle 
    if(lastNotificationDate.getTime() > req.session.checkDate.getTime()) {
        req.session.checkDate = lastNotificationDate;  
        db().collection("users").updateOne({token: req.session.token}, {$set: {checkDate: req.session.checkDate}});
    }

});
