import { readFileSync, createReadStream } from "fs";
import * as readline from "readline";

async function part1() {
  let count: number = 0;
  let previous: number = Number.MAX_SAFE_INTEGER;

  const fileStream = createReadStream("./1/input");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    let number = Number(line.trim());

    if (number > previous) {
      count++;
    }

    previous = number;
  }

  return count;
}

async function part2() {
  let count: number = 0;
  let previous: number = Number.MAX_SAFE_INTEGER;

  const file: string = readFileSync("./1/input", "utf-8");

  const numbers: number[] = file.split("\n").map((n) => Number(n));

  for (let i = 0; i <= numbers.length - 2; i += 1) {
    let sum: number = numbers[i] + numbers[i + 1] + numbers[i + 2];

    if (sum > previous) {
      count++;
    }

    previous = sum;
  }

  return count;
}

(async function () {
  console.log(await part1());
  console.log(await part2());
})();
