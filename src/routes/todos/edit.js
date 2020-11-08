const { getDB } = require("../../db/db");
const { verifyUser } = require("../../middleware/verifyUser");
const router = require("express").Router();
const { verifyTodo } = require("./helpers/verifyTodo");
const errors = require("../../errors/errors.json");
const { ObjectId } = require("mongodb");

router.post("/edit", verifyUser, async (req, res) => {
  const { todo } = req.body;

  try {
    await verifyTodo(todo);
  } catch (field) {
    return res.status(400).send({ field, ...errors.BAD_DATA });
  }

  const data = await getDB().todos.findOneAndUpdate(
    {
      _id: ObjectId(todo._id),
      userId: ObjectId(req.session.user._id),
    },
    {
      $set: {
        name: todo.name,
        description: todo.description,
        items: todo.items,
      },
    },
    { returnOriginal: false }
  );

  if (data.ok !== 1) return res.status(500).send({ ...errors.INTERNAL_SERVER_ERROR });

  return res.status(200).send({
    ...todo,
    success: true,
  });
});

module.exports = router;
