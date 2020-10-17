const { getDB } = require("../../db/db");
const router = require("express").Router();
const { verifyRegistrationInput } = require("./helpers/verifyUserInput");
const errors = require("../../errors/errors.json");

// TODO: add email verifaction
// TODO: Hash passwords

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const input = await verifyRegistrationInput(email, password, name);

    const emailExist = await getDB().users.findOne({ email: input.email });
    if (emailExist) return res.status(400).send({ field: "email", ...errors.BAD_DATA });

    const newUser = await getDB().users.insertOne({
      ...input,
    });

    return res.status(200).send({
      success: true,
      message: `You made it ${
        newUser.ops[0].name.split(" ")[0]
      }, you're now a registerd user! Please, make sure to check your email to verify your account!`,
      user: {
        id: newUser.ops[0]._id,
        name: newUser.ops[0].name,
      },
    });
  } catch (field) {
    return res.status(400).send({ field, ...errors.BAD_DATA });
  }
});

module.exports = router;
