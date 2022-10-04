import { ChessPiece } from '../pieces/ChessPiece';
import * as PieceClasses from '../pieces/all-pieces';
export const constructChessPiecefromLiteral = (literal: string): ChessPiece => {
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
