export const timestampFormatter = timestamp => {
  const date = new Date(timestamp.seconds * 1000);
  return `${date.toLocaleTimeString()}, ${date.toDateString()}`;
};
