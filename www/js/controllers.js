angular.module('starter.controllers', [])

.controller('juegoCtrl', function($scope) {

  const cardArray = [
  "fa fa-heart",
  "fa fa-heart",
  "fa fa-venus-mars",
  "fa fa-venus-mars",
  "fa fa-heartbeat",
  "fa fa-heartbeat",
  "fa fa-hospital-o",
  "fa fa-hospital-o",
  "fa fa-user-md",
  "fa fa-user-md",
  "fa fa-ambulance",
  "fa fa-ambulance",
  "fa fa-mars-stroke",
  "fa fa-mars-stroke",
  "fa fa-venus",
  "fa fa-venus"
];

/*select parent to append children thereof*/
const cardContainer = document.querySelector(".deck");

let openedCards = [];
let sameCards = [];
let moves = 0;
let shuffledCards = [];
const stars = document.querySelector(".stars");
let countStars = 3;
let lastmoves = document.querySelector(".moves");
let lastcountStars = document.querySelector(".countStars");
let lastallSeconds = document.querySelector(".allSeconds");

// MODAL
// Get the modal
var scoreModal = document.getElementById("score-modal");

// get play again button
var playAgainBtn = document.getElementById("play-again-btn");
playAgainBtn.onclick = function() {
  // simple trick to reset your game
  // this will not work in codepen but try it on your PC
  location.reload();
};

function showScoreModal() {
  scoreModal.style.display = "block";
}

/*Insert Timer into Game*/
var timerVar = setInterval(clockTimer, 1000);
var allSeconds = 0;

function clockTimer() {
  ++allSeconds;
  var hour = Math.floor(allSeconds / 3600);
  var minute = Math.floor((allSeconds - hour * 3600) / 60);
  var seconds = allSeconds - (hour * 3600 + minute * 60);

  document.getElementById(`hour`).innerHTML = hour;
  document.getElementById(`minute`).innerHTML = minute;
  document.getElementById(`seconds`).innerHTML = seconds;
}

function clockStart() {
  timerVar = setInterval(countTimer, 1000);
}

function tpause() {
  clearInterval(timerVar);
}

function sreset() {
  allSeconds = -1;
  clockTimer();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*Start the Game Initalization*/
/*create the deck of cards and put cards in deck*/
function init(){
const shuffeledCards = shuffle(cardArray);
for(let i=0; i < cardArray.length; i++) {

  const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${cardArray[i]}"></i>`;
    cardContainer.appendChild(card);

    /*Include click event On Cards*/

    click(card);
  }
}

function click(card) {
  /*Clicking On Cards*/
  card.addEventListener("click", function() {
    const nowCard = this;
    const lastCard = openedCards[0];

    /*The Card I'm On is Opened*/

    if (openedCards.length === 1) {
      card.classList.add("open", "show","inactive" );
      openedCards.push(this);//adds a card to the array

      /*This Is Where The Two Cards Are Compared*/

      compare(nowCard, lastCard);
    } else {
      /*There Are No Opened Cards*/
      nowCard.classList.add("open", "show", "inactive");
      openedCards.push(this);//adds a card to the array
    }
  });
}

function compare(nowCard, lastCard) {
  if (nowCard.innerHTML === lastCard.innerHTML) {
    /*Matching Cards*/
    nowCard.classList.add("match");
    lastCard.classList.add("match");

    sameCards.push(nowCard, lastCard);

    openedCards = [];

    /*Is the game over?*/

    itOver();
  } else {
    /*Wait Time: 550 milliseconds*/
    setTimeout(function() {
      nowCard.classList.remove("open", "show", "inactive");
      lastCard.classList.remove("open", "show", "inactive");
    openedCards = [];
    
    }, 550);
    
    
    /*add new moves*/
    addMove();
  }
}

/*Game Over Alert-Game Won! Only if all 16 cards match*/
function itOver() {
  if (sameCards.length === cardArray.length) {
    /*alert("Congratulations! Do You Want to Play Again? Your Stars are " +  countStars  +  ". Your moves are "   +  moves  + 
       ". Your timing in seconds is "    +  allSeconds );*/
   
   //Assistance received from my Udacity mentor, Peter. He helped me with getting the modal installed correctly.

    // insert all html you need into the modal div with class "modal-score-content"
    
    // I have set class of modal-moves in index.html check it out
    // you need make sure that you passing correct values to actually see any difference
    document.querySelector('.modal-moves').innerHTML = moves;
    document.querySelector('.countStars').innerHTML = countStars;
    document.querySelector('.allSeconds').innerHTML= allSeconds;
 
    allSeconds.innerHTML = allSeconds;

    // then show modal
    showScoreModal();
    clearInterval(timerVar);
  }
}

/*Make a Move*/

const movesContainer = document.querySelector(".moves");

function addMove() {
  moves++;
  movesContainer.innerHTML = moves;

  /*Call Rating Function Here*/
  rating();
}

/*Rating*/
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>`;
function rating() {
  if (moves > 15) {
    countStars = 1;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  } else if (moves > 10) {
    countStars = 2;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
  } else {
    countStars = 3;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>`;
  }
}

/*Program Restart Button*/

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
  /*Eliminate the cards*/

  cardContainer.innerHTML = "";

  /*Make new cards*/
  init();

  /*Reset associated elements*/
  sameCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>
                            <li><i class="fa fa-star"></i></li>`;
});

/*Begin The First Game!*/

init();
})

.controller('videosCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

})

.controller('tablasCtrl', function($scope) {})

.controller('infografiasCtrl', function($scope) {})

.controller('ADNCtrl', function($scope) {})

.controller('InicioCtrl', function($scope) {})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
