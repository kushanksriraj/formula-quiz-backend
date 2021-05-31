const _ = require('lodash');
const { catchError } = require('../utils')
const { Quiz } = require('../model/quiz.model')

const getQuizList = async (req, res, next) => {
  catchError(next, async () => {
    const quizzes = await Quiz.find({}, '_id title totalTimeInMinutes totalScore totalQuestions quizImage');
    res.json({
      success: true,
      quizzes
    });
  });
}

const addNewQuiz = async (req, res, next) => {
  catchError(next, async () => {
    let { quiz } = req.body;
    let newQuiz = new Quiz(quiz);
    newQuiz = await newQuiz.save();
    res.json({
      success: true,
      quiz: newQuiz
    });
  });
}

const getQuizDataById = async (req, res, next) => {
  catchError(next, async () => {
    const { id } = req.params;
    const quiz = await Quiz.findById(id, '_id title totalTimeInMinutes totalScore totalQuestions quizImage questionList');
    res.json({
      success: true,
      quiz
    });
  });
}

module.exports = { getQuizList, addNewQuiz, getQuizDataById }