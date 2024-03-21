/**
 * TODO: Implement UI to detect win, lose and tie situation
 */

import { Board } from './Board';
import { ChessPiece } from './pieces/ChessPiece';
import { performMachineTurn } from './process-computer';
import { setPieces } from './set-pieces';
import { setPercentage } from './utils/util-events';

let board = new Board();
const previousBoardState: Board[] = [];
const previousButton = document.getElementById('previous') as HTMLButtonElement;
previousButton.disabled = true;
const nextButton = document.getElementById('next') as HTMLButtonElement;
nextButton.disabled = true;
let currentIndex = -1;
window['board'] = board;
const changeCurrentIndex = (change: 'incr' | 'decr') => {
    if (change === 'incr') {
        currentIndex++;
    } else {
        currentIndex--;
    }
    if (currentIndex === 0) {
        previousButton.disabled = true;
    } else {
        previousButton.disabled = false;
    }
    if (currentIndex === previousBoardState.length - 1) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
    return currentIndex;
};

const recordState = (board: Board) => {
    if (currentIndex < previousBoardState.length - 1) {
        previousBoardState.splice(currentIndex + 1);
    }

    previousBoardState.push(board.clone());
    changeCurrentIndex('incr');
};

setPieces(board);
recordState(board);
board.render();
const boundingRect = canvas.getBoundingClientRect();
let selectedPiece: ChessPiece | null = null;
setPercentage(0, 100);
let isHumanTurn = true;
canvas.addEventListener('click', (ev) => {
    if (selectedPiece === null && isHumanTurn) {
        const selectedCell_x = Math.floor(
            (ev.x - boundingRect.left) / CELL_WIDTH
        );
        const selectedCell_y = Math.floor(
            (ev.y - boundingRect.top) / CELL_HEIGHT
        );
        const boardVal = board.getValueAtPos(selectedCell_x, selectedCell_y);
        if (boardVal !== null && boardVal.color === 'white') {
            selectedPiece = boardVal;
            board.render([selectedCell_x, selectedCell_y]);
        }
    } else if (selectedPiece !== null && isHumanTurn) {
        const selectedCell_x = Math.floor(
            (ev.x - boundingRect.left) / CELL_WIDTH
        );
        const selectedCell_y = Math.floor(
            (ev.y - boundingRect.top) / CELL_HEIGHT
        );
        const boardVal = board.getValueAtPos(selectedCell_x, selectedCell_y);
        let res = false;
        if (boardVal !== null && boardVal.color === 'white') {
            selectedPiece = boardVal;
            board.render([selectedCell_x, selectedCell_y]);
        } else {
            const isPossible = !!selectedPiece
                .getPossibleMoves(board)
                .find(
                    (move) =>
                        move[0] === selectedCell_x && move[1] === selectedCell_y
                );
            if (!isPossible) {
                console.warn(
                    `Invalid Move for : ${selectedPiece.color} ${
                        selectedPiece.name
                    } for position ${[selectedCell_x, selectedCell_y]}`
                );
            } else {
                res = board.movePiece(
                    selectedPiece,
                    selectedCell_x,
                    selectedCell_y
                );
            }
        }
        if (res) {
            board.render().then(() => {
                isHumanTurn = false;
                performMachineTurn(board).then((res) => {
                    if (res) {
                        recordState(board);
                        board.render().then(() => {
                            isHumanTurn = true;
                        });
                    } else {
                        alert('I Lost!!');
                    }
                });
            });
        }
    }
});

previousButton.addEventListener('click', () => {
    if (previousButton.disabled || isHumanTurn === false) {
        return;
    }
    board = previousBoardState[changeCurrentIndex('decr')].clone();
    window['board'] = board;
    board.render();
});

nextButton.addEventListener('click', () => {
    if (nextButton.disabled || isHumanTurn === false) {
        return;
    }
    board = previousBoardState[changeCurrentIndex('incr')].clone();
    window['board'] = board;
    board.render();
});
