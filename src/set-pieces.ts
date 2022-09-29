import { Board } from './Board';
import { Bishop } from './pieces/Bishop';
import { King } from './pieces/King';
import { Knight } from './pieces/Knight';
import { Pawn } from './pieces/Pawn';
import { Queen } from './pieces/Queen';
import { Rook } from './pieces/Rook';
export function setPieces(board: Board) {
    for (let i = 0; i < 8; i++) {
        board.addChessPiece(
            new Pawn({
                color: 'white',
                pos: [i, 1],
            })
        );

        board.addChessPiece(
            new Pawn({
                color: 'black',
                pos: [i, 6],
            })
        );
    }
    board.addChessPiece(
        new Knight({
            color: 'white',
            pos: [1, 0],
        })
    );
    board.addChessPiece(
        new Knight({
            color: 'white',
            pos: [6, 0],
        })
    );
    board.addChessPiece(
        new Knight({
            color: 'black',
            pos: [6, 7],
        })
    );
    board.addChessPiece(
        new Knight({
            color: 'black',
            pos: [1, 7],
        })
    );
    board.addChessPiece(
        new King({
            color: 'black',
            pos: [3, 7],
        })
    );
    board.addChessPiece(
        new King({
            color: 'white',
            pos: [3, 0],
        })
    );
    board.addChessPiece(
        new Bishop({
            color: 'white',
            pos: [2, 0],
        })
    );
    board.addChessPiece(
        new Bishop({
            color: 'black',
            pos: [2, 7],
        })
    );
    board.addChessPiece(
        new Bishop({
            color: 'white',
            pos: [5, 0],
        })
    );
    board.addChessPiece(
        new Bishop({
            color: 'black',
            pos: [5, 7],
        })
    );
    board.addChessPiece(
        new Rook({
            color: 'white',
            pos: [0, 0],
        })
    );
    board.addChessPiece(
        new Rook({
            color: 'white',
            pos: [7, 0],
        })
    );
    board.addChessPiece(
        new Rook({
            color: 'black',
            pos: [0, 7],
        })
    );
    board.addChessPiece(
        new Rook({
            color: 'black',
            pos: [7, 7],
        })
    );
    board.addChessPiece(
        new Queen({
            color: 'white',
            pos: [4, 0],
        })
    );
    board.addChessPiece(
        new Queen({
            color: 'black',
            pos: [4, 7],
        })
    );
}
