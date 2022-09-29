canvas = document.getElementById('root') as HTMLCanvasElement;
const HEIGHT = 500,
    WIDTH = 500;
ctx = canvas.getContext('2d');
ctx.fillStyle = '#717167';
(CELL_HEIGHT = Math.floor(HEIGHT / 8)), (CELL_WIDTH = Math.floor(WIDTH / 8));
