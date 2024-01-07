// const unixTzCorrection = 5.5 * 60 * 60 * 1000;

export const countStreaksV2 = (
  dayCals: { [dayString: string]: number },
  th: number,
  after: number,
  //   startDateUnix: number,
  //   challengeLength: number,
  //   streakLength: number,
  //   key: string,
) => {
  let scoreMinCal: number = 0;
  const weekCalMin: { [weekString: string]: number } = {};
  for (const day of Object.keys(dayCals)) {
    const week = Math.floor(
      (new Date(day).getTime() - after) / (7 * 24 * 60 * 60 * 1000),
    );
    if (dayCals[day] >= th) {
      scoreMinCal += 1;
      if (weekCalMin[`week-${week}`]) {
        weekCalMin[`week-${week}`] += 1;
      } else {
        weekCalMin[`week-${week}`] = 1;
      }
    }
  }

  return { scoreMinCal, weekCalMin };
};
