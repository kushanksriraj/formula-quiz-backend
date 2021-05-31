const express = require("express")
const { getQuizList, addNewQuiz, getQuizDataById } = require('../controller/quiz.controller')

const router = express.Router();

router.route("/")
  .get(getQuizList)
  .post(addNewQuiz);

router.route("/:id")
  .get(getQuizDataById)

module.exports = router;
