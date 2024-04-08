export const dateFormater = (input: string): string => {
  const date = new Date(input);
  return date.toLocaleDateString();
};
