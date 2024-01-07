import { weEventTrack } from "@analytics/webengage/user/userLog";
import { useState } from "react";

interface Props {
  teamName: string;
  setTeamName: (val: string) => void;
  onUserTeamnameUpdate: () => void;
}

const TeamName: React.FC<Props> = ({
  teamName,
  setTeamName,
  onUserTeamnameUpdate,
}) => {
  const [isNextClicked, setIsNextClicked] = useState<boolean>(false);

  const onNext = () => {
    setIsNextClicked(true);

    setTimeout(() => {
      setTimeout(() => {
        setIsNextClicked(false);
      }, 1000);
      onUserTeamnameUpdate();
    }, 1500);

    weEventTrack("orgOnboardTeamName_clickNext", {});
  };

  return !isNextClicked ? (
    <div className="px-4 w-full max-w-md mx-auto">
      <p className="text-2xl font-baib">
        Let&apos;s start with your Team name?
      </p>
      <div className="h-8" />
      <div className="p-4 flex justify-center ">
        <input
          className="w-3/4 px-4  bg-[#100F1A] text-white text-3xl iphoneX:text-4xl text-center border-b border-[#757575] font-baib"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
        />
      </div>
      <div className="h-40" />
      {teamName !== "" ? (
        <div className="flex justify-center items-center">
          <button
            className="bg-[#F03D5F] px-12 py-2 rounded-lg font-baim"
            onClick={onNext}
          >
            Create Team
          </button>
        </div>
      ) : null}
    </div>
  ) : (
    <div className="px-12 w-full max-w-md mx-auto">
      <p className="text-2xl font-baib text-center">Welcome to SocialBoat</p>
      <div className="relative w-full py-12">
        <img
          src="https://ik.imagekit.io/socialboat/Component_1__11__afVcBb1-y.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666190490625"
          className="object-contain"
          alt="stary background"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <p className="w-2/3 text-center bg-gradient-to-r from-[#D3B45F] via-[#FEE7A9] to-[#D3B45F] bg-clip-text text-transparent text-3xl font-baib">
            {teamName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamName;
