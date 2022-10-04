import { ChessPiece } from './pieces/ChessPiece';
import { getImage } from './utils/get-image';
import * as PieceClasses from './pieces/all-pieces';
import { checkCastlingPossible } from './pieces/King';
import { constructChessPiecefromLiteral } from './utils/chess-piece-factory';

/**
 * Todo: Implement pawn promotion logic
 */

class Board {
    private pieces: ChessPiece[] = [];
    private dynamicValueAtPos: { [key: string]: ChessPiece } = {};
    private isInCheckedState: [ChessPiece, ChessPiece[]] | null = null;
    private validMovesInCheck: {
        position: [number, number];
        piece: ChessPiece;
    }[] = [];
    public clone = () => {
        const newBoard = new Board();
        this.pieces.forEach((piece) => {
            newBoard.addChessPiece(piece.clone());
        });

        return newBoard;
    };

    public getAllPieces = (): ChessPiece[] => {
        return this.pieces.map((v) => v.clone());
    };
    public validMove = (piece: ChessPiece, pos_x, pos_y): boolean => {
        const possibleMoves = piece.getPossibleMoves(
            piece.position[0],
            piece.position[1],
            this
        );
        const validated = !!possibleMoves.find(
            (move) => move[0] === pos_x && move[1] === pos_y
        );
        return validated;
    };
    public movePiece = (
        piece: ChessPiece,
        pos_x,
        pos_y,
        unsafe = false
    ): boolean => {
        const validated = unsafe ? true : this.validMove(piece, pos_x, pos_y);
        if (validated) {
            if (!this.validateChessPiece(piece)) {
                throw new Error(
                    `Piece not present : ${piece.name} ${piece.position}`
                );
            }
            const currentPiece = piece.clone();
            const originalPos_x = piece.position[0];
            const originalPos_y = piece.position[1];
            if (
                currentPiece.name === 'king' &&
                Math.abs(pos_x - currentPiece.position[0]) == 2
            ) {
                if (checkCastlingPossible(currentPiece, pos_x, pos_y, this)) {
                    const incr = pos_x > currentPiece.position[0] ? +1 : -1;
                    const rookPiecePos_x = pos_x + incr;
                    const rookPiece = this.getValueAtPos(rookPiecePos_x, pos_y);
                    if (rookPiece) {
                        // reposition rook
                        this.removeXY(...rookPiece.position);
                        rookPiece.position[0] =
                            rookPiece.position[0] - incr * 2;
                        this.addChessPiece(rookPiece);

                        // reposition king
                        this.removeXY(...currentPiece.position);
                        currentPiece.position[0] =
                            currentPiece.position[0] + 2 * incr;
                        this.addChessPiece(currentPiece);
                        return true;
                    } else {
                        throw new Error('Invalid Castling');
                    }
                }
            }
            this.removeXY(originalPos_x, originalPos_y);
            const valueAtNewPos = this.getValueAtPos(pos_x, pos_y);
            if (valueAtNewPos !== null) {
                this.removeXY(
                    valueAtNewPos.position[0],
                    valueAtNewPos.position[1]
                );
            }
            currentPiece.position[0] = pos_x;
            currentPiece.position[1] = pos_y;
            if (currentPiece.name === 'rook' || currentPiece.name === 'king') {
                currentPiece.specialInfo['moved'] = true;
            }
            this.addChessPiece(currentPiece);
            this.isInCheckedState = null;
            if (piece.name === 'king') {
                this.validMovesInCheck = [];
            }
            return true;
        } else if (!validated) {
            throw new Error(
                `Invalid Move for : ${piece.name} ${piece.position}`
            );
        }
        return false;
    };
    public validateChessPiece = (piece: ChessPiece): boolean => {
        return !!this.pieces.find(
            (arrayPiece) =>
                piece.position[0] === arrayPiece.position[0] &&
                piece.position[1] === arrayPiece.position[1]
        );
    };
    public get2dView = (): ChessPiece['name'][][] => {
        const boardLayout = [];
        for (let j = 0; j < 8; j++) {
            boardLayout.push([]);
            for (let i = 0; i < 8; i++) {
                const _val = this.getValueAtPos(i, j);
                if (_val) {
                    boardLayout[j].push(`${_val.name}_${_val.color}`);
                } else {
                    boardLayout[j].push(` `);
                }
            }
        }
        return boardLayout;
    };
    public getValueAtPos(pos_x: number, pos_y: number): ChessPiece | null {
        if (this.dynamicValueAtPos[`${pos_x}_${pos_y}`] !== undefined) {
            return this.dynamicValueAtPos[`${pos_x}_${pos_y}`];
        }
        if (pos_x >= 8 || pos_x < 0) {
            throw new Error(`Wrong x position requested ${pos_x}`);
        }
        if (pos_y >= 8 || pos_y < 0) {
            throw new Error(`Wrong y position requested ${pos_y}`);
        }
        for (let i = 0; i < this.pieces.length; i++) {
            if (
                this.pieces[i].position[0] === pos_x &&
                this.pieces[i].position[1] === pos_y
            ) {
                this.dynamicValueAtPos[`${pos_x}_${pos_y}`] = this.pieces[i];
                return this.pieces[i];
            }
        }
        this.dynamicValueAtPos[`${pos_x}_${pos_y}`] = undefined;
        return null;
    }
    public addChessPiece(piece: ChessPiece) {
        this.isInCheckedState = null;
        this.pieces.push(piece);
        this.dynamicValueAtPos[`${piece.position[0]}_${piece.position[1]}`] =
            piece;
    }

