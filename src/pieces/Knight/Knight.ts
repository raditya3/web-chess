import { Board } from '../../Board';
import { assertPositionBounds } from '../../utils/check-position-bounds';
import { ChessPiece } from '../ChessPiece';
import { Params } from '../Types';
class Knight extends ChessPiece {
    constructor(params: Params) {
        super(params);
        this.name = 'knight';
        this.position = params.pos;
    }

    getPossibleMoves: (board: Board) => [number, number][] = (board) => {
        const [pos_x, pos_y] = this.position;
        assertPositionBounds([pos_x, pos_y]);
        let possibleMoves: [number, number][] = [];
        possibleMoves.push([pos_x + 2, pos_y - 1]);
        possibleMoves.push([pos_x + 2, pos_y + 1]);
        possibleMoves.push([pos_x - 2, pos_y - 1]);
        possibleMoves.push([pos_x - 2, pos_y + 1]);
        possibleMoves.push([pos_x - 1, pos_y + 2]);
        possibleMoves.push([pos_x + 1, pos_y + 2]);
        possibleMoves.push([pos_x - 1, pos_y - 2]);
        possibleMoves.push([pos_x + 1, pos_y - 2]);
        possibleMoves = possibleMoves.filter((move) => {
            // Check bounds
            if (move[0] < 0 || move[0] > 7) {
                return false;
            }
            if (move[1] < 0 || move[1] > 7) {
                return false;
            }

            // target having piece of same color is not allowed
            const valueAtpos = board.getValueAtPos(move[0], move[1]);
            if (valueAtpos !== null && valueAtpos.color === this.color) {
                return false;
            }
            return true;
        });
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
    isThreateningAtXY: (pos_x: number, pos_y: number, board: Board) => boolean =
        (pos_x, pos_y) => {
            assertPositionBounds([pos_x, pos_y]);
            if (
                Math.abs(pos_x - this.position[0]) == 1 &&
                Math.abs(pos_y - this.position[1]) == 2
            ) {
                return true;
            }
            if (
                Math.abs(pos_x - this.position[0]) == 2 &&
                Math.abs(pos_y - this.position[1]) == 1
            ) {
                return true;
            }
            return false;
        };
    clone: () => ChessPiece = () => {
        return new Knight({
            color: this.color,
            pos: JSON.parse(JSON.stringify(this.position)),
        });
    };
}

export { Knight };
