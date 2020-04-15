let MAX_SIZE_MEMORY = 50;

export const getMaxSizeMemory = (argv: string[]): number => {
  const [_, __, arg] = argv;
  if (arg) {
    const [argName, argValue] = arg.split('=');
    const value = Number(argValue);

    if (argName === '--max-old-space-size' && !isNaN(value)) {
      return value;
    }
  }

  return MAX_SIZE_MEMORY;
};
