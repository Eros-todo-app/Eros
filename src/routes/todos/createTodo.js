const { getDB } = require("../../db/db");
const { verifyUser } = require("../../middleware/verifyUser");
const router = require("express").Router();
const { verifyTodo } = require("./helpers/verifyTodo");
const errors = require("../../errors/errors.json");
const { ObjectId } = require("mongodb");

router.post("/create", verifyUser, async (req, res) => {
  const { todo } = req.body;

  if (!req.session.user.todos) {
    req.session.user.todos = [
      {
        name: todo.name,
        todos: todo.items,
      },
    ];
  } else {
    req.session.user.todos.push(todo);
  }

  try {
    await verifyTodo(todo);
  } catch (field) {
    return res.status(400).send({ field, ...errors.BAD_DATA });
  }

  const data = await getDB().users.findOneAndUpdate(
    { _id: ObjectId(req.session.user._id) },
    { $addToSet: { todos: todo } },
    {
      returnOriginal: false,
    }
  );

  return res.status(200).send({
    ...data,
    success: true,
  });
});

module.exports = router;
