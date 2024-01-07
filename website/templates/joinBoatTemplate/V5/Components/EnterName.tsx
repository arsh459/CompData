import { weEventTrack } from "@analytics/webengage/user/userLog";
import { socialboatLogoColor2 } from "@constants/icons/iconURLs";
import JoinBoatWrapper from "../JoinBoatWrapper";
import { LocalUser } from "@models/User/User";
import { useState } from "react";

interface Props {
  localUser?: LocalUser | undefined;
  onNameUpdate: (val: string) => void;
  onNameSave: () => void;
}

const EnterName: React.FC<Props> = ({
  localUser,
  onNameUpdate,
  onNameSave,
}) => {
  const [isNextClicked, setIsNextClicked] = useState<boolean>(false);

  const onNext = () => {
    if (localUser?.name?.trim()) {
      setIsNextClicked(true);

      setTimeout(() => {
        setTimeout(() => {
          setIsNextClicked(false);
        }, 1000);
        onNameSave();
      }, 2000);
    } else {
      onNameSave();
    }

    weEventTrack("fScanName_clickNext", {});
  };

  return (
    <JoinBoatWrapper
      headText="Introduction"
      title={isNextClicked ? "" : "Let's Start with your name?"}
      current={1}
      onNext={isNextClicked ? undefined : onNext}
    >
      {!isNextClicked ? (
        <div className="p-4 flex justify-center ">
          <input
            className="w-3/4 px-4  bg-[#100F1A] text-white text-3xl iphoneX:text-4xl text-center border-b border-[#757575] font-baib"
            value={localUser?.name ? localUser?.name : ""}
            onChange={(e) => onNameUpdate(e.target.value)}
            placeholder="Meera"
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center items-center">
            <img
              src={socialboatLogoColor2}
              className="w-2/3 max-w-xs aspect-1 object-contain"
              alt="socialboat logo with gradient "
            />
          </div>
          <div className="w-3/4 flex flex-col justify-center items-center mx-auto py-4">
            <p className="text-transparent text-base iphoneX:text-2xl bg-clip-text font-baib bg-gradient-to-b from-[#75E0DF] to-[#7B8DE3]">
              Nice to meet you
            </p>

            <p className="text-transparent capitalize text-2xl iphoneX:text-3xl bg-clip-text font-baib bg-gradient-to-b from-[#75E0DF] to-[#7B8DE3]">{`${localUser?.name}!`}</p>
          </div>
        </div>
      )}
    </JoinBoatWrapper>
  );
};

export default EnterName;
