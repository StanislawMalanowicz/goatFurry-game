console.log('helloWorld');

var Furry = require("./furry.js");
var Coin = require("./coin.js");




function Game() {
    this.sound1 = document.querySelector("#sound1");
    this.sound2 = document.querySelector("#sound2");
    this.board = document.querySelectorAll('#board>div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;



    this.index = function (x, y) {
        return x + (y * 10);
    };




    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };





        this.hideVisibleFurry = function () {
            var dd = document.querySelector('.furry');
            if (dd) {
                dd.classList.remove('furry');
            }
        };




        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };





        this.moveFurry = function () {
            if (this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            }
            else if (this.furry.direction === "left") {
                this.furry.x = this.furry.x - 1;
            }
            else if (this.furry.direction === "up") {
                this.furry.y = this.furry.y - 1;
            }
            else if (this.furry.direction === "down") {
                this.furry.y = this.furry.y + 1;
            }
            this.gameOver();

            this.showFurry();
            this.checkCoinCollision();
        };






    this.turnFurry = function () {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;

        };

    };






    this.checkCoinCollision = function () {
       if(this.coin.x === this.furry.x && this.coin.y === this.furry.y) {
           // console.log('cos tam nawet dziala');
            var removeCoin = document.querySelector('.coin');
           removeCoin.classList.remove('coin');
           var score = document.querySelector('strong');
            score.innerText ++;
          this.coin = new Coin();
           this.showCoin();
            this.sound1.play();
       }
    };

    this.gameOver = function ()

    {   console.log(this.furry.y);


        if( this.furry.x < 0 || this.furry.x > 9 || this.furry.y< 0 || this.furry.y > 9) {
            // console.log("koniec ch...");
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            this.sound2.play();
            this.scoreTable()

        }
    };

    this.scoreTable = function () {
      var police = document.querySelector('.invisible');
        var score = document.querySelector('strong');
        var scoreFinal = document.createElement('finalScore');
        var point = score.innerText;
        police.style.display = 'block';
        police.appendChild(scoreFinal);
        scoreFinal.innerText =  "Koniec. Twój wynik to: " + point;

    };








    this.startGame = function () {
        var self = this;
        this.idSetInterval = setInterval(function(){
            self.moveFurry()
                }, 250);

    };




}


var newGame = new Game;
newGame.showFurry();
newGame.showCoin();
newGame.startGame();


document.addEventListener('keydown', function(event){
    newGame.turnFurry(event);
});