import { Badge } from "@models/Prizes/Prizes";
import { useBadgeProgressContext } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { getBadgeStats, getFPProg } from "./utils";
// import ArenaPlanCard from "./ArenaPlan";
import UserPlanCard from "../MyProgress/PlanCard";
import { getBGImage } from "../MyProgress/utils";
import { useUserContext } from "@providers/user/UserProvider";

interface Props {
  startColor: string;
  endColor: string;
  badge?: Badge;
  onSelect?: () => void;
  classStr?: string;
  meterVisible?: boolean;
}
const ArenaProgress: React.FC<Props> = ({
  badge,
  onSelect,
  classStr,
  startColor,
  endColor,
  meterVisible,
}) => {
  const { summaryProgress } = useBadgeProgressContext();
  const { user } = useUserContext();

  const { fp } = getBadgeStats(badge);
  return (
    // <ArenaPlanCard
    //   name={badge?.name ? `${badge.name}'s` : "Your"}
    //   subtitle="workout plan"
    //   progress={getFPProg(summaryProgress?.fpDone, fp)}
    //   onStart={onSelect}
    //   img={badge?.brandImage}
    //   isWorkout={true}
    //   btnTitle="Select"
    //   changeView={changeView}
    // />
    <>
      {onSelect && badge ? (
        <UserPlanCard
          name={badge?.name ? `${badge.name}` : "Your"}
          subtitle=""
          meterVisible={meterVisible}
          progress={getFPProg(summaryProgress?.fpDone, fp)}
          onStart={onSelect}
          // marketImg={badge?.marketImage}
          header={true}
          bgImg={getBGImage(
            badge,
            // "female"
            user?.gender
          )}
          isWorkout={true}
          startColor={startColor}
          endColor={endColor}
          btnTitle={meterVisible ? "Go To Plan" : "View Plan"}
          classStr={classStr}
        />
      ) : null}
    </>
  );
};

export default ArenaProgress;
