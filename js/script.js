(function() {
	var Game = function(canvasId) {
		var canvas = document.getElementById(canvasId)
		var ctx = canvas.getContext("2d");
		var gameSize = { x: canvas.width, y: canvas.height }

		//things that need to be drawn
		// this.bodies = drawBricks(this).concat([new Player(this, gameSize), new Ball(this, gameSize, { x: 150, y: 140 }, { x: 0, y: 0})])

		this.bodies = {
			bricks: drawBricks(this),
			player: new Player(this, gameSize),
			ball: new Ball(this, gameSize, { x: 150, y: 140 }, { x: 0, y: 0})
		}

		var self = this
		function play() {
			self.update()
			self.draw(ctx, gameSize)
		}
		setInterval(play, 10)
	}

	Game.prototype = {
		update: function() {
			// console.log(ball.center.x > )
			var ball = this.bodies.ball
			this.bodies.bricks = this.bodies.bricks.filter(function(brick) {
				return !collision(brick, ball)
			})
			this.bodies.player.update()
			this.bodies.ball.update()
			// hitPaddle(this.bodies.player, this.bodies.ball)
			// colliding()
		},

		draw: function(ctx, gameSize) {
			ctx.clearRect(0, 0, gameSize.x, gameSize.y)
			drawRect(ctx, this.bodies.player)
			drawRect(ctx, this.bodies.ball)
			for (var i = 0; i < this.bodies.bricks.length; i++) {
				drawRect(ctx, this.bodies.bricks[i])
			}
		},
	}

	var Player = function(game, gameSize) {
		this.game = game
		this.size = { x: 30, y: 4 }
		this.center = { x: gameSize.x / 2, y: gameSize.y-2 }
		this.keyboarder = new Keyboarder()
		this.gameSize = gameSize
	}

	//
	Player.prototype = {
		update: function() {
			if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
				this.center.x -= 2
			} else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
				this.center.x += 2
			} else if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
				this.game.bodies.ball.velocity = { x: 1, y: -1 }
			}
		}
	}

	var Ball = function(game, gameSize, center, velocity) {
		this.game = game
		this.size = { x: 4, y: 4 }
		this.center = center
		this.velocity = velocity
		this.gameSize = gameSize
	}

	Ball.prototype = {
		update: function() {
			this.center.x += this.velocity.x
			this.center.y += this.velocity.y

			//ball hits the ceiling
			if(this.center.y < (this.size.x / 2)) {
				// paddleAudio.play()
				this.velocity.y = -this.velocity.y
			}

			//ball hits the walls
			if(this.center.x > this.gameSize.x - (this.size.x / 2) || this.center.x < (this.size.x / 2)) {
				// paddleAudio.play()
				this.velocity.x = -this.velocity.x
			}

			//lost a life
			if(this.center.y > this.gameSize.y) {
				// paddleAudio.play()
				this.center = { x: 150, y: 140 }
				this.velocity = { x: 0, y: 0 }
			}

			//ball hits the paddel
			if (this.center.y == this.gameSize.y - (this.size.x / 2) && hitPaddle(this.game.bodies.player, this.center)) {
				this.velocity.y = -this.velocity.y
			}
			for (var i = 0; i < this.game.bodies.bricks.length; i++) {
				if (collision(this.game.bodies.bricks[i], this)) {
					this.velocity.y = -this.velocity.y
				}
			}
			// for (var i = 0; i < this.game.bricks.length; i++) {
			// 	if (collision(this.game.bricks[i])) {
			// 		console.log("hit")
			// 	}
			// }
			// } else if (x > paddleX && x < paddleX + paddleWidth+5) {
			// 	// var hitPos = Math.round((x - paddleX)/paddleWidth*6)
			// 	wall.play()
			// 	this.velocity.y = -this.velocity.y
			// }
			// 		if (dx > 0) {
			// 			if (hitPos == 1) {
			// 				dx = -dx + 0.5
			// 			} else if (hitPos == 2) {
			// 				dx = -dx + 0.1
			// 			} else if (hitPos == 3) {
			// 				dx = dx - 0.1
			// 			} else {
			// 				dx = dx + 1
			// 			}
			// 		} else {
			// 			if (hitPos == 1) {
			// 				dx = dx -1
			// 			} else if (hitPos == 2) {
			// 				dx = dx - 0.1
			// 			} else if (hitPos == 3) {
			// 				dx = -dx + 0.1
			// 			} else {
			// 				dx = -dx - 0.5
			// 			}
			// 		}
			// 	} else {
			// 		console.log('below', lives)
			// 		if (lives==0) {
			// 			gameOver.play()
			// 			x = canvas.width/2
			// 			y = canvas.height-30
			// 			dx = 0
			// 			dy = 0
			// 			lives -= 1
			// 		} else {
			// 			x = canvas.width/2
			// 			y = canvas.height-30
			// 			dx = 0
			// 			dy = 0
			// 			lives -= 1
			// 		}
			// 	}
			// }

		}
	}

	var Brick = function(game, center) {
		this.game = game
		this.size = { x: 14, y: 7 }
		this.center = center
	}
	//
	Brick.prototype = {
		update: function() {
		}
	}

	var drawBricks = function(game) {
		// var ball = game.bodies[108]
		var bricks = []
		for (var i = 0; i < 108; i++) {
			var x = 10 + (i % 11) * 22
			var y = 20 + (i % 9) * 12
			// if (colliding(x, y, 14, 7, ball)) {
				bricks.push(new Brick(game, { x: x, y: y}))
			// }
		}
		return bricks
	}

	var collision = function(brick, ball) {
		return (ball.center.x > brick.center.x && ball.center.x < brick.center.x + brick.size.x && ball.center.y > brick.center.y && ball.center.y < brick.center.y + brick.size.y)
	}

	// var makeBricks = function(game) {
	// 	var bricks = []
	// 	for(c = 0; c < brickColumnCount; c++) {
	// 		bricks[c] = []
	// 		for(r = 0; r < brickRowCount; r++) {
	// 			bricks[c][r] = { x: 0, y: 0 }
	// 		}
	// 	}
	// }

	// function drawBricks() {
	// 	for(c = 0; c < 21; c++) {
	// 		for(r = 0; r < 9; r++) {
	// 			if(bricks[c][r].status == 1) {
	// 				var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
	// 				var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
	// 				bricks[c][r].x = brickX
	// 	            bricks[c][r].y = brickY
	// 				ctx.beginPath()
	// 				ctx.rect(brickX, brickY, brickWidth, brickHeight)
	// 				if (score >= levelThree) {
	// 					ctx.fillStyle = levelThreeColour
	// 				} else if (score >= levelTwo) {
	// 					ctx.fillStyle = levelTwoColour
	// 				} else {
	// 					ctx.fillStyle = levelOneColour
	// 				}
	// 				ctx.fill()
	// 				ctx.closePath()
	// 			}
	// 		}
	// 	}
	// }


	//does all the drawing
	var drawRect = function(ctx, body) {
		ctx.fillRect(body.center.x - body.size.x / 2,
						body.center.y - body.size.y / 2,
						body.size.x, body.size.y)
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

		this.isDown = function(keyCode) {
			return keyState[keyCode] === true
		}
		this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 }
	}

	function hitPaddle(paddle, ballCenter) {
		if (ballCenter) {
			return ((paddle.center.x - paddle.size.x / 2) < ballCenter.x && ballCenter.x < (paddle.center.x + paddle.size.x / 2))
		}
	}

	// 	for(c = 0; c < brickColumnCount; c++) {
