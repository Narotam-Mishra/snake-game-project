

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
    let sanke = [{x:160, y:200}, {x:140, y:200}, {x:120, y:200}];
    
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
        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement);
    }

    // utility method to continue the game on loop
    function gameLoop(){
        setInterval(() => {
            // draw score board
            drawScoreBorad();

            // draw snake and food item
            drawFoodAndSnake();
        }, 1000);
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