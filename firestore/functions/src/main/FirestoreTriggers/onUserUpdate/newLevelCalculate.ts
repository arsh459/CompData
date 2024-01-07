import { UserInterface } from "../../../models/User/User";
import { getUserFP } from "../../Https/challenges/seed/createRankFromUser";

export const newLevelCalculateCheck = (
  userNow: UserInterface,
  userPrev: UserInterface,
) => {
  const fpNow = getUserFP(userNow);
  const fpBef = getUserFP(userPrev);

  if (fpNow !== fpBef) {
    console.log("HI");
  }
};

export const calculateLevel = (fp: number) => {
  console.log("HI");
};
