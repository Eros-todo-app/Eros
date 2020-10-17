const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const { MissingEnvError } = require("./errors/env.js");

// Init

dotenv.config();
const app = express();

const PORT = process.env.PORT;

// Middleware and config

app.use(express.json());
app.use(helmet);

if (!PORT) throw new MissingEnvError("PORT");

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
