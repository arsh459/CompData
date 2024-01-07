/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import clsx from "clsx";
import CirclePercent from "../CirclePercent";
import { LandingLeaderboard } from "@models/LeaderBoard/Leaderboard";
// import { cloudinaryBaseURL } from "@models/Media/cloudinaryUpload";
import { formatWithCommas } from "@utils/number";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import { getLevelColor } from "@templates/LandingPage/levelColor";
import EyeButton from "../eyeButton";
import { getURLToFetch } from "@templates/listing/HeaderImage/utils";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  leader: LandingLeaderboard;
}

const InfluencerProfileModal: React.FC<Props> = ({
  leader,
  isOpen,
  onCloseModal,
}) => {
  const [showmore, setShowmore] = useState<boolean>(false);
  const levelColor = getLevelColor(leader.userLevel ? leader.userLevel : 0);

  //   console.log("leader", leader.text);

  return (
    <CreateModal
      isOpen={isOpen}
      onBackdrop={onCloseModal}
      onCloseModal={onCloseModal}
      onButtonPress={() => {}}
      heading=""
      maxW="w-screen"
      bgProp="fixed inset-0 z-50 bg-[#111111] text-white/[0.80] grid place-content-center"
    >
      <div
        className="justify-self-end cursor-pointer text-xl"
        onClick={() => {
          setShowmore(false);
          onCloseModal();
        }}
      >
        &#10005;
      </div>
      <div className="grid w-80 sm:w-96 relative">
        <div className="flex flex-col items-center">
          <div className="relative">
            <CirclePercent
              circleSize={120}
              percent={leader.progress ? leader.progress * 100 : 0}
              color={levelColor.colorPrimary}
            ></CirclePercent>
            <div className="absolute top-2 left-2 right-2 bottom-2 p-1">
              <img
                className="w-full h-full rounded-full bg-white"
                alt="socailBoat"
                src={
                  leader.media && leader.media.length
                    ? getURLToFetch(leader.media[0], 400, 400)
                    : // `${cloudinaryBaseURL}/${leader.media[0].resource_type}/upload/w_400,h_400,c_fill/${leader.media[0].public_id}.jpg`
                      `https://avatars.dicebear.com/api/initials/${leader.name}.svg`
                }
              />
            </div>
          </div>
          <div className="flex my-3">
            <p>{leader.name}</p>
            <p className="w-0.5 bg-white/[0.80] rounded-[100%] mx-4" />
            <p>{`Lvl ${formatWithCommas(
              Math.round(leader.userLevel ? leader.userLevel : 0)
            )}`}</p>
          </div>
        </div>
        {showmore ? (
          <div className="text-xl text-center text-white max-h-64 overflow-y-auto p-1">
            &quot;{leader.text}&quot;
          </div>
        ) : (
          <div className="innerContent my-1">
            <div
              className={clsx(
                "h-16 flex justify-around items-center bg-[#F2F2F2]/[0.40] backdrop-blur-2xl rounded-lg m-0.5"
              )}
            >
              <h2 className={clsx("inline")}>Calories burnt</h2>
              <h2 className={clsx("text-4xl font-extrabold inline")}>
                {formatWithCommas(
                  Math.round(leader.totalCalories ? leader.totalCalories : 0)
                )}
              </h2>
            </div>
            <div className="flex h-28">
              <div
                className={clsx(
                  "w-1/2 grid place-items-center py-6 bg-[#F2F2F2]/[0.40] backdrop-blur-2xl rounded-lg m-0.5"
                )}
              >
                <h2 className={clsx("text-4xl font-extrabold")}>
                  {formatWithCommas(
                    Math.round(
                      leader.totalFitPoints ? leader.totalFitPoints : 0
                    )
                  )}
                </h2>
                <h2 className={clsx("")}>Fit points</h2>
              </div>
              <div
                className={clsx(
                  "w-1/2 grid place-items-center py-6 bg-[#F2F2F2]/[0.40] backdrop-blur-2xl rounded-lg m-0.5"
                )}
              >
                <h2 className={clsx("text-4xl font-extrabold")}>
                  {formatWithCommas(Math.round(leader.wins ? leader.wins : 0))}
                </h2>
                <h2 className={clsx("")}>Wins</h2>
              </div>
            </div>
            <div
              className={clsx(
                "h-16 flex justify-around items-center bg-[#F2F2F2]/[0.40] backdrop-blur-2xl rounded-lg m-0.5"
              )}
            >
              <h2 className={clsx("inline")}>Team wins</h2>
              <h2 className={clsx("text-4xl font-extrabold inline")}>
                {formatWithCommas(
                  Math.round(leader.teamWins ? leader.teamWins : 0)
                )}
              </h2>
            </div>
          </div>
        )}
        {leader.text ? (
          <span
            className="my-4 mx-auto cursor-pointer grid place-items-center"
            onClick={() => setShowmore(!showmore)}
          >
            <EyeButton type={showmore} />
            <p>{showmore ? "Show Less" : "Show More"}</p>
          </span>
        ) : null}
        <div
          className={clsx(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10",
            "w-[500px] aspect-w-1 aspect-h-1 rounded-full opacity-[.35] blur-3xl"
          )}
          style={{
            background: `linear-gradient(${levelColor.colorPrimary}, ${levelColor.colorAdditional}, ${levelColor.colorSecondary})`,
          }}
        />
      </div>
    </CreateModal>
  );
};

export default InfluencerProfileModal;
