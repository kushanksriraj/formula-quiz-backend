const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const connectDB = require('./db/db.connect');
const userRouter = require('./router/user.router');
const quizRouter = require('./router/quiz.router');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use("/user", userRouter);
app.use("/quiz", quizRouter);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "Refer to the API docs at github.com/kushanksriraj/formula-quiz"
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: err.message
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Undefined endpoint!"
  });
})

app.listen(PORT, () => {
  console.log('server started');
});
