
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

//start moving snek and wrap around the other side of the screen if needed
//FIND the math at isHeadAtLeft, how does the snake goes to the other side of the board
const moveSnake = () => {
    switch(snakeCurrentDirection){
        case LEFT_DIR:
            --currentHeadPostion
            const isHeadAtLeft = currentHeadPostion % LINE_PIXEL_COUNT == LINE_PIXEL_COUNT-1 || currentFoodPosition < 0
            if(isHeadAtLeft){
                currentHeadPostion = currentHeadPostion + LINE_PIXEL_COUNT
            }
        break
    
        case RIGHT_DIR:
            ++currentHeadPostion
            const isHeadatRight = currentHeadPostion %  LINE_PIXEL_COUNT == 0
            if(isHeadatRight){
                currentHeadPostion = currentHeadPostion - LINE_PIXEL_COUNT
            }
        break 

        case UP_DIR:
            currentHeadPostion = currentHeadPostion - LINE_PIXEL_COUNT
            const isHeadAtTop = currentHeadPostion < 0
            if(isHeadAtTop){
                currentHeadPostion = currentHeadPostion + TOTAL_PIXEL_COUNT //when head at top goes out of the screen,
                //the variable becomes negative, to get it back TOTAL_PIXEL_COUNT needs to be added to it
            }
            break   

        case DOWN_DIR:
            currentHeadPostion = currentHeadPostion + LINE_PIXEL_COUNT
            const isHeadAtBottom = currentHeadPostion > TOTAL_PIXEL_COUNT -1 
            if(isHeadAtBottom){
                currentHeadPostion = currentHeadPostion - TOTAL_PIXEL_COUNT
            }
            break
            default: //FIND out what this does
            break
        }
        //accessed the corrct pixel within the HTML collection
        let nextSnakeHeadPixel = gameBoardPixels[currentHeadPostion] //this puts the snake head in the HTML DOM
        //check if snake head is about to intersect with its own body
        if(nextSnakeHeadPixel.classList.contains('snekBodyPixel')){
            clearInterval(moveSnakeInterval)
            alert(`You have eaten ${totalFoodEaten} food and traveled ${totalDistanceTraveled} blocks.`)
        window.location.reload() //this restarts the page
        }
        //assuming an empty pixel, add snake body styling
        nextSnakeHeadPixel.classList.add('snekBodyPixel')
        //remove snake styling to keep snake appropriate length
        setTimeout(()=>{
            nextSnakeHeadPixel.classList.remove('snekBodyPixel')
        }, snakeLength) //FIND what setTimeout is doing here, and how, it removes styling
        
        //behaviour when snek encounters food
        
        if(currentHeadPostion == currentFoodPosition){
            totalFoodEaten++
            document.getElementById('pointsEarned').innerText = totalFoodEaten
            snakeLength = snakeLength + 100
            createFood()
        }
        //counter for total distance traveled
        totalDistanceTraveled++
        document.getElementById('blocksTraveled').innerText = totalDistanceTraveled
    
    }

    //call initial functions to create board and start game
createGameBoardPixels()
createFood()
//set animation speed
let moveSnakeInterval = setInterval(moveSnake, 100)

addEventListener('keydown', e => changeDirection(e.keyCode))
//add variables for onscreen buttons
const leftbutton = document.getElementById('leftbutton')
const rightbutton = document.getElementById('rightbutton')
const upbutton = document.getElementById('uputton')
const downbutton = document.getElementById('downbutton')

//add listeners for on screen keys
leftbutton.onclick = () => changeDirection(LEFT_DIR)
rightbutton.onclick = () => changeDirection(RIGHT_DIR)
upbutton.onclick = () => changeDirection(UP_DIR)
downbutton.onclick = () => changeDirection(DOWN_DIR)