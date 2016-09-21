var loadState = {
	preload: function () {
		//add a 'loading...' label on the screen
		var loadingLabel = game.add.text(game.width/2, 150, 'loading...', {font: '30px Arial', fill: '#ffffff'});
		loadingLabel.anchor.setTo(0.5, 0.5);
		
		//display the progress bar
		var progessBar = game.add.sprite(game.width/2, 200, 'progessBar');
		progessBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progessBar);
		
		//load all our assets
		//game.load.image('player', 'assets/player.png');
		game.load.spritesheet('player', 'assets/player2.png', 20, 20);
		game.load.image('enemy', 'assets/enemy.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('wallV', 'assets/wallVertical.png');
		game.load.image('wallH', 'assets/wallHorizontal.png');
		
		//load a new asset that we will use in the menu state
		game.load.image('background', 'assets/background.png');
		
		//load audio
		game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
		game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
		game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
		
		//load particles
		game.load.image('pixel', 'assets/pixel.png');
		
		//load the mute button spritesheet
		game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
	},
	
	create: function () {
		//go to the menu state
		game.state.start('menu');
	}
};