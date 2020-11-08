const { getDB } = require("../../db/db");
const { verifyUser } = require("../../middleware/verifyUser");
const router = require("express").Router();
const errors = require("../../errors/errors.json");
const { ObjectId } = require("mongodb");

router.delete("/delete", verifyUser, async (req, res) => {
  const { todoId } = req.body;

  if (!todoId) return res.status(400).send({ ...errors.BAD_DATA });

  const data = await getDB().todos.findOneAndDelete({ _id: ObjectId(todoId), userId: ObjectId(req.session.user._id) });

  if (data.ok !== 1) return res.status(500).send({ ...errors.INTERNAL_SERVER_ERROR });

  return res.status(200).send({ success: true, msg: "Done, I've deleted your todo list!" });
});

module.exports = router;
