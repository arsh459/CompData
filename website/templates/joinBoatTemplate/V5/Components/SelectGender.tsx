import { weEventTrack } from "@analytics/webengage/user/userLog";
import {
  genderFemale,
  genderMale,
  iconFemale,
  iconMale,
} from "@constants/icons/iconURLs";
import { genderType, LocalUser } from "@models/User/User";
import clsx from "clsx";

interface Props {
  localUser?: LocalUser | undefined;
  onGenderUpdate: (val: genderType) => void;
}

const SelectGender: React.FC<Props> = ({ localUser, onGenderUpdate }) => {
  const onGenderUpdateFunc = (gender: genderType) => {
    onGenderUpdate(gender);
    weEventTrack("fScanGender_changeGender", { gender: gender });
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 flex flex-row justify-center items-center">
        <div
          className={clsx(
            "h-full flex flex-col justify-center items-center relative",
            localUser?.gender === "male"
              ? "scale-120 z-10 w-2/3"
              : "scale-100 z-20 w-1/2"
          )}
          onClick={() => onGenderUpdateFunc("male")}
        >
          <img
            src="https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_765__1__8-V6d8Fp5i.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665995790862"
            alt="ball of gradient color blue"
            className={clsx(
              "aspect-1 absolute object-contain top-[15%] -z-10 transition-all pointer-events-none",
              localUser?.gender === "male" ? "scale-[200%]" : "scale-0"
            )}
          />
          <img
            src={genderMale}
            alt="image to select male as a gender"
            className={clsx(
              "object-contain aspect-[720/1280]",
              localUser?.gender === "male" ? "opacity-100" : "opacity-50"
            )}
          />
          <div
            className={clsx(
              "flex flex-row  justify-center items-center pt-4",
              localUser?.gender === "female" ? "opacity-0" : "opacity-100"
            )}
          >
            <img
              src={iconMale}
              alt="icon male"
              className="w-4 object-contain iphoneX:w-5 aspect-1"
            />
            <div className="w-2" />
            <p className="text-transparent bg-clip-text font-baib bg-gradient-to-b from-[#60BFFF] to-[#849FFF] text-base iphoneX:text-xl">
              Male
            </p>
          </div>
        </div>
        <div
          className={clsx(
            "h-full flex flex-col justify-center items-center relative",
            localUser?.gender === "female"
              ? "scale-120 z-10 w-2/3"
              : "scale-100 z-20 w-1/2"
          )}
          onClick={() => onGenderUpdateFunc("female")}
        >
          <img
            src={genderFemale}
            alt="image to select female as a gender"
            className={clsx(
              "object-contain aspect-[720/1280]",
              localUser?.gender === "female" ? "opacity-100" : "opacity-50"
            )}
          />
          <div
            className={clsx(
              "flex flex-row justify-center items-center pt-4",
              localUser?.gender === "male" ? "opacity-0" : "opacity-100"
            )}
          >
            <img
              src="https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_766__1__RjSuF3yfi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665995790842"
              alt="ball of gradient color pink"
              className={clsx(
                "aspect-1 absolute object-contain top-[15%] -z-10 transition-all pointer-events-none",
                localUser?.gender === "female" ? "scale-[200%]" : "scale-0"
              )}
            />
            <img
              src={iconFemale}
              alt="icon female"
              className="w-4 iphoneX:w-5 aspect-1 object-contain"
            />
            <div className="w-2" />
            <p className="text-transparent bg-clip-text font-baib text-base iphoneX:text-xl bg-gradient-to-b from-[#FF5D7F] to-[#FF72D8]">
              Female
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectGender;
