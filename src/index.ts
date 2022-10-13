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
(window as any).board = board;
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
// board = Board.parse('{ "pieces": "[\\"{ \\\\\\"position\\\\\\": \\\\\\"[2,1]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"pawn\\\\\\", \\\\\\"color\\\\\\": \\\\\\"white\\\\\\"}\\",\\"{ \\\\\\"position\\\\\\": \\\\\\"[4,1]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"pawn\\\\\\", \\\\\\"color\\\\\\": \\\\\\"white\\\\\\"}\\",\\"{ \\\\\\"position\\\\\\": \\\\\\"[7,1]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"pawn\\\\\\", \\\\\\"color\\\\\\": \\\\\\"white\\\\\\"}\\",\\"{ \\\\\\"position\\\\\\": \\\\\\"[1,0]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"knight\\\\\\", \\\\\\"color\\\\\\": \\\\\\"white\\\\\\"}\\",\\"{ \\\\\\"position\\\\\\": \\\\\\"[6,2]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"pawn\\\\\\", \\\\\\"color\\\\\\": \\\\\\"white\\\\\\"}\\",\\"{ \\\\\\"position\\\\\\": \\\\\\"[2,0]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"king\\\\\\", \\\\\\"color\\\\\\": \\\\\\"white\\\\\\", \\\\\\"specialInfo\\\\\\": { \\\\\\"moved\\\\\\": true } }\\",\\"{ \\\\\\"name\\\\\\": \\\\\\"bishop\\\\\\", \\\\\\"color\\\\\\": \\\\\\"white\\\\\\", \\\\\\"position\\\\\\": \\\\\\"[2,2]\\\\\\"}\\",\\"{ \\\\\\"position\\\\\\": \\\\\\"[4,0]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"rook\\\\\\", \\\\\\"color\\\\\\": \\\\\\"white\\\\\\", \\\\\\"specialInfo\\\\\\": { \\\\\\"moved\\\\\\": true } }\\",\\"{ \\\\\\"position\\\\\\": \\\\\\"[7,4]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"pawn\\\\\\", \\\\\\"color\\\\\\": \\\\\\"black\\\\\\"}\\",\\"{ \\\\\\"position\\\\\\": \\\\\\"[6,3]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"pawn\\\\\\", \\\\\\"color\\\\\\": \\\\\\"black\\\\\\"}\\",\\"{ \\\\\\"position\\\\\\": \\\\\\"[0,1]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"queen\\\\\\", \\\\\\"color\\\\\\": \\\\\\"black\\\\\\"}\\",\\"{ \\\\\\"position\\\\\\": \\\\\\"[4,5]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"king\\\\\\", \\\\\\"color\\\\\\": \\\\\\"black\\\\\\", \\\\\\"specialInfo\\\\\\": { \\\\\\"moved\\\\\\": true } }\\",\\"{ \\\\\\"position\\\\\\": \\\\\\"[7,6]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"queen\\\\\\", \\\\\\"color\\\\\\": \\\\\\"white\\\\\\"}\\",\\"{ \\\\\\"position\\\\\\": \\\\\\"[1,4]\\\\\\", \\\\\\"name\\\\\\": \\\\\\"pawn\\\\\\", \\\\\\"color\\\\\\": \\\\\\"black\\\\\\"}\\"]", "dynamicValueAtPos": { "2_1": "{\\"position\\":\\"[2, 1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}", "4_1": "{\\"position\\":\\"[4, 1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}", "7_1": "{\\"position\\":\\"[7, 1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}", "1_0": "{\\"position\\":\\"[1, 0]\\",\\"name\\":\\"knight\\",\\"color\\":\\"white\\"}", "6_2": "{\\"position\\":\\"[6, 2]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}", "2_0": "{\\"position\\":\\"[2, 0]\\",\\"name\\":\\"king\\",\\"color\\":\\"white\\",\\"specialInfo\\":{\\"moved\\":true}}", "2_2": "{\\"name\\":\\"bishop\\",\\"color\\":\\"white\\",\\"position\\":\\"[2, 2]\\"}", "4_0": "{\\"position\\":\\"[4, 0]\\",\\"name\\":\\"rook\\",\\"color\\":\\"white\\",\\"specialInfo\\":{\\"moved\\":true}}", "7_4": "{\\"position\\":\\"[7, 4]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}", "6_3": "{\\"position\\":\\"[6, 3]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}", "0_1": "{\\"position\\":\\"[0, 1]\\",\\"name\\":\\"queen\\",\\"color\\":\\"black\\"}", "4_5": "{\\"position\\":\\"[4, 5]\\",\\"name\\":\\"king\\",\\"color\\":\\"black\\",\\"specialInfo\\":{\\"moved\\":true}}", "7_6": "{\\"position\\":\\"[7, 6]\\",\\"name\\":\\"queen\\",\\"color\\":\\"white\\"}", "1_4": "{\\"position\\":\\"[1, 4]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}"}, "isInCheckedState": []}');
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
                .getPossibleMoves(
                    selectedPiece.position[0],
                    selectedPiece.position[1],
                    board
                )
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
    (window as any).board = board;
    board.render();
});

nextButton.addEventListener('click', () => {
    if (nextButton.disabled || isHumanTurn === false) {
        return;
    }
    board = previousBoardState[changeCurrentIndex('incr')].clone();
    (window as any).board = board;
    board.render();
});
