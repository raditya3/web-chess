import { Board } from '../Board';
import { getMoveScore } from '../web-worker';

const literal =
    '{"pieces":"[\\"{\\\\\\"position\\\\\\":\\\\\\"[2,1]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[4,1]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[1,0]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"knight\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[2,0]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"king\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\",\\\\\\"specialInfo\\\\\\":{}}\\",\\"{\\\\\\"name\\\\\\":\\\\\\"bishop\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\",\\\\\\"position\\\\\\":\\\\\\"[2,2]\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[6,2]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"pawn\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[5,0]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"rook\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\",\\\\\\"specialInfo\\\\\\":{\\\\\\"moved\\\\\\":true}}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[4,7]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"king\\\\\\",\\\\\\"color\\\\\\":\\\\\\"black\\\\\\",\\\\\\"specialInfo\\\\\\":{\\\\\\"moved\\\\\\":true}}\\",\\"{\\\\\\"position\\\\\\":\\\\\\"[6,6]\\\\\\",\\\\\\"name\\\\\\":\\\\\\"queen\\\\\\",\\\\\\"color\\\\\\":\\\\\\"white\\\\\\"}\\"]","dynamicValueAtPos":{"2_1":"{\\"position\\":\\"[2,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","4_1":"{\\"position\\":\\"[4,1]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","1_0":"{\\"position\\":\\"[1,0]\\",\\"name\\":\\"knight\\",\\"color\\":\\"white\\"}","2_0":"{\\"position\\":\\"[2,0]\\",\\"name\\":\\"king\\",\\"color\\":\\"white\\",\\"specialInfo\\":{}}","2_2":"{\\"name\\":\\"bishop\\",\\"color\\":\\"white\\",\\"position\\":\\"[2,2]\\"}","6_2":"{\\"position\\":\\"[6,2]\\",\\"name\\":\\"pawn\\",\\"color\\":\\"white\\"}","4_7":"{\\"position\\":\\"[4,7]\\",\\"name\\":\\"king\\",\\"color\\":\\"black\\",\\"specialInfo\\":{\\"moved\\":true}}","5_0":"{\\"position\\":\\"[5,0]\\",\\"name\\":\\"rook\\",\\"color\\":\\"white\\",\\"specialInfo\\":{\\"moved\\":true}}","6_6":"{\\"position\\":\\"[6,6]\\",\\"name\\":\\"queen\\",\\"color\\":\\"white\\"}"},"isInCheckedState":[]}';
describe('see if ai has moves for king', () => {
    test('case 1', () => {
        const board = Board.parse(literal);
        const result = getMoveScore('black', board, 0, null, -1, -1, false);

        expect(result[1]).toBeTruthy();
    });
});
