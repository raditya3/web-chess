import { Board } from '../Board';
const literal1 = JSON.stringify({
    pieces: '["{\\"position\\":\\"[2,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","{\\"position\\":\\"[4,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","{\\"position\\":\\"[7,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","{\\"position\\":\\"[1,0]\\",\\"name\\":\\"knight\\",\\"color\\":\\"white\\"}","{\\"position\\":\\"[7,0]\\",\\"name\\":\\"rook\\",\\"color\\":\\"white\\",\\"specialInfo\\":{}}","{\\"position\\":\\"[7,7]\\",\\"name\\":\\"rook\\",\\"color\\":\\"black\\",\\"specialInfo\\":{}}","{\\"position\\":\\"[6,2]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","{\\"position\\":\\"[2,5]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","{\\"position\\":\\"[1,5]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","{\\"position\\":\\"[3,5]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","{\\"position\\":\\"[5,5]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","{\\"position\\":\\"[2,6]\\",\\"name\\":\\"king\\",\\"color\\":\\"black\\",\\"specialInfo\\":{\\"moved\\":true}}","{\\"position\\":\\"[7,5]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","{\\"position\\":\\"[3,4]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","{\\"name\\":\\"bishop\\",\\"color\\":\\"black\\",\\"position\\":\\"[6,6]\\"}","{\\"position\\":\\"[1,4]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","{\\"position\\":\\"[5,1]\\",\\"name\\":\\"knight\\",\\"color\\":\\"white\\"}","{\\"position\\":\\"[3,1]\\",\\"name\\":\\"king\\",\\"color\\":\\"white\\",\\"specialInfo\\":{\\"moved\\":true}}","{\\"position\\":\\"[6,4]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","{\\"position\\":\\"[4,2]\\",\\"name\\":\\"queen\\",\\"color\\":\\"white\\"}","{\\"name\\":\\"bishop\\",\\"color\\":\\"white\\",\\"position\\":\\"[0,0]\\"}","{\\"position\\":\\"[0,7]\\",\\"name\\":\\"queen\\",\\"color\\":\\"black\\"}"]',
    dynamicValueAtPos: {
        '2_1': '{"position":"[2,1]","name":"pawn","color":"white"}',
        '4_1': '{"position":"[4,1]","name":"pawn","color":"white"}',
        '7_1': '{"position":"[7,1]","name":"pawn","color":"white"}',
        '1_0': '{"position":"[1,0]","name":"knight","color":"white"}',
        '7_0': '{"position":"[7,0]","name":"rook","color":"white","specialInfo":{}}',
        '7_7': '{"position":"[7,7]","name":"rook","color":"black","specialInfo":{}}',
        '6_2': '{"position":"[6,2]","name":"pawn","color":"white"}',
        '2_5': '{"position":"[2,5]","name":"pawn","color":"black"}',
        '1_5': '{"position":"[1,5]","name":"pawn","color":"black"}',
        '3_5': '{"position":"[3,5]","name":"pawn","color":"black"}',
        '5_5': '{"position":"[5,5]","name":"pawn","color":"black"}',
        '2_6': '{"position":"[2,6]","name":"king","color":"black","specialInfo":{"moved":true}}',
        '7_5': '{"position":"[7,5]","name":"pawn","color":"black"}',
        '3_4': '{"position":"[3,4]","name":"pawn","color":"black"}',
        '6_6': '{"name":"bishop","color":"black","position":"[6,6]"}',
        '1_4': '{"position":"[1,4]","name":"pawn","color":"white"}',
        '5_1': '{"position":"[5,1]","name":"knight","color":"white"}',
        '3_1': '{"position":"[3,1]","name":"king","color":"white","specialInfo":{"moved":true}}',
        '6_4': '{"position":"[6,4]","name":"pawn","color":"black"}',
        '4_2': '{"position":"[4,2]","name":"queen","color":"white"}',
        '0_0': '{"name":"bishop","color":"white","position":"[0,0]"}',
        '0_7': '{"position":"[0,7]","name":"queen","color":"black"}',
    },
    isInCheckedState: [],
});
const literal2 =
    '{"pieces":"[\\"{\\\\\\"position\\\\\\":\\\\\\"[2,1]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[4,1]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[7,1]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[1,0]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"knight\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[6,2]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[2,0]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"king\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\",\\\\\\"specialInfo\\\\\\":{\\\\\\"moved\\\\\\":true}}\\",\\"{\\\\\\"name\\\\\\":\\\\\\"bishop\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\",\\\\\\"position\\\\\\":\\\\\\"[2,2]\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[4,0]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"rook\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\",\\\\\\"specialInfo\\\\\\":{\\\\\\"moved\\\\\\":true}}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[7,4]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[6,3]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[0,1]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"queen\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[4,5]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"king\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\",\\\\\\"specialInfo\\\\\\":{\\\\\\"moved\\\\\\":true}}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[7,6]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"queen\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[1,4]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\"}\\"]","dynamicValueAtPos":{"2_1":"{\\"position\\":\\"[2,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","4_1":"{\\"position\\":\\"[4,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","7_1":"{\\"position\\":\\"[7,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","1_0":"{\\"position\\":\\"[1,0]\\",\\"name\\":\\"knight\\",\\"color\\":\\"white\\"}","6_2":"{\\"position\\":\\"[6,2]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","2_0":"{\\"position\\":\\"[2,0]\\",\\"name\\":\\"king\\",\\"color\\":\\"white\\",\\"specialInfo\\":{\\"moved\\":true}}","2_2":"{\\"name\\":\\"bishop\\",\\"color\\":\\"white\\",\\"position\\":\\"[2,2]\\"}","4_0":"{\\"position\\":\\"[4,0]\\",\\"name\\":\\"rook\\",\\"color\\":\\"white\\",\\"specialInfo\\":{\\"moved\\":true}}","7_4":"{\\"position\\":\\"[7,4]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","6_3":"{\\"position\\":\\"[6,3]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}","0_1":"{\\"position\\":\\"[0,1]\\",\\"name\\":\\"queen\\",\\"color\\":\\"black\\"}","4_5":"{\\"position\\":\\"[4,5]\\",\\"name\\":\\"king\\",\\"color\\":\\"black\\",\\"specialInfo\\":{\\"moved\\":true}}","7_6":"{\\"position\\":\\"[7,6]\\",\\"name\\":\\"queen\\",\\"color\\":\\"white\\"}","1_4":"{\\"position\\":\\"[1,4]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"black\\"}"},"isInCheckedState":[]}';
