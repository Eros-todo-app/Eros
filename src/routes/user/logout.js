const router = require("express").Router();
const { verifyUser } = require("../../middleware/verifyUser");

router.post("/logout", verifyUser, async (req, res) => {
  req.session.destroy((err) => {
    return res.status(500).send({ success: false, msg: "Failed to logout, please try again!", err });
  });
  return res
    .clearCookie(process.env.SID)
    .status(200)
    .send({ success: true, msg: "You've been logged out. Hope to see you soon!" });
});

module.exports = router;
