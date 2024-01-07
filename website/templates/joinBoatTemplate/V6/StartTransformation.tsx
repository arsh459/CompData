import { weEventTrack } from "@analytics/webengage/user/userLog";
import { LocalUser } from "@hooks/joinBoat/V6/interface";
import { sectionTypes } from "@hooks/joinBoat/V6/useSection";
import { getTransdormationDataV2, getTransformationIcon } from "./utils";
import { workType } from "@models/User/User";

interface Props {
  localUser: LocalUser | undefined;
  gotoSection: (sec: sectionTypes, replace?: boolean) => void;
  initScreen: boolean;
  thingsToWorkOn?: workType[];
}

const StartTransformation: React.FC<Props> = ({
  localUser,
  gotoSection,
  thingsToWorkOn,
}) => {
  const transdormationData = getTransdormationDataV2(localUser);

  const onNext = () => {
    weEventTrack(`fScanTransformation_clickNext`, {});
    gotoSection("achievementPath");
  };

  return (
    <div className="w-full h-full max-w-md mx-auto flex flex-col overflow-hidden relative z-0">
      <img
        src="https://ik.imagekit.io/socialboat/Frame_1762__1__A8UFFYh0S.png?updatedAt=1685449228580"
        className="absolute -left-1 -right-1 -top-1 -bottom-1 object-cover -z-10"
      />
      <div className="w-full flex-1 overflow-y-scroll scrollbar-hide p-4">
        <img
          src={
            // transdormationData.transformationImage ||
            "https://ik.imagekit.io/socialboat/Group_1777_rqQ4LDyf8.png?updatedAt=1685793133967"
          }
          className="w-full aspect-[330/280] object-contain"
        />
        <h2 className="text-white text-xl sm:text-2xl font-popM my-4 sm:my-6 mx-2">
          {transdormationData.title}
        </h2>
        <div className="bg-[#F3E8FF] rounded-3xl">
          <p className="text-[#232136] p-4 text-lg font-medium text-center">
            Things we will work on together 🌼
          </p>

          <div className="grid">
            {thingsToWorkOn &&
              thingsToWorkOn.map((item) => {
                const icon = getTransformationIcon(item.type);
                return (
                  <div
                    key={item.text}
                    className="flex justify-between items-center p-4 border-t border-black/10"
                  >
                    <span className="text-[#232136] capitalize text-sm iphoneX:text-base">
                      {item.text}
                    </span>
                    <img
                      src={icon}
                      alt={item.text}
                      className="w-8 iphoneX:w-10 aspect-1 ml-3"
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-full h-20" />
      </div>

      <div className="absolute left-4 right-4 bottom-4">
        <button
          className="w-full rounded-xl text-[#6D55D1] text-base iphoneX:text-lg text-center px-4 py-3 font-popR bg-white shadow-lg"
          onClick={onNext}
        >
          Show Me How
        </button>
      </div>
    </div>
  );
};

export default StartTransformation;
