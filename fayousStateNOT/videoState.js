var videoState = {
	
	preload: function(){
		
		game.load.video('video', 'assets/game.mp4');
	},
	
	create: function(){
		this.video = game.add.video('video');
		this.video.addToWorld(game.width/2,game.height/2,0.5,0.5,0.60,0.60);
		this.video.onComplete.add(this.change, this);
		this.video.play(false);//cursor input
		this.cursor = game.input.keyboard.createCursorKeys();
	},
	
	update: function(){
		if (this.cursor.up.isDown) {
			this.video.stop();
			this.change();
		}
	},
	
	change: function(){
		console.log('video done');
		game.state.start('menu');
	},
};