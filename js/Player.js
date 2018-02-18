var Player = function(game, gameSize) {
	this.size = { x: 60, y: 7 },
	this.center = { x: gameSize.x / 2, y: gameSize.y-2 }
	this.keyboarder = new Keyboarder()
	this.gameSize = gameSize
}

Player.prototype = {
	update: function() {
		if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
			if (this.center.x < this.size.x / 2) {
				this.center.x
			} else {
				this.center.x -= 4
			}
		} else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
			if (this.center.x > this.gameSize.x - this.size.x / 2) {
				this.center.x
			} else {
				this.center.x += 4
			}
		} else if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
			//*************************************
			startBall.x = 2
			startBall.y = 2
		}
	}
}