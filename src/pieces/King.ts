import { Board } from '../Board';
import { assertPositionBounds } from '../utils/check-position-bounds';
import { ChessPiece } from './ChessPiece';
import { Params } from './Types';
export const checkCastlingPossible = (
    piece: ChessPiece,
    pos_x: number,
    pos_y: number,
    board: Board
): boolean => {
    if (pos_x >= 7 || pos_x <= 0 || pos_y > 7 || pos_y < 0) {
        return false;
    }
    if (!piece || piece.name !== 'king') {
        return false;
    }
    if (
        !(
            piece.position[1] === pos_y &&
            Math.abs(piece.position[0] - pos_x) == 2
        )
    ) {
        return false;
    }

    if (
        pos_x > piece.position[0] &&
        !(
            !!board.getValueAtPos(pos_x + 1, pos_y) &&
            board.getValueAtPos(pos_x + 1, pos_y).name == 'rook' &&
            board.getValueAtPos(pos_x + 1, pos_y).color === piece.color
        )
    ) {
        return false;
    }
    if (
        pos_x < piece.position[0] &&
        !(
            !!board.getValueAtPos(pos_x - 1, pos_y) &&
            board.getValueAtPos(pos_x - 1, pos_y).name == 'rook' &&
            board.getValueAtPos(pos_x - 1, pos_y).color === piece.color
        )
    ) {
        return false;
    }
    if (pos_x > piece.position[0]) {
        if (
            !!board.getValueAtPos(piece.position[0] + 1, piece.position[1]) ||
            !!board.getValueAtPos(piece.position[0] + 2, piece.position[1])
        ) {
            return false;
        }
    }
    if (pos_x < piece.position[0]) {
        if (
            !!board.getValueAtPos(piece.position[0] - 1, piece.position[1]) ||
            !!board.getValueAtPos(piece.position[0] - 2, piece.position[1])
        ) {
            return false;
        }
    }
    return true;
};
class King extends ChessPiece {
    constructor(param: Params) {
        super(param);
        this.name = 'king';
    }

    getPossibleMoves: (
        pos_x: number,
        pos_y: number,
        board: Board
    ) => [number, number][] = (pos_x, pos_y, board) => {
        assertPositionBounds([pos_x, pos_y]);
        const possibleMoves: [number, number][] = [];
        possibleMoves.push([pos_x, pos_y + 1]);
        possibleMoves.push([pos_x, pos_y - 1]);
        possibleMoves.push([pos_x + 1, pos_y]);
        possibleMoves.push([pos_x - 1, pos_y]);
        possibleMoves.push([pos_x + 1, pos_y + 1]);
        possibleMoves.push([pos_x + 1, pos_y - 1]);
        possibleMoves.push([pos_x - 1, pos_y + 1]);
        possibleMoves.push([pos_x - 1, pos_y - 1]);

        if (checkCastlingPossible(this, pos_x + 2, pos_y, board)) {
            possibleMoves.push([pos_x + 2, pos_y]);
        }
        if (checkCastlingPossible(this, pos_x - 2, pos_y, board)) {
            possibleMoves.push([pos_x - 2, pos_y]);
        }

        return possibleMoves.filter((move) => {
            // Check bounds
            if (move[0] < 0 || move[0] > 7 || move[1] < 0 || move[1] > 7) {
                return false;
            }
            const targetValue = board.getValueAtPos(move[0], move[1]);
            if (targetValue && targetValue.color === this.color) {
                return false;
            }
            if (
                board.isThreatenedAtXY(
                    move[0],
                    move[1],
                    this.color === 'white' ? 'black' : 'white'
                ).length > 0
            ) {
                return false;
            }
            return true;
        });
    };
    name: string;
    position: [number, number];
    color: 'white' | 'black';
    isThreateningAtXY: (pos_x: number, pos_y: number, board: Board) => boolean =
        (pos_x, pos_y, board) => {
            assertPositionBounds([pos_x, pos_y]);
            if (
                Math.abs(pos_x - this.position[0]) <= 1 &&
                Math.abs(pos_y - this.position[1]) <= 1
            ) {
                return true;
            }
            return false;
        };
    clone: () => ChessPiece = () => {
        return new King({
            color: this.color,
            pos: JSON.parse(JSON.stringify(this.position)),
        });
    };
}

export { King };
