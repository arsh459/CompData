import NewBadge from "@modules/HomeScreen/NewHome/NewBadge";
import NewBadgeGolden from "@modules/HomeScreen/NewHome/NewBadgeGolden";
import { Badge } from "@models/Prizes/Prizes";
interface Props {
  badge: Badge;
}
const RewardBadgeStatic: React.FC<Props> = ({ badge }) => {
  return (
    <>
      {badge?.badgeId === "independent" ? (
        <NewBadge
          colorOne={"#859EFF"}
          colorTwo={"#2C46C5"}
          unLockedHeight={100}
          percentageHidden={true}
          athleteImage={badge.athleteImage}
        />
      ) : (
        <NewBadgeGolden
          colorOne={"#EADAA6"}
          colorTwo={"#9C874E"}
          unLockedHeight={100}
          percentageHidden={true}
          athleteImage={badge.athleteImage}
        />
      )}
    </>
  );
};

export default RewardBadgeStatic;
