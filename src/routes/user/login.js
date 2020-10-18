const router = require("express").Router();
const { verifyLoginInput } = require("./helpers/verifyUserInput");
const { getDB } = require("../../db/db");
const errors = require("../../errors/errors.json");
const bcrypt = require("bcrypt");

//TODO: Compare hashed password

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInput = await verifyLoginInput(email, password);
    const data = await getDB().users.findOne({ email: userInput.email });
    if (!data) return res.status(400).send({ ...errors.BAD_LOGIN });

    const validPass = await bcrypt.compare(userInput.password, data.password);
    if (!validPass) return res.status(400).send({ ...errors.BAD_LOGIN });

    req.session.user = { ...data, isLoggedIn: true };
    return res.status(200).send({ success: true, msg: `Welcome ${req.session.user.name.split(" ")[0]}!` });
  } catch (field) {
    return res.status(400).send({ ...errors.BAD_DATA, field });
  }
});

module.exports = router;
