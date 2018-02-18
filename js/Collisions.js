var collisionDetection = {
        ballHit: function(game, ball, gameSize){
            return (ball.center.y >= gameSize.y - ball.radius && this.hitPaddle(game.bodies.player, ball.center))
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