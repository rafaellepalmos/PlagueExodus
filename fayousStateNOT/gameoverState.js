var gameoverState = {
	create: function () {

		var gameoverLabel = game.add.sprite(game.width/2, 100, 'gameoverLabel');
		gameoverLabel.anchor.setTo(0.5, 0.5);

		var tryagainLabel = game.add.button(game.width/2, game.height-150, 'tryagainLabel', this.retryLevel, this);
		tryagainLabel.anchor.setTo(0.5, 0.5);

		var backtomenuLabel = game.add.button(game.width/2, game.height-90, 'backtomenuLabel', this.gotoMenu, this);
		backtomenuLabel.anchor.setTo(0.5, 0.5);
	},

	gotoMenu: function () {
		game.state.start('menu');
	},

	retryLevel: function () {
		game.state.start('play');
	}

}


// just for reference lol ignore this
// 	movePlayer: function() {
// if (this.cursor.left.isDown) {
// 	this.player.body.velocity.x = -200;
// 	this.player.animations.play('left');
// 	}

// else if (this.cursor.right.isDown) {
// 	this.player.body.velocity.x =200;
// 	this.player.animations.play('right');
// 	}

// else {
// 	this.player.body.velocity.x = 0;
// 	this.player.animations.stop();
// 	this.player.frame = 0;
// 	}

// if (this.cursor.up.isDown && this.player.body.touching.down) {
// 	this.player.body.velocity.y = -320;
// 	this.jumpSound.play();
// 	}

// },
