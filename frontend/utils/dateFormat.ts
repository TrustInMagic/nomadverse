const formatDate = (input: Date): string => {
  const date = new Date(input);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${month}.${day}.${year}`;
};

export default formatDate;