    public removeXY(pos_x: number, pos_y: number) {
        const piece = this.getValueAtPos(pos_x, pos_y);
        if (!piece) {
            throw new Error(`Not piece found at position : ${[pos_x, pos_y]}`);
        }
        if (pos_x >= 8 || pos_x < 0) {
            throw new Error(`Wrong x position requested ${pos_x}`);
        }
        if (pos_y >= 8 || pos_y < 0) {
            throw new Error(`Wrong y position requested ${pos_y}`);
        }
        this.dynamicValueAtPos[`${pos_x}_${pos_y}`] = undefined;
        this.pieces = this.pieces.filter(
            (piece) =>
                piece.position[0] !== pos_x || piece.position[1] !== pos_y
        );
        this.isInCheckedState = null;
    }

    public async render(highlightCell?: [number, number]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const highlightCell_x = highlightCell ? highlightCell[0] : -1;
        const highlightCell_y = highlightCell ? highlightCell[1] : -1;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (highlightCell_x === i && highlightCell_y === j) {
                    ctx.fillStyle = '#AA0000';
                    ctx.fillRect(
                        i * CELL_WIDTH,
                        j * CELL_HEIGHT,
                        CELL_WIDTH,
                        CELL_HEIGHT
                    );
                } else if ((i + j) % 2 !== 0) {
                    ctx.fillStyle = '#727261';
                    ctx.fillRect(
                        i * CELL_WIDTH,
                        j * CELL_HEIGHT,
                        CELL_WIDTH,
                        CELL_HEIGHT
                    );
                }
            }
        }
        await Promise.all(
            this.pieces.map(async (piece) => {
                const im = await getImage(piece.color, piece.name);
                ctx.drawImage(
                    im,
                    piece.position[0] * CELL_WIDTH,
                    piece.position[1] * CELL_HEIGHT,
                    CELL_WIDTH,
                    CELL_HEIGHT
                );
            })
        );
    }
    /**
     *
     * @param pos_x
     * @param pos_y
     * @param enemy_color
     * @returns Piece threatening to kill
     */
    public isThreatenedAtXY = (
        pos_x: number,
        pos_y: number,
        enemy_color: 'white' | 'black'
    ): ChessPiece[] => {
        return this.pieces
            .filter((p) => p.color === enemy_color)
            .filter((currentPiece) => {
                // Piece cannot threaten its own spot
                if (
                    currentPiece.position[0] === pos_x &&
                    currentPiece.position[1] === pos_y
                ) {
                    return false;
                }
                const res = currentPiece.isThreateningAtXY(pos_x, pos_y, this);
                return res;
            });
    };
    /**
     * @description detects check condition on board
     * @returns [target king, killer piece]
     */
    public detectCheck = (): [ChessPiece, ChessPiece[]] => {
        if (this.isInCheckedState !== null) {
            return this.isInCheckedState;
        }
        let killerPieces: ChessPiece[] = [];
        const targetKing = this.pieces
            .filter((p) => p.name === 'king')
            .find((kingPiece): boolean => {
                const enemy_color =
                    kingPiece.color === 'white' ? 'black' : 'white';
                killerPieces = this.isThreatenedAtXY(
                    kingPiece.position[0],
                    kingPiece.position[1],
                    enemy_color
                );
                return killerPieces.length > 0;
            });
        if (!!targetKing && killerPieces.length > 0) {
            this.isInCheckedState = [targetKing, killerPieces];
        } else {
            this.isInCheckedState = [targetKing, killerPieces];
        }
        this.validMovesInCheck = [];
        return [targetKing, killerPieces];
    };

    public checkAllpossibilitiesOfKingsSurvival = (
        king: ChessPiece
    ): {
        position: [number, number];
        piece: ChessPiece;
    }[] => {
        if (this.validMovesInCheck.length > 0) {
            return this.validMovesInCheck;
        }
        const enemy_color = king.color === 'white' ? 'black' : 'white';
        if (
            this.isThreatenedAtXY(
                king.position[0],
                king.position[1],
                enemy_color
            ).length === 0
        ) {
            throw new Error(`King is not threatened ${king.position}`);
        }
        const possibilities = [];
        const friendlyPieces = this.pieces.filter(
            (p) => p.color === king.color
        );
        friendlyPieces.forEach((piece) => {
            const allPossibleMoves = piece.getPossibleMoves(
                piece.position[0],
                piece.position[1],
                this
            );
            allPossibleMoves.forEach((move) => {
                const newBoard = this.clone();
                newBoard.movePiece(piece, move[0], move[1]);
                const result = newBoard.detectCheck()[0];
                if (!result || result.color === enemy_color) {
                    possibilities.push({
                        position: move,
                        piece: piece,
                    });
                }
            });
        });
        this.validMovesInCheck = possibilities;
        return possibilities;
    };

    public detectCheckMate = (): ChessPiece => {
        const [targetKing, killerPieces] = this.detectCheck();
        if (!killerPieces) {
            throw new Error(
                'how is king threatened if there is no one to kill him?'
            );
        }
        if (!targetKing) {
            return null;
        }
        let possibilitiesOfSurvival = [];

        if (targetKing) {
            possibilitiesOfSurvival =
                this.checkAllpossibilitiesOfKingsSurvival(targetKing);
        }
        if (possibilitiesOfSurvival.length === 0) {
            return targetKing;
        }
        return null;
    };

    public stringify = (): string => {
        const tmp_dynamicValueAtPos: { [key: string]: string } = {};
        const tmp_isInCheckedState: [string, string[]] | null =
            this.isInCheckedState === null
                ? null
                : [
                      this.isInCheckedState[0].stringify(),
                      this.isInCheckedState[1].map((v) => v.stringify()),
                  ];
        Object.keys(this.dynamicValueAtPos).forEach((v) => {
            if (this.dynamicValueAtPos[v] === undefined) {
                return;
            }
            tmp_dynamicValueAtPos[v] = this.dynamicValueAtPos[v].stringify();
        });

        return JSON.stringify({
            pieces: JSON.stringify(this.pieces.map((p) => p.stringify())),
            dynamicValueAtPos: tmp_dynamicValueAtPos,
            isInCheckedState: tmp_isInCheckedState,
        });
    };
    public static parse = (literal: string): Board => {
        const parsedLiteral: {
            pieces: string;
            dynamicValueAtPos: { [key: string]: string };
            isInCheckedState: [string, string[]] | null;
        } = JSON.parse(literal);
        const nBoard = new Board();
        (JSON.parse(parsedLiteral.pieces) as string[])
            .map((v) => {
                const pieceData: {
                    position: string;
                    name: string;
                    color: string;
                } = JSON.parse(v);
                for (const key of Object.keys(PieceClasses)) {
                    if (key.toLowerCase() === pieceData.name.toLowerCase()) {
                        return new PieceClasses[key]({
                            color: pieceData.color,
                            pos: JSON.parse(pieceData.position),
                        }) as ChessPiece;
                    }
                }
                return null;
            })
            .forEach((p) => {
                if (!p) {
                    return;
                }
                nBoard.addChessPiece(p);
            });
        Object.keys(parsedLiteral.dynamicValueAtPos).forEach((v) => {
            nBoard.dynamicValueAtPos[v] = constructChessPiecefromLiteral(
                parsedLiteral.dynamicValueAtPos[v]
            );
        });
        const isInCheckedState: [ChessPiece, ChessPiece[]] =
            parsedLiteral.isInCheckedState === null
                ? null
                : [
                      constructChessPiecefromLiteral(
                          parsedLiteral.isInCheckedState[0]
                      ),
                      parsedLiteral.isInCheckedState[1].map((v) =>
                          constructChessPiecefromLiteral(v)
                      ),
                  ];

        nBoard.isInCheckedState = isInCheckedState;
        return nBoard;
    };
}

export { Board };
