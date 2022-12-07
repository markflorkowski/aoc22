export {};

const ipt = Deno.readTextFileSync("./input.txt");

interface File {
  name: string;
  size: number;
}
interface Directory extends File {
  children: (File | Directory)[];
}

const dirSizes: number[] = [];
function updateSize(directory: Directory): number {
  let size = 0;
  for (const child of directory.children) {
    size += "children" in child ? updateSize(child) : child.size;
  }
  directory.size = size;
  dirSizes.push(size);

  return size;
}

function parseInput(input: string): Directory {
  const rootDirectory: Directory = {
    name: "/",
    size: 0,
    children: [],
  };

  let currentDirectory: Directory = rootDirectory;
  const directoryStack: Directory[] = [];

  for (const line of input.split("\n")) {
    const commandMatch = line.match(/^\$ (cd|ls) (.*)$/);

    if (commandMatch) {
      const [, command, arg] = commandMatch;

      if (command === "cd") {
        if (arg === "..") {
          currentDirectory = directoryStack.pop()!;
        } else if (arg === "/") {
          currentDirectory = rootDirectory;
        } else {
          const childDirectory = currentDirectory.children.find((child) => {
            return child.name === arg;
          });
          if (childDirectory && "children" in childDirectory) {
            directoryStack.push(currentDirectory);
            currentDirectory = childDirectory;
          }
        }
      }
    } else {
      if (line.split(" ")[0].match(/^\d+$/)) {
        currentDirectory.children.push({
          name: line.split(" ")[1],
          size: parseInt(line.split(" ")[0]),
        });
      }
      if (line.split(" ")[0] === "dir") {
        currentDirectory.children.push({
          name: line.split(" ")[1],
          size: 0,
          children: [],
        });
      }
    }
  }
  updateSize(rootDirectory);
  return rootDirectory;
}

const fs = parseInput(ipt);

const part1 = dirSizes.filter((size) => size <= 100000).reduce((a, b) => a + b);
console.log("part1: ", part1);

const part2 = dirSizes
  .filter((size) => size >= 30000000 - (70000000 - fs.size))
  .sort((a, b) => a - b)[0];
console.log("part2:", part2);
