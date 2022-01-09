import { readFileSync, createReadStream, read } from "fs";
import * as readline from "readline";

const readlines = async (fp: string) => {
    const fileStream = createReadStream(fp);
    
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    const linesArr = [];
    for await (const line of rl) {
        linesArr.push(line);
    }
    return linesArr;

};

const getSplitLines = async (lines: string[]) => {
    const arr = [];
    for (const line of lines) {
        arr.push([...line])
    }
    return arr;
}

const voteBits = async (splitLines: string[][]) => {
    let sum: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

    for (const splitLine of splitLines) {
        const values: number[] = [];
        splitLine.forEach(v => {
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
        // If 0 and 1 are equally common, keep values with a 1 in the position being considered.
        // i.e. if i === 0, then consider it to have more 1's
        if (i >= 0) {
            g += 1;
            e += 0;
        } else {
            g += 0;
            e += 1
        }
    }

    return {g, e};
};

const part1 = async () => {
    const linesArr = await readlines("./3/input.txt");
    const splitLines = await getSplitLines(linesArr)
    const {g, e} = await voteBits(splitLines);
    
    const gamma = parseInt(g, 2);
    const epsilon = parseInt(e, 2);

    return gamma * epsilon
}

const part2 = async () => {
    // overkill but too lazy to change, running it once just to get the number of times to iterate
    const linesArr = await readlines("./3/input.txt");
    const splitLines = await getSplitLines(linesArr)
    let {g: mostPopular} = await voteBits(splitLines);
    const mostArr = [...mostPopular];
    const numBits = mostArr.length;
    
    // make copies to filter for most/least popular bits
    let mostSplitLines = JSON.parse(JSON.stringify(splitLines));
    let leastSplitLines = JSON.parse(JSON.stringify(splitLines));

    let oxygen;
    let c02;
    
    for (var i = 0; i < numBits; i++) {

        // run voting for each set of lines
        let {g: mostPopular} = await voteBits(mostSplitLines);
        let {e: leastPopular} = await voteBits(leastSplitLines);

        const mostPopularBit = [...mostPopular][i];
        const leastPopularBit = [...leastPopular][i];

        mostSplitLines = mostSplitLines.filter((l: string[]) => l[i] === mostPopularBit);
        leastSplitLines = leastSplitLines.filter((l: string[]) => l[i] === leastPopularBit);

        if (mostSplitLines.length === 1) {
            oxygen = parseInt(mostSplitLines[0].join(''), 2);
        }
        if (leastSplitLines.length === 1) {
            c02 = parseInt(leastSplitLines[0].join(''), 2);
        }
        if (oxygen && c02) {
            return oxygen * c02
        }
    };

};

(async function () {
  console.log(await part1());
  console.log(await part2());
})();
