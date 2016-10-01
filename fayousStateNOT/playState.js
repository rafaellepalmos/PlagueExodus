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
			break;

		case 2:
				this.map = game.add.tilemap('map-2');
			this.map.addTilesetImage('tileset-1');
			this.layer2 = this.map.createLayer('Tile Layer 2');
			this.layer = this.map.createLayer('Tile Layer 1');
			this.layer.resizeWorld();
			this.layer3 = this.map.createLayer('Tile Layer 3');
			this.map.setCollisionBetween(1, 1159, true, this.layer);
			break;

		case 3:
				this.map = game.add.tilemap('map-3');
			this.map.addTilesetImage('tileset-1');
			this.layer2 = this.map.createLayer('Tile Layer 2');
			this.layer = this.map.createLayer('Tile Layer 1');
			this.layer.resizeWorld();
			this.layer3 = this.map.createLayer('Tile Layer 3');
			this.map.setCollisionBetween(1, 1159, true, this.layer);
			break;
		}
		//Player must be place right here
		this.player = game.add.sprite(16, 1880, 'atlas', 'male_melee_right01');//change to atlas
		
		//add animation from atlas
		this.player.animations.add('left', ['male_melee_left01', 'male_melee_left02', 'male_melee_left03', 'male_melee_left04', 'male_melee_left05', 'male_melee_left06', 'male_melee_left07', 'male_melee_left08', 'male_melee_left09'], 8, true);
		this.player.animations.add('right', ['male_melee_right01', 'male_melee_right02', 'male_melee_right03', 'male_melee_right04', 'male_melee_right05', 'male_melee_right06', 'male_melee_right07', 'male_melee_right08', 'male_melee_right09'], 8, true);
		this.player.animations.add('attackleft', ['male_melee_slashleft01', 'male_melee_slashleft02', 'male_melee_slashleft03', 'male_melee_slashleft04', 'male_melee_slashleft05', 'male_melee_slashleft06'], 8, false);
		this.player.animations.add('attackright', ['male_melee_slashright01', 'male_melee_slashright02', 'male_melee_slashright03', 'male_melee_slashright04', 'male_melee_slashright05', 'male_melee_slashright06'], 8, false);
		this.player.animations.add('respawn', ['male_melee_dead05', 'male_melee_dead04', 'male_melee_dead03', 'male_melee_dead02', 'male_melee_dead01', 'male_melee_alive01'], 8, false);
		
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 700;
		
		//set player collide world bounds top, right, left only
		this.player.body.collideWorldBounds = true;
		game.physics.arcade.checkCollision.down = false;
		
		//set camera follow the player
		game.camera.follow(this.player);
		
		//cursor input
		this.cursor = game.input.keyboard.createCursorKeys();
		
		//variable to store player orientation
		game.global.lastdir = '';
		
		//variable to store last key pressed
		game.global.lastkey = '';
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
		
		if (!this.player.inWorld) {
			console.log("player fell out of bounds");
			this.playerDie();
			game.global.lastkey = 'dead';
		}
	},

	movePlayer: function () {
		//if player is clicking attack key
		if (this.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
			game.global.lastkey = 'ONE';
			console.log("attacking");//to debug
			//check if player is facing left
			if (game.global.lastdir == 'left'){
				this.player.animations.play('attackleft');//attack facing left
				this.player.animations.currentAnim.onComplete.add(function () {	game.global.lastkey = 'LEFT';}, this);//idle right after animation finishes
			}
			//check if player is facing right
			else if (game.global.lastdir == 'right') {
				this.player.animations.play('attackright');//attack facing right
				this.player.animations.currentAnim.onComplete.add(function () {game.global.lastkey = 'RIGHT';}, this);//idle right after animation finishes
			}
			//default: do nothing
			else {
				return;
			}
		}
		//else if player is pressing left
		else if (this.cursor.left.isDown) {
			console.log("going left");//to debug
			game.global.lastdir = 'left';//last direction player was facing
			this.player.body.velocity.x = -200;
			this.player.animations.play('left');//left animation
			game.global.lastkey = 'LEFT';
		}
		//else if player is pressing right
		else if (this.cursor.right.isDown) {
			console.log("going right");//to debug
			game.global.lastdir = 'right';//last direction player was facing
			this.player.body.velocity.x = 200;
			this.player.animations.play('right');//right animation
			game.global.lastkey = 'RIGHT';
		}
		//if left or right or attack are not being pressed/clicked, go to else:
		else {
			this.player.body.velocity.x = 0;//stop moving
			console.log("idle");//to debug
			//check which direction the character is facing
			if (game.global.lastdir == 'left' && game.global.lastkey == 'LEFT'){
				this.player.frameName = 'male_melee_left01';//idle facing left
			}
			else if (game.global.lastdir == 'right' && game.global.lastkey == 'RIGHT') {
				this.player.frameName = 'male_melee_right01';//idle facing right
			}
			/*else {
				this.player.frameName = 'male_melee_alive01';//else idle facing front
			}*/
		}
		//check if jump button is pressed
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.player.body.onFloor()) {
			this.player.body.velocity.y = -300;
		}
	},
	
	playerDie: function() {
		this.player.reset(16, 1880);//reset player to original location
		game.camera.flash(0xffffff, 300);//flash a camera upon respawn
		this.player.animations.play('respawn');//play respawn animation
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
