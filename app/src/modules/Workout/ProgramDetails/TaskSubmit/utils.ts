export const getProgressToShow = (p: { [uploadId: string]: number }) => {
  const progValues = Object.values(p);

  let avg: number = 0;
  if (progValues.length) {
    const sum = progValues.reduce((a, b) => a + b, 0);
    avg = sum / progValues.length || 0;
  }
  return Math.round(avg);
};
