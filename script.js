

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

    // utility method to start the game
    function startGame(){
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';
        // scoreBoard.textContent = '10';
        document.body.insertBefore(scoreBoard, gameArena);

        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        startButton.classList.add('start-button');
        document.body.appendChild(startButton);
    }

    startGame();
})