// 		for(r = 0; r < brickRowCount; r++) {
// 			var b = bricks[c][r]
// 			if (b.status == 1) {
// 				if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
// 					dy = -dy
// 					b.status = 0
// 					score++
// 					brickAudio.play()
// 					bricksRemaining -= 1
// 					if (score == levelTwo || score == levelThree) {
// 						levelUp.play()
// 					}

// 					if(score == brickRowCount*brickColumnCount) {
// 						gameOver.play()
// 						level = 3
// 						x = canvas.width/2
// 						y = canvas.height-30
// 						dx = 0
// 						dy = 0
// 						paddleX = (canvas.width-paddleWidth)/2
// 						resetBricks()
// 						score = 0
// 					}
// 				}
// 			}
// 		}
// 	}

	// function collide(ball) {
	// 	if (ball) {

	// 	}
	// }

	window.onload = function() {
		new Game("screen")
	}
})()

//Draw
//-----
//Paddle
//Bricks
//Ball
//Game info

//Logic
//------
//Paddle mechanics
//Collision
//Ball movement
//Keyboard input
//Score and lives
//Audio


// var canvas = document.getElementsByTagName('canvas')[0]
// var gameScreen = document.getElementsByClassName('gameover')[0]
// var ctx = canvas.getContext("2d");

