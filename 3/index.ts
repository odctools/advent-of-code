import { readFileSync, createReadStream } from "fs";
import * as readline from "readline";

const part1 = async () => {
    let sum: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    
    const fileStream = createReadStream("./3/input.txt");
    
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        const lineChars = [...line];
        const values: number[] = [];
        lineChars.forEach(v => {
            // Sum the bits to 'vote' and see which is more popular
            if (v === '0') {
                values.push(-1)
            } else {
                values.push(1)
            }
        });
        
        // Add each value by bit index
        sum = sum.map((value, ix) => value + values[ix]);
    };

    var g = "";
    var e = "";
    for (const i of sum) {
        if (i > 0) {
            g += 1;
            e += 0;
        } else {
            g += 0;
            e += 1
        }
    };

    const gamma = parseInt(g, 2);
    const epsilon = parseInt(e, 2);

    return gamma * epsilon
}

// async function part2() {
//   let count: number = 0;
//   let previous: number = Number.MAX_SAFE_INTEGER;

//   const file: string = readFileSync("./1/input", "utf-8");

//   const numbers: number[] = file.split("\n").map((n) => Number(n));

//   for (let i = 0; i <= numbers.length - 2; i += 1) {
//     let sum: number = numbers[i] + numbers[i + 1] + numbers[i + 2];

//     if (sum > previous) {
//       count++;
//     }

//     previous = sum;
//   }

//   return count;
// }

(async function () {
  console.log(await part1());
//   console.log(await part2());
})();
