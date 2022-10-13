import { Board } from '../../Board';
import { assertPositionBounds } from '../../utils/check-position-bounds';
import { ChessPiece } from '../ChessPiece';
import { Params } from '../Types';
export const checkCastlingPossible = (
    piece: ChessPiece,
    pos_x: number,
    pos_y: number,
    board: Board
): boolean => {
    // Check bounds
    if (pos_x >= 7 || pos_x <= 0 || pos_y > 7 || pos_y < 0) {
        return false;
    }
    // Check if piece is king
    if (!piece || piece.name !== 'king') {
        return false;
    }

    // Do not allow castling if king moved
    if (piece.specialInfo['moved']) {
        return false;
    }

    // Do not allow castling if king is threatened
    if (
        board.isThreatenedAtXY(
            piece.position[0],
            piece.position[1],
            piece.color === 'white' ? 'black' : 'white'
        ).length > 0
    ) {
        return false;
    }
    // Check if difference is horizontal and gap is 2 units
    if (
        !(
            piece.position[1] === pos_y &&
            Math.abs(piece.position[0] - pos_x) == 2
        )
    ) {
        return false;
    }
    // Check if complementary piece is a rook of same color and it has not moved
    if (
        pos_x > piece.position[0] &&
        !(
            !!board.getValueAtPos(pos_x + 1, pos_y) &&
            board.getValueAtPos(pos_x + 1, pos_y).name == 'rook' &&
            board.getValueAtPos(pos_x + 1, pos_y).color === piece.color &&
            !board.getValueAtPos(pos_x + 1, pos_y).specialInfo
        )
    ) {
        return false;
    }
    if (
        pos_x < piece.position[0] &&
        !(
            !!board.getValueAtPos(pos_x - 1, pos_y) &&
            board.getValueAtPos(pos_x - 1, pos_y).name == 'rook' &&
            board.getValueAtPos(pos_x - 1, pos_y).color === piece.color &&
            !board.getValueAtPos(pos_x - 1, pos_y).specialInfo['moved']
        )
    ) {
        return false;
    }
    // Check if gap is empty
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
    specialInfo?: {
        [key: string]:
            | (string | number | boolean)
            | (string | number | boolean)[];
    } = {};
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
            const nBoard = board.clone();
            nBoard.movePiece(this, move[0], move[1], true);
            if (
                nBoard.isThreatenedAtXY(
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
        (pos_x, pos_y) => {
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
        const nKing = new King({
            color: this.color,
            pos: JSON.parse(JSON.stringify(this.position)),
        });
        nKing.specialInfo = JSON.parse(JSON.stringify(this.specialInfo));
        return nKing;
    };
}

export { King };
