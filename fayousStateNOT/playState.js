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
			default: game.load.image('tileset-1', 'assets/platforms/set-1/tileset-1.png');
			game.load.tilemap('map-1', 'assets/platforms/set-1/map-1.json', null, Phaser.Tilemap.TILED_JSON);
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
			default: this.map = game.add.tilemap('map-1');
			this.map.addTilesetImage('tileset-1');
			this.layer = this.map.createLayer('Tile Layer 1');
			this.layer.resizeWorld();
			this.layer2 = this.map.createLayer('Tile Layer 2');
			this.map.setCollisionBetween(1, 1159, true, this.layer);
			break;
		}
		//Player must be place right here
		this.player = game.add.sprite(16, 1880, "player");
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
	},

	update: function () {
		//Set player collides with layer 1 of tilemap
		game.physics.arcade.collide(this.player, this.layer);
		game.physics.arcade.collide(this.enemies, this.layer);
		//Call movePlayer function
		this.movePlayer();
		//Set parallex backgrounds
		this.clouds.tilePosition.set(this.clouds.x * -0.1, 0);
		this.sea.tilePosition.set(this.sea.x * -0.2, 0);
	},

	movePlayer: function () {
		if (this.cursor.left.isDown) {
			this.player.body.velocity.x = -200;
		} else if (this.cursor.right.isDown) {
			this.player.body.velocity.x = 200;
		} else {
			this.player.body.velocity.x = 0;
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
}
