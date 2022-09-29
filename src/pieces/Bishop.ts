import { Board } from '../Board';
import { assertPositionBounds } from '../utils/check-position-bounds';
import { ChessPiece } from './ChessPiece';
import { Params } from './Types';

class Bishop extends ChessPiece {
    constructor(params: Params) {
        super(params);
        this.name = 'bishop';
    }
    stringify: () => string = () => {
        return JSON.stringify({
            name: this.name,
            color: this.color,
            position: JSON.stringify(this.position),
        });
    };

    private getMoves = (
        pos_x: number,
        pos_y: number,
        board: Board,
        incr_x: 1 | -1,
        incr_y: 1 | -1
    ): [number, number][] => {
        const possibleMoves: [number, number][] = [];
        for (
            let i = pos_x + incr_x, j = pos_y + incr_y;
            i <= 7 && j <= 7 && i >= 0 && j >= 0;
            i += incr_x, j += incr_y
        ) {
            const valueAtPos = board.getValueAtPos(i, j);
            if (valueAtPos) {
                if (valueAtPos.color !== this.color) {
                    possibleMoves.push([i, j]);
                }
                break;
            }
            possibleMoves.push([i, j]);
        }
        return possibleMoves;
    };

    getPossibleMoves: (
        pos_x: number,
        pos_y: number,
        board: Board
    ) => [number, number][] = (pos_x, pos_y, board) => {
        assertPositionBounds([pos_x, pos_y]);
        const possibleMoves: [number, number][] = [];
        possibleMoves.push(...this.getMoves(pos_x, pos_y, board, +1, +1));
        possibleMoves.push(...this.getMoves(pos_x, pos_y, board, +1, -1));
        possibleMoves.push(...this.getMoves(pos_x, pos_y, board, -1, +1));
        possibleMoves.push(...this.getMoves(pos_x, pos_y, board, -1, -1));
        return possibleMoves.filter((move) => {
            const nb = board.clone();
            nb.movePiece(this, move[0], move[1], true);
            const [newCheck, _] = nb.detectCheck();
            if (newCheck && newCheck.color === this.color) {
                return false;
            } else {
                return true;
            }
        });
    };

    name: string;
    position: [number, number];
    color: 'white' | 'black';
    isThreateningAtXY: (pos_x: number, pos_y: number, board: Board) => boolean =
        (pos_x, pos_y, board) => {
            if (pos_x === this.position[0] && pos_y === this.position[1]) {
                throw new Error('How can it threaten where its standing');
            }
            assertPositionBounds([pos_x, pos_y]);

            if (
                Math.abs(pos_x - this.position[0]) !==
                Math.abs(pos_y - this.position[1])
            ) {
                return false;
            }

            const incr_x =
                (pos_x - this.position[0]) / Math.abs(pos_x - this.position[0]);
            const incr_y =
                (pos_y - this.position[1]) / Math.abs(pos_y - this.position[1]);

            let i = -1,
                j = -1;
            for (
                i = this.position[0] + incr_x, j = this.position[1] + incr_y;
                i !== pos_x && j !== pos_y;
                i += incr_x, j += incr_y
            ) {
                if (i > 7 || i < 0 || j < 0 || j > 7) {
                    break;
                }
                const valueAtPos = board.getValueAtPos(i, j);
                if (valueAtPos) {
                    return false;
                }
            }
            if (i === pos_x && j === pos_y) {
                return true;
            }
            return false;
        };
    clone: () => ChessPiece = () => {
        return new Bishop({
            pos: JSON.parse(JSON.stringify(this.position)),
            color: this.color,
        });
    };
}

export { Bishop };
