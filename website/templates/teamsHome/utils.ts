export const getConsistencyRate = (dayPointObj?: { [day: string]: number }) => {
  if (dayPointObj) {
    const rum = Object.values(dayPointObj).reduce((acc, item) => {
      return acc + (item > 0 ? 1 : 0);
    }, 0);

    // console.log("dayPointObj", dayPointObj, rum);

    const consit = Math.round((rum / 31) * 100);

    return consit > 100 ? "100" : consit;
  }

  return "0";
};
