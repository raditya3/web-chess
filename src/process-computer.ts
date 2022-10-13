import { Board } from './Board';
import { ChessPiece } from './pieces/ChessPiece';
import { constructChessPiecefromLiteral } from './utils/chess-piece-factory';
import { setPercentage } from './utils/util-events';
const webWorker = new Worker('worker.js');
export const performMachineTurn = (board: Board): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        webWorker.postMessage({
            work: 'machine_next_move',
            data: {
                color: 'black',
                board: board.stringify(),
            },
        });
        webWorker.onerror = (err) => {
            reject(err);
        };
        webWorker.onmessage = async (ev) => {
            const res = ev.data;
            const data = res.data;
            switch (res.type) {
                case 'progress': {
                    setPercentage(data.value, data.max);
                    break;
                }
                case 'result': {
                    const response = data.response;
                    if (response[0] !== null) {
                        const piece = constructChessPiecefromLiteral(
                            response[0]
                        );
                        board.movePiece(piece, response[1], response[2]);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                    break;
                }
                case 'logging': {
                    const _response = data.response;
                    const _type: 'string' | 'board' = data.type;
                    if (_type === 'board') {
                        const _board = Board.parse(_response);
                        console.table(_board.get2dView());
                    } else if (_type === 'string') {
                        console.log(_response);
                    }
                    break;
                }
            }
        };
    });
};
