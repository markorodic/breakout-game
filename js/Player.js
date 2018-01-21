var Player = function(game, gameSize) {
	this.size = { x: 100, y: 10 }
	this.center = { x: gameSize.x / 2, y: gameSize.y-2 }
	this.keyboarder = new Keyboarder()
}

Player.prototype = {
	update: function() {
		if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
			this.center.x -= 4
		} else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
			this.center.x += 4
		} else if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
			//*************************************
			startBall.x = 2
			startBall.y = -2
		}
	}
}