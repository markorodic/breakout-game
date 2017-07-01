var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2
var y = canvas.height-30
var dx = 0
var dy = 0
var ballRadius = 7
var paddleHeight = 9
var paddleWidth = 150
var paddleX = (canvas.width-paddleWidth)/2
var rightPressed = false
var leftPressed = false
var spacePressed = false
var level = 0
var speed = 2

var brickRowCount = 10
var brickColumnCount = 20
var brickWidth = 30
var brickHeight = 10
var brickPadding = 3
var brickOffsetTop = 40
var brickOffsetLeft = 23
var bricksRemaining = brickColumnCount * brickRowCount

var score = 0
var lives = 3

var levelOneColour = 'black'
var levelOneBG = '#1c69ad'
var levelThreeColour = 'red'
var levelThreeBG = '#ce3779'
var levelTwoColour = 'blue'
var levelTwoBG = '#277bc6'

var brickAudio = document.createElement('audio')
var paddleAudio = document.createElement('audio')
var musicAudio = document.createElement('audio')
var gameOver = document.createElement('audio')
var levelUp = document.createElement('audio')
var wall = document.createElement('audio')
musicAudio.volume = 0.2
musicAudio.loop = true
brickAudio.setAttribute('src', 'sounds/paddle3.wav')
paddleAudio.setAttribute('src', 'sounds/paddle.wav')
musicAudio.setAttribute('src', 'sounds/bg-music.mp3')
gameOver.setAttribute('src', 'sounds/game-over.wav')
levelUp.setAttribute('src', 'sounds/levelup.mp3')
wall.setAttribute('src', 'sounds/bricks.wav')

var bricks = []
for(c = 0; c < brickColumnCount; c++) {
	bricks[c] = []
	for(r = 0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 }
	}
}

// function drawMessage() {
// 	ctx.beginPath()
// 	ctx.rect(0, 0, canvas.width, canvas.height)
// 	ctx.fillStyle = "rgba(255,255,255, 0.9)"
// 	ctx.fill()
// 	ctx.closePath()
// 	ctx.font = "24px Arial"
// 	ctx.fillStyle = "#424242"
// 	ctx.fillText("Click to start", 175, 130)
// }

function drawLives() {
	ctx.font = "16px Arial"
	ctx.fillStyle = "#0095DD"
	ctx.fillText("Lives: " + lives, canvas.width-65, 20)
}

function drawBricks() {
	for(c = 0; c < brickColumnCount; c++) {
		for(r = 0; r < brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
				var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
				bricks[c][r].x = brickX
	            bricks[c][r].y = brickY
				ctx.beginPath()
				ctx.rect(brickX, brickY, brickWidth, brickHeight)
				// if (whichLevel() == 2) {
					ctx.fillStyle = levelOneColour
				// } else if (whichLevel() == 3) {
				// 	ctx.fillStyle = levelTwoColour
				// } else if (whichLevel() == 4) {
				// 	ctx.fillStyle = levelThreeColour
				// }
				ctx.fill()
				ctx.closePath()
			}
		}
	}
}

function resetBricks() {
	for(c = 0; c < brickColumnCount; c++) {
		for(r = 0; r < brickRowCount; r++) {
			bricks[c][r].status = 1
		}
	}
}

// function whichLevel() {
// 	if (score < 2) {
// 		return 2
// 	} else if (score > 6) {
// 		return 4
// 	} else {
// 		return 3
// 	}
// }

function drawPaddle() {
	ctx.beginPath()
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
	// if (whichLevel() == 2) {
		ctx.fillStyle = levelOneColour
	// } else if (whichLevel() == 3) {
	// 	ctx.fillStyle = levelTwoColour
	// } else if (whichLevel() == 4) {
	// 	ctx.fillStyle = levelThreeColour
	// }
	ctx.fill()
	ctx.closePath()
}

