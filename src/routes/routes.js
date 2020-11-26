const { createTodoRouter, editTodoRouter, deleteTodoRouter } = require("./todos/index");
const { deleteUserRouter, userRegisterRouter, userLoginRouter, userLogoutRouter } = require("./user/index");

const setupRoutes = (app) => {
  app.use("/api/user/", userRegisterRouter, userLoginRouter, userLogoutRouter, deleteUserRouter);
  app.use("/api/todos/", createTodoRouter, editTodoRouter, deleteTodoRouter);
};

module.exports = { setupRoutes };
