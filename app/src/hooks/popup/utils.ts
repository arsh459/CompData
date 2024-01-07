export const wkPlanPopup = (planSeen?: boolean, fpCredit?: number) => {
  if (fpCredit && planSeen) {
    return true;
  }

  return false;
};
