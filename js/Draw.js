var drawToScreen = {
    drawRect: function (ctx, body, colour) {
        ctx.fillStyle = colour
        ctx.fillRect(body.center.x - body.size.x / 2,
        body.center.y - body.size.y / 2,
        body.size.x, body.size.y)
    },
    drawGap: function (ctx) {
        ctx.fillStyle = "black"
        ctx.fillRect(0,55,392,15)
    },
    drawText: function(ctx, variable, left, top) {
        ctx.fillStyle = "white"
        ctx.fillText(variable, left, top)
        ctx.font = '42px "Press Start 2P"'
    },
    drawBricks: function(game) {
        var bricks = []
        for (var i = 0; i < 84; i++) {
            var x = 10 + (i % 13)* 31
            var y = 105 + (i % 6) * 10
            var colour = whichColour(y)
            bricks.push(new Brick(game, { x: x, y: y}, colour))
        }
        return bricks
    }
}