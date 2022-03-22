import { readFileSync } from "fs";

// Use Classes?
// Can also be an object

interface CommandInterface {
  direction: string;
  magnitude: number;
}

type CommandType = {
  direction: string;
  magnitude: number;
};

class Command {
  direction: string;
  magnitude: number;

  constructor(direction: string, magnitude: string | number) {
    this.direction = direction;

    if (typeof magnitude === "string" && isNaN(Number(magnitude))) {
      throw new Error("Invalid magnitude arg");
    }

    this.magnitude = Number(magnitude);
  }

  static fromArray([direction, magnitude]: string[]): Command {
    return new Command(direction, magnitude);
  }
}

async function part_one() {
  const file: string = readFileSync("./2/input", "utf-8");
  const commands: string[] = file.split("\n");

  let pos_x: number = 0;
  let pos_y: number = 0;

  for (const command of commands) {
    // Can we destructure and cast at the same time?
    // Or we want to tokenize and cast 2nd element
    // let [direction, magnitudeStr] = command.split(" ");
    // let c: CommandType = {
    //   direction,
    //   magnitude: Number(magnitudeStr),
    // };

    const c: Command = Command.fromArray(command.split(" "));

    switch (c.direction) {
      case "up":
        pos_y -= c.magnitude;
        break;
      case "down":
        pos_y += c.magnitude;
        break;
      case "forward":
        pos_x += c.magnitude;
        break;
      case "back":
        pos_x -= c.magnitude;
        break;
      default:
        break;
    }
  }

  return [pos_x, pos_y];
}

async function part_two() {
  return;
}

(async function () {
  console.log(await part_one());
  console.log(await part_two());
})();
