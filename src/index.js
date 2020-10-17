const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const { MissingEnvError } = require("./errors/env.js");
const { setupRoutes } = require("./routes/routes");
const { setupDB } = require("./db/db");
dotenv.config();

const init = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  const DB_NAME = process.env.DB_NAME;
  const PORT = process.env.PORT;

  if (!MONGO_URI) throw new MissingEnvError("MONGO_URI");
  if (!DB_NAME) throw new MissingEnvError("DB_NAME");
  if (!PORT) throw new MissingEnvError("PORT");

  await setupDB(MONGO_URI, DB_NAME);
  const app = express();

  // Middleware and config

  app.use(express.json({ limit: "100kb", strict: true, type: "application/json" }));
  app.use(helmet());

  setupRoutes(app);

  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
};

init().catch((err) => console.log(err));
