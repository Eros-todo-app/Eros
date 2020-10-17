const { MongoClient, connection } = require("mongodb");
const config = require("./config.json");

class Database {
  constructor(url, db_name) {
    this.db_name = db_name;
    this.rootClient = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.connection = connection;

    this.connection.on("connected", () =>
      console.log(`Connected to databse: ${this.db_name}`)
    );

    this.connection.on("error", (err) => console.error(err));

    this.connection.on("disconnected", () => {
      console.warn("Database disconected, shutting down...");
      process.exit(1);
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.rootClient.connect((err, client) => {
        if (err) return reject("Failed to connect to Databse", err);

        this.db = client.db(this.db_name);
        this.users = this.db.collection(config.collections.users);

        resolve(this);
      });
    });
  }
}

let database;

function getDB() {
  return database;
}

async function setupDB(connectString, db_name) {
  database = new Database(connectString, db_name);
  await database.connect();
}

module.exports = {
  setupDB,
  getDB,
};
