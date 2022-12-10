export {};

const ipt = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => {
    const [cmd, amt] = line.split(" ");
    return { cmd, amt: parseInt(amt) };
  });

const log: number[] = [];

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

    if (cycle === 20 || (cycle > 20 && (cycle - 20) % 40 === 0))
      log.push(x * cycle);

    if (addx) x += addx;
  }
};

const printLog = (log: number[]) => {
  console.log(log.reduce((a, b) => a + b));
};

run(ipt);
printLog(log);
