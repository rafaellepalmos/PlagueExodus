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
		//Kill loading label and progressbar when it's done
		this.loadingLabel.kill();
		this.progressBar.kill();
		//create map before create player
		this.drawMap();
		//Player must be place right here
		//this.player = game.add.sprite(16, 1880, 'player', 'male_melee_right01');//change to atlas
		this.player = game.add.sprite(this.playerBirthPlaceX, this.playerBirthPlaceY, 'player', 'male_melee_right01'); //change to atlas
		this.playerImmortal = false;
		//add animation from atlas
		this.player.animations.add('left', ['male_melee_left01', 'male_melee_left02', 'male_melee_left03', 'male_melee_left04', 'male_melee_left05','male_melee_left06', 'male_melee_left07', 'male_melee_left08', 'male_melee_left09'], 8, true);
		this.player.animations.add('right', ['male_melee_right01', 'male_melee_right02', 'male_melee_right03', 'male_melee_right04', 'male_melee_right05', 'male_melee_right06', 'male_melee_right07', 'male_melee_right08', 'male_melee_right09'], 8, true);
		this.player.animations.add('attackleft', ['male_melee_slashleft01', 'male_melee_slashleft02', 'male_melee_slashleft03', 'male_melee_slashleft04', 'male_melee_slashleft05', 'male_melee_slashleft06'], 8, false);
		this.player.animations.add('attackright', ['male_melee_slashright01', 'male_melee_slashright02', 'male_melee_slashright03', 'male_melee_slashright04', 'male_melee_slashright05', 'male_melee_slashright06'], 8, false);
		this.player.animations.add('respawn', ['male_melee_dead05', 'male_melee_dead04', 'male_melee_dead03', 'male_melee_dead02', 'male_melee_dead01', 'male_melee_alive01'], 8, false);

		this.player.anchor.setTo(0.5, 1);
		game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 1000; //used to be 700

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

		//add boss health
		this.bossText = game.add.text(175, 10, "Boss HP: 5000", { font: "18px Arial", fill: "#ffffff"});
		this.bossText.fixedToCamera = true;
		this.bossText.cameraOffset.setTo(175, 10);
		game.global.bossHP = 5000;

		//add story text at the start
