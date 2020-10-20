const userRegisterRouter = require("./user/register");
const userLoginRouter = require("./user/login");
const userLogoutRouter = require("./user/logout");
const createTodoRouter = require("./todos/createTodo");

const setupRoutes = (app) => {
  app.use("/api/user/", userRegisterRouter, userLoginRouter, userLogoutRouter);
  app.use("/api/todos/", createTodoRouter);
};

module.exports = { setupRoutes };
