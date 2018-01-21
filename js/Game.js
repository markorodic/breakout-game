var Game = function(canvasId) {
	var canvas = document.getElementById(canvasId)
	var ctx = canvas.getContext("2d");
      var gameSize = { x: canvas.width, y: canvas.height }
      Object.keys(audio).forEach(function(sound) {
        audio[sound] = new Audio(audio[sound])
      })
    this.bodies = {
        bricks: drawToScreen.drawBricks(this),
        player: new Player(this, gameSize),
        ball: new Ball(this, gameSize, { x: 250, y: 450 })
    }
    this.score = 0
    this.life = 3
    var self = this
    function playGame() {
        self.update()
		self.draw(ctx, gameSize, canvas)
        requestAnimationFrame(playGame)
	}
	playGame()
}

Game.prototype = {
	update: function() {
		var ball = this.bodies.ball
		this.bodies.bricks = this.bodies.bricks.filter(function(brick) {
			return !collisionDetection.brickCol(brick, ball)
		})
		this.bodies.player.update()
		ball.update()
	},
	draw: function(ctx, gameSize, canvas) {
		ctx.clearRect(0, 0, gameSize.x, gameSize.y)

        var currentLevel = whichLevel(levels, this.score)
		drawToScreen.drawText(ctx, "Score: ", this.score, 13, 20)
        drawToScreen.drawText(ctx, "Lives: ", this.life, gameSize.x - 47, 20)
        drawToScreen.drawRect(ctx, this.bodies.ball, currentLevel, colours)
        drawToScreen.drawRect(ctx, this.bodies.player, currentLevel, colours)
		for (var i = 0; i < this.bodies.bricks.length; i++) {
            drawToScreen.drawRect(ctx, this.bodies.bricks[i], currentLevel, colours)
		}
		changeLevel(ctx, canvas, colours, currentLevel)
	},
}