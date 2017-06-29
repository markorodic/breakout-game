var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2
var y = canvas.height-30
var dx = 2
var dy = -2
var ballRadius = 10


function drawBall() {
	ctx.beginPath()
	ctx.arc(x, y, ballRadius, 0, Math.PI*2)
	ctx.fillStyle = "#0095DD"
	ctx.fill()
	ctx.closePath()
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	drawBall()
	x += dx
	y += dy
	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
		dy = -dy
	}
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx
	}
}

setInterval(draw, 10)


// ctx.beginPath()
// ctx.arc(80, 40, 20, 0, Math.PI*2, false)
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"
// ctx.stroke()
// ctx.closePath()