// //set width and height
// canvas.width = window.innerWidth
// canvas.height = window.innerHeight

// levelProperties = {
// 	levelOne: {
// 		objectsColour: '#47bbff',
// 		backgroundColour: ['red', 'pink'],
// 		paddleWidth: 120
// 	},
// 	levelTwo: {
// 		objectsColour: '#ad42ff',
// 		backgroundColour: ['blue', 'teal'],
// 		paddleWidth: 80
// 	},
// 	levelThree: {
// 		objectsColour: '#2ce890',
// 		backgroundColour: ['green', 'lime'],
// 		paddleWidth: 60
// 	}
// }

// function Colourbackground(colourOne, colourTwo) {
// 	var grd = ctx.createLinearGradient(0, 0, canvas.width, 500);
// 	grd.addColorStop(0, colourOne);
// 	grd.addColorStop(1, colourTwo);
// 	ctx.fillStyle = grd
// 	ctx.fillRect(0, 0, canvas.width, canvas.height)
// }

// //start position
// var x = canvas.width/2
// var y = canvas.height-30

// //start ball speed
// var dx = 0
// var dy = 0

// //items dimensions
// var ballRadius = 5
// var paddleHeight = 9
// var paddleWidth = 120
// var paddleX = (canvas.width-paddleWidth)/2

// //initailize controls
// var rightPressed = false
// var leftPressed = false
// var spacePressed = false

// //initialize structure
// var brickRowCount = 9
// var brickColumnCount = 21
// var brickWidth = 30.2
// var brickHeight = 10
// var brickPadding = 3
// var brickOffsetTop = 40
// var brickOffsetLeft = 3
// var bricksRemaining = brickColumnCount * brickRowCount

// //game mechanics initialize
// var score = 0
// var lives = 3
// var level = 0
// // var speed = 2

// //set level level boundaries
// var levelTwo = 1
// var levelThree = 2

// //backgrounds
// var levelTwoBG = '#dff936'
// var levelThreeBG = '#ed3462'

// //initialize audio
// var brickAudio = document.createElement('audio')
// var paddleAudio = document.createElement('audio')
// var musicAudio = document.createElement('audio')
// var gameOver = document.createElement('audio')
// var levelUp = document.createElement('audio')
// var wall = document.createElement('audio')

// //set audio files
// brickAudio.setAttribute('src', 'sounds/paddle3.wav')
// paddleAudio.setAttribute('src', 'sounds/paddle.wav')
// musicAudio.setAttribute('src', 'sounds/bg-music.mp3')
// gameOver.setAttribute('src', 'sounds/game-over.wav')
// levelUp.setAttribute('src', 'sounds/levelup.mp3')
// wall.setAttribute('src', 'sounds/bricks.wav')

// //audio settings
// musicAudio.volume = 0.2
// musicAudio.loop = true

// var bricks = []
// for(c = 0; c < brickColumnCount; c++) {
// 	bricks[c] = []
// 	for(r = 0; r < brickRowCount; r++) {
// 		bricks[c][r] = { x: 0, y: 0, status: 1 }
// 	}
// }

// // function drawMessage() {
// // 	// if (lives < 0) {
// // 		ctx.beginPath()
// // 		ctx.rect(canvas.width/5, canvas.height/5, 4*canvas.width/5-canvas.width/5, 4*canvas.height/5-2.5*canvas.height/5)
// // 		ctx.fillStyle = "rgba(0,0,0, 0.9)"
// // 		ctx.fill()
// // 		ctx.closePath()
// // 		ctx.beginPath()
// // 		ctx.rect(canvas.width/5, canvas.height/5 + 4*canvas.height/5-2.5*canvas.height/5+5, 4*canvas.width/5-canvas.width/5, 70)
// // 		ctx.fillStyle = "rgba(0,0,0, 0.9)"
// // 		ctx.fill()
// // 		ctx.closePath()
// // 		ctx.font = "lighter 40px Georgia"
// // 		ctx.fillStyle = "white"
// // 		ctx.fillText("game over", 255, 230)
// // 		ctx.font = "26px Courier New"
// // 		ctx.fillText("Score: " + score, 305, 330)
// // 		ctx.font = "20px Courier New"
// // 		ctx.fillText("Press spacebar to start again", 187, 443)
// // 	// }
// // }

