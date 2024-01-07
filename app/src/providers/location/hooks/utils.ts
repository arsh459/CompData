// export const getPace = (distanceInKm: number, timeInSeconds: number) => {
//   // 4 -> 120
//   // 540 / 4
//   if (distanceInKm > 0.1) {
//     const kmPerMin = timeInSeconds / distanceInKm;
//     const minutes = kmPerMin % 60;
//     return {
//       minutes: minutes.toFixed(0),
//       seconds: `${kmPerMin - kmPerMin * 60}`,
//     };
//   }

//   return {
//     minutes: "-",
//     seconds: "-",
//   };
// };
export const getPace = (distanceInKm: number, timeInSeconds: number) => {
  // 4 -> 120
  // 540 / 4
  if (distanceInKm > 0.1) {
    const kmPerMin = timeInSeconds / distanceInKm;

    const minutes = kmPerMin / 60;
    const secs = Math.round(kmPerMin % 60);
    return {
      minutes: minutes.toFixed(0),
      seconds: secs < 10 ? `0${secs}` : `${secs}`,
    };
  }
  return {
    minutes: "-",
    seconds: "-",
  };
};
