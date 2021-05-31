const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId },
  selectedOptionId: { type: mongoose.Schema.Types.ObjectId },
  isCorrect: Boolean,
})

const takenQuizSchema = mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  score: Number,
  answerList: [answerSchema]
})

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required!"
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email is required!"
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  takenQuizList: [takenQuizSchema]
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = { User };
