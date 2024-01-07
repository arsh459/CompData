import { navLevels } from "@hooks/community/useCommunityParams";
import Tile from "../../RedirectSection/Tile";
// import { useRouter } from "next/dist/client/router";

interface Props {
  profileIncomplete?: boolean;
  introductionPending?: boolean;
  sayHiToCoach?: boolean;
  onNavChange: (navLevel: navLevels) => void;
  onProfileNameClick: () => void;
}

const PendingTasks: React.FC<Props> = ({
  profileIncomplete,
  introductionPending,
  onNavChange,
  onProfileNameClick,
}) => {
  // const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-center">
        {profileIncomplete ? (
          <div className="w-1/2 flex-none pr-2" onClick={onProfileNameClick}>
            <Tile
              text="Complete profile"
              subtitle="Help coach guide you"
              key="ssmms"
              icon="https://img.icons8.com/officel/80/000000/person-male.png"
            />
          </div>
        ) : null}
        {introductionPending ? (
          <div
            className="w-1/2 flex-none pr-2"
            onClick={() => onNavChange("compose")}
          >
            <Tile
              text="Introduce yourself"
              subtitle="Win a motivator award"
              key="ssmms"
              icon="https://img.icons8.com/color/96/000000/trophy.png"
            />
          </div>
        ) : null}

        {/* <div
          className="w-1/3 flex-none pr-2"
          onClick={() => router.push("/workoutV2")}
        >
          <Tile
            text="Go live"
            subtitle="Go live or post video"
            key="ssmms"
            icon="https://img.icons8.com/ios-filled/50/ff0000/live-video-on.png"
          />
        </div> */}

        {/* {sayHiToCoach ? (
        <div className="w-1/2 flex-none pr-2">
          <Tile
            text="Say hi to Coach"
            subtitle="Confused? Just ping"
            key="ssmms"
          />
        </div>
      ) : null} */}
      </div>
    </>
  );
};

export default PendingTasks;
