const errors = require("../errors/errors.json");

const verifyUser = (req, res, next) => {
  if (!req.session.user.loggedIn) res.status(400).send(...errors.BAD_AUTH);

  next();
};

module.exports = { verifyUser };
