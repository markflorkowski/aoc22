export {};

const monkeyMap = new Map<string, number>();

const ipt = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n")
  .map((line) => {
    const [name, job] = line.split(":");
    const retJob = parseInt(job.trim()) ? parseInt(job.trim()) : job.trim();
    if (typeof retJob === "number") monkeyMap.set(name, retJob);
    return { name, job: retJob };
  });

const run = (
  ipt: { name: string; job: string | number }[],
  map: Map<string, number>
) => {
  let [l, r] = [0, 0];
  const monkeyMap = new Map<string, number>(map);
  while (isNaN(monkeyMap.get("root") ?? NaN))
    ipt.forEach((m) => {
      if (typeof m.job === "string") {
        const [a, op, b] = m.job.split(" ");

        if (
          !isNaN(monkeyMap.get(a) ?? NaN) &&
          !isNaN(monkeyMap.get(b) ?? NaN)
        ) {
          monkeyMap.set(
            m.name,
            eval(`+(${monkeyMap.get(a)} ${op} ${monkeyMap.get(b)})`)
          );
          if (m.name === "root") {
            [l, r] = [monkeyMap.get(a)!, monkeyMap.get(b)!];
          }
        }
      }
    });

  return { val: monkeyMap.get("root"), l, r };
};

console.log("part1: ", run(ipt, monkeyMap).val);

// replace root operation with equality in ipt
ipt.map((m) => {
  if (m.name === "root" && typeof m.job === "string") {
    m.job = m.job.replace(/(\+|\-|\*|\/)/, "===");
  }
  return m;
});

// binary search for humn value that satisfies root equality
let low = 0;
let high = 10000000000000;
while (true) {
  const mid = Math.floor((high + low) / 2);
  monkeyMap.set("humn", mid);
  const result = run(ipt, monkeyMap);
  if (result.val === 1) break;
  result.l! < result.r! ? (high = mid) : (low = mid);
}

console.log("part2: ", monkeyMap.get("humn"));
