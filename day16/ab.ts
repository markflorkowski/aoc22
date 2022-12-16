export {};

const ipt = new Map(
  Deno.readTextFileSync("./input.txt")
    .split("\n")
    .map((line): [string, number, string[]] => {
      const [, name, rate, tunnels] = line.match(
        /Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]+)/
      )!;
      return [name, parseInt(rate), tunnels.split(", ")];
    })
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, rate, tunnels], i, arr) => [
      1n << BigInt(i),
      [
        rate,
        tunnels.map((v) => 1n << BigInt(arr.findIndex(([name]) => v === name))),
        name,
      ],
    ])
) as Map<bigint, [number, bigint[], string]>;

const calcPaths = (graph: Map<bigint, bigint[]>) => {
  const keys = [...graph.keys()];
  const distances = new Map(
    keys.map((k) => [k, new Map(keys.map((l) => [l, Infinity]))])
  );
  keys.forEach((u) => graph.get(u)?.map((v) => distances.get(u)?.set(v, 1)));
  keys.forEach((k) => distances.get(k)?.set(k, 0));
  keys.forEach((k) =>
    keys.forEach((i) =>
      keys.forEach((j) => {
        if (
          distances.get(i)?.get(j)! >
          distances.get(i)?.get(k)! + distances.get(k)?.get(j)!
        )
          distances
            .get(i)!
            .set(j, distances.get(i)?.get(k)! + distances.get(k)?.get(j)!);
      })
    )
  );
  return distances;
};

const memo = (func: (...args: any[]) => any) => {
  const cache = new Map();
  return (...args: any[]) => {
    const key = args.join(",");
    if (cache.has(key)) return cache.get(key);
    else return cache.set(key, func(...args)).get(key);
  };
};

const run = (time: number, firstrun: boolean) => {
  const keys = [...ipt.keys()];
  const distances = calcPaths(
    new Map([...ipt].map(([key, data]) => [key, data[1]]))
  );
  const flow = new Map(keys.map((k) => [k, ipt.get(k)?.[0]]));

  const dfs = memo(
    (valve: bigint, minutes: number, open: bigint, firstrun: boolean): number =>
      keys
        .filter(
          (k) =>
            flow.get(k) &&
            (open & k) === 0n &&
            (distances.get(valve)?.get(k) ?? 0) < minutes
        )
        .map((k) => {
          const d = distances.get(valve)?.get(k)! + 1;
          const timeleft = minutes - d;
          return timeleft * flow.get(k)! + dfs(k, timeleft, open | k, firstrun);
        })
        .reduce(
          (max, v) => (max > v ? max : v),
          firstrun ? dfs(1n, time, open, false) : 0
        )
  );

  return dfs(1n, time, 0n, firstrun);
};

console.log("part1: ", run(30, false));
console.log("part2: ", run(26, true));
