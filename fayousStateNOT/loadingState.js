var loadState = {
	preload: function () {
		//This is loading Label
		this.loadingLabel = game.add.text(game.width/2,150,'loading...', {font:'30px Arial',fill:'#ffffff'});
		this.loadingLabel.anchor.setTo(0.5, 0.5);
		//Display the progress bar
		this.progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
		this.progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(this.progressBar);
		game.load.spritesheet('player', 'assets/player2.png', 20, 20);
		//all assets can be initialized here

		//asset for play state
		game.load.image('cloud', 'assets/platforms/set-1/clouds.png');
		game.load.image('sky', 'assets/platforms/set-1/sky.png');
		game.load.image('sea', 'assets/platforms/set-1/sea.png');
		game.load.image('enemy', 'assets/enemy.png');

		//// Image
		//		game.Load.image('menuBackground', 'assets/menubackground.whatever');
		//		game.Load.image('treeBackground', 'assets/treeBackground.whatever');
		//		game.Load.image('skyBackground', 'assets/skyBackground.whatever');
		//		game.Load.image('floatingcityImage', 'assets/floatingcityImage.whatever');
		//		game.load.image('Level1Background', 'assets/Level1Background.whatever');
		//// Image
		//
		//// Audio
		//		game.Load.audio('menuSoundtrack', ['assets/menuSoundtrack.mp3', 'assets/menuSoundtrack.ogg']);
		//		game.Load.audio('menuSoundtrack', ['assets/menuSoundtrack.mp3', 'assets/menuSoundtrack.ogg']);
		//		game.Load.audio('menuSoundtrack', ['assets/menuSoundtrack.mp3', 'assets/menuSoundtrack.ogg']);
		//		game.Load.audio('menuSoundtrack', ['assets/menuSoundtrack.mp3', 'assets/menuSoundtrack.ogg']);
		//// Audio
		//
		//// Spritesheet
		//		game.Load.spritesheet('playerSheet', 'assets/player.png', x, y);
		//		game.Load.spritesheet('enemy1Sheet', 'assets/enemy1Sheet.png', x, y);
		//		game.Load.spritesheet('enemy2Sheet', 'assets/enemy2Sheet.png', x, y);
		//		game.Load.spritesheet('enemy3Sheet', 'assets/enemy3Sheet.png', x, y);
		//		game.Load.spritesheet('enemyBoss1Sheet', 'assets/enemyBoss1Sheet.png', x, y);
		//		game.Load.spritesheet('enemyBoss2Sheet', 'assets/enemyBoss2Sheet.png', x, y);
		//		game.Load.spritesheet('treasureSheet', 'assets/treasureShet.png', x, y);
		//// Spritesheet
	},

	create: function () {
		game.state.start('menu');
	}


	//---------------------------------Assets--------------------------------------//
	// progressBar.anchor.setTo(0.5, 0.5);
	// game.load.setPreloadSprite(progressBar);

	// game.load.spritesheet('player', 'assets/player2.png', 20, 20);
	// game.load.image('enemy', 'assets/enemy.png');
	// game.load.image('coin', 'assets/coin.png');
	// game.load.image('wallV', 'assets/wallVertical.png');
	// game.load.image('wallH', 'assets/wallHorizontal.png');
	// game.load.image('background', 'assets/background.png');
	// game.load.image('pixel', 'asset/pixel.png');

	// game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
	// game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
	// game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
	//---------------------------------Assets--------------------------------------//
};
