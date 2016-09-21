var menuState = {
	create: function() {
		game.add.image(0, 0, 'background');//add a background image
		
		//display the name of the  //change position from 80 to -50
		var nameLabel = game.add.text(game.width/2, -50, 'Super Coin Box', {font: '50px Geo', fill: '#ffffff'});
		nameLabel.anchor.setTo(0.5, 0.5);
		/*//create a tween on the label
		var tween = game.add.tween(nameLabel);
		//change the y position of the label to 80 in 1000ms
		tween.to({y: 80}, 1000);
		//start the tween
		tween.start();*/
		game.add.tween(nameLabel).to({y: 80}, 1000).easing(Phaser.Easing.Bounce.Out).start();
		
		//if 'bestScore' is not defined
		//it means that this is the first time the game is being played
		if (!localStorage.getItem('bestScore')) {
			localStorage.setItem('bestScore', 0);//set the best score to 0
		}
		
		//if the score is higher than the best score
		if (game.global.score > localStorage.getItem('bestScore')) {
			localStorage.setItem('bestScore', game.global.score);//update the best score
		}
		
		//show the score at the center of the screen
		var scoreLabel = game.add.text(game.width/2, game.height/2, 'score: ' + game.global.score + '\nbest score: ' + localStorage.getItem('bestScore'), {font: '25px Arial', fill: '#ffffff', align: 'center'});
		scoreLabel.anchor.setTo(0.5, 0.5);
		
		//explain how to start the game
		var startLabel = game.add.text(game.width/2, game.height-80, 'press the up arrow key to start', {font: '25px Arial', fill: '#ffffff'});
		startLabel.anchor.setTo(0.5, 0.5);
		/*//create the tween
		var tween = game.add.tween(startLabel);
		//rotate the label to -2 degrees in 500ms
		tween.to({angle: -2}, 500);
		//rotate the label to +2 degrees in 500ms
		tween.to({angle: 2}, 500);
		//rotate the label to our initial position in 500ms
		tween.to({angle: 0}, 500);
		//loop indefinitely the tween
		tween.loop();
		//start the tween
		tween.start();*/
		game.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2}, 1000).to({angle: 0}, 500).loop().start();
		
		
		
		//create a new phaser keyboard variable:  the up arrow key
		//when pressed, call the 'start'
		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		upKey.onDown.add(this.start, this);
		
		//add the button that calls the 'toggleSound' function when pressed
		this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);//x, y, name, callback function, context
	},
	
	//function called when the 'muteButton' is pressed
	toggleSound: function() {
		//switch the variable from true to false or false to true
		//when 'game.sound.mute = true', phaser will mute the game
		game.sound.mute = !game.sound.mute;
		
		//change the frame of the button
		this.muteButton.frame = game.sound.mute ? 1 : 0;
	},
	
	start: function() {
		//start the actual game
		game.state.start('play');
	},
};