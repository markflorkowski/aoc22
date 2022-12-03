export {};

const ipt = Deno.readTextFileSync("./example.txt").split("\n");

console.log(ipt);
