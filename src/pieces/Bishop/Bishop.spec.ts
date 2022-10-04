import { Board } from '../../Board';
import { Bishop } from './Bishop';

describe('test movement on empty board', () => {
    let board;
    beforeEach(() => {
        board = new Board();
    });

    const actualPossibleMoves = (initPos: [number, number]) =>
        [
            ...(() => {
                const moves = [];
                for (
                    let i = initPos[0] + 1, j = initPos[1] + 1;
                    i <= 7 && j <= 7 && i >= 0 && j >= 0;
                    i++, j++
                ) {
                    moves.push([i, j]);
                }
                return moves;
            })(),
            ...(() => {
                const moves = [];
                for (
                    let i = initPos[0] - 1, j = initPos[1] - 1;
                    i <= 7 && j <= 7 && i >= 0 && j >= 0;
                    i--, j--
                ) {
                    moves.push([i, j]);
                }
                return moves;
            })(),
            ...(() => {
                const moves = [];
                for (
                    let i = initPos[0] + 1, j = initPos[1] - 1;
                    i <= 7 && j <= 7 && i >= 0 && j >= 0;
                    i++, j--
                ) {
                    moves.push([i, j]);
                }
                return moves;
            })(),
            ...(() => {
                const moves = [];
                for (
                    let i = initPos[0] - 1, j = initPos[1] + 1;
                    i <= 7 && j <= 7 && i >= 0 && j >= 0;
                    i--, j++
                ) {
                    moves.push([i, j]);
                }
                return moves;
            })(),
        ].map((m) => `${m[0]}_${m[1]}`);
    test('test movement from 4,4', () => {
        const initPos: [number, number] = [4, 4];
        const bishopPiece = new Bishop({ color: 'white', pos: initPos });
        board.addChessPiece(bishopPiece);
        const possibleMoves = bishopPiece
            .getPossibleMoves(initPos[0], initPos[1], board)
            .map((m) => `${m[0]}_${m[1]}`);

        expect(possibleMoves.length).toEqual(
            actualPossibleMoves(initPos).length
        );
        possibleMoves.forEach((move) => {
            expect(actualPossibleMoves(initPos).includes(move)).toBeTruthy();
        });
        board.removeXY(...bishopPiece.position);
    });

    test('test movement from 6,1', () => {
        const initPos: [number, number] = [6, 1];
        const bishopPiece = new Bishop({ color: 'white', pos: initPos });

        board.addChessPiece(bishopPiece);
        const possibleMoves = bishopPiece
            .getPossibleMoves(initPos[0], initPos[1], board)
            .map((m) => `${m[0]}_${m[1]}`);
        expect(possibleMoves.length).toEqual(
            actualPossibleMoves(initPos).length
        );
        possibleMoves.forEach((move) => {
            expect(actualPossibleMoves(initPos).includes(move)).toBeTruthy();
        });
        board.removeXY(...bishopPiece.position);
    });
});
