export {};

const ipt = Deno.readTextFileSync("./input.txt");

interface File {
  name: string;
  size: number;
}
interface Directory extends File {
  children: (File | Directory)[];
}

function updateSize(directory: Directory): number {
  let size = 0;
  for (const child of directory.children) {
    if ("children" in child) {
      size += updateSize(child);
    } else {
      size += child.size;
    }
  }
  directory.size = size;

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

          // If the directory exists, move to it.
          if (childDirectory && "children" in childDirectory) {
            directoryStack.push(currentDirectory);
            currentDirectory = childDirectory;
          }
        }
      }
    }
    // If the line represents a file or directory:
    else {
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

  // Before returning,  calculate directory sizes
  updateSize(rootDirectory);

  // Return the root directory.
  return rootDirectory;
}

function part1(directory: Directory): number {
  let size = 0;
  if (directory.size <= 100000) {
    size += directory.size;
  }
  for (const child of directory.children) {
    if ("children" in child) {
      size += part1(child);
    }
  }
  return size;
}

const root = parseInput(ipt);

console.log("part1: ", part1(root));

function part2(directory: Directory, needToFree: number): number {
  let smallest = Infinity;
  if (directory.size >= needToFree) {
    smallest = directory.size;
  }
  for (const child of directory.children) {
    if ("children" in child) {
      const childSmallest = part2(child, needToFree);

      if (childSmallest < smallest) {
        smallest = childSmallest;
      }
    }
  }
  return smallest;
}

console.log("part2:", part2(root, 30000000 - (70000000 - root.size)));