// function drawLives() {
// 	ctx.font = "16px Arial"
// 	ctx.fillStyle = "black"
// 	ctx.fillText("Lives: " + lives, canvas.width-65, 20)
// }


// time = "0:00"
// time[0]
// setInterval(function() {
// 	time.replace("0", "a")
// })


// function drawTime() {
// 	ctx.font = "16px Arial"
// 	ctx.fillStyle = "black"
// }

// function drawBricks() {
// 	for(c = 0; c < brickColumnCount; c++) {
// 		for(r = 0; r < brickRowCount; r++) {
// 			if(bricks[c][r].status == 1) {
// 				var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
// 				var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
// 				bricks[c][r].x = brickX
// 	            bricks[c][r].y = brickY
// 				ctx.beginPath()
// 				ctx.rect(brickX, brickY, brickWidth, brickHeight)
// 				if (score >= levelThree) {
// 					ctx.fillStyle = levelThreeColour
// 				} else if (score >= levelTwo) {
// 					ctx.fillStyle = levelTwoColour
// 				} else {
// 					ctx.fillStyle = levelOneColour
// 				}
// 				ctx.fill()
// 				ctx.closePath()
// 			}
// 		}
// 	}
// }

// function resetBricks() {
// 	for(c = 0; c < brickColumnCount; c++) {
// 		for(r = 0; r < brickRowCount; r++) {
// 			bricks[c][r].status = 1
// 		}
// 	}
// }

// var count = 0
// function drawPaddle() {
// 	ctx.beginPath()
// 	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
// 	ctx.fill()
// 	ctx.closePath()
// 	ctx.fillStyle = 'red'
// 	// var changeColour = ctx.fillStyle
// 	// if (score >= levelThree) {
// 	// 	changeColour = layThree
// 	// } else if (score >= levelTwo) {
// 	// 	// changeColour = layTwo
// 	// 	paddleWidth = 70
// 	// 	if (count==0) {
// 	// 		var count = 0
// 	// 		// setInterval(function() {
// 	// 		// 	changeColour == layTwo
// 	// 		// })
// 	// 		// var paddleFlicker = setInterval(function() {
// 	// 		// 	(changeColour == layTwo) ? changeColour = Twobg : changeColour = layTwo
// 	// 		// 	if (++count === 10) {
// 	// 		//        window.clearInterval(paddleFlicker);
// 	// 		// 	}
// 	// 		// }, 1000)
// 	// 		count++
// 	// 	}
// 	// } else {
// 	// 	ctx.fillStyle = layOne
// 	// }
// }

// function drawBall() {
// 	ctx.beginPath()
// 	ctx.arc(x, y, ballRadius, 0, Math.PI*2)
// 	if (score >= levelThree) {
// 		ctx.fillStyle = levelThreeColour
// 	} else if (score >= levelTwo) {
// 		ctx.fillStyle = levelTwoColour
// 	} else {
// 		ctx.fillStyle = levelOneColour
// 	}
// 	ctx.fill()
// 	ctx.closePath()
// }

// // function paddler(paddle, paddleColour, bgColour) {
// // 	var count = 0
// // 	var paddleFlicker = setInterval(function() {
// // 		(paddle == paddleColour) ? paddle = bgColour : paddle = paddleColour
// // 		if (++count === 10) {
// // 	       window.clearInterval(paddleFlicker);
// // 		}
// // 	}, 1000)
// // }

