const admin = require("firebase-admin");
const { setFlagsFromString } = require("v8");
const serviceAccount = require("./messaging-12152-firebase-adminsdk-hn2v7-31501efeea.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

db.collection("notifications").doc("0").set({message: "change the world! my final message. goodbye.", date: new Date()});

//admin package (serviceAccount).serviceAccount ''ChannelMergerNode or finally secret'' ());

//if (console.error();)== mutis insan
//ifc sakn 
// s.a. 
/*if (admin.initializeApp) {
    setInterval,

} else {CustomElementRegistry[0, 1, 0]
    setFlagsFromString,
    >
}
gi<li.doc?