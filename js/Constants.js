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