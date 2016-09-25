var gameoverState = {
	create: function () {

		var gameoverLabel = game.add.text(game.width / 2, -50, 'Game Over', {
			font: '50px Helvetica',
			fill: '#ffffff'
		});
		gameoverLabel.anchor.setTo(0.5, 0.5);

		var upLabel = game.add.text(game.width / 2, -50, 'Press Up to Try Again', {
			font: '20px Helvetica',
			fill: '#ffffff'
		});
		nameLabel.anchor.setTo(0.5, 0.5);

		var downLabel = game.add.text(game.width / 2, -50, 'Press Down to Go Back to Menu', {
			font: '20px Helvetica',
			fill: '#ffffff'
		});
		nameLabel.anchor.setTo(0.5, 0.5);
	},
	start: function () {
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
