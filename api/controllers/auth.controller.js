const { User } = require("../models/user.model.js");
const { errorHandler } = require("../utils/error.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User Created Successfully !!");
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User Not Found!!"));
    console.log("User Info",validUser);
    const validatePassword = bcrypt.compareSync(password, validUser.password);
    if (!validatePassword)
      return next(errorHandler(401, "Wrong Credentials!!"));
    console.log("Sing in method called !!!");

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const {password:pass,...rest} = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 7),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signup,
  signIn,
};
