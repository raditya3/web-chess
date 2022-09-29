import { Board } from '../Board';
import { Params } from './Types';
import * as PieceClasses from './all-pieces';
/**
 * TODO: Add test cases for each piece. Will probably use jest
 */
abstract class ChessPiece {
    constructor(params: Params) {
        this.position = params.pos;
        this.color = params.color;
    }
    /**
     * @returns returns all possible moves
     */
    abstract getPossibleMoves: (
        pos_x: number,
        pos_y: number,
        board: Board
    ) => [number, number][];
    name: string;
    position: [number, number];
    color: 'white' | 'black';
    /**
     * @returns will kill at provided position
     */
    abstract isThreateningAtXY: (
        pos_x: number,
        pos_y: number,
        board: Board
    ) => boolean;
    /**
     * @returns clone piece and returns a de-referenced obj
     */
    abstract clone: () => ChessPiece;
    stringify = (): string => {
        return JSON.stringify({
            position: JSON.stringify(this.position),
            name: this.name,
            color: this.color,
        });
    };
    static parse = (literal: string): ChessPiece => {
        const parsedParam = JSON.parse(literal);
        for (const key of Object.keys(PieceClasses)) {
            if (key.toLowerCase() === parsedParam.name.toLowerCase()) {
                return new PieceClasses[key]({
                    color: parsedParam.color,
                    pos: JSON.parse(parsedParam.position),
                }) as ChessPiece;
            }
        }
        throw new Error(`Cannor parse literal ${literal}`);
    };
}

export { ChessPiece };
