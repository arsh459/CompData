function daysLeftInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export const getNumberOfDays = () => {
  const daysArray = [];
  const num = daysLeftInMonth(new Date());
  for (let i = 1; i <= num; i++) {
    daysArray.push(i);
  }
  return {
    daysArray,
  };
};
