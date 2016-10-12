var loadState = {
	preload: function () {
		//This is loading Label
		this.loadingLabel = game.add.text(game.width/2,150,'loading...', {font:'30px Arial',fill:'#ffffff'});
		this.loadingLabel.anchor.setTo(0.5, 0.5);
		//Display the progress bar
		this.progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
		this.progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(this.progressBar);
		//all assets can be initialized here

		//player atlas
		game.load.atlasJSONArray('player', 'assets/male_melee.png', 'assets/male_melee.json');

		//enemy01 atlas
		game.load.atlasJSONArray('health', 'assets/health.png', 'assets/health.json');

		//enemy atlas
		game.load.atlasJSONArray('boss', 'assets/pope_normal.png', 'assets/pope_normal.json');
		game.load.atlasJSONArray('lightning', 'assets/lightning.png', 'assets/lightning.json');
		game.load.atlasJSONArray('curupira', 'assets/curupira.png', 'assets/curupira.json');
		game.load.atlasJSONArray('woodie', 'assets/woodie.png', 'assets/woodie.json');
		game.load.atlasJSONArray('banshee', 'assets/banshee.png', 'assets/banshee.json');
		game.load.image('blood', 'assets/blood.png');

		//chest atlas
		game.load.atlasJSONArray('purple_chest', 'assets/purple_chest.png', 'assets/purple_chest.json');

		//asset for play state
		game.load.image('cloud', 'assets/platforms/set-1/clouds.png');
		game.load.image('sky', 'assets/platforms/set-1/sky.png');
		game.load.image('sea', 'assets/platforms/set-1/sea.png');
		game.load.image('cloud_dark', 'assets/platforms/set-1/clouds_dark.png');
		game.load.image('sky_dark', 'assets/platforms/set-1/sky_dark.png');
		game.load.image('sea_dark', 'assets/platforms/set-1/sea_dark.png');
		game.load.image('enemy', 'assets/enemy.png');

		//// Audio
		game.load.audio('Menu_Theme', ['assets/Soundtrack/Menu_Theme.mp3', 'assets/Soundtrack/Menu_Theme.ogg']);

		//// Image
		game.load.image('menuBackground', 'assets/menupicture.jpg');

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
