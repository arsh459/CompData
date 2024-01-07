import { badgeTypes } from "@models/Prizes/Prizes";
import { viewTypes } from "@utils/leaderboard/utils";

export const getBadgeUserType = (
  badgeType: badgeTypes
): viewTypes | undefined => {
  switch (badgeType) {
    case "rank_1":
    case "rank_2":
    case "rank_3":
    case "monthly_rank_1":
    case "monthly_rank_2":
    case "monthly_rank_3":
    case "tier_1":
    case "tier_2":
    case "monthly_tier_1":
    case "monthly_tier_2":
      return "players";

    case "team_rank_1":
    case "team_rank_24":
    case "team_rank_10":
    case "monthly_team_rank_1":
    case "monthly_team_rank_24":
    case "monthly_team_rank_10":
      return "teams";

    default:
      return undefined;
  }
};

export const getbadgeColor = (badgeType: badgeTypes) => {
  switch (badgeType) {
    case "rank_1":
    case "monthly_rank_1":
      return { color1: "#D1B76E", color2: "#654E12" };
    case "rank_2":
    case "monthly_rank_2":
      return { color1: "#CFCFCF", color2: "#646464" };
    case "rank_3":
    case "monthly_rank_3":
      return { color1: "#CA887A", color2: "#7C5350" };
    case "tier_1":
    case "monthly_tier_1":
      return { color1: "#FD6F6F", color2: "#B933CF" };
    case "tier_2":
    case "monthly_tier_2":
      return { color1: "#F19B38", color2: "#6EC576" };
    case "team_rank_1":
    case "monthly_team_rank_1":
      return { color1: "#FFECBB", color2: "#745505" };
    case "team_rank_24":
    case "monthly_team_rank_24":
      return { color1: "#C5D2FE", color2: "#2D4080" };
    case "team_rank_10":
    case "monthly_team_rank_10":
      return { color1: "#FFFFFF", color2: "#696969" };
    default:
      return { color1: "", color2: "" };
  }
};

export const hexToColorMatrix = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
};
