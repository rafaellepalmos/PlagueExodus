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
		//load map assets
		this.loadMap();
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
		//create map before create player
		this.drawMap();
		//Player must be place right here
		//this.player = game.add.sprite(16, 1880, 'player', 'male_melee_right01');//change to atlas
		this.player = game.add.sprite(this.playerBirthPlaceX, this.playerBirthPlaceY, 'player', 'male_melee_right01'); //change to atlas
		//add animation from atlas
		this.player.animations.add('left', ['male_melee_left01', 'male_melee_left02', 'male_melee_left03', 'male_melee_left04', 'male_melee_left05','male_melee_left06', 'male_melee_left07', 'male_melee_left08', 'male_melee_left09'], 8, true);
		this.player.animations.add('right', ['male_melee_right01', 'male_melee_right02', 'male_melee_right03', 'male_melee_right04', 'male_melee_right05', 'male_melee_right06', 'male_melee_right07', 'male_melee_right08', 'male_melee_right09'], 8, true);
		this.player.animations.add('attackleft', ['male_melee_slashleft01', 'male_melee_slashleft02', 'male_melee_slashleft03', 'male_melee_slashleft04', 'male_melee_slashleft05', 'male_melee_slashleft06'], 8, false);
		this.player.animations.add('attackright', ['male_melee_slashright01', 'male_melee_slashright02', 'male_melee_slashright03', 'male_melee_slashright04', 'male_melee_slashright05', 'male_melee_slashright06'], 8, false);
		this.player.animations.add('respawn', ['male_melee_dead05', 'male_melee_dead04', 'male_melee_dead03', 'male_melee_dead02', 'male_melee_dead01', 'male_melee_alive01'], 8, false);

		this.player.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 700; //used to be 700

		//set player collide world bounds top, right, left only
		this.player.body.collideWorldBounds = true;
		game.physics.arcade.checkCollision.down = false;

		//add player health
		this.health = game.add.sprite(10, 1670, 'health', 'health10');//add health sprite
		this.health.anchor.setTo(0, 0);//set anchor to top right
		this.health.fixedToCamera = true;//fix it to camera
		this.health.cameraOffset.setTo(10, 10);//set the location of health in relation to the camera
		game.global.playerhp = 10;

		//add enemies
		this.addEnemy();//add enemy to map
		this.moveEnemy();//move the enemy back and forth

		//particles for blood explosion
		this.emitter = game.add.emitter(0, 0, 15); //create emitter with x,y,# of particles
		this.emitter.makeParticles('blood');// Set blood for the particles
		// Set the x and y speed of the particles between -150 and 150
		this.emitter.setYSpeed(-150, 150);
		this.emitter.setXSpeed(-150, 150);
		// Scale the particles from 2 time their size to 0 in 800ms
		this.emitter.setScale(2, 0, 2, 0, 800);// Parameters are: startX, endX, startY, endY, duration
		this.emitter.gravity = 0;// Use no gravity

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
		game.physics.arcade.collide(this.enemy01, this.layer);

		//Call movePlayer function
		this.movePlayer();

		//to keep the enemies moving
		this.moveEnemy();

		//player collides with enemies
		//game.physics.arcade.collide(this.player, this.enemy01);
		game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);

		//Set parallex backgrounds
		this.clouds.tilePosition.set(this.clouds.x * -0.1, 0);
		this.sea.tilePosition.set(this.sea.x * -0.15, 0);

		if (!this.player.inWorld || this.player.y > this.deadLine) {
			console.log("player fell out of bounds");
			game.global.playerhp = 0;
			this.playerRespawn();
			game.global.lastkey = 'dead';
		}
	},

	movePlayer: function () {
		//if player is clicking attack key
		if (this.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
			game.global.lastkey = 'ONE';
			console.log("attacking"); //to debug
			//check if player is facing left
			if (game.global.lastdir == 'left') {
				this.player.animations.play('attackleft'); //attack facing left
				this.player.animations.currentAnim.onComplete.add(function () {
					game.global.lastkey = 'LEFT';
				}, this); //idle right after animation finishes
			}
			//check if player is facing right
			else if (game.global.lastdir == 'right') {
				switch (game.global.playLevel) {
					default:
					case 1:
					break;

					case 2:
						var d = this.enemy01.position.x - this.player.position.x;
						if (d < 100) {
							game.time.events.add(Phaser.Timer.SECOND * .25, function(){
								this.enemy01.kill();
								// Set the position of the emitter
								this.emitter.x = this.enemy01.x;
								this.emitter.y = this.enemy01.y;
								this.emitter.start(true, 800, null, 15);// Start the emitter by exploding 15 particles that will live 800ms
							}, this);
						}
						this.player.animations.play('attackright');//attack facing right
						this.player.animations.currentAnim.onComplete.add(function () {game.global.lastkey = 'RIGHT';}, this);//idle right after animation finishes
						break;

					case 3:
					break;
				}
			}
			//default: do nothing
			else {
				return;
			}
		}
		//else if player is pressing left
		else if (this.cursor.left.isDown) {
			console.log("going left"); //to debug
			game.global.lastdir = 'left'; //last direction player was facing
			this.player.body.velocity.x = -200;
			this.player.animations.play('left'); //left animation
			game.global.lastkey = 'LEFT';
		}
		//else if player is pressing right
		else if (this.cursor.right.isDown) {
			console.log("going right"); //to debug
			game.global.lastdir = 'right'; //last direction player was facing
			this.player.body.velocity.x = 200;
			this.player.animations.play('right'); //right animation
			game.global.lastkey = 'RIGHT';
		}
		//if left or right or attack are not being pressed/clicked, go to else:
		else {
			this.player.body.velocity.x = 0; //stop moving
			console.log("idle"); //to debug
			//check which direction the character is facing
			if (game.global.lastdir == 'left' && game.global.lastkey == 'LEFT') {
				this.player.frameName = 'male_melee_left01'; //idle facing left
			} else if (game.global.lastdir == 'right' && game.global.lastkey == 'RIGHT') {
				this.player.frameName = 'male_melee_right01'; //idle facing right
			}
			/*else {
				this.player.frameName = 'male_melee_alive01';//else idle facing front
			}*/
		}
		//check if jump button is pressed
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.player.body.onFloor()) {
			this.player.body.velocity.y = -400;
		}
	},

	playerDie: function() {
		this.playerRespawn();
		game.global.playerhp -= 1;
		if (game.global.playerhp > 0){
			console.log("Health: " + game.global.playerhp);
			this.health.frameName = 'health' + game.global.playerhp;
		}
		else {
			game.global.playerhp =10;
			this.health.frameName = 'health10';
		}
	},

	playerRespawn: function() {
		this.player.reset(this.playerBirthPlaceX, this.playerBirthPlaceY); //reset player to original location
		//this.player.reset(16, 1880);//reset player to original location
		game.camera.flash(0xffffff, 300);//flash a camera upon respawn
		this.player.animations.play('respawn');//play respawn animation
		if (game.global.playerhp == 0) {
			game.global.playerhp =10;
			this.health.frameName = 'health10';
		}
	},

	addEnemy: function() {
		this.enemies = game.add.group();

		switch (game.global.playLevel) {
			default:
			case 1:

			break;

			case 2:

			//add enemy
			this.enemy01 = game.add.sprite(800, 1880, 'enemy01', 'curupira_left01');
			this.enemies.add(this.enemy01);//add to group

			//add animation from atlas
			this.enemy01.animations.add('enemy01_left', ['curupira_left01', 'curupira_left02', 'curupira_left03', 'curupira_left04', 'curupira_left05', 'curupira_left06'], 8, true);
			this.enemy01.animations.add('enemy01_right', ['curupira_right01', 'curupira_right02', 'curupira_right03', 'curupira_right04', 'curupira_right05', 'curupira_right06'], 8, true);
			this.enemy01.animations.add('enemy01_deadleft', ['curupira_deadleft01', 'curupira_deadleft02'], 8, false);
			this.enemy01.animations.add('enemy01_deadright', ['curupira_deadright01', 'curupira_deadright02'], 8, false);

			this.enemy01.anchor.setTo(0.5, 0.5);
			game.physics.arcade.enable(this.enemy01);
			this.enemy01.body.gravity.y = 700;
			this.enemy01.body.collideWorldBounds = true;//make the enemy collide with the borders of the game
			this.enemy01.body.immovable = true;//so the player can't push them

			break;

			case 3:
			break;
		}
	},

	moveEnemy: function(){

		switch (game.global.playLevel) {
			default:
			case 1:

			break;

			case 2:

			if (this.enemy01.position.x  < 401) {
				this.enemy01.animations.play('enemy01_right');
				this.enemy01.body.velocity.x = 100;
			}
			else if (this.enemy01.position.x > 799) {
				this.enemy01.animations.play('enemy01_left');
				this.enemy01.body.velocity.x = -100;
			}

			break;

			case 3:
			break;
		}
	},

	render: function () {
		game.debug.bodyInfo(this.player, 32, 32);
	},

	loadMap: function(){
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

			case 5:
				game.load.image('tileset-1', 'assets/platforms/set-1/tileset-1.png');
				game.load.tilemap('map-5', 'assets/platforms/set-1/map-4aPuzzle.json', null, Phaser.Tilemap.TILED_JSON);
				break;

			case 6:
				game.load.image('tileset-1', 'assets/platforms/set-1/tileset-1.png');
				game.load.tilemap('map-6', 'assets/platforms/set-1/map-4bPuzzle.json', null, Phaser.Tilemap.TILED_JSON);
				break;
		}
		return;
	},

	drawMap: function () {

		//Use global variable "playLevel" to select Level
		switch (game.global.playLevel) {
			default:
			case 1:
				this.sky = game.add.tileSprite(0, 0, game.width, game.height, 'sky');
				this.clouds = game.add.tileSprite(0, 100, game.width, 236, 'cloud');
				this.sea = game.add.tileSprite(0, 250, game.width, 96, 'sea');
				this.map = game.add.tilemap('map-1');
				this.map.addTilesetImage('tileset-1');
				this.layer2 = this.map.createLayer('Tile Layer 2');
				this.layer = this.map.createLayer('Tile Layer 1');
				this.layer.resizeWorld();
				this.layer3 = this.map.createLayer('Tile Layer 3');
				this.map.setCollisionBetween(1, 1159, true, this.layer);
				this.playerBirthPlaceX = 16;
				this.playerBirthPlaceY = 1880;
				this.deadLine = 2100;
				break;

			case 2:
				this.sky = game.add.tileSprite(0, 0, game.width, game.height, 'sky');
				this.clouds = game.add.tileSprite(0, 100, game.width, 236, 'cloud');
				this.sea = game.add.tileSprite(0, 250, game.width, 96, 'sea');
				this.map = game.add.tilemap('map-2');
				this.map.addTilesetImage('tileset-1');
				this.layer2 = this.map.createLayer('Tile Layer 2');
				this.layer = this.map.createLayer('Tile Layer 1');
				this.layer.resizeWorld();
				this.layer3 = this.map.createLayer('Tile Layer 3');
				this.map.setCollisionBetween(1, 1159, true, this.layer);
				this.playerBirthPlaceX = 16;
				this.playerBirthPlaceY = 1880;
				this.deadLine = 2100;
				break;

			case 3:
				this.sky = game.add.tileSprite(0, 0, game.width, game.height, 'sky');
				this.clouds = game.add.tileSprite(0, 100, game.width, 236, 'cloud');
				this.sea = game.add.tileSprite(0, 250, game.width, 96, 'sea');
				this.map = game.add.tilemap('map-3');
				this.map.addTilesetImage('tileset-1');
				this.layer2 = this.map.createLayer('Tile Layer 2');
				this.layer = this.map.createLayer('Tile Layer 1');
				this.layer.resizeWorld();
				this.layer3 = this.map.createLayer('Tile Layer 3');
				this.map.setCollisionBetween(1, 1159, true, this.layer);
				this.playerBirthPlaceX = 16;
				this.playerBirthPlaceY = 1880;
				this.deadLine = 2100;
				break;

			case 4:
				this.sky = game.add.tileSprite(0, 0, game.width, game.height, 'sky_dark');
				this.clouds = game.add.tileSprite(0, 100, game.width, 236, 'cloud_dark');
				this.sea = game.add.tileSprite(0, 250, game.width, 96, 'sea_dark');
				this.map = game.add.tilemap('map-4');
				this.map.addTilesetImage('tileset-1');
				this.layer2 = this.map.createLayer('Tile Layer 2');
				this.layer = this.map.createLayer('Tile Layer 1');
				this.layer.resizeWorld();
				this.layer3 = this.map.createLayer('Tile Layer 3');
				this.map.setCollisionBetween(1, 1159, true, this.layer);
				this.playerBirthPlaceX = 1740;
				this.playerBirthPlaceY = 7965;
				this.deadLine = 15000;
				break;

			case 5:
				this.map = game.add.tilemap('map-5');
				this.map.addTilesetImage('tileset-1');
				this.layer2 = this.map.createLayer('Tile Layer 2');
				this.layer = this.map.createLayer('Tile Layer 1');
				this.layer.resizeWorld();
				this.layer3 = this.map.createLayer('Tile Layer 3');
				this.map.setCollisionBetween(1, 1159, true, this.layer);
				this.playerBirthPlaceX = 1082.67;
				this.playerBirthPlaceY = 1245;
				this.deadLine = 150000;
				break;
			case 6:
				this.map = game.add.tilemap('map-6');
				this.map.addTilesetImage('tileset-1');
				this.layer2 = this.map.createLayer('Tile Layer 2');
				this.layer = this.map.createLayer('Tile Layer 1');
				this.layer.resizeWorld();
				this.layer3 = this.map.createLayer('Tile Layer 3');
				this.map.setCollisionBetween(1, 1159, true, this.layer);
				this.playerBirthPlaceX = 2704;
				this.playerBirthPlaceY = 1533;
				this.deadLine = 15000;
				break;
		}
		//set up some bg image
		this.sky.fixedToCamera = true;
		this.sky.tileScale.set(1.5);
		this.clouds.fixedToCamera = true;
		this.sea.fixedToCamera = true;
		this.sea.tileScale.set(1.1);
		return;
	},
}
