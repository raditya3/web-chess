import { Board } from '../Board';
import { King } from '../pieces/King';
import { Rook } from '../pieces/Rook';

describe('check castling of the king', () => {
    let board: Board = null;
    beforeEach(() => {
        board = new Board();
    });
    test('if castling is possible at all', () => {
        const rook = new Rook({ color: 'white', pos: [1, 7] });
        const king = new King({ color: 'white', pos: [4, 7] });
        board.addChessPiece(rook);
        board.addChessPiece(king);
        const possibleMoves = king
            .getPossibleMoves(board)
            .map((m) => `${m[0]}_${m[1]}`);
        expect(possibleMoves.includes(`2_7`)).toBeTruthy();
    });
    test('castling should not be possible if king is threatened', () => {
        const rook = new Rook({ color: 'white', pos: [0, 7] });
        const king = new King({ color: 'white', pos: [3, 7] });
        const blackRook = new Rook({ color: 'black', pos: [3, 5] });
        board.addChessPiece(rook);
        board.addChessPiece(king);
        board.addChessPiece(blackRook);
        const possibleMoves = king
            .getPossibleMoves(board)
            .map((m) => `${m[0]}_${m[1]}`);
        expect(possibleMoves.includes(`1_7`)).toBeFalsy();
    });
    test('castling should not be possible if rook is moved', () => {
        const rook = new Rook({ color: 'white', pos: [0, 7] });
        const king = new King({ color: 'white', pos: [4, 7] });
        board.addChessPiece(rook);
        board.addChessPiece(king);
        board.movePiece(rook, 1, 7);
        const possibleMoves = king
            .getPossibleMoves(board)
            .map((m) => `${m[0]}_${m[1]}`);
        expect(possibleMoves.includes(`2_7`)).toBeFalsy();
    });
    test('castling should not be possible if king is moved', () => {
        const rook = new Rook({ color: 'white', pos: [0, 7] });
        const king = new King({ color: 'white', pos: [4, 7] });
        board.addChessPiece(rook);
        board.addChessPiece(king);
        board.movePiece(king, 3, 7);
        const repositionedWhiteKing = board.getValueAtPos(3, 7);
        const possibleMoves = repositionedWhiteKing
            .getPossibleMoves(board)
            .map((m) => `${m[0]}_${m[1]}`);
        expect(possibleMoves.includes(`1_7`)).toBeFalsy();
    });
});
