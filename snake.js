window.addEventListener('load', () => {
    let points, snake, running, apple, move, nextMove;
    const ctx = document.getElementById('snake-canvas').getContext('2d');


    setDefault();
    addKeyDownEventListener();
    setInterval(renderFrame, 100);

    function renderFrame() {
        if (running) {
            if (nextMove.x !== -move.x || nextMove.y !== -move.y) {
                move = nextMove;
            }

            snake.push({x: processBound(getHead().x + move.x), y: processBound(getHead().y + move.y)});

            if(snake.filter(square => square.x === getHead().x && square.y === getHead().y).length >= 2 ) {
                setDefault();
            } else {
                if (apple.x === getHead().x && apple.y === getHead().y) {
                    points++;
                    apple = generateAppleLocation();
                }


                points <= 0 ? snake.shift() : points--;
            }

        }

        ctx.fillStyle='black';
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle= 'yellow';
        snake.forEach(square => ctx.fillRect(square.x * 20, square.y * 20, 18, 18));




        ctx.fillStyle='red';
        ctx.fillRect(apple.x *20, apple.y * 20, 18, 18);
    }


    function getHead() {
        return snake[snake.length - 1];
    }

    function processBound(number) {
        if (number > 19) {
            return 0;
        } else if (number < 0) {
            return 19;
        }
        return number;
    }

    function setDefault() {
        running = false;
        points = 2;
        [move, nextMove] = Array(2).fill({x: 0, y: 0});
        snake = [{x: 10, y: 10}];
        apple = generateAppleLocation();
        }

        function generateAppleLocation() {
            let location;
            do {
                    location = {x: generateRandomNumber(19), y: generateRandomNumber(19)}
            } while(snake.filter(square => square.x === location.x && square.y === location.y).length > 0);
            return location;
        }

        function generateRandomNumber(max) {
            return Math.floor(Math.random() * (max + 1));

        }

        function addKeyDownEventListener() {
            window.addEventListener('keydown', e => {
                if (e.code.startsWith('Arrow')) {
                    e.preventDefault();
                    running = true;
                }
                switch(e.code) {
                    case 'ArrowLeft':
                        nextMove = {x: -1, y: 0};
                        break;
                    case 'ArrowRight':
                        nextMove = {x: 1, y: 0};
                        break;
                    case 'ArrowDown':
                        nextMove = {x: 0, y: 1};
                        break;
                    case 'ArrowUp':
                        nextMove = {x: 0, y: -1};
                        break;
                }
            });
        }
});