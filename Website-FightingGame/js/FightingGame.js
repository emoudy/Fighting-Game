$(document).ready(function() {
 	$("#playagain").hide();
 	$("#fightresults").hide();
	$("#startbutton").click(function() {
 		playFightingGame();
 	});
 	
 	var showresults = function(result) {
 		$("#gamearea").append("<br>" + result);
 		$("#playagain").show();
 		$("#fightresults").show();
	};

	var winner, userBet;

	var rouge = new MyHero ("Banach", 17, 7);
	var warrior = new MyHero ("Tibble", 7, 17);

	function MyHero (name, agility, punch) {
		this.name = name;
		this.agility = agility;
		this.punch = punch;
		this.damage = 0;
	};

	MyHero.prototype.hit = function() {
		this.hitRoll = Math.floor(Math.random() * 20 + 1);
		
		if (this.hitRoll === 20) {
			this.hitdamage = 12 + this.punch;
 			showresults(this.name + " crits himself for " + this.hitdamage + " points.");
		} else if (this.hitRoll < this.agility) {
			this.hitdamage = (Math.floor(Math.random() * 12)) + this.punch;
			showresults(this.name + " hits himself for " + this.hitdamage + " points.");
		} else {
			this.hitdamage = 0;
			showresults(this.name + " fails to hit himself!");
		}
			
		this.damage= this.hitdamage+this.damage;
	};

	var playFightingGame = function() {

		var life = 100;
		var Round = 0;

		userBet = $("#selectfighter").val();

		showresults("You placed your bet on " + userBet + ".  Good luck!");

		while (warrior.damage < life && rouge.damage < life) { 
			Round = Round + 1;
			showresults("Round: " + Round);
			
			rouge.hit();
			warrior.hit();
			showresults("Total damage: " + rouge.name + ": " + rouge.damage + " -- " + warrior.name + ": " + warrior.damage);
		};

		if (warrior.damage >= life && warrior.damage > rouge.damage){
			winner = warrior;
		} else {
			winner = rouge;
		}

		showresults(winner.name + " Wins!");
		resultsFightingGame();
	};

	var resultsFightingGame = function () {
		showresults("You said that " + userBet + " could beat himself first...");

		if (userBet == winner.name) {
			showresults("Great Guess! You're awesome!");
		} else {
			showresults("...but you were WRONG! Better luck next time!");
		}
	};

	var preludeFightingGame = function() {
		showresults("Welcome to the never ending battle between a rouge named Banach and a warrior named Tibble.");
		playFightingGame();
	};

$("#playagain").on("click", function() {
		document.location.reload(true);
		playFightingGame();
	});
});
	