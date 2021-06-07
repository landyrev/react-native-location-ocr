const NUMBER_REPLACEMENTS = {
  // s: '5',
  // o: '0',
  // l: '1',
  // i: '1',
  // b: '8',
};

/**
 * Normalize given string
 * @param {string} s
 * @returns {string}
 */
export const normalizeString = (s: string): string => {
  let result = s;
  result = result.toLocaleLowerCase();
  (
    Object.keys(NUMBER_REPLACEMENTS) as Array<keyof typeof NUMBER_REPLACEMENTS>
  ).forEach((letter) => {
    result = result.replace(
      new RegExp(letter, 'g'),
      NUMBER_REPLACEMENTS[letter]
    );
  });
  return result;
};
