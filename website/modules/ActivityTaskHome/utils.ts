export const calculateFPFromCalories = (calories?: number) => {
  if (calories) {
    return Math.round(calories / 300);
  }

  return 0;
};
