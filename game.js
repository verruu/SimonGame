var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var firstClick = false;

var level = 0;

var wrong = new Audio("sounds/wrong.mp3");

function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
};

$(".btn").click(function handler() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var index = userClickedPattern.length - 1;
  checkAnswer(index);
});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
};

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
};

function wrongButton() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
};

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  firstClick = false;
}

$(document).keydown(function() {
  if (firstClick === false) {
    nextSequence();
  } else {
    console.log("NULL");
  }
  firstClick = true;
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    wrong.play();
    wrongButton();
    startOver();
    $("h1").text("Game Over, Press Any Key to Restart");
  }
};
