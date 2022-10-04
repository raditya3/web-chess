import { Board } from '../Board';
import { King } from '../pieces/King';
import { Rook } from '../pieces/Rook';

describe('check castling of the king', () => {
    let board: Board = null;
    beforeEach(() => {
        board = new Board();
    });
    test('if castling is possible at all', () => {
        const rook = new Rook({ color: 'white', pos: [0, 7] });
        const king = new King({ color: 'white', pos: [3, 7] });
        board.addChessPiece(rook);
        board.addChessPiece(king);
        const possibleMoves = king
            .getPossibleMoves(king.position[0], king.position[1], board)
            .map((m) => `${m[0]}_${m[1]}`);
        console.table(board.get2dView());
        expect(possibleMoves.includes(`1_7`)).toBeTruthy();
    });
    test('castling should not be possible if king is threatened', () => {
        const rook = new Rook({ color: 'white', pos: [0, 7] });
        const king = new King({ color: 'white', pos: [3, 7] });
        const blackRook = new Rook({ color: 'black', pos: [3, 5] });
        board.addChessPiece(rook);
        board.addChessPiece(king);
        board.addChessPiece(blackRook);
        const possibleMoves = king
            .getPossibleMoves(king.position[0], king.position[1], board)
            .map((m) => `${m[0]}_${m[1]}`);
        console.table(board.get2dView());
        expect(possibleMoves.includes(`1_7`)).toBeFalsy();
    });
});
