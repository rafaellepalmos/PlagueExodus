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
		game.load.atlasJSONArray('wolfie', 'assets/wolf.png', 'assets/wolf.json');
		game.load.image('blood', 'assets/blood.png');

		//chest atlas
		game.load.atlasJSONArray('purple_chest', 'assets/purple_chest.png', 'assets/purple_chest.json');
		//portal
		game.load.atlasJSONArray('portal', 'assets/portal.png', 'assets/portal.json');

		//asset for play state
		game.load.image('cloud', 'assets/platforms/set-1/clouds.png');
		game.load.image('sky', 'assets/platforms/set-1/sky.png');
		game.load.image('sea', 'assets/platforms/set-1/sea.png');
		game.load.image('cloud_dark', 'assets/platforms/set-1/clouds_dark.png');
		game.load.image('sky_dark', 'assets/platforms/set-1/sky_dark.png');
		game.load.image('sea_dark', 'assets/platforms/set-1/sea_dark.png');
		game.load.image('enemy', 'assets/enemy.png');

		//Buttons
		game.load.image('upButton', 'assets/buttons/upButton.png');
		game.load.image('rightButton', 'assets/buttons/rightButton.png');
		game.load.image('leftButton', 'assets/buttons/leftButton.png');
		game.load.image('aButton', 'assets/buttons/aButton.png');
		game.load.image('bButton', 'assets/buttons/bButton.png');

		//// Audio
		game.load.audio('Menu_Theme', ['assets/Soundtrack/Menu_Theme.mp3', 'assets/Soundtrack/Menu_Theme.ogg']);
		game.load.audio('Level_1', ['assets/Soundtrack/Level1.mp3', 'assets/Soundtrack/Level1.ogg']);
		game.load.audio('Level_4', ['assets/Soundtrack/Level4.mp3', 'assets/Soundtrack/Level4.ogg']);
		game.load.audio('Level_5', ['assets/Soundtrack/Level5.mp3', 'assets/Soundtrack/Level5.ogg']);
		//effect
		game.load.audio('hit_1', ['assets/sound/hit_01.mp3', 'assets/sound/hit_01.ogg']);
		game.load.audio('lightning', ['assets/sound/lightning.mp3', 'assets/sound/lightning.ogg']);
		game.load.audio('treasure_opening', ['assets/sound/treasure_opening.mp3', 'assets/sound/treasure_opening.ogg']);

		//// menu assets
		game.load.image('menuBackground', 'assets/menupicture.jpg');
		game.load.image('logo', 'assets/logo.png');
		game.load.image('newgameLabel', 'assets/newgameLabel.png');
		game.load.image('gameoverLabel', 'assets/gameoverLabel.png');
		game.load.image('tryagainLabel', 'assets/tryagainLabel.png');
		game.load.image('backtomenuLabel', 'assets/backtomenuLabel.png');

	},

	create: function () {
		game.state.start('menu');
	}
};
