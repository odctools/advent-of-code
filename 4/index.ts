import { readFileSync, createReadStream, read } from "fs";
import * as readline from "readline";
const _ = require("lodash");

const bingoWins = [
    // ROWS
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],

    // COLS
    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
]


const readlines = async (fp: string) => {

    var data;
    try {
        data = readFileSync(fp, 'utf8').split('\n');
    } catch (err) {
        console.error(err)
        return
    }

    const drawings = data[0].split(',').map(s => parseInt(s));
    const boardRows = data.splice(1).map(row => {
        return row.trim().split(' ')
            .filter(v => v != '')
            .map(v => parseInt(v))
    });

    const boards: BoardClass[] = [];
    let board: number[] = [];
    let rowCount = 0;
    for (const row of boardRows) {
        if (row && row.length > 0) {
            board.push(...row)
            rowCount++;
        };

        if (rowCount === 5) {
            boards.push(new BoardClass(board));
            board = [];
            rowCount = 0;
        }
    }

    return {drawings, boards};
};

class BoardClass
{
    board: number[];
    // holds in the indices of the numbers that have been drawn on this board
    drawn: number[];

    constructor(board: number[]) {
        this.board = board;
        this.drawn = [];
    }
}

const draw = async (boards: BoardClass[], num: number) => {
    // iterate through each board and check if the number is in the board
    for (const boardClass of boards) {
        if (boardClass.board.includes(num)) {
            boardClass.drawn.push(boardClass.board.findIndex(v => v === num));
            boardClass.drawn = _.sortBy(boardClass.drawn)
        }
    }
    
    return;
}

const bingo = async (boards: BoardClass[]): Promise<{winningBoards: number[], winningNums: number[]}> => {
    const winningBoards: number[] = [];
    let winningNums: number[] = [];
    // iterate through each board and check if a board has bingo
    boards.forEach((boardClass, i) => {
        if (boardClass.drawn.length < 5) return
        
        let win = 0;
        for (const bingoCombo of bingoWins) {
            winningNums = [];

            for (const num of bingoCombo) {
                if (!boardClass.drawn.includes(num)) {
                    break
                } else winningNums.push(num)
            }
             
            if (winningNums.length === 5) {
                // reached end of bingocombo
                winningBoards.push(i);
                break;
            }
            
        }
    })
    return {winningBoards, winningNums};
}

const scoreWinner = async (winningBoard: BoardClass, winningIxs: number[], lastNumCalled: number): Promise<number> => {
    // given indexes of drawn numbers, get the actual winning numbers
    const winningNums: number[] = winningBoard.drawn.map(v => winningBoard.board[v]);

    // get all unmarked numbers
    const remainingNums: number[] = winningBoard.board.filter(v => !winningNums.includes(v));
    const sumRemainingNums = _.sum(remainingNums)
    
    return sumRemainingNums * lastNumCalled;
}


const part1 = async () => {
    const input = await readlines("./4/input.txt");
    const drawings = input?.drawings;
    const boards = input?.boards;

    if (!drawings || !boards) {
        console.log(`ERROR with reading lines.`)
        return
    }

    for (const num of drawings) {
        await draw(boards, num);

        const {winningBoards, winningNums} = await bingo(boards);
        if (winningBoards && winningBoards.length > 0) {

            if (winningBoards.length > 1) {
                console.log('ERROR: MORE THAN ONE BOARD WON:', winningBoards)
            } else {
                return await scoreWinner(boards[winningBoards[0]], winningNums, num)
            }

            return
        }
    }
}

(async function () {
  console.log(await part1());
//   console.log(await part2());
})();
