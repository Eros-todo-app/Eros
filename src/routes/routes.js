const userRegisterRouter = require("./user/register");
const userLoginRouter = require("./user/login");

const setupRoutes = (app) => {
  app.use("/api/user/", userRegisterRouter, userLoginRouter);
};

module.exports = { setupRoutes };
