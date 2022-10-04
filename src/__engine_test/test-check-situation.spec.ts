import { Board } from '../Board';
import { King } from '../pieces/King';
import { Queen } from '../pieces/Queen';
import { Rook } from '../pieces/Rook';

describe('test check situation with queen piece', () => {
    let board: Board = null;
    beforeEach(() => {
        board = new Board();
    });

    test('check if queen is not stupid and sacrifice king to kill a knight', () => {
        const queen = new Queen({
            color: 'black',
            pos: [4, 7],
        });
        const king = new King({
            color: 'black',
            pos: [6, 7],
        });
        const whiteRook = new Rook({
            color: 'white',
            pos: [0, 7],
        });
        const whiteQueen = new Queen({
            color: 'white',
            pos: [4, 0],
        });
        board.addChessPiece(queen);
        board.addChessPiece(king);
        board.addChessPiece(whiteRook);
        board.addChessPiece(whiteQueen);
        const blackQueenPossibleMoves = queen.getPossibleMoves(
            queen.position[0],
            queen.position[1],
            board
        );
        for (const move of blackQueenPossibleMoves) {
            expect(move[1]).toBe(7);
        }
    });
});
