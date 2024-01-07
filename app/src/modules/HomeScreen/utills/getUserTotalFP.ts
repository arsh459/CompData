export const getUserTotalFP = (credit?: number, debit?: number) => {
  if (typeof credit === "number" && typeof debit === "number") {
    return credit - debit;
  } else if (credit) {
    return credit;
  } else {
    return 0;
  }
};
