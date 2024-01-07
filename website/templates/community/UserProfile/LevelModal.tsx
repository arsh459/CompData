import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import CirclePercent from "@components/CirclePercent";
import LevelPyramid from "@components/LevelPyramid";
import { getAspriant } from "@utils/aspriant";
import { formatWithCommas } from "@utils/number";
// import { getLevelIcon } from "./utils";
import { fPointsWhite, baseImageKit } from "@constants/icons/iconURLs";
import { POINTS_LEVEL_FIVE } from "@constants/gameStats";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  onBackdrop: () => void;
  onButtonPress: () => void;
  fitPoints?: number;
  percent?: number;
  level?: number;
}

const LevelModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  onBackdrop,
  onButtonPress,
  fitPoints,
  percent,
  level,
}) => {
  const userLavelData = getAspriant(level ? level : 0);

  return (
    <CreateModal
      onBackdrop={onBackdrop}
      onButtonPress={onButtonPress}
      isOpen={isOpen}
      heading=""
      onCloseModal={onCloseModal}
      bgData="p-4 bg-white fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full flex flex-col">
        <div
          className="mb-4 cursor-pointer self-end opacity-0"
          style={{
            animation: "visible 250ms linear 2s forwards",
          }}
        >
          <TopClose onCloseModal={onCloseModal} />
        </div>
        <div
          className="flex justify-around items-center text-white text-xl rounded-xl p-4 opacity-0"
          style={{
            backgroundColor: userLavelData.colorPrimary,
            animation: "stack 250ms linear forwards",
          }}
        >
          <CirclePercent circleSize={45} percent={percent ? percent : 0} />
          <div>Lvl {level ? level : 0}</div>
          <div className="text-2xl">{userLavelData.aspirant}</div>
        </div>
        <div
          className="flex flex-col justify-center items-center rounded-xl px-6 py-8 text-white my-4 opacity-0"
          style={{
            backgroundColor: userLavelData.colorPrimary,
            animation: "stack 250ms linear 250ms forwards",
          }}
        >
          <div className="flex justify-center items-center font-bold">
            <img
              className="pr-2 pb-1"
              src={`${baseImageKit}/tr:w-24,c-maintain_ratio/${fPointsWhite}`}
            />
            <p className="text-4xl tracking-wide">
              {level === 5
                ? `${POINTS_LEVEL_FIVE}+ `
                : `${
                    fitPoints ? formatWithCommas(Math.round(fitPoints)) : "0"
                  }`}
              FP
            </p>
          </div>
          <div className="text-lg">
            {level === 5 ? "You're the Champion" : "Left to next level"}
          </div>
          <div className="w-full h-[18px] rounded-xl border-2 my-4 p-0.5 overflow-hidden">
            <div
              className="rounded-xl h-full bg-white -translate-x-full"
              style={{
                width: `${percent ? percent : 0}%`,
                animation: "bar 1s linear 250ms forwards",
              }}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <LevelPyramid level={level ? level : 0} />
          <p
            className="text-center opacity-0"
            style={{
              animation: "visible 1s linear 2s infinite alternate",
            }}
          >
            Click on stacks
          </p>
        </div>
      </div>
    </CreateModal>
  );
};

export default LevelModal;
