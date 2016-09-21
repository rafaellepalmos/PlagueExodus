var PlagueExodus = new Phaser.Game(500, 340, Phaser.AUTO, 'plagueexodusDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('gameover', gameoverState);

game.state.start('boot');