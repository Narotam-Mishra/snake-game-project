

document.addEventListener("DOMContentLoaded", () => {
    const gameArena = document.getElementById("game-arena");
    const arenaSize = 600;
    const cellSize = 20;

    // variable to track game score 
    let score = 0;

    // variable to start and stop game
    let gameStarted = false;

    // position of food
    let food = {
        x: 300,
        y: 200
    };

    // structure of snake
    let snake = [{x:160, y:200}, {x:140, y:200}, {x:120, y:200}];
    
    // displacement on x-axis
    let dx = cellSize;

    // displacement on y-axis
    let dy = 0;

    // utility method to draw scoreboard of game
    function drawScoreBorad(){
        const scoreBoard = document.getElementById('score-board');
        scoreBoard.textContent = `Score: ${score}`;
    }

    // utility method to draw div for snake
    function drawDiv(x, y, className){
        const div = document.createElement('div');
        div.classList.add(className);
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;
        return div;
    }

    // utility method to draw food and snake
    function drawFoodAndSnake(){
        // if previously something is drawn then reove it
        gameArena.innerHTML = '';

        // wipe out everything and redraw with new coordinates when snake moves
        
        snake.forEach((snakeCell) => {
            const element = drawDiv(snakeCell.x, snakeCell.y, 'snake');
            gameArena.appendChild(element);
        })

        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement);
    }

    // utility method to move food item
    function moveFood(){
        let newX, newY;
        do{
            // randomly select position for food item
            newX = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize) * cellSize);
            newY = Math.floor(Math.random() * ((arenaSize - cellSize) / cellSize) * cellSize);
        }while(snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY));

        // update new position of food
        food = {x: newX, y: newY};
    }

    // utility method to update snake appearance
    function updateSnake(){
        // step 1 - calculate new co-ordinate where snake's head will go to
        const newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
        
        // add new head to snake's current head
        snake.unshift(newHead);

        // if new head of snake collide with food, then food is completed
        if(newHead.x === food.x && newHead.y === food.y){
            // there will be collison between snake & food
            score += 5;

            // don't pop the the snake's tail
            // move the food
            moveFood();
        }else{
            // remove the last cell
            snake.pop();
        }  
    }

    function isGameOver(){
        // case 1 - if head of the snake hits itself then it also case of collision
        // check snake body hit
        for(let i=1; i<snake.length; i++){
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                return true;
            }

            // case 2 - if snake hit top wall, bottom wall, left or right wall
            // then it is Game over case
            // check wall collision case
            const isHittingLeftWall = snake[0].x < 0;
            const isHittingTopWall = snake[0].y < 0;
            const isHittingRightWall = snake[0].x >= arenaSize;
            const isHittingDownWall = snake[0].y >= arenaSize;

            return isHittingDownWall || isHittingLeftWall || isHittingRightWall || isHittingTopWall;
        }    
    }

    // utility method to continue the game on loop
    function gameLoop(){
        setInterval(() => {
            if(!gameStarted) return;
            // check for game over case
            if(isGameOver()){
                gameStarted = false;
                alert(`Game Over, Score = ${score}`);
                window.location.reload();
                return;
            }
            // update snake on UI
            updateSnake();

            // draw score board
            drawScoreBorad();

            // draw snake and food item
            drawFoodAndSnake();
        }, 500);
    }

    // utility method to run the game
    function runGame(){
        gameStarted = true;
        gameLoop();
    }

    // utility method to intialize the game setup
    function initiateGame(){
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';
        // scoreBoard.textContent = '10';
        document.body.insertBefore(scoreBoard, gameArena);

        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        startButton.classList.add('start-button');
        document.body.appendChild(startButton);

        startButton.addEventListener('click', () => {
            startButton.style.display = 'none';
            runGame();
        })
    }

    // this is the first function to be executed so that we prepare the UI
    initiateGame();
})