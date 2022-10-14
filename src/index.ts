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

// setPieces(board);
board = Board.parse(
    '{"pieces":"[\\"{\\\\\\"position\\\\\\":\\\\\\"[0,1]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[1,1]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[2,1]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[3,1]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[4,1]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[4,6]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[5,1]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[5,6]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[6,6]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[7,6]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[1,0]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"knight\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[6,0]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"knight\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[6,7]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"knight\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[1,7]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"knight\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[3,7]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"king\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\",\\\\\\"specialInfo\\\\\\":{}}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[3,0]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"king\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\",\\\\\\"specialInfo\\\\\\":{}}\\",\\"{\\\\\\"name\\\\\\":\\\\\\"bishop\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\",\\\\\\"position\\\\\\":\\\\\\"[2,0]\\\\\\"}\\",\\"{\\\\\\"name\\\\\\":\\\\\\"bishop\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\",\\\\\\"position\\\\\\":\\\\\\"[2,7]\\\\\\"}\\",\\"{\\\\\\"name\\\\\\":\\\\\\"bishop\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\",\\\\\\"position\\\\\\":\\\\\\"[5,7]\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[0,0]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"rook\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\",\\\\\\"specialInfo\\\\\\":{}}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[7,0]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"rook\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\",\\\\\\"specialInfo\\\\\\":{}}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[0,7]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"rook\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\",\\\\\\"specialInfo\\\\\\":{}}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[7,7]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"rook\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\",\\\\\\"specialInfo\\\\\\":{}}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[4,0]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"queen\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[4,7]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"queen\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[0,5]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"name\\\\\\":\\\\\\"bishop\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\",\\\\\\"position\\\\\\":\\\\\\"[6,1]\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[2,5]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[7,3]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[1,5]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[3,5]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[6,4]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\"]","dynamicValueAtPos":{"0_1":"{\\"position\\":\\"[0,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","1_1":"{\\"position\\":\\"[1,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","2_1":"{\\"position\\":\\"[2,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","3_1":"{\\"position\\":\\"[3,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","4_1":"{\\"position\\":\\"[4,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","4_6":"{\\"position\\":\\"[4,6]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","5_1":"{\\"position\\":\\"[5,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","5_6":"{\\"position\\":\\"[5,6]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","6_1":"{\\"name\\":\\"bishop\\",\\"color\\":\\"white\\",\\"position\\":\\"[6,1]\\"}","6_6":"{\\"position\\":\\"[6,6]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","7_6":"{\\"position\\":\\"[7,6]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","1_0":"{\\"position\\":\\"[1,0]\\",\\"name\\":\\"knight\\",\\"color\\":\\"white\\"}","6_0":"{\\"position\\":\\"[6,0]\\",\\"name\\":\\"knight\\",\\"color\\":\\"white\\"}","6_7":"{\\"position\\":\\"[6,7]\\",\\"name\\":\\"knight\\",\\"color\\":\\"black\\"}","1_7":"{\\"position\\":\\"[1,7]\\",\\"name\\":\\"knight\\",\\"color\\":\\"black\\"}","3_7":"{\\"position\\":\\"[3,7]\\",\\"name\\":\\"king\\",\\"color\\":\\"black\\",\\"specialInfo\\":{}}","3_0":"{\\"position\\":\\"[3,0]\\",\\"name\\":\\"king\\",\\"color\\":\\"white\\",\\"specialInfo\\":{}}","2_0":"{\\"name\\":\\"bishop\\",\\"color\\":\\"white\\",\\"position\\":\\"[2,0]\\"}","2_7":"{\\"name\\":\\"bishop\\",\\"color\\":\\"black\\",\\"position\\":\\"[2,7]\\"}","5_7":"{\\"name\\":\\"bishop\\",\\"color\\":\\"black\\",\\"position\\":\\"[5,7]\\"}","0_0":"{\\"position\\":\\"[0,0]\\",\\"name\\":\\"rook\\",\\"color\\":\\"white\\",\\"specialInfo\\":{}}","7_0":"{\\"position\\":\\"[7,0]\\",\\"name\\":\\"rook\\",\\"color\\":\\"white\\",\\"specialInfo\\":{}}","0_7":"{\\"position\\":\\"[0,7]\\",\\"name\\":\\"rook\\",\\"color\\":\\"black\\",\\"specialInfo\\":{}}","7_7":"{\\"position\\":\\"[7,7]\\",\\"name\\":\\"rook\\",\\"color\\":\\"black\\",\\"specialInfo\\":{}}","4_0":"{\\"position\\":\\"[4,0]\\",\\"name\\":\\"queen\\",\\"color\\":\\"white\\"}","4_7":"{\\"position\\":\\"[4,7]\\",\\"name\\":\\"queen\\",\\"color\\":\\"black\\"}","0_5":"{\\"position\\":\\"[0,5]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","1_5":"{\\"position\\":\\"[1,5]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","2_5":"{\\"position\\":\\"[2,5]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","3_5":"{\\"position\\":\\"[3,5]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","7_3":"{\\"position\\":\\"[7,3]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","6_4":"{\\"position\\":\\"[6,4]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}"},"isInCheckedState":[],"enPassantPieces":null}'
);
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