describe('test check situations', () => {
    test('check if queen is not stupid and sacrifice king to kill a lowly creatureS', () => {
        const board = Board.parse(literal1);
        const blackQueen = board.getValueAtPos(0, 7);
        const whiteQueen = board.getValueAtPos(4, 2);
        board.movePiece(whiteQueen, 4, 6);
        const possibleMoves = blackQueen.getPossibleMoves(
            blackQueen.position[0],
            blackQueen.position[1],
            board
        );
        expect(possibleMoves.length).toBe(0);
    });

    test('check if king is not stupid and moves out of the harms way', () => {
        const board = Board.parse(literal2);
        const whiteQueen = board.getValueAtPos(7, 6);
        board.movePiece(whiteQueen, 6, 7);
        const blackQueenPiece = board.getValueAtPos(0, 1);
        const possibleMoves = blackQueenPiece
            .getPossibleMoves(
                blackQueenPiece.position[0],
                blackQueenPiece.position[1],
                board
            )
            .map((m) => `${m[0]}_${m[1]}`);
        expect(possibleMoves.length).toBe(0);
    });

    test('check if king is not stupid and moves out of the harms way', () => {
        const board = Board.parse(literal2);
        const whiteQueen = board.getValueAtPos(7, 6);
        board.movePiece(whiteQueen, 6, 7);
        const blackKingPiece = board.getValueAtPos(4, 5);
        const possibleMoves = blackKingPiece
            .getPossibleMoves(
                blackKingPiece.position[0],
                blackKingPiece.position[1],
                board
            )
            .map((m) => `${m[0]}_${m[1]}`);
        expect(
            possibleMoves.includes(`3_4`) ||
                possibleMoves.includes(`5_6`) ||
                possibleMoves.includes(`5_5`)
        ).toBeFalsy();
    });
});
