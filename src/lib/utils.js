// Turn the given number into an array of the same length.
export const createArray = (number) => {
  const array = [];

  if (number < 1) {
    return array;
  }

  for (let i = 1; i <= number; i++) {
    array.push(i);
  }

  return array;
};

// Get parameters from command.
export const getArguments = () => {
  const argv = process.argv;
  let number;
  if (argv[2]) {
    const param = argv[2].split("=");
    if (param[0] == "--number") {
      number = param[1];
    }
  }
  return { number };
};
