export const getMotivateMsg = (percent: number) => {
  if (typeof percent === "number" && percent <= 20) {
    return "Push YourSelf!";
  } else if (typeof percent === "number" && percent <= 40) {
    return "Good Going!";
  } else if (typeof percent === "number" && percent > 40) {
    return "You are doing Great!";
  } else {
    return "Push YourSelf!";
  }
};
