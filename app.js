const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const result = document.querySelector('#result')
const startBtn = document.querySelector('#start')
const restartBtn = document.querySelector('#restart')



const blockWidth = 100
const blockHeight = 20


const boardWidth = 560
const boardHeight = 500

let xDirection = -2
let yDirection = 2

const userStart = [230, 10]
let currentPosition = userStart

const ballDiameter = 20
const ballStart = [270, 40]
let ballCurrentPosition = ballStart

let timerId
let score = 0



class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
        this.topLeft = [xAxis, yAxis + blockHeight]
    }
}


const blocks = [
    new Block(10, 470),
    new Block(120, 470),
    new Block(230, 470),
    new Block(340, 470),
    new Block(450, 470),

    new Block(10, 440),
    new Block(120, 440),
    new Block(230, 440),
    new Block(340, 440),
    new Block(450, 440),

    new Block(10, 410),
    new Block(120, 410),
    new Block(230, 410),
    new Block(340, 410),
    new Block(450, 410),

    //extra
    new Block(10, 380),
    new Block(120, 380),
    new Block(230, 380),
    new Block(340, 380),
    new Block(450, 380),

    new Block(10, 350),
    new Block(120, 350),
    new Block(230, 350),
    new Block(340, 350),
    new Block(450, 350),

    new Block(10, 320),
    new Block(120, 320),
    new Block(230, 320),
    new Block(340, 320),
    new Block(450, 320),
]

function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}
addBlocks()


const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()


const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()



function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10

                drawUser()

            }
            break
        case 'ArrowRight':
            if (currentPosition[0] < (boardWidth - blockWidth)) {
                currentPosition[0] += 10

                drawUser()
            }
            break
    }
}

function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}


function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}


function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
    drawUser()
}


function checkForCollisions() {

    for (let i = 0; i < blocks.length; i++) {
        if
            (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
            if (blocks.length == 0) {
                result.innerHTML = 'You Win!'
                ball.classList.remove('ball')
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }
    }

    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
        changeDirection()
    }


    if
        (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }


    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        result.innerHTML = 'You lose!'
        ball.classList.remove('ball')
        document.removeEventListener('keydown', moveUser)

    }
}


function changeDirection() {

    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }

    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }

    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }

    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}

startBtn.addEventListener('click', startGame)

function startGame() {
    document.addEventListener('keydown', moveUser)
    timerId = setInterval(moveBall, 10)
}

restartBtn.addEventListener('click', () =>{
   location.reload()
})


