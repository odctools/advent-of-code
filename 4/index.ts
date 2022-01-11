import { readFileSync, createReadStream, read } from "fs";
import * as readline from "readline";

const readlines = async (fp: string) => {

    var data;
    try {
        data = readFileSync(fp, 'utf8').split('\n');
    } catch (err) {
        console.error(err)
        return
    }

    const drawings = data[0].split(',').map(s => parseInt(s));
    const boards = data.splice(1).map(row => {
        return row.trim().split(' ')
            .filter(v => v != '')
            .map(v => parseInt(v))
            
    });

    return {drawings, boards};
};


const part1 = async () => {
    const input = await readlines("./4/input.txt");

    const drawings = input?.drawings;
    const boards = input?.boards;

    console.log(drawings, boards)

}

(async function () {
  console.log(await part1());
//   console.log(await part2());
})();
