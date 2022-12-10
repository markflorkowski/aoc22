export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => {
    const [cmd, amt] = line.split(" ");
    return { cmd, amt: parseInt(amt) };
  });

const log: string[][] = Array(6)
  .fill("")
  .map(() => Array(40).fill(" "));

const run = (ipt: { cmd: string; amt: number }[]) => {
  const queue: number[] = [];

  let x = 1;

  while (ipt.length > 0) {
    const { cmd, amt } = ipt.shift() ?? {};

    if (cmd === "addx") {
      queue.push(0);
      queue.push(amt!);
    }
    if (cmd === "noop") {
      queue.push(0);
    }
  }

  let cycle = 0;
  while (cycle < queue.length) {
    const addx = queue[cycle++];
    if (addx) x += addx;

    if (Math.abs(x - (cycle % 40)) <= 1)
      log[Math.floor(cycle / 40)][cycle % 40] = "■";
  }
};

const printLog = (log: string[][]) => {
  console.log(log.map((row) => row.join("")).join("\n"));
};

run(ipt);
printLog(log);
