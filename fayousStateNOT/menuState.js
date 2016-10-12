var menuState = {
	create: function() {
		var bgImage = game.add.sprite(0, 0, 'menuBackground');
		bgImage.width = game.width;
		bgImage.height = game.height;

		var nameLabel = game.add.text(game.width/2, 100, 'Plague Exodus', {font: '50px Helvetica', fill: '#ffffff'});
		nameLabel.anchor.setTo(0.5, 0.5);

		var newGameLabel = game.add.text(game.width/2, game.height-100, 'New Game', {font: '25px Helvetica', fill: '#ffffff'});
		newGameLabel.anchor.setTo(0.5, 0.5);

		var quitGameLabel = game.add.text(game.width/2, game.height-60, 'Quit', {font: '25px Helvetica', fill: '#ffffff'});
		quitGameLabel.anchor.setTo(0.5, 0.5);



		//for testing, use up key to enter game state
		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		upKey.onDown.add(this.start, this);
		
		//for mobile
		if (!game.device.desktop) {
			game.input.onDown.add(this.start, this);
		}

		this.bgMusic = game.add.audio('Menu_Theme');
		this.bgMusic.loop = true;
		this.bgMusic.play();


	},

	start: function () {
		this.bgMusic.stop();
		game.state.start('play');
	}
};
