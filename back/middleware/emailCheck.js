module.exports = (req, res, next) => {
  const emailcheck = (email) => {
    let emailRegexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isRegexTrue = emailRegexp.test(email);
    isRegexTrue ? next() : res.json({ message3: "Email invalide" });
  };
  emailcheck(req.body.email);
};
