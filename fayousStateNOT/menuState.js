var menuState = {
	create: function() {
//		game.add.image(0, 0, 'menupicture');

		var nameLabel = game.add.text(game.width/2, 100, 'Plague Exodus', {font: '50px Helvetica', fill: '#ffffff'});
		nameLabel.anchor.setTo(0.5, 0.5);

		var newGameLabel = game.add.text(game.width/2, game.height-100, 'New Game', {font: '25px Helvetica', fill: '#ffffff'});
		newGameLabel.anchor.setTo(0.5, 0.5);

		var quitGameLabel = game.add.text(game.width/2, game.height-60, 'Quit', {font: '25px Helvetica', fill: '#ffffff'});
		quitGameLabel.anchor.setTo(0.5, 0.5);

		//for testing, use up key to enter game state
		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		upKey.onDown.add(this.start, this);

	},

	start: function () {
		game.state.start('play');
	}
};
