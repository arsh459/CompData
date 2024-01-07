import CreateModal from "../Program/CreateModal/CreateModal";
import { cancelBtn } from "@constants/icons";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  earnedFP: number;
  totalFP: number;
  userScore: string;
  awardLevels?: { text: string; fitPoints: number }[];
}

const EarnedFitPointModal: React.FC<Props> = ({
  isOpen,
  onClose,
  earnedFP,
  totalFP,
  awardLevels,
  userScore,
}) => {
  return (
    <CreateModal
      isOpen={isOpen}
      onButtonPress={onClose}
      heading=""
      onCloseModal={onClose}
      onBackdrop={onClose}
      bgData="bg-white/[0.57] backdrop-blur-[100px] fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full min-h-full flex flex-col justify-center p-4">
        <div
          className={clsx(
            "bg-gradient-to-b from-[#2CC2B9] to-[#76A7E0]",
            "text-lg iphoneX:text-2xl italic font-bold text-white rounded-lg"
          )}
        >
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex items-center">
              <img
                src={`https://ik.imagekit.io/socialboat/Vector__11__5Mi_iTCJd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650966172454`}
                alt="Fitpoints Icon"
              />
              <p className="pl-4 italic">Earned Fitpoints</p>
            </div>
            <img
              src={cancelBtn}
              alt="Cancle Icon"
              className="w-6 h-6"
              onClick={onClose}
            />
          </div>
          <div className="flex border-t border-white p-4">
            <div className="flex-[35%] px-4 py-3 text-center">
              <p>{earnedFP} FP</p>
              <div className="my-1 h-px bg-white" />
              <p>{totalFP} FP</p>
            </div>
            <div className="w-px mx-4 bg-white" />
            <div className="flex-[65%] px-4 py-3 flex justify-center items-center">
              <p className="text-center">{userScore}</p>
            </div>
          </div>
        </div>
        <div className="h-4" />
        <div className="rounded-lg bg-gradient-to-b from-[#3679C2] to-[#519BEB] text-white">
          <div className="flex justify-between items-center px-4 py-3">
            <div className="text-xl font-bold">Task</div>
            <div className="text-xl font-bold">Fitpoints</div>
          </div>
          <div className="h-px bg-white" />
          {awardLevels?.map((item, index, arr) => (
            <div
              className={clsx(
                "flex justify-between items-center px-4",
                index === arr.length - 1 ? "py-4" : "pt-4"
              )}
              key={index}
            >
              <div>{item.text}</div>
              <div>Earn {item.fitPoints} FP</div>
            </div>
          ))}
        </div>
      </div>
    </CreateModal>
  );
};

export default EarnedFitPointModal;
