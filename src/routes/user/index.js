const userRegisterRouter = require("./register");
const userLoginRouter = require("./login");
const userLogoutRouter = require("./logout");
const deleteUserRouter = require("./delete");

module.exports = { deleteUserRouter, userRegisterRouter, userLoginRouter, userLogoutRouter };
