export const getDistanceToShow = (distance?: number) => {
  if (distance) {
    const distanceKM = distance / 1000;
    return `${(Math.round(distanceKM * 100) / 100).toFixed(2)}`;
  } else {
    return "0.00";
  }
};
