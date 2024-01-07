export const unixTzCorrection = 5.5 * 60 * 60 * 1000;

export const countStreaks = (
  dayCals: { [dayString: string]: number },
  th: number,
  startDateUnix: number,
  challengeLength: number,
  streakLength: number,
  key: string,
) => {
  console.log(
    `${key} countStreaks - th:${th} | startDateUnix:${startDateUnix} | challengeLength:${challengeLength} | streakLength:${streakLength}`,
  );
  // console.log("dayCals", dayCals);
  let numStreaks: number = 0;
  for (let i = 0; i < challengeLength; i++) {
    // console.log(key, "countStreaks", i);
    let streak: boolean = true;
    let missed: number = 0;
    for (let j = 0; j <= streakLength; j++) {
      const nowDateUnix =
        startDateUnix + unixTzCorrection + (i + j) * 24 * 60 * 60 * 1000;

      // console.log("newUNIX", nowDateUnix);
      // console.log("dateTime", new Date(nowDateUnix));
      const nowDateString = new Date(nowDateUnix).toDateString();

      const calCount = dayCals[nowDateString] ? dayCals[nowDateString] : 0;
      // console.log(key, "countStreaks", i + j, nowDateString, calCount);
      if (calCount < th) {
        missed += 1;
        if (missed === 2) {
          streak = false;
          break;
        }
      }
    }

    // console.log(key, "countStreaks", streak);

    // if this is a streak, jump by streak length;
    if (streak) {
      numStreaks += 1;
      i += streakLength - 1;
    }
  }

  console.log(key, "countStreaks", numStreaks);

  return numStreaks;
};
