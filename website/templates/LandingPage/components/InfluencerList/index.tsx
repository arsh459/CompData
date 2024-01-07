import clsx from "clsx";
import React, { useState } from "react";
import ImageList from "../HowToPlay/ImageList";
// import Profile from "../InfluencerProfile";
import ProfileModal from "../InfluencerProfilleModal";
// import RippleButton from "../RippleButton";
// import classes from "./InfluencerList.module.css";
import {
  LandingLeaderboard,
  // LeaderBoard,
} from "@models/LeaderBoard/Leaderboard";

// const { influencerContainer } = classes;

interface Props {
  leaders: LandingLeaderboard[];
}

const InfluencerList: React.FC<Props> = ({ leaders }) => {
  const [showProfile, setProfile] = useState(false);
  const [leader, setLeader] = useState<LandingLeaderboard>();

  const onClick = (leader: LandingLeaderboard) => {
    setProfile(true);
    setLeader(leader);
  };

  return (
    <div className="relative ">
      <div
        className={clsx(
          // influencerContainer,
          "flex justify-center items-center overflow-x-scroll py-4 w-screen scrollbar-hide"
        )}
      >
        <div className="">
          <ImageList onClick={onClick} leaders={leaders.slice(0, 10)} />
          <ImageList
            onClick={onClick}
            ml={true}
            leaders={leaders.slice(10, 20)}
          />
          <ImageList onClick={onClick} leaders={leaders.slice(20, 30)} />
        </div>
      </div>

      {/* <div
        className={clsx(
          // influencerContainer,
          "flex justify-center overflow-x-scroll pb-4 w-screen"
        )}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((image, idx) => (
          <div
            key={idx}
            className={clsx(
              // idx >= 5 ? "hidden md:block" : "",
              "w-12 h-12  2xl:w-24 2xl:h-24 mr-2 md:mr-4 flex-none bg-white rounded-full"
            )}
            onClick={() => setProfile(!showProfile)}
          ></div>
        ))}
      </div>

      <div
        className={clsx(
          influencerContainer,
          "flex ml-12 2xl:ml-24 justify-center overflow-hidden pb-4"
        )}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((image, idx) => (
          <div
            key={idx}
            className={clsx(
              // idx >= 5 ? "hidden md:block" : "",
              "w-12 h-12  2xl:w-24 2xl:h-24 mr-2 md:mr-4 flex-none bg-white rounded-full"
            )}
            onClick={() => setProfile(!showProfile)}
          ></div>
        ))}
      </div>

      <div
        className={clsx(
          influencerContainer,
          "flex justify-center overflow-hidden "
        )}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((image, idx) => (
          <div
            key={idx}
            className={clsx(
              // idx >= 5 ? "hidden md:block" : "",
              "w-12 h-12  2xl:w-24 2xl:h-24 mr-2 md:mr-4 flex-none bg-white rounded-full"
            )}
            onClick={() => setProfile(!showProfile)}
          ></div>
        ))}
      </div> */}

      <div className="bg-gradient-to-r from-black to-transparent w-1/3 z-10 absolute left-0 top-0 bottom-0 pointer-events-none" />
      <div className="bg-gradient-to-l from-black to-transparent w-1/3 z-10 absolute right-0 top-0 bottom-0 pointer-events-none" />

      {/**TO EDIT */}
      {/* <Profile show={showProfile} updateShow={(val) => setProfile(val)} /> */}
      {leader ? (
        <ProfileModal
          leader={leader}
          isOpen={showProfile}
          onCloseModal={() => setProfile(false)}
        />
      ) : null}
    </div>
  );
};

export default InfluencerList;
