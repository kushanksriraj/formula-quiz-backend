const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const secret = process.env.secret;

const { signUpUserAndSendUserData, loginUserAndSendUserData, saveQuizResponseOfUser, getUserData, deleteTakenQuizById } = require('../controller/user.controller');

router.route("/sign-up")
  .post(signUpUserAndSendUserData);

router.route("/login")
  .post(loginUserAndSendUserData);

// Middleware for auth
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded._id;
    return next();
  }
  catch (err) {
    console.log({ err });
    return res.status(401).json({
      success: false,
      message: "Authentication error!"
    })
  }
}

router.route("/")
  .post(authenticateUser, saveQuizResponseOfUser)
  .get(authenticateUser, getUserData);

router.route("/quiz/:id")
  .delete(authenticateUser, deleteTakenQuizById);

module.exports = router;
