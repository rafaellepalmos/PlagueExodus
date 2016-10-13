var game = new Phaser.Game(500, 340);

game.global = {
	//Globol variable
	playLevel: 4
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('video', videoState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('gameover', gameoverState);

game.state.start('boot');
