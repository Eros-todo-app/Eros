class MissingEnvError extends Error {
  constructor(type) {
    super(type);
    this.name = "Missing env variable error";
  }
}

module.exports = { MissingEnvError };
