import { weEventTrack } from "@analytics/webengage/user/userLog";
import CTA from "./CTA";

export type deviceTypes = "android" | "ios";

interface Props {
  text?: string;
  subtitle?: string;
  link1?: string;
  link2?: string;
  onProceed: (val: deviceTypes) => void;
}

const SelectDevice: React.FC<Props> = ({
  onProceed,
  text,
  subtitle,
  link1,
  link2,
}) => {
  const onProcessAndroid = () => {
    onProceed("android");
    weEventTrack("auth_clickDevice", { device: "android" });
  };

  const onProcessIos = () => {
    onProceed("ios");
    weEventTrack("auth_clickDevice", { device: "ios" });
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto flex flex-col items-center pt-8 px-4">
      <h1 className="text-3xl sm:text-[45px] lg:text-6xl font-extrabold text-center font-baib">
        {text ? text : "Choose your Device"}
      </h1>
      {subtitle ? (
        <h1 className="text-2xl pt-8 font-medium text-center font-baim">
          {subtitle}
        </h1>
      ) : null}
      <div className="py-10 flex flex-col md:flex-row">
        <CTA
          text="Android"
          link={link1}
          onClick={onProcessAndroid}
          bgColor="bg-[#F1F1F1]"
          textColor="text-black"
          textSize="text-base sm:text-lg lg:text-xl"
          icon="https://ik.imagekit.io/socialboat/Vector__35__Lbo4oy_fyV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663593358897"
          width="w-52"
        />
        <div className="h-6 aspect-1" />
        <CTA
          text="IOS"
          link={link2}
          onClick={onProcessIos}
          bgColor="bg-[#F1F1F1]"
          textColor="text-black"
          textSize="text-base sm:text-lg lg:text-xl"
          icon="https://ik.imagekit.io/socialboat/Vector__36__U1KvII9Y7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663593384962"
          width="w-52"
        />
      </div>
    </div>
  );
};

export default SelectDevice;
