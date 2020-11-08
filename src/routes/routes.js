const userRegisterRouter = require("./user/register");
const userLoginRouter = require("./user/login");
const userLogoutRouter = require("./user/logout");
const createTodoRouter = require("./todos/create");
const editTodoRouter = require("./todos/edit");
const deleteTodoRouter = require("./todos/delete");

const setupRoutes = (app) => {
  app.use("/api/user/", userRegisterRouter, userLoginRouter, userLogoutRouter);
  app.use("/api/todos/", createTodoRouter, editTodoRouter, deleteTodoRouter);
};

module.exports = { setupRoutes };
