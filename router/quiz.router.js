const express = require("express")
const _ = require('lodash');
const { Quiz } = require('../model/quiz.model');
const { catchError } = require('../utils');

const router = express.Router();

router.route("/")
  .get(async (req, res, next) => {
    catchError(next, async () => {

      const quizzes = await Quiz.find({}, '_id title totalTimeInMinutes totalScore totalQuestions quizImage');

      res.json({
        success: true,
        quizzes
      });
    });
  })
  .post(async (req, res, next) => {
    catchError(next, async () => {
      let { quiz } = req.body;

      let newQuiz = new Quiz(quiz);
      newQuiz = await newQuiz.save();

      res.json({
        success: true,
        quiz: newQuiz
      });
    });
  });

router.route("/:id")
  .get(async (req, res, next) => {
    catchError(next, async () => {
      const { id } = req.params;
      const quiz = await Quiz.findById(id, '_id title totalTimeInMinutes totalScore totalQuestions quizImage questionList');

      res.json({
        success: true,
        quiz
      });
    });
  })

module.exports = router;
