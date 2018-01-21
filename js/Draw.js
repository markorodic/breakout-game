var drawToScreen = {
    drawRect: function (ctx, body, currentLevel, colour) {
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