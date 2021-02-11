// veritabanı adresini tanımla
const MONGO_DATABASE_URI = process.env.DATABASE_URL;

// mongodb modülünü import et
const mongodb = require('mongodb').MongoClient;
const Db = require('mongodb').Db;

let database = null;

// mongodb bağlantısını oluştur
const client = new mongodb(MONGO_DATABASE_URI, {
  keepAlive: true,
  connectTimeoutMS: 10000,    
  socketTimeoutMS: 10000, 
});

async function connect(){
  database = await client.connect();
}

/**
 * @returns {Db}
 */
function db() { return database.db("main"); }

// veritabanına bağlan
connect();

module.exports.db = db;
module.exports.connect = connect;
