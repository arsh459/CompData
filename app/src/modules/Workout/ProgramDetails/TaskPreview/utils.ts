export const getFeedbackText = (
  progressFP?: number,
  earnedFP?: number,
  fp?: number
) => {
  const percentWatched = Math.floor((progressFP ? progressFP : 0) * 100);
  if (earnedFP && fp) {
    const percent = Math.floor((earnedFP / fp) * 100);
    if (percentWatched) {
      return `Great job! You finished ${percentWatched}% of the practice.`;
    } else {
      return `Great job! You finished ${percent}% of the practice.`;
    }
  } else if (!earnedFP && progressFP && progressFP < 0.2) {
    return `Complete at least 20% of the workout to get points. Presently, you have done only ${percentWatched}% of the practice`;
  }
};
