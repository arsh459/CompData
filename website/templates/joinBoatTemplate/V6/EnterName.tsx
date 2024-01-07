import { socialboatLogoColor2 } from "@constants/icons/iconURLs";
import { LocalUser } from "@hooks/joinBoat/V6/interface";
import { useState } from "react";
import JoinBoatWrapper from "./JoinBoatWrapper";

interface Props {
  localUser?: LocalUser;
  onNameUpdate: (val: string) => void;
  onNameSave: (val?: string) => void;
  progress?: number;
}

const EnterName: React.FC<Props> = ({
  localUser,
  onNameUpdate,
  onNameSave,
  progress,
}) => {
  const [isNextClicked, setIsNextClicked] = useState<boolean>(false);

  const onNext = () => {
    if (localUser?.name?.trim()) {
      setIsNextClicked(true);

      setTimeout(() => {
        setTimeout(() => {
          setIsNextClicked(false);
        }, 1000);
        onNameSave(localUser?.name);
      }, 2000);
    }
  };

  return (
    <JoinBoatWrapper
      title={isNextClicked ? "" : "Let's Start with your name?"}
      onNext={isNextClicked ? undefined : onNext}
      disabled={!localUser?.name?.trim()}
      progress={isNextClicked ? undefined : progress}
    >
      {!isNextClicked ? (
        <div className="p-4 flex justify-center ">
          <input
            className="w-full px-4 bg-[#232136] text-white text-3xl iphoneX:text-4xl border-b border-[#757575] font-baib"
            value={localUser?.name ? localUser?.name : ""}
            onChange={(e) => onNameUpdate(e.target.value)}
            placeholder="Meera"
          />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img
            src={socialboatLogoColor2}
            className="w-3/4 max-w-xs aspect-1 object-contain"
            alt="socialboat logo with gradient "
          />
          <p className="w-3/4 py-4 text-transparent text-base iphoneX:text-2xl bg-clip-text font-baib bg-gradient-to-b from-[#75E0DF] to-[#7B8DE3]">
            Nice to meet you{" "}
            <span className="text-transparent capitalize text-2xl iphoneX:text-3xl bg-clip-text font-baib bg-gradient-to-b from-[#75E0DF] to-[#7B8DE3]">{`${localUser?.name}!`}</span>
          </p>
        </div>
      )}
    </JoinBoatWrapper>
  );
};

export default EnterName;
