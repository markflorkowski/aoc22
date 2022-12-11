export {};

const monkeys = Deno.readTextFileSync("./input.txt")
  .split("\n\n")
  .map((m) => {
    const lines = m.split("\n");
    return {
      items: lines[1]
        .slice(18)
        .split(", ")
        .map((n) => parseInt(n)),
      operation: (n: number) => {
        const [op, amt] = lines[2].split(" ").slice(-2);
        if (op === "+") return n + (amt === "old" ? n : parseInt(amt));
        if (op === "*") return n * (amt === "old" ? n : parseInt(amt));
      },
      test: (n: number) =>
        n % parseInt(lines[3].split(" ").pop()!) === 0
          ? parseInt(lines[4].split(" ").pop()!)
          : parseInt(lines[5].split(" ").pop()!),
      mod: parseInt(lines[3].split(" ").pop()!),
      count: 0,
    };
  });

let rounds = 0;
while (rounds < 20) {
  rounds++;
  monkeys.forEach((monkey) => {
    while (monkey.items.length > 0) {
      monkey.count++;

      const item = monkey.items.shift();
      const worry = Math.floor(monkey.operation(item!)! / 3);
      monkeys[monkey.test(worry)].items.push(worry);
    }
  });
}

const counts = monkeys.map((monkey) => monkey.count).sort((a, b) => b - a);
console.log(counts.slice(0, 2).reduce((a, b) => a * b));
