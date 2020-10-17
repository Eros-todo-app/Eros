const verifyRegistrationInput = (_email, _password, _name) => {
  return new Promise((resolve, reject) => {
    const email = _email.toLowerCase().trim();
    const password = _password.trim();
    const name = _name.trim();

    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(email) || email.length < 3) return reject("Invalid email address");

    if (!password.length > 6 || !password.legnth < 128)
      return reject("Password must be at least 6 characters and a maximum of 128 characters");

    if (!name.length > 1) return reject("Did you forget your name, ooor do you not have one?");

    resolve({ email, password, name });
  });
};

module.exports = { verifyRegistrationInput };
