import { Console } from "console";
import { readFileSync, createReadStream } from "fs";
import * as readline from "readline";

async function part1() {
  let horizontal: number = 0;
  let depth: number = 0;

  const fileStream = createReadStream("./2/input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const split = line.split(" ");
    const direction = split[0];
    const units = +split[1];

    if (direction === "forward") {
      horizontal += units;
    } else {
      if (direction === "down") {
        depth += units;
      } else {
        depth -= units;
      }
    }
    
    // can't go higher than the surface! I'm guessing...
    if (depth < 0) depth = 0;
  }

  return (horizontal * depth);
}

async function part2() {
  let horizontal: number = 0;
  let depth: number = 0;
  let aim: number = 0;

  const fileStream = createReadStream("./2/input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const split = line.split(" ");
    const direction = split[0];
    const units = +split[1];

    switch (direction) {
      case 'down': 
        aim += units;
        break;
      case 'up':
        aim -= units;
        break;
      case 'forward':
        horizontal += units;
        depth += units * aim;
        break;
      default:
        console.log('no direction found')
    }

    // can't go higher than the surface! I'm guessing...
    if (depth < 0) depth = 0;
  }

  return (horizontal * depth);
}

(async function () {
  console.log(await part1());
  console.log(await part2());
})();
