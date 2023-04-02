const User = require("../model/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utility/ApiError");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const http = require("http");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const allUser = await User.find();
    const existUser = await User.findOne({ username });
    if (existUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Username has been used");
    }
    const newUser = await User.create({
      username,
      password,
    });
    // Create token
    const token = jwt.sign(
      { user_id: newUser._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    newUser.accessToken = token;

    // return new user
    return res.status(201).send(newUser);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const loginUser = await User.findOne({
      username,
    });
    if (loginUser && bcrypt.compare(password, loginUser.password)) {
      // Create token
      const token = jwt.sign(
        { user_id: loginUser._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.set("accessToken", token);
      // save user token
      // req.headers.accessToken = token;
      await User.findOneAndUpdate({ username, accessToken: token });

      // return res.status(200).send(`Login Success, ${res.headers}`);
      return res.status(201).json({
        message: "Member login",
        data: loginUser,
        accessToken: token,
      });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

module.exports = {
  login,
  register,
};
