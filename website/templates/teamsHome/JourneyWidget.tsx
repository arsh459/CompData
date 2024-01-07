import { getLevelColorV2 } from "@templates/LandingPage/levelColor";
import { getConsistencyRate } from "./utils";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  userLevelV2: number;
  activeFitPointsV2: number;
  dayPointObj?: { [day: string]: number };
}

const JourneyWidget: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  userLevelV2,
  activeFitPointsV2,
  dayPointObj,
}) => {
  const levelData = getLevelColorV2(userLevelV2);

  const rate = getConsistencyRate(dayPointObj);

  // console.log("ra", rate, dayPointObj, levelData);

  return (
    <div className="bg-gradient-to-b from-[#2B2B2B] to-[#000000] rounded-xl border-4 border-[#6F6F6F]">
      {isOpen ? null : (
        <>
          <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl italic font-extrabold text-white">
              Your Journey
            </h2>
            <img
              src={`https://ik.imagekit.io/socialboat/Vector_6akik0r7W.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652676176035`}
              alt="expand icon"
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <div className="h-px bg-[#6F6F6F]" />
        </>
      )}
      <div className="flex py-4 italic">
        <div className="flex flex-col items-center justify-center w-1/3">
          <h4 className="text-3xl font-bold" style={{ color: levelData.color }}>
            {activeFitPointsV2}
          </h4>
          <p className="text-[#626262] text-xs font-extrabold">Fitpoints</p>
        </div>
        <div className="w-px bg-[#6F6F6F]" />
        <div className="flex flex-col items-center justify-center w-1/3">
          <h4 className="text-3xl font-bold" style={{ color: levelData.color }}>
            {rate}%
          </h4>
          <p className="text-[#626262] text-xs font-extrabold">
            Consistency Rate
          </p>
        </div>
        <div className="w-px bg-[#6F6F6F]" />
        <div className="flex flex-col items-center justify-center w-1/3">
          <h4 className="text-3xl font-bold" style={{ color: levelData.color }}>
            {userLevelV2}
          </h4>
          <p className="text-[#626262] text-xs font-extrabold">Current Level</p>
        </div>
      </div>
    </div>
  );
};

export default JourneyWidget;
