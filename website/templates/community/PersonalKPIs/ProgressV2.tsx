// import { useUserRank } from "@hooks/activities/userUserRank";
import Divider from "@components/divider/Divider";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
import { formatWithCommas } from "@utils/number";
import KPIHolder from "./KPIHolder";
import { getFatBurn } from "./utils";
import PrizesCarousel from "./PrizesCarousel";
import CoachBranding from "./CoachBranding";
import CoachNameSection from "./CoachNameSection";
import EverydayWorkout from "./EverydayWorkout";
import ClapModal from "../Program/ClapModal";
import { useState } from "react";
import { UserRank } from "@models/Activities/Activity";

interface Props {
  parentId: string;
  eventName: string;
  leader: LeaderBoard;
  signedInUser?: UserInterface;
  after?: number;
  challengeLength?: number;
  myUserRank?: UserRank;
  savedList: string[];
  onProfileNameClick: (uid: string) => void;
}

// const after = new Date("Mon Nov 29 2021").getTime();

const ProgressV2: React.FC<Props> = ({
  parentId,
  onProfileNameClick,
  leader,
  signedInUser,
  eventName,
  after,
  challengeLength,
  myUserRank,
  savedList,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);

  // console.log("activities", activities);

  return (
    <>
      {signedInUser?.uid ? (
        <ClapModal
          isOpen={isOpen}
          // onProfileNameClick={onProfileNameClick}
          onCloseModal={() => setIsOpen(false)}
          signedInUID={signedInUser.uid}
        />
      ) : null}

      <div className="max-w-lg px-2 py-4 bg-white rounded-lg shadow-sm hover:shadow-lg">
        <div className="sm:hidden">
          <p className="text-2xl text-gray-700 text-center">{eventName}</p>
        </div>

        <div className="sm:block">
          <p className="text-2xl text-gray-700 text-center">Your progress</p>
        </div>

        <div className="pt-0">
          <CoachNameSection
            coachName={leader.name}
            signedInUserName={signedInUser?.name}
            isCoach={leader.uid === signedInUser?.uid}
          />
        </div>

        <div className="pt-4">
          <CoachBranding
            profileImage={leader.profileImage}
            coachName={leader.name}
            signedInUserName={signedInUser?.name}
            signedInUserImage={signedInUser?.profileImage}
            isCoach={leader.uid === signedInUser?.uid}
          />
        </div>

        <div className="pt-4">
          <p className="text-center text-gray-600 text-2xl sm:text-lg italic">
            {formatWithCommas(
              Math.round(
                myUserRank?.totalCalories ? myUserRank?.totalCalories : 0
              )
            )}{" "}
            calories
          </p>
          <p className="text-center text-gray-500 italic text-base sm:text-sm">
            You burnt {getFatBurn(myUserRank?.totalCalories)}
          </p>
        </div>

        {myUserRank && signedInUser?.uid ? (
          <div className="pt-8">
            <PrizesCarousel
              uid={signedInUser.uid}
              // myUserRank={myUserRank}
              // everyday={everyday}
            />
          </div>
        ) : null}

        <div className="pt-8 px-2">
          <Divider />
        </div>

        <div className="pt-12">
          <EverydayWorkout
            challengeLength={challengeLength}
            myUserRank={myUserRank}
            savedList={savedList}
            after={after}
          />
        </div>

        <div className="pt-0">
          <KPIHolder
            value={signedInUser?.numClaps}
            text="Clap(s) from community"
            img="https://img.icons8.com/emoji/48/000000/nikita-clapping-hands-emoji.png"
            onClick={onOpen}
          />
        </div>
      </div>
    </>
  );
};

export default ProgressV2;
