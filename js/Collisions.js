var collision = {
    betweenBallAndPaddle: function(ball, paddle, gameSize) {
        return (ball.position.y >= gameSize.y - ball.radius && this.isBallInsidePaddle(paddle, ball))
    },
    betweenBallAndWall: function(ball, gameSize){
        return (ball.position.x > gameSize.x - ball.radius || ball.position.x < ball.radius)
    },
    ballHasDropped: function(ball, gameSize){
        return (ball.position.y > gameSize.y)
    },
    isBallInsidePaddle: function(paddle, ball) {
        return ((paddle.position.x - paddle.size.x / 2) < ball.position.x && ball.position.x < (paddle.position.x + paddle.size.x / 2))
    },
    betweenBallAndCeiling: function(yPosition, radius){
        return (yPosition < radius)
    },
    betweenBallAndBrick: function(ball, bricks) {
        for (var i = 0; i < bricks.length; i++) {
            if (this.brickCol(bricks[i], ball)) {
              console.log('brickHit')
                return true
            }
        }
    },
    brickCol: function(brick, ball) {
        var startX = brick.position.x - brick.size.x / 2
        var startY = brick.position.y - brick.size.y / 2
        return (ball.position.x > startX && ball.position.x < startX + brick.size.x && ball.position.y > startY && ball.position.y < startY + brick.size.y)
    }
}
