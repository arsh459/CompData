import { Badge } from "@models/Prizes/Prizes";
// import { Dispatch, SetStateAction } from "react";

export type BadgeContextProps = {
  children: React.ReactNode;
  allCards?: boolean;
};

export interface BadgeContextInterface {
  badges: Badge[];
  fetched: boolean;
  // swipedBadge: number;
  // setSwipedBadge: Dispatch<SetStateAction<number>>;
}

export interface HallOfFameContextInterface {
  badges: Badge[];
  fetched: boolean;
  onNext: () => void;
}
