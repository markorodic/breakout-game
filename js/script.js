(function() {
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

    var Brick = function(game, center) {
        this.game = game
        this.size = { x: 20, y: 7 }
        this.center = center
    }

    Brick.prototype = {
        update: function() {

        }
    }

    //control logic
    var Keyboarder = function() {
        var keyState = {}
        window.onkeydown = function(e) {
            keyState[e.keyCode] = true
        }
        window.onkeyup = function(e) {
            keyState[e.keyCode] = false
        }
        console.log('inside')

        this.isDown = function(keyCode) {
            return keyState[keyCode] === true
        }
        this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 }
    }

    //collision logic
    var collisionDetection = {
        ballHit: function(game, ball, gameSize){
            return (ball.center.y == gameSize.y - ball.radius && this.hitPaddle(game.bodies.player, ball.center))
        },
        hitPaddle: function(paddle, ballCenter) {
            return ((paddle.center.x - paddle.size.x / 2) < ballCenter.x && ballCenter.x < (paddle.center.x + paddle.size.x / 2))
        },
        brickHit: function(game, gameSize) {
            for (var i = 0; i < game.bodies.bricks.length; i++) {
                if (this.brickCol(game.bodies.bricks[i], game.bodies.ball)) {
                    return true
                }
            }
        },
        brickCol: function(brick, ball) {
            var startX = brick.center.x - brick.size.x / 2
            var startY = brick.center.y - brick.size.y / 2
            return (ball.center.x > startX && ball.center.x < startX + brick.size.x && ball.center.y > startY && ball.center.y < startY + brick.size.y)
        }
    }

    //drawing logic
    var drawToScreen = {
        drawRect: function (ctx, body, currentLevel, colour) {
            // ctx.fillStyle = colour["level" + currentLevel][0]
            ctx.fillRect(body.center.x - body.size.x / 2,
                body.center.y - body.size.y / 2,
                body.size.x, body.size.y)
        },
        drawText: function(ctx, text, variable, left, top) {
            ctx.fillText(text + variable, left, top)
        },
        drawBricks: function(game) {
            var bricks = []
            for (var i = 0; i < 540; i++) {
                var x = 22 + (i % 20) * 24
                var y = 40 + (i % 27) * 10
                bricks.push(new Brick(game, { x: x, y: y}))
            }
            return bricks
        }
    }

    var startBall = {
        x: 0,
        y: 0
    }

    //audio info
    var audio = {
        paddle: 'sounds/paddle.wav',
        wall: 'sounds/wall.wav',
        brick: 'sounds/bricks.wav',
        levelUp: 'sounds/levelup.mp3',
        lostLife: 'sounds/game-over.wav',
        gameOver: 'sounds/over.wav',
    }

    //level info
    var levels = {
        'One': '0',
        'Two': '100',
        'Three': '200',
        'Four': '300',
        'Five': '400',
    }

    var colours = {
        levelOne: ['black' ,'#eee', 'grey'],
        levelTwo: ['#35f2bf' ,'#ff3456', '#c61f3b'],
        levelThree: ['#dbff3f' ,'#5f3fff', '#4027bc'],
        levelFour: ['#ffb800' ,'#18bff7', '#1193bf'],
        levelFive: ['#c92ded', '#eded2b', '#c6c623']
    }

    var whichLevel = function(levels, score) {
        if (levels['Five'] < score){
            return 'Five'
        } else if (levels['Four'] < score){
            return 'Four'
        } else if (levels['Three'] < score){
            return 'Three'
        } else if (levels['Two'] < score){
            return 'Two'
        } else if (levels['One'] <= score){
            return 'One'
        }
    }

    var changeLevel = function(ctx, canvas, colour, level) {
        var levelNum = "level" + level
        var bg = document.getElementsByTagName('body')
        ctx.fillStyle = colour[levelNum][0]
        canvas.style.bg = colour[levelNum][1]
        if (level !== 'One') {
            audio['levelUp'].play()
        }
    }

	window.onload = function() {
		new Game("screen")
	}
})()