import { LocalUser } from "@models/User/User";
import PlusMinus from "./PlusMinus";

export const repsNum = 15;

interface Props {
  localUser: LocalUser | undefined;
  onNumberFieldsUpdate: (val: number) => void;
}

const SetRepsCount: React.FC<Props> = ({ localUser, onNumberFieldsUpdate }) => {
  const gifUrl =
    localUser?.gender && localUser.gender === "male"
      ? "push-up-2_1_0knQ7sTKr.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666273527428"
      : "new4__1__Ch24noOKE.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1664949053990";
  const exersizeName =
    localUser?.gender && localUser.gender === "male"
      ? "Pushups"
      : "Jumping Jacks";

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full flex-1 relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src={`https://ik.imagekit.io/socialboat/tr:h-300,c-maintain_ratio,fo-auto/${gifUrl}`}
            className="h-full object-contain"
            alt="gif image for exercise"
          />
        </div>
      </div>
      <p
        className="text-[#F1F1F1] text-xs iphoneX:text-sm"
        style={{ fontFamily: "BaiJamjuree-Light" }}
      >
        Exercise benchmark
      </p>
      <p
        className="text-[#F1F1F1] text-xl iphoneX:text-2xl py-4"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        {exersizeName}
      </p>
      <p
        className="text-[#F1F1F1] text-xs iphoneX:text-sm"
        style={{ fontFamily: "BaiJamjuree-Light" }}
      >
        Rep count in 1 min
      </p>
      <PlusMinus
        current={localUser?.repsCount ? localUser.repsCount : repsNum}
        onChange={onNumberFieldsUpdate}
        unit="Reps"
      />
      {/* <div className="flex-1" /> */}
    </div>
  );
};

export default SetRepsCount;

interface SkipProps {
  onUserRepsCountUpdate: () => void;
}

export const Skip: React.FC<SkipProps> = ({ onUserRepsCountUpdate }) => {
  return (
    <div
      className="w-max mx-auto px-4 py-2 rounded-lg"
      onClick={() => onUserRepsCountUpdate()}
    >
      <p
        className="text-[#FF9F59] text-base"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        I don&apos;t know!
      </p>
    </div>
  );
};
