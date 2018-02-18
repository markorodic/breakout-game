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
var whichColour = function(xPostion) {
    switch (xPostion) {
        case 105:
            return colours.rowSix
        case 115:
            return colours.rowFive
        case 125:
            return colours.rowFour
        case 135:
            return colours.rowThree
        case 145:
            return colours.rowTwo
        case 155:
            return colours.rowOne
        break;
    }
}

var colours = {
    rowOne: '#434DC5',
    rowTwo: '#4B9F4C',
    rowThree: '#A2A136',
    rowFour: '#B37938',
    rowFive: '#C46C40',
    rowSix: '#C6494B',
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
