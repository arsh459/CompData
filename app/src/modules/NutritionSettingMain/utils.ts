export const getWaterIntakeDaily = (water?: number) => {
  const waterIntakeDaily = water || 0;
  const glassOrGlasses = waterIntakeDaily > 1 ? "glasses" : "glass";
  return waterIntakeDaily ? `${waterIntakeDaily} ${glassOrGlasses}` : "";
};
export const getJunkFoodString = (junkfoodIntake?: number) => {
  const junkfood = junkfoodIntake || 0;
  const suffix = "x a week";
  return junkfood ? `${junkfood}${suffix}` : "";
};
export const getExerciseFrequencyString = (number?: number) => {
  const frequency = number || 0;
  const suffix = "x a week";
  return frequency ? `${frequency}${suffix}` : "";
};

export const getHeightInFtInch = (height?: number) => {
  if (height) {
    const ft = Math.floor(height / 12);
    const inch = height % 12;
    return `${ft}ft ${inch}in`;
  }

  return "";
};
