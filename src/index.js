const express = require("express");
const dotenv = require("dotenv");
const { init } = require("./setup/init");
dotenv.config();

const app = express();
const start = async () => {
  await init(app);
};

start().catch((err) => console.log(err));
