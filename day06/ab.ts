export {};

const ipt = Deno.readTextFileSync("./input.txt");

const finder = (str: string, count: number): number => {
  for (let i = 0; i < str.length - count - 1; i++) {
    let found = true;
    for (let j = 0; j < count; j++) {
      for (let k = j + 1; k < count; k++) {
        if (str[i + j] === str[i + k]) {
          found = false;
          break;
        }
      }
      if (!found) {
        break;
      }
    }
    if (found) {
      return i + count;
    }
  }
  return -1;
};

console.log(finder(ipt, 4));
console.log(finder(ipt, 14));
