
//Game constants & variables
let inputDir = {x: 0, y:0};
const foodSound = new Audio('AudioEffects/food.mp3');
const gameOverSound = new Audio('AudioEffects/gameover.mp3');
const moveSound = new Audio('AudioEffects/move.mp3');
const musicSound = new Audio('AudioEffects/music.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13,y: 15}
];
let food = {x: 1,y: 2};
let score = 0;


//Game functions
function main(ctime)
{
    window.requestAnimationFrame(main);
   
   // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime
    gameEngine();
    
}
function isCollide(snake){
    //if you bump into yourself
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}

function gameEngine()
{
    //updating the snake
    if(isCollide(snakeArr)){
        musicSound.pause();
        gameOverSound.play();
        
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any Key to play again!")
        snakeArr =[{x: 13, y: 15}];
        score = 0;
        musicSound.play();
        
    }

    //After eating the food ,increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        foodSound.play();
        score += 3;
        if(score>highScorevalue){
            highScorevalue = score;
            localStorage.setItem("highScore", JSON.stringify(highScorevalue))
            highScoreBox.innerHTML = "HighScore: " + highScorevalue;
        }
        scoreBox.innerHTML = "score: " + score;
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    }

    //Moving the snake
    for (let i = snakeArr.length-2; i>=0; i--){
        
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //display the snake
    board.innerHTML ="";
    snakeArr.forEach((e, index )=> {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
        
    });

    

    //display food

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}



//Main logic
musicSound.play();
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highScorevalue = 0;
    localStorage.setItem("highScore", JSON.stringify(highScorevalue))
}
else{
    highScorevalue = JSON.parse(highScore);
    highScoreBox.innerHTML = "HighScore: " + highScorevalue;
}



window.requestAnimationFrame(main);

//key response
window.addEventListener('keydown',e =>{
     inputDir = {x: 0, y: 1}//Game starts
     moveSound.play();
     switch(e.key){
        case "ArrowUp":
            //console.log("ArrowUp")
            inputDir.x = 0
            inputDir.y = -1
            break;

        case "ArrowDown":
           // console.log("ArrowDown")
            inputDir.x = 0
            inputDir.y = 1
            break;

        case "ArrowLeft":
          //  console.log("ArrowLeft")
            inputDir.x = -1
            inputDir.y = 0
            break;

        case "ArrowRight":
          //  console.log("ArrowRight")
            inputDir.x = 1
            inputDir.y = 0
            break;

        default:
            break;    
     }
});
