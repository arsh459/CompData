import { badgeTypes, SBPrize } from "@models/Prizes/PrizeV2";
import clsx from "clsx";
import { useState } from "react";
import CreateModal from "../../CreateModal/CreateModal";
import CloseBtn from "../../Feed/CloseBtn";
import ShowPrize from "./ShowPrize";
import SlideToOpen from "./SlideToOpen";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  badgeType: badgeTypes;
  prizes: SBPrize[];
}

const ClaimModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  badgeType,
  prizes,
}) => {
  const [isSwiped, setIsSwiped] = useState<boolean>(false);
  const [showPrize, setShowPrize] = useState<boolean>(false);

  return (
    <CreateModal
      isOpen={isOpen}
      onBackdrop={onCloseModal}
      onCloseModal={onCloseModal}
      onButtonPress={onCloseModal}
      heading={""}
      bgProp="bg-gradient-to-b from-[#242424]/75 via-[#262626]/75 to-[#1A1A1A]/75 backdrop-blur-xl fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full flex flex-col justify-center items-center text-white p-4">
        <div
          className={clsx(
            "self-end transition-all opacity-0 pointer-events-none",
            showPrize && "opacity-100 pointer-events-auto"
          )}
        >
          <CloseBtn onCloseModal={onCloseModal} />
        </div>
        {showPrize ? (
          <ShowPrize
            badgeType={badgeType}
            prizes={prizes}
            onCloseModal={onCloseModal}
          />
        ) : (
          <>
            {isSwiped ? null : (
              <>
                <h1 className="text-3xl text-center font-extrabold">
                  Congratulations!
                </h1>
                <h3 className="text-2xl text-center pt-12">
                  You have unlocked this reward.
                </h3>
                <h3 className="text-lg text-center pb-4">
                  Reach us on +91 9599014590 if you have any questions
                </h3>
              </>
            )}
            <SlideToOpen
              isSwiped={isSwiped}
              setIsSwiped={setIsSwiped}
              badgeType={badgeType}
              setShowPrize={() => setShowPrize(true)}
            />
          </>
        )}
      </div>
    </CreateModal>
  );
};

export default ClaimModal;