function drawBall() {
	ctx.beginPath()
	ctx.arc(x, y, ballRadius, 0, Math.PI*2)
	// if (whichLevel() == 2) {
		ctx.fillStyle = levelOneColour
	// } else if (whichLevel() == 3) {
	// 	ctx.fillStyle = levelTwoColour
	// } else if (whichLevel() == 4) {
	// 	ctx.fillStyle = levelThreeColour
	// }
	ctx.fill()
	ctx.closePath()
}

function draw() {
	start()
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	drawBricks()
	drawBall()
	drawPaddle()
	collisionDetection()
	drawScore()
	drawLives()
	drawStart()
	x += dx
	y += dy
	if(y + dy < ballRadius) {
		paddleAudio.play()
		dy = -dy
	} else if (y + dy > canvas.height-ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			wall.play()
			dy = -dy
			if (x < paddleX + paddleWidth/2) {
				if (dx > 0) {
					dx = -dx
				}
			} else {
				if (dx < 0) {
					dx = -dx
				}
			}
		} else {
			if (!lives) {
				alert("GAME OVER")
				document.location.reload()
			} else {
				console.log("hi")
				x = canvas.width/2
				y = canvas.height-30
				dx = 0
				dy = 0
				lives -= 1
			}
		}
	}
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		paddleAudio.play()
		dx = -dx
	}
	if (rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7
	}
	else if (leftPressed && paddleX > 0) {
		paddleX -= 7
	}
	if (score == 2) {
		speed = 3
		if (dx > 0) {
			dx = speed
		} else {
			dx = -speed
		}
		if (dy > 0) {
			dy = speed
		} else {
			dy = -speed
		}
	}
	// if (whichLevel() == 3) {
	// 	// console.log(whichLevel())
	// 	dx = whichLevel()
	// 	dy = whichLevel()
	// 	canvas.style.backgroundColor = levelTwoBG
	// 	musicAudio.playbackRate = 1.3
	// 	levelUp.play()
	// }
	// if (bricksRemaining == 60) {
	// 	dx = whichLevel()
	// 	dy = whichLevel()
	// 	paddleWidth = 80
	// 	canvas.style.backgroundColor = levelThreeBG
	// 	musicAudio.playbackRate = 1.6
	// 	levelUp.play()
	// 	setTimeout(function() {

	// 	}, 3000)
	// }
	// console.log(bricksRemaining + ": " + whichLevel())
}

function start() {
	if (spacePressed) {
		dx = speed
		dy = -speed
		// musicAudio.play()
		musicAudio.volume = 0.3
	}
	spacePressed = false
}

function keyDownHandler(e){
	if(e.keyCode == 39) {
		rightPressed = true
	}
	else if(e.keyCode == 37) {
		leftPressed = true
	}
	else if(e.keyCode == 32) {
		spacePressed = true
	}
}

function keyUpHandler(e){
	if(e.keyCode == 39) {
		rightPressed = false
	}
	else if(e.keyCode == 37) {
		leftPressed = false
	}
}

function collisionDetection() {
	for(c = 0; c < brickColumnCount; c++) {
		for(r = 0; r < brickRowCount; r++) {
			var b = bricks[c][r]
			if (b.status == 1) {
				if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy
					b.status = 0
					score++
					brickAudio.play()
					bricksRemaining -= 1
					if(score == brickRowCount*brickColumnCount) {
						gameOver.play()
						level = 3
						x = canvas.width/2
						y = canvas.height-30
						dx = 0
						dy = 0
						paddleX = (canvas.width-paddleWidth)/2
						resetBricks()
						score = 0
					}
				}
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial"
	ctx.fillStyle = "0095DD"
	ctx.fillText("Score: " + score, 8, 20)
}

function drawStart() {
	if (dx == 0) {
		ctx.font = "16px Arial"
		ctx.fillStyle = "#424242"
		ctx.fillText("Spacebar to Start", 285, 300)
	}
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)


start()
setInterval(draw, 10)

// ctx.beginPath()
// ctx.arc(80, 40, 20, 0, Math.PI*2, false)
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"
// ctx.stroke()
// ctx.closePath()

