const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function verifyEmail(_email) {
  return new Promise((resolve, reject) => {
    const email = _email.toLowerCase().trim();
    if (!emailReg.test(email) || email.length < 3) return reject("Invalid email address");
    resolve(email);
  });
}

function verifyPassword(_password) {
  return new Promise((resolve, reject) => {
    const password = _password.trim();
    if (password.length < 6 || password.legnth > 128)
      return reject("Password must be at least 6 characters and a maximum of 128 characters");
    resolve(password);
  });
}

const verifyRegistrationInput = (_email, _password, _name) => {
  return new Promise(async (resolve, reject) => {
    const name = _name.trim();

    try {
      const email = await verifyEmail(_email);
      const password = await verifyPassword(_password);
      if (!name.length > 1) return reject("Did you forget your name, ooor do you not have one?");

      resolve({ email, password, name });
    } catch (error) {
      reject(error);
    }
  });
};

const verifyLoginInput = (_email, _password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const email = await verifyEmail(_email);
      const password = await verifyPassword(_password);

      resolve({ email, password });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { verifyRegistrationInput, verifyLoginInput };
