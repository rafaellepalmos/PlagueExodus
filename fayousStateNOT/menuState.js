var menuState = {
	create: function() {
		var bgImage = game.add.sprite(0, 0, 'menuBackground');
		bgImage.width = game.width;
		bgImage.height = game.height;

		var logo = game.add.sprite(game.width/2, 100, 'logo');
		logo.anchor.setTo(0.5, 0.5);

		var newGameLabel = game.add.button(game.width/2, game.height-100, 'newgameLabel', this.start, this);
		newGameLabel.anchor.setTo(0.5, 0.5);

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
//		game.state.start('gameover'); //test gameover state
	}
};
