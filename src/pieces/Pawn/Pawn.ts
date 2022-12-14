import { Params } from './../Types';
import { Board } from '../../Board';
import { assertPositionBounds } from '../../utils/check-position-bounds';
import { ChessPiece } from '../ChessPiece';
class Pawn extends ChessPiece {
    constructor(param: Params) {
        super(param);
        this.name = 'pawn';
    }
    clone: () => ChessPiece = () => {
        return new Pawn({
            color: this.color,
            pos: JSON.parse(JSON.stringify(this.position)),
        });
    };

    isThreateningAtXY: (pos_x: number, pos_y: number, board: Board) => boolean =
        (pos_x, pos_y) => {
            assertPositionBounds([pos_x, pos_y]);
            if (
                this.color === 'black' &&
                this.position[1] - 1 === pos_y &&
                (this.position[0] - 1 === pos_x ||
                    this.position[0] + 1 === pos_x)
            ) {
                return true;
            }
            if (
                this.color === 'white' &&
                this.position[1] + 1 === pos_y &&
                (this.position[0] - 1 === pos_x ||
                    this.position[0] + 1 === pos_x)
            ) {
                return true;
            }
            return false;
        };

    getPossibleMoves: (board: Board) => [number, number][] = (board) => {
        const [pos_x, pos_y] = this.position;
        assertPositionBounds([pos_x, pos_y]);
        const possibleMoves = [];
        const enPassantPiece = board.enPassantPiece;
        if (this.color === 'black' && pos_y - 1 >= 0) {
            // en passant move
            if (
                pos_y === 3 &&
                enPassantPiece &&
                enPassantPiece.color === 'white' &&
                enPassantPiece.position[1] === 3
            ) {
                if (
                    pos_x > 0 &&
                    enPassantPiece.position[0] === this.position[0] - 1
                ) {
                    possibleMoves.push([pos_x - 1, pos_y - 1]);
                }
                if (
                    pos_x < 7 &&
                    enPassantPiece.position[0] === this.position[0] + 1
                ) {
                    possibleMoves.push([pos_x + 1, pos_y - 1]);
                }
            }
            // Black moves from bottom to top;
            if (board.getValueAtPos(pos_x, pos_y - 1) === null) {
                possibleMoves.push([pos_x, pos_y - 1]);
            }
            if (
                board.getValueAtPos(pos_x, 4) === null &&
                pos_y == 6 &&
                board.getValueAtPos(pos_x, 5) === null
            ) {
                possibleMoves.push([pos_x, 4]);
            }
            if (pos_x < 7) {
                if (
                    board.getValueAtPos(pos_x + 1, pos_y - 1) !== null &&
                    board.getValueAtPos(pos_x + 1, pos_y - 1).color === 'white'
                ) {
                    possibleMoves.push([pos_x + 1, pos_y - 1]);
                }
            }
            if (pos_x > 0) {
                if (
                    board.getValueAtPos(pos_x - 1, pos_y - 1) !== null &&
                    board.getValueAtPos(pos_x - 1, pos_y - 1).color === 'white'
                ) {
                    possibleMoves.push([pos_x - 1, pos_y - 1]);
                }
            }
        }
        if (this.color === 'white' && pos_y + 1 < 8) {
            if (
                pos_y === 4 &&
                enPassantPiece &&
                enPassantPiece.color === 'black' &&
                enPassantPiece.position[1] === 4
            ) {
                if (
                    pos_x > 0 &&
                    enPassantPiece.position[0] === this.position[0] - 1
                ) {
                    possibleMoves.push([pos_x - 1, pos_y + 1]);
                }
                if (
                    pos_x < 7 &&
                    enPassantPiece.position[0] === this.position[0] + 1
                ) {
                    possibleMoves.push([pos_x + 1, pos_y + 1]);
                }
            }
            // White moves from top to bottom;
            if (board.getValueAtPos(pos_x, pos_y + 1) === null) {
                possibleMoves.push([pos_x, pos_y + 1]);
            }
            if (
                board.getValueAtPos(pos_x, 3) === null &&
                pos_y == 1 &&
                board.getValueAtPos(pos_x, 2) === null
            ) {
                possibleMoves.push([pos_x, 3]);
            }
            if (pos_x < 7) {
                if (
                    board.getValueAtPos(pos_x + 1, pos_y + 1) !== null &&
                    board.getValueAtPos(pos_x + 1, pos_y + 1).color === 'black'
                ) {
                    possibleMoves.push([pos_x + 1, pos_y + 1]);
                }
            }
            if (pos_x > 0) {
                if (
                    board.getValueAtPos(pos_x - 1, pos_y + 1) !== null &&
                    board.getValueAtPos(pos_x - 1, pos_y + 1).color === 'black'
                ) {
                    possibleMoves.push([pos_x - 1, pos_y + 1]);
                }
            }
        }
        return possibleMoves.filter((move) => {
            const nb = board.clone();
            nb.movePiece(this, move[0], move[1], true);
            const newCheck = nb.detectCheck();
            for (const checkPiece of newCheck) {
                if (checkPiece[0].color === this.color) {
                    return false;
                }
            }
            return true;
        });
    };
    name: string;
    position: [number, number];
    color: 'white' | 'black';
}

export { Pawn };