// function draw() {
// 	start()
// 	ctx.clearRect(0, 0, canvas.width, canvas.height)
// 	drawBricks()
// 	drawBall()
// 	drawPaddle()
// 	collisionDetection()
// 	drawScore()
// 	drawStart()
// 	drawTime()
// 	drawLives()
// 	x += dx
// 	y += dy
// 	if(y + dy < ballRadius) {
// 		paddleAudio.play()
// 		dy = -dy
// 	} else if (y + dy > canvas.height-ballRadius) {
// 		if (x > paddleX && x < paddleX + paddleWidth+5) {
// 			var hitPos = Math.round((x - paddleX)/paddleWidth*6)
// 			wall.play()
// 			dy = -dy
// 			if (dx > 0) {
// 				if (hitPos == 1) {
// 					dx = -dx + 0.5
// 				} else if (hitPos == 2) {
// 					dx = -dx + 0.1
// 				} else if (hitPos == 3) {
// 					dx = dx - 0.1
// 				} else {
// 					dx = dx + 1
// 				}
// 			} else {
// 				if (hitPos == 1) {
// 					dx = dx -1
// 				} else if (hitPos == 2) {
// 					dx = dx - 0.1
// 				} else if (hitPos == 3) {
// 					dx = -dx + 0.1
// 				} else {
// 					dx = -dx - 0.5
// 				}
// 			}
// 		} else {
// 			console.log('below', lives)
// 			if (lives==0) {
// 				gameOver.play()
// 				x = canvas.width/2
// 				y = canvas.height-30
// 				dx = 0
// 				dy = 0
// 				lives -= 1
// 			} else {
// 				x = canvas.width/2
// 				y = canvas.height-30
// 				dx = 0
// 				dy = 0
// 				lives -= 1
// 			}
// 		}
// 	}
// 	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
// 		paddleAudio.play()
// 		dx = -dx
// 	}
// 	if (rightPressed && paddleX < canvas.width-paddleWidth) {
// 		paddleX += 7
// 	}
// 	else if (leftPressed && paddleX > 0) {
// 		paddleX -= 7
// 	}
// 	if (score == levelTwo) {
// 		canvas.style.backgroundColor = levelTwoBG

// 	}
// 	if (score == levelThree) {
// 		paddleWidth = 50
// 		canvas.style.backgroundColor = levelThreeBG
// 	}
// 	if (lives < 0) {
// 		x = canvas.width/2
// 		y = canvas.height-30
// 		dx = 0
// 		dy = 0
// 		gameScreen.style.visibility = 'visible'
// 	}
// }

// function start() {
// 	if (spacePressed) {
// 		if (lives < 0) {
// 			lives = 3
// 			gameScreen.style.visibility = 'hidden'
// 			document.location.reload()
// 		} else {
// 			dx = 2
// 			dy = -2
// 			musicAudio.volume = 0.3
// 		}
// 		// musicAudio.play()
// 	}
// 	spacePressed = false
// }

// function keyDownHandler(e){
// 	if(e.keyCode == 39) {
// 		rightPressed = true
// 	}
// 	else if(e.keyCode == 37) {
// 		leftPressed = true
// 	}
// 	else if(e.keyCode == 32) {
// 		spacePressed = true
// 	}
// }

// function keyUpHandler(e){
// 	if(e.keyCode == 39) {
// 		rightPressed = false
// 	}
// 	else if(e.keyCode == 37) {
// 		leftPressed = false
// 	}
// }

// function collisionDetection() {
// 	for(c = 0; c < brickColumnCount; c++) {
// 		for(r = 0; r < brickRowCount; r++) {
// 			var b = bricks[c][r]
// 			if (b.status == 1) {
// 				if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
// 					dy = -dy
// 					b.status = 0
// 					score++
// 					brickAudio.play()
// 					bricksRemaining -= 1
// 					if (score == levelTwo || score == levelThree) {
// 						levelUp.play()
// 					}

// 					if(score == brickRowCount*brickColumnCount) {
// 						gameOver.play()
// 						level = 3
// 						x = canvas.width/2
// 						y = canvas.height-30
// 						dx = 0
// 						dy = 0
// 						paddleX = (canvas.width-paddleWidth)/2
// 						resetBricks()
// 						score = 0
// 					}
// 				}
// 			}
// 		}
// 	}
// }

// function drawScore() {
// 	ctx.font = "16px Arial"
// 	ctx.fillStyle = "black"
// 	ctx.fillText("Score: " + score, 8, 20)
// }

// function drawStart() {
// 	ctx.font = "20px Arial"
// 	if (lives < 0) {

// 	} else {
// 		if (dx == 0) {
// 			if (score >= levelThree) {
// 				ctx.fillStyle = levelThreeColour
// 			} else if (score >= levelTwo) {
// 				ctx.fillStyle = levelTwoColour
// 			} else {
// 				ctx.fillStyle = levelOneColour
// 			}
// 			ctx.fillText("PRESS SPACEBAR", 255, 350)
// 		}
// 	}
// }

// document.addEventListener("keydown", keyDownHandler, false)
// document.addEventListener("keyup", keyUpHandler, false)


// start()
// setInterval(draw, 10)

