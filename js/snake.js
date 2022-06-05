
//declare global variables to track game board size

const LINE_PIXEL_COUNT = 40
const TOTAL_PIXEL_COUNT= LINE_PIXEL_COUNT**2
//track scores to display to user
let totalFoodEaten = 0;
let totalDistanceTraveled= 0;
//shorten reference to game board
const gameContainer = document.getElementById('gameContainer')
//generate the game board
//FIND find out how is the gameContainer is getting filled by the for loop
const createGameBoardPixels = () =>{
    for( let i= 1; i< TOTAL_PIXEL_COUNT; i++){
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class='gameBoardPixel' id='pixel${i}'></div>`
    }

}
//shorten references to game pixels
const gameBoardPixels = document.getElementsByClassName('gameBoardPixel')

let currentFoodPosition = 0
//create the randomly generated food items in the gameboard
const createFood = () => {
    gameBoardPixels[currentFoodPosition].classList.remove('food')



currentFoodPosition = Math.floor(Math.random()*TOTAL_PIXEL_COUNT)

gameBoardPixels[currentFoodPosition].classList.add('food')

}
//start setting up snek behavior
const LEFT_DIR = 37
const UP_DIR = 38
const RIGHT_DIR = 39
const DOWN_DIR = 40

let snakeCurrentDirection = RIGHT_DIR
//make sure that the user input is valid and change the snake direction based on that

const changeDirection = newDirectionCode =>{
    if(newDirectionCode ==snakeCurrentDirection) return;
    if(newDirectionCode==LEFT_DIR && snakeCurrentDirection !== RIGHT_DIR){
        snakeCurrentDirection = newDirectionCode
    }
    else if(newDirectionCode== UP_DIR && snakeCurrentDirection !== DOWN_DIR){
        snakeCurrentDirection = newDirectionCode
    }else if(newDirectionCode== RIGHT_DIR && snakeCurrentDirection !== LEFT_DIR){
        snakeCurrentDirection = newDirectionCode

    }else if(newDirectionCode == DOWN_DIR && snakeCurrentDirection !== UP_DIR){
        snakeCurrentDirection= newDirectionCode
    }
    
}
//set starting point for snake on load
let currentHeadPostion = TOTAL_PIXEL_COUNT/2 
//set initial length
let snakeLength = 200

//start moving snek