//		this.storyText = game.add.text(0, 200, "Earth has drastically changed since the last time you were awake. You need to learn\nto adapt quickly or you might not survive. What? Why are you the only one uninfect-\ned? Oh, did I forget to tell you...\n                              You are the chosen one.\nHaha, no pressure, right? It is no big deal, it\'s just that out of however many bil-\nlion people you were the one gifted with immunity. I cannot explain why, or how, ju-\nst know that there are other humans still alive that are still fighting to survive.\nYou need to save them. How? Get to the next level. Press spacebar to begin!", { font: "10px Courier New", fill: "#ffffff"});
//		this.storyText.fixedToCamera = true;
//		this.storyText.cameraOffset.setTo(0, 200);

		//add score
		this.scoreText = game.add.text(325, 10, "Nonth\'s Brain: 0", { font: "18px Arial", fill: "#ffffff"});
		this.scoreText.fixedToCamera = true;
		this.scoreText.cameraOffset.setTo(325, 10);
		game.global.score = 0;

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

		//attack timers
		this.bossAttack = game.time.now;//intervals between boss attacks
		this.playerAttack = game.time.now;//intervals between player attacks

		//audio effect
		this.hit_1_Sound = game.add.audio('hit_1');
		this.enemy_hit_1_Sound = game.add.audio('enemy_hit_1');
		this.lightningSound = game.add.audio('lightning');
		this.treasureSound = game.add.audio('treasure_opening');

		if (!game.device.desktop) {
			// Create an empty label to write the error message if needed
			this.rotateLabel = game.add.text(game.width/2, game.height/2, '',
			{ font: '30px Arial', fill: '#fff', backgroundColor: '#000' });
			this.rotateLabel.anchor.setTo(0.5, 0.5);
			// Call 'orientationChange' when the device is rotated
			game.scale.onOrientationChange.add(this.orientationChange, this);
			// Call the function at least once
			this.orientationChange();

			//add mobile buttons
			this.addMobileInputs();
		}
	},

	update: function () {
		//Set player collides with layer 1 of tilemap
		game.physics.arcade.collide(this.player, this.layer);
		game.physics.arcade.collide(this.player, this.boss);
		game.physics.arcade.collide(this.enemies, this.layer);

		//check for boss distance
		if (this.boss != null) {
			game.global.bossdist = this.boss.position.x - this.player.position.x;
		}

		//Call movePlayer function
		this.movePlayer();

		//to keep the enemies moving
		this.moveEnemy();

		//player collides with enemies
		game.physics.arcade.overlap(this.player, this.enemies, this.playerDamaged, null, this);

		//player collides with portals
		game.physics.arcade.overlap(this.player, this.portals, this.portalEntering, null, this);

		//player collides with chests
		game.physics.arcade.overlap(this.player, this.chests, this.chestOpening, null, this);

		//Set parallex backgrounds
		this.clouds.tilePosition.set(this.clouds.x * -0.1, 0);
		this.sea.tilePosition.set(this.sea.x * -0.15, 0);

		if (!this.player.inWorld || this.player.y > this.deadLine) {
			console.log("player fell out of bounds");
			game.global.playerhp = 0;
			this.playerDie();
			game.global.lastkey = 'dead';
		}

	},

	movePlayer: function () {
		if (game.input.totalActivePointers == 0) {
			// Make sure the player is not moving
			this.moveLeft = false;
			this.moveRight = false;
			this.jump = false;
			this.attack = false;
			this.interact = false;
		}

		//if player is clicking attack key
		if (this.input.keyboard.isDown(Phaser.Keyboard.ONE) || this.attack) {
			game.global.lastkey = 'ONE';
			console.log("attacking"); //to debug
			this.hit_1_Sound.play();
			//check if player is facing left
			if (game.global.lastdir == 'left') {
				this.player.animations.play('attackleft'); //attack facing left
				this.player.animations.currentAnim.onComplete.add(function () {
					game.global.lastkey = 'LEFT';
				}, this); //idle right after animation finishes
			}
			//check if player is facing right
			else if ((this.playerAttack < game.time.now)&&(game.global.lastdir == 'right')) {
				this.player.animations.play('attackright');//attack facing right
				this.player.animations.currentAnim.onComplete.add(function () {game.global.lastkey = 'RIGHT';}, this);//idle right after animation finishes

				switch (game.global.playLevel) {
					default:
					case 1:

					//attacking boss
					if ((this.boss.alive)&&(this.playerAttack < game.time.now)&&(game.global.bossdist<100)) {

						if (game.global.bossHP == 1000) {
							this.boss.kill();
							game.global.score += 5000;
							this.scoreText.text = 'Nonth\'s Brain: ' + game.global.score;
						}

						game.global.bossHP -= 1000;
						this.bossText.text = 'Boss HP: ' + game.global.bossHP;

						//add emitter for hurting boss
						game.time.events.add(Phaser.Timer.SECOND * .25, function(){
							// Set the position of the emitter
							this.emitter.x = this.boss.x;
							this.emitter.y = this.boss.y;
							this.emitter.start(true, 800, null, 20);// Start the emitter by exploding 15 particles that will live 800ms
						}, this);
					}
					//attacking enemy01
					var e1 = this.enemy01.position.x - this.player.position.x;
					if ((e1 < 100)&&(this.enemy01.alive)) {
						game.time.events.add(Phaser.Timer.SECOND * .25, function(){
							this.enemy01.kill();
							game.global.score += 1000;
							this.scoreText.text = 'Nonth\'s Brain: ' + game.global.score;
							// Set the position of the emitter
							this.emitter.x = this.enemy01.x;
							this.emitter.y = this.enemy01.y;
							this.emitter.start(true, 800, null, 15);// Start the emitter by exploding 15 particles that will live 800ms
						}, this);
					}
					//attacking enemy02
					var e2 = this.enemy02.position.x - this.player.position.x;
					if ((e2 < 200)&&(this.enemy02.alive)) {
						console.log('banshee close');
						game.time.events.add(Phaser.Timer.SECOND * .25, function(){
							this.enemy02.kill();
							game.global.score += 1000;
							this.scoreText.text = 'Nonth\'s Brain: ' + game.global.score;
							// Set the position of the emitter
							this.emitter.x = this.enemy02.x;
							this.emitter.y = this.enemy02.y;
							this.emitter.start(true, 800, null, 15);// Start the emitter by exploding 15 particles that will live 800ms
						}, this);
					}

					break;

					case 2:
					var e1 = this.enemy01.position.x - this.player.position.x;
					if ((e1 < 100)&&(this.enemy01.alive)) {
						game.time.events.add(Phaser.Timer.SECOND * .25, function(){
							this.enemy01.kill();
							game.global.score += 5000;
							this.scoreText.text = 'Nonth\'s Brain: ' + game.global.score;
							// Set the position of the emitter
							this.emitter.x = this.enemy01.x;
							this.emitter.y = this.enemy01.y;
							this.emitter.start(true, 800, null, 15);// Start the emitter by exploding 15 particles that will live 800ms
						}, this);
					}
					break;

					case 3:
					break;

					case 4:
					//wolfie
					var e1 = this.enemy01.position.x - this.player.position.x;
					if ((e1 < 100)&&(this.enemy01.alive)) {
						game.time.events.add(Phaser.Timer.SECOND * .25, function(){
							this.enemy01.kill();
							game.global.score += 1111;
							this.scoreText.text = 'Nonth\'s Brain: ' + game.global.score;
							// Set the position of the emitter
							this.emitter.x = this.enemy01.x;
							this.emitter.y = this.enemy01.y;
							this.emitter.start(true, 800, null, 15);// Start the emitter by exploding 15 particles that will live 800ms
						}, this);
					}

					break;

					case 5:
					break;

					case 6:
					break;
				}

				this.playerAttack = game.time.now + 1000;//next attack will be in 1 second
			}
			//default: do nothing
			else {
				return;
			}
		}
		//else if player is pressing 2
		else if (this.input.keyboard.isDown(Phaser.Keyboard.TWO) || this.interact) {
			console.log("interacting"); //to debug
		}
		//else if player is pressing left
		else if (this.cursor.left.isDown || this.moveLeft) {
			console.log("going left"); //to debug
			game.global.lastdir = 'left'; //last direction player was facing
			this.player.body.velocity.x = -200;
			this.player.animations.play('left'); //left animation
			game.global.lastkey = 'LEFT';
		}
		//else if player is pressing right
		else if (this.cursor.right.isDown || this.moveRight) {
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
		if ((this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.jump) && this.player.body.onFloor()) {
			this.player.body.velocity.y = -500;
//			this.storyText.text = "";
		}
	},

//	heartReduce: function() {
//		game.global.playerhp -= 1;
//		if (game.global.playerhp > 0){
//			console.log("Health: " + game.global.playerhp);
//			this.health.frameName = 'health' + game.global.playerhp;
//			game.camera.shake(0.01, 200);
//		}
//		else {
//			this.playerDie();
//		}
//	},

	playerDamaged: function() {
		if(this.playerImmortal == false) {
			this.enemy_hit_1_Sound.play();
			this.blinkTimmer = game.time.events.loop(Phaser.Timer.SECOND/5, this.playerBlink, this);
			game.time.events.add(Phaser.Timer.SECOND*3, this.playerStopBlink, this);
			this.playerImmortal = true;
			game.global.playerhp -= 1;
			if (game.global.playerhp > 0){
				console.log("Health: " + game.global.playerhp);
				this.health.frameName = 'health' + game.global.playerhp;
			}
			else {
				this.playerDie();
			}
		}
	},

	playerBlink: function(option) {
		if(this.player.alpha == 1) {
			this.player.alpha = 0.5;
		} else {
			this.player.alpha = 1;
		}
	},

	playerStopBlink: function(option) {
		game.time.events.remove(this.blinkTimmer);
		this.playerImmortal = false;
		this.player.alpha = 1;
	},

	playerDie: function() {
		this.bgMusic.stop();
		game.state.start('gameover');
//		this.playerRespawn();
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

	chestOpening: function(player, chest) {
		if (this.input.keyboard.isDown(Phaser.Keyboard.TWO) || this.interact) {
			if(chest.isOpened == false) {
				chest.animations.play('open');
				this.treasureSound.play();
				chest.isOpened = true;
				game.global.score += chest.getScore;
				this.scoreText.text = 'Nonth\'s Brain: ' + game.global.score;
			}
		}
	},

	portalEntering: function(player, portal) {
		if (this.input.keyboard.isDown(Phaser.Keyboard.TWO) || this.interact) {
			if(portal.gotoLevel > 0 && portal.gotoLevel <= 6) {
				this.changeLevel(portal.gotoLevel);
			}
			else if (portal.gotoLevel > 6){
				this.bgMusic.stop();
				game.state.start('end');
			}
		}
	},

	changeLevel: function(level) {
		game.global.playLevel = level;
		this.bgMusic.stop();
		game.state.start('play');
	},

	addEnemy: function() {
		this.enemies = game.add.group();

		switch (game.global.playLevel) {
			default:
			case 1:

			//add enemy01
			this.enemy01 = game.add.sprite(800, 1741, 'woodie', 'Woodie_left_01');
			this.enemies.add(this.enemy01);//add to group
			//add animation from atlas
			this.enemy01.animations.add('enemy01_left', ['Woodie_left_01', 'Woodie_left_02', 'Woodie_left_03', 'Woodie_left_04', 'Woodie_left_05', 'Woodie_left_06'], 8, true);
			this.enemy01.animations.add('enemy01_right', ['Woodie_right_01', 'Woodie_right_02', 'Woodie_right_03', 'Woodie_right_04', 'Woodie_right_05', 'Woodie_right_06'], 8, true);
			//add physics
			this.enemy01.anchor.setTo(0.5, 0.5);
			game.physics.arcade.enable(this.enemy01);
			this.enemy01.body.gravity.y = 700;
			this.enemy01.body.collideWorldBounds = true;//make the enemy collide with the borders of the game
			this.enemy01.body.immovable = true;//so the player can't push them

			//add enemy02
			this.enemy02 = game.add.sprite(5570, 1500, 'banshee', 'banshee_left_01');
			this.enemies.add(this.enemy02);//add to group
			//add animation from atlas
			this.enemy02.animations.add('enemy02_left', ['banshee_left_01', 'banshee_left_02', 'banshee_left_03', 'banshee_left_04', 'banshee_left_05', 'banshee_left_06'], 8, true);
			this.enemy02.animations.add('enemy02_right', ['banshee_right_01', 'banshee_right_02', 'banshee_right_03', 'banshee_right_04', 'banshee_right_05', 'banshee_right_06'], 8, true);
			//add physics
			this.enemy02.anchor.setTo(0.5, 0.5);
			game.physics.arcade.enable(this.enemy02);
			this.enemy02.body.gravity.y = 700;
			this.enemy02.body.collideWorldBounds = true;//make the enemy collide with the borders of the game
			this.enemy02.body.immovable = true;//so the player can't push them
			this.enemy02.scale.setTo(0.7, 0.7);

			//add boss
			this.boss = game.add.sprite(6620, 1491, 'boss', 'pope_normal_idle_left_01');
			this.boss.anchor.setTo(0.5, 0.5);
			game.physics.arcade.enable(this.boss);
			this.boss.body.immovable = true;//so the player can't push them
			this.boss.scale.setTo(0.7, 0.7);

			//add boss animation
			this.boss.animations.add('atk', ['pope_normal_attack_left_01', 'pope_normal_attack_left_02', 'pope_normal_attack_left_03', 'pope_normal_attack_left_04', 'pope_normal_attack_left_05', 'pope_normal_attack_left_06', 'pope_normal_attack_left_07', 'pope_normal_attack_left_08'], 8, false);
			this.boss.animations.add('idle', ['pope_normal_idle_left_01', 'pope_normal_idle_left_02', 'pope_normal_idle_left_03', 'pope_normal_idle_left_04', 'pope_normal_idle_left_05', 'pope_normal_idle_left_06'], 8, true);

			//add lightning
			this.lightning = game.add.sprite(this.player.position.x-10, this.player.position.y-90, 'lightning', 'lightning_01');
			this.lightning.anchor.setTo(0.5, 0.5);
			this.lightning.kill();

			//add lightning animation
			this.lightning.animations.add('lightning', ['lightning_01', 'lightning_02', 'lightning_03', 'lightning_04'], 8, false);
			break;

			case 2:

			//add enemy
			this.enemy01 = game.add.sprite(800, 1880, 'curupira', 'curupira_left01');
			this.enemies.add(this.enemy01);//add to group

			//add animation from atlas
			this.enemy01.animations.add('enemy01_left', ['curupira_left01', 'curupira_left02', 'curupira_left03', 'curupira_left04', 'curupira_left05', 'curupira_left06'], 8, true);
			this.enemy01.animations.add('enemy01_right', ['curupira_right01', 'curupira_right02', 'curupira_right03', 'curupira_right04', 'curupira_right05', 'curupira_right06'], 8, true);

			this.enemy01.anchor.setTo(0.5, 0.5);
			game.physics.arcade.enable(this.enemy01);
			this.enemy01.body.gravity.y = 700;
			this.enemy01.body.collideWorldBounds = true;//make the enemy collide with the borders of the game
			this.enemy01.body.immovable = true;//so the player can't push them

			break;

			case 3:
			break;

			case 4:
			//wolfie enemy
			this.enemy01 = game.add.sprite(2092, 9708, 'wolfie', 'wolf_left_01');
			this.enemies.add(this.enemy01);//add to group
			//add animation from atlas
			this.enemy01.animations.add('enemy01_left', ['wolf_left_01', 'wolf_left_02', 'wolf_left_03', 'wolf_left_04'], 8, true);
			this.enemy01.animations.add('enemy01_right', ['wolf_right_01', 'wolf_right_02', 'wolf_right_03', 'wolf_right_04'], 8, true);
			//add physics
			this.enemy01.anchor.setTo(0.5, 0.5);
			game.physics.arcade.enable(this.enemy01);
			this.enemy01.body.gravity.y = 700;
			this.enemy01.body.collideWorldBounds = true;//make the enemy collide with the borders of the game
			this.enemy01.body.immovable = true;//so the player can't push them

			break;

			case 5:
			break;

			case 6:
			break;
		}
	},

	moveEnemy: function(){

		switch (game.global.playLevel) {
			default:
			case 1:

			//move enemy01
			if (this.enemy01.position.x  < 601) {
				this.enemy01.animations.play('enemy01_right');
				this.enemy01.body.velocity.x = 100;
			}
			else if (this.enemy01.position.x > 799) {
				this.enemy01.animations.play('enemy01_left');
				this.enemy01.body.velocity.x = -100;
			}

			//move enemy02
			if (this.enemy02.position.x  < 5571) {
				this.enemy02.animations.play('enemy02_right');
				this.enemy02.body.velocity.x = 100;
			}
			else if (this.enemy02.position.x > 5829) {
				this.enemy02.animations.play('enemy02_left');
				this.enemy02.body.velocity.x = -100;
			}

			//if it has been more than 5 secs since last attack and player is less than 300 units from boss
			if ((this.boss.alive)&&(this.bossAttack < game.time.now)&&(game.global.bossdist<300)) {
				this.boss.animations.play('atk');//play boss attack animation

				//add a delay to playing lightning animation
				game.time.events.add(Phaser.Timer.SECOND * 1, function(){
					this.lightning.reset(this.player.position.x-10, this.player.position.y-90)//spawn lightning at the player position
					this.lightning.animations.play('lightning');//play lightning animation
					this.playerDamaged();//hurt the player
					this.lightningSound.play();
				}, this);

				//when animation is done, do this:
				this.lightning.animations.currentAnim.onComplete.add(function () {
					//add a small delay before going idle mode
					game.time.events.add(Phaser.Timer.SECOND * .25, function(){
						this.lightning.kill();//remove the lightning on the player
						this.boss.animations.play('idle');//play idle animation on boss
						}, this);
					}, this);

				this.bossAttack = game.time.now + 5000;//next attack will be in 5 seconds
			}
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

			case 4:

			if (this.enemy01.position.x  < 2092) {
				this.enemy01.animations.play('enemy01_right');
				this.enemy01.body.velocity.x = 100;
			}
			else if (this.enemy01.position.x > 2655) {
				this.enemy01.animations.play('enemy01_left');
				this.enemy01.body.velocity.x = -100;
			}

			break;

			case 5:
			break;

			case 6:
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
				game.load.tilemap('map-4', 'assets/platforms/set-1/Level4Puzzle.json', null, Phaser.Tilemap.TILED_JSON);
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

		this.portals = game.add.group();
		this.chests = game.add.group();

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
//				this.playerBirthPlaceX = 6479; // Latte tests the chest at the end of the map
//				this.playerBirthPlaceY = 1469;
				this.deadLine = 2100;
				//adding chests
				this.chest01 = game.add.sprite(976, 1790, 'purple_chest', 'purple_chest_01');
				this.chests.add(this.chest01);
				this.chest01.animations.add('open', ['purple_chest_02', 'purple_chest_03', 'purple_chest_04'], 8, false);
				this.chest01.anchor.setTo(0.5, 1);
				this.chest01.isOpened = false;
				this.chest01.getScore = 1000;
				this.chest02 = game.add.sprite(2283, 1599, 'purple_chest', 'purple_chest_01');
				this.chests.add(this.chest02);
				this.chest02.animations.add('open', ['purple_chest_02', 'purple_chest_03', 'purple_chest_04'], 8, false);
				this.chest02.anchor.setTo(0.5, 1);
				this.chest02.isOpened = false;
				this.chest02.getScore = 1000;
				//adding portal
				this.portal01 = game.add.sprite(7135, 1475, 'portal', 'portal_01');
				this.portals.add(this.portal01);
				this.portal01.animations.add('loop', ['portal_01', 'portal_02', 'portal_03', 'portal_04'], 8, true);
				this.portal01.animations.play('loop');
				this.portal01.anchor.setTo(0.5, 0.5);
				this.portal01.gotoLevel = 2;
				//adding music
				this.bgMusic = game.add.audio('Level_1');
				this.bgMusic.loop = true;
				this.bgMusic.play();
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
//				this.playerBirthPlaceX = 7812;	//Latte uses these to test portal
//				this.playerBirthPlaceY = 989;
				this.deadLine = 2100;
				this.bgMusic = game.add.audio('Level_1');
				this.bgMusic.loop = true;
				this.bgMusic.play();
				//adding portal
				this.portal01 = game.add.sprite(7825, 995, 'portal', 'portal_01');
				this.portals.add(this.portal01);
				this.portal01.animations.add('loop', ['portal_01', 'portal_02', 'portal_03', 'portal_04'], 8, true);
				this.portal01.animations.play('loop');
				this.portal01.anchor.setTo(0.5, 0.5);
				this.portal01.gotoLevel = 3;
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
//				this.playerBirthPlaceX = 5514;	////Latte uses these to test portal
//				this.playerBirthPlaceY = 1229;
				this.deadLine = 2100;
				this.bgMusic = game.add.audio('Level_1');
				this.bgMusic.loop = true;
				this.bgMusic.play();
				//adding portal
				this.portal01 = game.add.sprite(5535, 1235, 'portal', 'portal_01');
				this.portals.add(this.portal01);
				this.portal01.animations.add('loop', ['portal_01', 'portal_02', 'portal_03', 'portal_04'], 8, true);
				this.portal01.animations.play('loop');
				this.portal01.anchor.setTo(0.5, 0.5);
				this.portal01.gotoLevel = 4;
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
//				this.playerBirthPlaceX = 1192; //testing
//				this.playerBirthPlaceY = 10269;
				this.deadLine = 12000;
				this.bgMusic = game.add.audio('Level_4');
				this.bgMusic.loop = true;
				this.bgMusic.play();
				//adding portal
				this.portal01 = game.add.sprite(2381, 7270, 'portal', 'portal_01');
				this.portals.add(this.portal01);
				this.portal01.animations.add('loop', ['portal_01', 'portal_02', 'portal_03', 'portal_04'], 8, true);
				this.portal01.animations.play('loop');
				this.portal01.anchor.setTo(0.5, 0.5);
				this.portal01.gotoLevel = 5;
				this.portal02 = game.add.sprite(1200, 10275, 'portal', 'portal_01');
				this.portals.add(this.portal02);
				this.portal02.animations.add('loop', ['portal_01', 'portal_02', 'portal_03', 'portal_04'], 8, true);
				this.portal02.animations.play('loop');
				this.portal02.anchor.setTo(0.5, 0.5);
				this.portal02.gotoLevel = 6;
				break;

			case 5:
				this.sky = game.add.tileSprite(0, 0, game.width, game.height, 'sky_dark');
				this.clouds = game.add.tileSprite(0, 100, game.width, 236, 'cloud_dark');
				this.sea = game.add.tileSprite(0, 250, game.width, 96, 'sea_dark');
				this.map = game.add.tilemap('map-5');
				this.map.addTilesetImage('tileset-1');
				this.layer2 = this.map.createLayer('Tile Layer 2');
				this.layer = this.map.createLayer('Tile Layer 1');
				this.layer.resizeWorld();
				this.layer3 = this.map.createLayer('Tile Layer 3');
				this.map.setCollisionBetween(1, 1159, true, this.layer);
				this.playerBirthPlaceX = 1082.67;
				this.playerBirthPlaceY = 1245;
//				this.playerBirthPlaceX = 2914;
//				this.playerBirthPlaceY = 3053;
				this.deadLine = 150000;
				this.bgMusic = game.add.audio('Level_5');
				this.bgMusic.loop = true;
				this.bgMusic.play();
				//add portals
//				this.portal01 = game.add.sprite(1102, 1250, 'portal', 'portal_01');
//				this.portals.add(this.portal01);
//				this.portal01.animations.add('loop', ['portal_01', 'portal_02', 'portal_03', 'portal_04'], 8, true);
//				this.portal01.animations.play('loop');
//				this.portal01.anchor.setTo(0.5, 0.5);
				this.portal02 = game.add.sprite(3008, 3060, 'portal', 'portal_01');
				this.portals.add(this.portal02);
				this.portal02.animations.add('loop', ['portal_01', 'portal_02', 'portal_03', 'portal_04'], 8, true);
				this.portal02.animations.play('loop');
				this.portal02.anchor.setTo(0.5, 0.5);
				this.portal02.gotoLevel = 4;
				break;

			case 6:
				this.sky = game.add.tileSprite(0, 0, game.width, game.height, 'sky_dark');
				this.clouds = game.add.tileSprite(0, 100, game.width, 236, 'cloud_dark');
				this.sea = game.add.tileSprite(0, 250, game.width, 96, 'sea_dark');
				this.map = game.add.tilemap('map-6');
				this.map.addTilesetImage('tileset-1');
				this.layer2 = this.map.createLayer('Tile Layer 2');
				this.layer = this.map.createLayer('Tile Layer 1');
				this.layer.resizeWorld();
				this.layer3 = this.map.createLayer('Tile Layer 3');
				this.map.setCollisionBetween(1, 1159, true, this.layer);
				this.playerBirthPlaceX = 2704;
				this.playerBirthPlaceY = 1533;
//				this.playerBirthPlaceX = 2338;
//				this.playerBirthPlaceY = 1517;
				this.deadLine = 3000;
				this.bgMusic = game.add.audio('Level_5');
				this.bgMusic.loop = true;
				this.bgMusic.play();
				this.portal01 = game.add.sprite(2348, 1519, 'portal', 'portal_01');
				this.portals.add(this.portal01);
				this.portal01.animations.add('loop', ['portal_01', 'portal_02', 'portal_03', 'portal_04'], 8, true);
				this.portal01.animations.play('loop');
				this.portal01.anchor.setTo(0.5, 0.5);
				this.portal01.gotoLevel = 7;
				break;
		}
		//show portals at front, add physics
		game.world.bringToTop(this.portals);
		game.physics.arcade.enable(this.portals);
		//show chests at front, add physics
		game.world.bringToTop(this.chests);
		game.physics.arcade.enable(this.chests);
		//set up some bg image
		this.sky.fixedToCamera = true;
		this.sky.tileScale.set(1.5);
		this.clouds.fixedToCamera = true;
		this.sea.fixedToCamera = true;
		this.sea.tileScale.set(1.1);
		return;
	},

	orientationChange: function() {
		// If the game is in portrait (wrong orientation)
		if (game.scale.isPortrait) {
			// Pause the game and add a text explanation
			console.log('game paused');
			game.paused = true;
			this.rotateLabel.text = 'rotate your device in landscape';
		}
		// If the game is in landscape (good orientation)
		else {
			// Resume the game and remove the text
			console.log('game resumed');
			game.paused = false;
			this.rotateLabel.text = '';
		}
	},

	addMobileInputs: function() {
		// Movement variables
		this.moveLeft = false;
		this.moveRight = false;
		this.jump = false;
		this.attack = false;
		this.interact = false;

		// Add the jump button
		this.jumpButton = game.add.sprite(370, 1900, 'upButton');
		this.jumpButton.anchor.setTo(0.5, 0.5);//set anchor to mid
		this.jumpButton.fixedToCamera = true;//fix it to camera
		this.jumpButton.cameraOffset.setTo(370, 300);//set the location of button in relation to the camera
		this.jumpButton.inputEnabled = true;
		this.jumpButton.alpha = 0.5;
		this.jumpButton.events.onInputDown.add(this.setJumpTrue, this);
		this.jumpButton.events.onInputUp.add(this.setJumpFalse, this);

		// Add the move left button
		this.leftButton = game.add.sprite(50, 300, 'leftButton');
		this.leftButton.anchor.setTo(0.5, 0.5);//set anchor to mid
		this.leftButton.fixedToCamera = true;//fix it to camera
		this.leftButton.cameraOffset.setTo(50, 300);//set the location of button in relation to the camera
		this.leftButton.inputEnabled = true;
		this.leftButton.alpha = 0.5;
		this.leftButton.events.onInputOver.add(this.setLeftTrue, this);
		this.leftButton.events.onInputOut.add(this.setLeftFalse, this);
		this.leftButton.events.onInputDown.add(this.setLeftTrue, this);
		this.leftButton.events.onInputUp.add(this.setLeftFalse, this);

		// Add the move right button
		this.rightButton = game.add.sprite(130, 300, 'rightButton');
		this.rightButton.anchor.setTo(0.5, 0.5);//set anchor to mid
		this.rightButton.fixedToCamera = true;//fix it to camera
		this.rightButton.cameraOffset.setTo(130, 300);//set the location of button in relation to the camera
		this.rightButton.inputEnabled = true;
		this.rightButton.alpha = 0.5;
		this.rightButton.events.onInputOver.add(this.setRightTrue, this);
		this.rightButton.events.onInputOut.add(this.setRightFalse, this);
		this.rightButton.events.onInputDown.add(this.setRightTrue, this);
		this.rightButton.events.onInputUp.add(this.setRightFalse, this);

		// Add the attack button
		this.attackButton = game.add.sprite(450, 300, 'aButton');
		this.attackButton.anchor.setTo(0.5, 0.5);//set anchor to mid
		this.attackButton.fixedToCamera = true;//fix it to camera
		this.attackButton.cameraOffset.setTo(450, 300);//set the location of button in relation to the camera
		this.attackButton.inputEnabled = true;
		this.attackButton.alpha = 0.5;
		this.attackButton.events.onInputDown.add(this.setAttackTrue, this);
		this.attackButton.events.onInputUp.add(this.setAttackFalse, this);

		// Add the interact button
		this.interactButton = game.add.sprite(450, 225, 'bButton');
		this.interactButton.anchor.setTo(0.5, 0.5);//set anchor to mid
		this.interactButton.fixedToCamera = true;//fix it to camera
		this.interactButton.cameraOffset.setTo(450, 225);//set the location of button in relation to the camera
		this.interactButton.inputEnabled = true;
		this.interactButton.alpha = 0.5;
		this.interactButton.events.onInputDown.add(this.setInteractTrue, this);
		this.interactButton.events.onInputUp.add(this.setInteractFalse, this);
		console.log('create buttons');
	},

	setLeftTrue: function() {
		this.moveLeft = true;
	},
	setLeftFalse: function() {
		this.moveLeft = false;
	},
	setRightTrue: function() {
		this.moveRight = true;
	},
	setRightFalse: function() {
		this.moveRight = false;
	},
	setJumpTrue: function() {
		this.jump = true;
	},
	setJumpFalse: function() {
		this.jump = false;
	},
	setAttackTrue: function() {
		this.attack = true;
	},
	setAttackFalse: function() {
		this.attack = false;
	},
	setInteractTrue: function() {
		this.interact = true;
	},
	setInteractFalse: function() {
		this.interact = false;
	},
}
