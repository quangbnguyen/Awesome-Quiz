function QuizUI(quiz) {
  this.quiz = quiz;
}

QuizUI.prototype.displayNext = function() {
  if(this.quiz.hasEnded()) {
    this.displayScore();
  } else {
    this.displayQuestion();
    this.displayChoices();
    this.displayProgress();
  }
};

QuizUI.prototype.displayQuestion = function() {
  console.log(this.quiz);
  this.populateIdWithHTML("question", this.quiz.getCurrentQuestion().text);
};

QuizUI.prototype.displayChoices = function() {
  var choices = this.quiz.getCurrentQuestion().choices;
  for (var i = 0; i < choices.length; i++) {
    this.populateIdWithHTML("choice" + i, choices[i]);
    this.guessHandler("guess" + i, choices[i]);
  }
};

QuizUI.prototype.displayScore = function() {
  var gameOverHTML = "<h1>Game Over</h1>";
  gameOverHTML = "<h2>Your score is: " + this.quiz.score + "</h2>";
  this.populateIdWithHTML("quiz", gameOverHTML);
};

QuizUI.prototype.guessHandler = function(id, guess) {
  var button = document.getElementById(id);
  button.removeEventListener('click', null);
  button.addEventListener('click', function() {
    this.quiz.guess(guess);
    this.displayNext();
  }.bind(this));
};

QuizUI.prototype.displayProgress = function() {
  var currentQuestionNumber = this.quiz.currentQuestionIndex + 1;
  this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + this.quiz.questions.length);
}

QuizUI.prototype.populateIdWithHTML = function(id, text) {
  var element = document.getElementById(id);
  element.innerHTML = text;
};
