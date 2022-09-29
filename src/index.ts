/**
 * TODO: Implement UI to detect win, lose and tie situaltion
 */

import { Board } from './Board';
import { ChessPiece } from './pieces/ChessPiece';
import { performMachineTurn } from './process-computer';
import { setPieces } from './set-pieces';
import { setPercentage } from './utils/util-events';

const board = new Board();

setPieces(board);

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
                performMachineTurn(board).then((v) => {
                    board.render().then((v) => {
                        isHumanTurn = true;
                    });
                });
            });
        }
    }
});
