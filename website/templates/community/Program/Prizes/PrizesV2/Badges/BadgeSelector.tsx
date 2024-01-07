import { badgeTypes } from "@models/Prizes/PrizeV2";
import CoachBadge from "./CoachBadge";
import CoachBadgeMonthly from "./CoachBadgeMonthly";
import Level1Badge from "./Level1Badge";
import Level2Badge from "./Level2Badge";
import Level3Badge from "./Level3Badge";
import Level4Badge from "./Level4Badge";
import Level5Badge from "./Level5Badge";
import { badgePNGs } from "./constants";
import PNGBadge from "./PNGBadge";
import RankBadge from "./RankBadge";
import RankBadgeMonthly from "./RankBadgeMonthly";
import SpotlightBadge from "./SpotlightBadge";
import TeamBadgeMonthly from "./TeamBadgeMonthly";
import TierBadge from "./TierBadge";
import TierBadgeMonthly from "./TierBadgeMonthly";
import { getbadgeColor } from "./utils";
import TeamBadge from "./TeamBadge";
import AllLevelsBadge from "./AllLevelsBadge";
import RookieBadge from "./RookieBadge";

interface Props {
  badgeType: badgeTypes;
  effect?: "spin" | "ripple" | "glow";
}

const BadgeSelector: React.FC<Props> = ({ badgeType, effect }) => {
  switch (badgeType) {
    case "rank_1":
    case "rank_2":
    case "rank_3":
      return (
        <RankBadge
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "monthly_rank_1":
    case "monthly_rank_2":
    case "monthly_rank_3":
      return (
        <RankBadgeMonthly
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "tier_1":
    case "tier_2":
      return (
        <TierBadge
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "monthly_tier_1":
    case "monthly_tier_2":
      return (
        <TierBadgeMonthly
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "team_rank_1":
    case "team_rank_24":
    case "team_rank_10":
      return (
        <TeamBadge
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "monthly_team_rank_1":
    case "monthly_team_rank_24":
    case "monthly_team_rank_10":
      return (
        <TeamBadgeMonthly
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "coach":
      return (
        <CoachBadge
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "monthly_coach":
      return (
        <CoachBadgeMonthly
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "all_levels":
      return (
        <AllLevelsBadge
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "level_1":
      return (
        <Level1Badge
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "level_2":
      return (
        <Level2Badge
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "level_3":
      return (
        <Level3Badge
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "level_4":
      return (
        <Level4Badge
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "level_5":
      return (
        <Level5Badge
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "spotlight":
    case "goal_complete":
      return (
        <SpotlightBadge
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    case "rookie":
      return (
        <RookieBadge
          badgeType={badgeType}
          color={getbadgeColor(badgeType)}
          effect={effect}
        />
      );

    default:
      return (
        <div className="px-4">
          <PNGBadge img={badgePNGs[badgeType]} />
        </div>
      );
  }
};

export default BadgeSelector;
