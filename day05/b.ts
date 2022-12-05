export {};

const [stacks, inst] = Deno.readTextFileSync("./input.txt").split("\n\n");

const parsedStacks: { [key: string]: (string | undefined)[] } = stacks
  .split("\n")
  .map((x) => x.split(""))
  .map((x) => {
    return Array.from({ length: 9 }, (_, index) => index * 4 + 1).reduce(
      (acc, value, index) => {
        acc[`col${index}`] = x[value] === " " ? undefined : x[value];
        return acc;
      },
      {} as { [key: string]: string | undefined }
    );
  })
  .slice(0, -1)
  .reduce((acc, cur) => {
    Object.keys(cur).forEach((key) => {
      if (acc[key]) {
        acc[key].push(cur[key]);
      } else {
        acc[key] = [cur[key]];
      }
    });
    return acc;
  }, {} as { [key: string]: (string | undefined)[] });

Object.keys(parsedStacks).forEach((key) => {
  parsedStacks[key] = parsedStacks[key].reverse();
  parsedStacks[key] = parsedStacks[key].filter((x) => x !== undefined);
});

inst
  .split("\n")
  .map((x) => x.split(" "))
  .forEach((x) => {
    const count = parseInt(x[1]);
    const from = parseInt(x[3]) - 1;
    const to = parseInt(x[5]) - 1;

    const popped = parsedStacks[`col${from}`].splice(-count);

    parsedStacks[`col${to}`] = [...parsedStacks[`col${to}`], ...popped];
  });

const top = Object.keys(parsedStacks).map((key) => parsedStacks[key].pop());

console.log(top.join(""));
