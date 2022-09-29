import { Board } from './Board';
import { Config } from './config';
import { ChessPiece } from './pieces/ChessPiece';

const PREDICTION_DEPTH = Config.PREDICTION_DEPTH;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = (msg: string, type: 'string' | 'board') => {
    postMessage({
        type: 'logging',
        data: {
            response: msg,
            type,
        },
    });
};

const updateProgress = (value: number, max: number) => {
    postMessage({
        type: 'progress',
        data: {
            value,
            max,
        },
    });
};

const scoreWeightage = {
    pawn: 1,
    knight: 2,
    bishop: 3,
    rook: 3,
    queen: 7,
    king: 4,
};
const getMoveScore = (
    color: 'white' | 'black',
    board: Board,
    depth = 0,
    nPiece: ChessPiece = null,
    nPos_x = -1,
    nPos_y = -1
): [number, ChessPiece, number, number] => {
    if (depth > PREDICTION_DEPTH) {
        return [0, nPiece, nPos_x, nPos_y];
    }
    if (depth === 0) {
        updateProgress(0, 100);
    }
    let selectedPiece = null;
    let newPos_x = -1;
    let newPos_y = -1;
    let maxScore = -500;
    const enemy_color = color === 'white' ? 'black' : 'white';
    const allFriendlyPieces = board
        .getAllPieces()
        .filter((p) => p.color === color);
    allFriendlyPieces.forEach((_piece, _piece_idx) => {
        if (maxScore > 1000) {
            return;
        }
        const allPossibleMoves = _piece.getPossibleMoves(
            _piece.position[0],
            _piece.position[1],
            board
        );
        allPossibleMoves.forEach((move) => {
            if (maxScore > 1000) {
                return;
            }
            const newBoard = board.clone();
            const targetPiece = newBoard.getValueAtPos(move[0], move[1]);
            // Safety check to not target friendly
            if (targetPiece && targetPiece.color === color) {
                throw new Error('Invalid target');
            }

            // Calculate immidiate gain from that move
            const killScore: number = targetPiece
                ? scoreWeightage[targetPiece.name]
                : 0;

            // Perform next move simulation
            newBoard.movePiece(_piece, move[0], move[1]);

            // TODO: It gets stuck here for some reason
            const isCheckMate = newBoard.detectCheckMate();
            // Do not even consider the move if it results in loosing;
            if (isCheckMate && isCheckMate.color === color) {
                return;
            }

            // Go for the victory kill
            if (isCheckMate && isCheckMate.color === enemy_color) {
                maxScore = 2000;
                newPos_x = move[0];
                newPos_y = move[1];
                selectedPiece = _piece;
                return;
            }
            // Calculate worst loss from that move
            const lossScore = getMoveScore(enemy_color, newBoard, depth + 1)[0];
            const tScore = killScore - lossScore;
            if (maxScore < tScore) {
                maxScore = tScore;
                newPos_x = move[0];
                newPos_y = move[1];
                selectedPiece = _piece;
            }
        });
        if (depth === 0) {
            updateProgress(_piece_idx + 1, allFriendlyPieces.length);
        }
    });
    return [
        maxScore,
        nPiece === null ? selectedPiece : nPiece,
        nPos_x === -1 ? newPos_x : nPos_x,
        nPos_y === -1 ? newPos_y : nPos_y,
    ];
};

onmessage = function (event) {
    const processType = event.data.work;
    const data = event.data.data;
    let response = [];
    switch (processType) {
        case 'machine_next_move': {
            const color = data.color;
            const board = Board.parse(data.board);
            const result = getMoveScore(color, board);
            response = [result[1].stringify(), result[2], result[3]];
            postMessage({
                type: 'result',
                data: {
                    response,
                },
            });
            break;
        }
    }
};
