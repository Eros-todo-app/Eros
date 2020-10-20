const { array, object, string, boolean } = require("yup");

const todoSchema = object().shape({
  name: string().min(1).max(50).required(),
  items: array().of(
    object().shape({
      name: string().min(1).max(50).required(),
      done: boolean().required(),
    })
  ),
  description: string().min(1).max(255).required(),
});

const verifyTodo = (todo) => {
  return new Promise((resolve, reject) => {
    todoSchema.isValid(todo).then((valid) => {
      if (!valid) return reject({ field: "Todo" });
      return resolve();
    });
  });
};

module.exports = { verifyTodo };
