var Paddle = function(game, gameSize,) {
	this.size = {
        x: 60,
        y: 7
    },
	this.center = {
		x: gameSize.x / 2,
		y: gameSize.y-2
	},
	this.arrowKey = new KeyboardInput()
	this.velocity = 4
	this.gameSize = gameSize
}

Paddle.prototype = {
	update: function(ball) {
		if (this.arrowKey.isDown(this.arrowKey.KEY.LEFT)) {
			if (this.center.x < this.size.x / 2) {
				this.center.x
			} else {
				this.center.x -= this.velocity
			}
		} else if (this.arrowKey.isDown(this.arrowKey.KEY.RIGHT)) {
			if (this.center.x > this.gameSize.x - this.size.x / 2) {
				this.center.x
			} else {
				this.center.x += this.velocity
			}
		} else if (this.arrowKey.isDown(this.arrowKey.KEY.SPACE))
			if (ball.velocity.x == 0){
				ball.velocity = { x: 2, y : 2 }
			}
		}
	}