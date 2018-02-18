var Ball = function(game, gameSize, center) {
	this.game = game
	this.size = { x: 6, y: 6 }
	this.center = { x: 200, y: 400 }
	this.velocity = { x: 0, y: 0 }
	this.gameSize = gameSize
	this.radius = this.size.x / 2
}

Ball.prototype = {
	update: function() {
		if (collision.betweenBallAndCeiling(this.center.y, this.radius)) {
			this.velocity.y = -this.velocity.y
		}
		if (collision.betweenBallAndWall(this.center, this.radius, this.gameSize)) {
			this.velocity.x = -this.velocity.x
		}
		if (collision.ballHasDropped(this.center.y, this.gameSize.y)) {
			this.game.lives -= 1
			this.center = { x: 200, y: 400 }
			this.velocity = { x: 0, y: 0 }
		}
		if (collision.betweenBallAndPaddle(this.game, this, this.gameSize)) {
			this.velocity.y = -this.velocity.y
		}
		this.center.x += this.velocity.x
		this.center.y += this.velocity.y
		if (collision.betweenBallAndBrick(this.game, this, this.gameSize)) {
            this.game.score += 1
			this.velocity.y = -this.velocity.y
		}
	}
}