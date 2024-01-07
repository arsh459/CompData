import { ListingDetailInterface } from "../../../../models/ListingDetail/interface";

export const calculateRelevanceScore = (
  listingDetail: ListingDetailInterface,
) => {
  let score: number = 0;

  // offbeat
  if (listingDetail.offbeatClassification) {
    score += 1;
  }

  // range
  if (listingDetail.rangeClassification === "premium") {
    score += 1;
  }

  // range
  if (listingDetail.rangeClassification === "basic") {
    score += 0.5;
  }

  // range
  if (listingDetail.rangeClassification === "luxury") {
    score += 0.5;
  }

  return score;
};
