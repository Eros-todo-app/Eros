const helmet = require("helmet");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const { MissingEnvError } = require("../errors/env.js");
const { setupRoutes } = require("../routes/routes");
const { setupDB } = require("../db/db");
const express = require("express");
const redis = require("redis");

const init = async (app) => {
  const { SESSION_LIFETIME, MONGO_URI, DB_NAME, PORT = 3000, SESSION_SECRET, NODE_ENV, SID, REDIS_URI } = process.env;

  if (!MONGO_URI) throw new MissingEnvError("MONGO_URI");
  if (!DB_NAME) throw new MissingEnvError("DB_NAME");
  if (!PORT) throw new MissingEnvError("PORT");
  if (!SESSION_SECRET) throw new MissingEnvError("SESSION_SECRET");
  if (!NODE_ENV) throw new MissingEnvError("NODE_ENV");
  if (!SESSION_LIFETIME) throw new MissingEnvError("SESSION_LIFETIME");
  if (!SID) throw new MissingEnvError("SID");
  if (!REDIS_URI) throw new MissingEnvError("REDIS_URI");

  await setupDB(MONGO_URI, DB_NAME);

  const RedisStore = require("connect-redis")(session);
  const redisClient = redis.createClient({
    url: REDIS_URI,
  });

  const IS_PROD = NODE_ENV === "production";

  // Middleware and config
  app.use(express.json({ limit: "100kb", strict: true, type: "application/json" }));
  app.use(helmet());
  app.use(cookieParser());
  app.use(
    session({
      name: SID,
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET,
      secure: IS_PROD,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: parseInt(SESSION_LIFETIME),
        sameSite: IS_PROD,
        secure: IS_PROD,
      },
      genid: function () {
        return uuidv4();
      },
    })
  );

  setupRoutes(app);

  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
};

module.exports = { init };
