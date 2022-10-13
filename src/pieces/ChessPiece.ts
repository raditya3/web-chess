import { Board } from '../Board';
import { Params } from './Types';
type Primitive = string | boolean | number;
/**
 * TODO: Add test cases for each piece. Will probably use jest
 */
abstract class ChessPiece {
    specialInfo?: { [key: string]: Primitive | Primitive[] };
    constructor(params: Params) {
        this.position = params.pos;
        this.color = params.color;
    }
    /**
     * @returns returns all possible moves
     */
    abstract getPossibleMoves: (board: Board) => [number, number][];
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
            specialInfo: this.specialInfo,
        });
    };
}

export { ChessPiece };
