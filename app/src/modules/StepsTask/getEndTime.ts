export const getEndTime = () => {
  const now = new Date();
  const dayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    0
  );

  const hrsLeft = dayEnd.getHours() - now.getHours();
  const minsLeft = dayEnd.getMinutes() - now.getMinutes();

  return `${hrsLeft}h ${minsLeft}m`;
};
