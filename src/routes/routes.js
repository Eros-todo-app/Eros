const userRegisterRouter = require("./user/register");

const setupRoutes = (app) => {
  app.use("/api/user/", userRegisterRouter);
};

module.exports = { setupRoutes };
