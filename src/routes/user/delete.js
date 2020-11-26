const router = require("express").Router();
const { getDB } = require("../../db/db");
const errors = require("../../errors/errors.json");
const { verifyUser } = require("../../middleware/verifyUser");
const { ObjectId } = require("mongodb");

router.delete("/delete", verifyUser, async (req, res) => {
  const user = await getDB().findOneAndDelete({ _id: ObjectId(req.session._id) });
  if (user.ok !== 1) return res.status(400).send({ ...errors.BAD_LOGIN });

  req.session.destroy((err) => {
    return res.status(500).send({ success: false, msg: "Failed to logout, please try again!", err });
  });

  return res.clearCookie(process.env.SID).status(200).send({ success: true, msg: `We're sorry to see you go!` });
});

module.exports = router;
