var playState = {
	preload: function () {
		//Show loadinglabel while stage is loading
		this.loadingLabel = game.add.text(game.width / 2, 150, 'loading...', {
			font: '30px Arial',
			fill: '#ffffff'
		});
		this.loadingLabel.anchor.setTo(0.5, 0.5);
		this.progressBar = game.add.sprite(game.width / 2, 200, 'progressBar');
		this.progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(this.progressBar);
		//Use global variable "playLevel" to select Level
		switch (game.global.playLevel) {
			//default will load first level
			default:
			case 1:
			game.load.image('tileset-1', 'assets/platforms/set-1/tileset-1.png');
			game.load.tilemap('map-1', 'assets/platforms/set-1/map-1.json', null, Phaser.Tilemap.TILED_JSON);
			break;

			case 2:
			game.load.image('tileset-1', 'assets/platforms/set-1/tileset-1.png');
			game.load.tilemap('map-2', 'assets/platforms/set-1/map-2.json', null, Phaser.Tilemap.TILED_JSON);
			break;

			case 3:
			game.load.image('tileset-1', 'assets/platforms/set-1/tileset-1.png');
			game.load.tilemap('map-3', 'assets/platforms/set-1/map-3.json', null, Phaser.Tilemap.TILED_JSON);
			break;

			case 4:
			game.load.image('tileset-1', 'assets/platforms/set-1/tileset-1.png');
			game.load.tilemap('map-4', 'assets/platforms/set-1/map-4Puzzle.json', null, Phaser.Tilemap.TILED_JSON);
			break;
		}
	},

	create: function () {
		// this.enemies = game.add.group();
		// //add physics to the gruop
		// this.enemies.enableBody = true;
		// //Create enemies
		// this.enemies.createMultiple(1, 'enemy');
		// this.addEnemy();
		// extra stuff, remove later

		//Kill loading label and progressbar when it's done
		this.loadingLabel.kill();
		this.progressBar.kill();
		//Set parallex backgrounds which is included sky, clouds, sea.
		this.sky = game.add.tileSprite(0, 0, game.width, game.height, 'sky');
		this.sky.fixedToCamera = true;
		this.sky.tileScale.set(1.5);
		this.clouds = game.add.tileSprite(0, 100, game.width, 236, 'cloud');
		this.clouds.fixedToCamera = true;
		this.sea = game.add.tileSprite(0, 250, game.width, 96, 'sea');
		this.sea.fixedToCamera = true;
		this.sea.tileScale.set(1.1);
		//Use global variable "playLevel" to select Level
		switch (game.global.playLevel) {
			default:
			case 1:
			this.map = game.add.tilemap('map-1');
			this.map.addTilesetImage('tileset-1');
			this.layer2 = this.map.createLayer('Tile Layer 2');
			this.layer = this.map.createLayer('Tile Layer 1');
			this.layer.resizeWorld();
			this.layer3 = this.map.createLayer('Tile Layer 3');
			this.map.setCollisionBetween(1, 1159, true, this.layer);
			this.playerBirthPlaceX = 16;
			this.playerBirthPlaceY = 1880;
			break;

			case 2:
			this.map = game.add.tilemap('map-2');
			this.map.addTilesetImage('tileset-1');
			this.layer2 = this.map.createLayer('Tile Layer 2');
			this.layer = this.map.createLayer('Tile Layer 1');
			this.layer.resizeWorld();
			this.layer3 = this.map.createLayer('Tile Layer 3');
			this.map.setCollisionBetween(1, 1159, true, this.layer);
			this.playerBirthPlaceX = 16;
			this.playerBirthPlaceY = 1880;
			break;

			case 3:
			this.map = game.add.tilemap('map-3');
			this.map.addTilesetImage('tileset-1');
			this.layer2 = this.map.createLayer('Tile Layer 2');
			this.layer = this.map.createLayer('Tile Layer 1');
			this.layer.resizeWorld();
			this.layer3 = this.map.createLayer('Tile Layer 3');
			this.map.setCollisionBetween(1, 1159, true, this.layer);
			this.playerBirthPlaceX = 16;
			this.playerBirthPlaceY = 1880;
			break;

			case 4:
			this.map = game.add.tilemap('map-4');
			this.map.addTilesetImage('tileset-1');
			this.layer2 = this.map.createLayer('Tile Layer 2');
			this.layer = this.map.createLayer('Tile Layer 1');
			this.layer.resizeWorld();
			this.layer3 = this.map.createLayer('Tile Layer 3');
			this.map.setCollisionBetween(1, 1159, true, this.layer);
			this.playerBirthPlaceX = 1740;
			this.playerBirthPlaceY = 7965;
			break;
		}
		//Player must be place right here
		this.player = game.add.sprite(this.playerBirthPlaceX, this.playerBirthPlaceY, 'atlas', 'male_melee_right01');//change to atlas
		//add animation from atlas
		this.player.animations.add('left', ['male_melee_left01', 'male_melee_left02', 'male_melee_left03', 'male_melee_left04', 'male_melee_left05', 'male_melee_left06', 'male_melee_left07', 'male_melee_left08', 'male_melee_left09'], 8, true);
		this.player.animations.add('right', ['male_melee_right01', 'male_melee_right02', 'male_melee_right03', 'male_melee_right04', 'male_melee_right05', 'male_melee_right06', 'male_melee_right07', 'male_melee_right08', 'male_melee_right09'], 8, true);
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 500;
		//set player collide world bounds top, right, left only
		this.player.body.collideWorldBounds = true;
		game.physics.arcade.checkCollision.down = false;
		//set camera follow the player
		game.camera.follow(this.player);
		//cursor input
		this.cursor = game.input.keyboard.createCursorKeys();

		//variable to store player orientation
		game.global.lastdir = '';
	},

	update: function () {
		//Set player collides with layer 1 of tilemap
		game.physics.arcade.collide(this.player, this.layer);
		game.physics.arcade.collide(this.enemies, this.layer);
		//Call movePlayer function
		this.movePlayer();
		//Set parallex backgrounds
		this.clouds.tilePosition.set(this.clouds.x * -0.1, 0);
		this.sea.tilePosition.set(this.sea.x * -0.15, 0);
	},

	movePlayer: function () {
		if (this.cursor.left.isDown) {
			game.global.lastdir = 'left';
			this.player.body.velocity.x = -200;
			this.player.animations.play('left');//left animation
		} else if (this.cursor.right.isDown) {
			game.global.lastdir = 'right';
			this.player.body.velocity.x = 200;
			this.player.animations.play('right');//right animation
		} else {
			this.player.body.velocity.x = 0;
			//check which direction the character is facing
			if (game.global.lastdir == 'left'){
				this.player.frameName = 'male_melee_left01';//idle facing left
			}
			else if (game.global.lastdir == 'right') {
				this.player.frameName = 'male_melee_right01';//idle facing right
			} else {
				this.player.frameName = 'male_melee_alive01';//else idle facing front
			}
		}
		if (this.cursor.up.isDown) {
			this.player.body.velocity.y = -320;
		}
	},

	render: function () {
		game.debug.bodyInfo(this.player, 32, 32);
	},

	addEnemy: function () {
		var enemy = this.enemies.getFirstDead();
		enemy.anchor.setTo(0.5, 0.5);
		enemy.reset(100, 1884);
		enemy.body.gravity.y = 500;
		enemy.body.velocity.x = 100;
		enemy.body.bounce.x = 1;
		enemy.checkWorldBounds = true;
		enemy.outOfBoundsKill = true;
	}
}
