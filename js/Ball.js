var Ball = function(game, gameSize, center) {
		this.game = game
		this.size = { x: 8, y: 8 }
		this.center = center
		this.velocity = startBall
		this.gameSize = gameSize
		this.radius = this.size.x / 2
		this.collisions = collisionDetection
	}

	Ball.prototype = {
		update: function() {
			//ball hits the ceiling
			if(this.center.y < this.radius) {
                audio['paddle'].play()
				this.velocity.y = -this.velocity.y
			}

			//ball hits the walls
			if(this.center.x > this.gameSize.x - this.radius || this.center.x < this.radius) {
                audio['wall'].play()
				this.velocity.x = -this.velocity.x
			}

			//lost a life
			if(this.center.y > this.gameSize.y) {
                audio['lostLife'].play()
				this.game.life -= 1
				this.center = { x: 250, y: 450 }
				this.velocity.x = 0
				this.velocity.y = 0
			}

            //hit paddle
			if (this.collisions.ballHit(this.game, this, this.gameSize)) {
				this.velocity.y = -this.velocity.y
                audio['paddle'].play()
			}

			this.center.x += this.velocity.x
			this.center.y += this.velocity.y

			//checks for hits a brick
			if (this.collisions.brickHit(this.game, this, this.gameSize)) {
                audio['brick'].play()
                this.game.score += 1
				this.velocity.y = -this.velocity.y
			}
		}
	}