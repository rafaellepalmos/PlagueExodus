var bootState = {
	preload: function () {
		game.load.image('progressBar', 'assets/progressBar.png');//load the image
	},
	
	create: function () {
		//set some game settings
		game.stage.backgroundColor = '#3498db';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.renderer.renderSession.roundPixels = true;
		
		//start the load state
		game.state.start('load');
	}
};