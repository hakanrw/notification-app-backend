// gerekli express modüllerini import et
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

// router'ları import et
const notifR = require("./routes/notification");
const userR = require("./routes/user");
const adminR = require("./admin/admin");

// HTTP ile alakalı birtakım yardımcı araçlar
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

// router'ları sunucudaki gerekli yollara bağla
app.use("/notifications", notifR);
app.use("/users", userR);
app.use("/admin", adminR);

// sunucuyu 1337 numaralı portta aç
app.listen(1337, () => console.log("server listening at 1337"));