import { Board } from '../../Board';
import { assertPositionBounds } from '../../utils/check-position-bounds';
import { ChessPiece } from '../ChessPiece';
import { Params } from '../Types';

class Queen extends ChessPiece {
    private getMoves = (
        pos_x: number,
        pos_y: number,
        board: Board,
        incr_x: number,
        incr_y: number
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
        const possibilities: [number, number][] = [];
        for (let i = -1; i <= +1; i++) {
            for (let j = -1; j <= +1; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                possibilities.push(...this.getMoves(pos_x, pos_y, board, i, j));
            }
        }
        return possibilities.filter((move) => {
            const nb = board.clone();
            nb.movePiece(this, move[0], move[1], true);
            const newCheck = nb.detectCheck()[0];
            if (newCheck && newCheck.color === this.color) {
                return false;
            } else {
                return true;
            }
        });
    };
    isThreateningAtXY: (pos_x: number, pos_y: number, board: Board) => boolean =
        (pos_x, pos_y, board) => {
            assertPositionBounds([pos_x, pos_y]);
            if (
                Math.abs(pos_x - this.position[0]) !==
                Math.abs(pos_y - this.position[1])
            ) {
                return false;
            }
            if (!(pos_x === this.position[0] || pos_y === this.position[1])) {
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
                !(i === pos_x && j === pos_y);
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
        return new Queen({
            pos: JSON.parse(JSON.stringify(this.position)),
            color: this.color,
        });
    };
    constructor(params: Params) {
        super(params);
        this.name = 'queen';
    }
}

export { Queen };
