const userRegisterRouter = require("./user/register");
const userLoginRouter = require("./user/login");
const userLogoutRouter = require("./user/logout");
const createTodoRouter = require("./todos/createTodo");
const editTodoRouter = require("./todos/editTodo");
const deleteTodoRouter = require("./todos/deleteTodo");

const setupRoutes = (app) => {
  app.use("/api/user/", userRegisterRouter, userLoginRouter, userLogoutRouter);
  app.use("/api/todos/", createTodoRouter, editTodoRouter, deleteTodoRouter);
};

module.exports = { setupRoutes };
