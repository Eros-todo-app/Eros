const errors = require("../errors/errors.json");

function verifyUser(req, res, next) {
  if (!req.session.user) return res.status(400).send({ ...errors.BAD_AUTH });
  return next();
}

module.exports = { verifyUser };
