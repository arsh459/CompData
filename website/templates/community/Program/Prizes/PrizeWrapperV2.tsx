import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import clsx from "clsx";
// import clsx from "clsx";
import { useState } from "react";
import NextButton from "../NextButton";
// import Prize from "./Prize";
import PrizeModal from "./PrizeModal";
import PrizeV2 from "./PrizeV2";

interface Props {
  prizes?: ListItem[];
  size?: "small";
  heading: string;
  setPostRequest: () => void;
  canSubmit?: boolean;
  headingSmall?: boolean;
}

const PrizesWrapperV2: React.FC<Props> = ({
  prizes,
  size,
  heading,
  canSubmit,
  setPostRequest,
  headingSmall,
}) => {
  // const [nextExists] = useState<boolean>(prizes && prizes?.length > 4 ? true : false);
  const [visible, setVisible] = useState<number>(4);

  const onNext = () => {
    setVisible((prev) => prev + 4);
  };

  const nextExists = prizes?.length && visible < prizes.length;

  const [isVisble, setIsVisble] = useState<boolean>(false);
  const [selectedPrize, setSelectedPrize] = useState<ListItem>();
  const onClose = () => setIsVisble(false);
  const onOpen = (prize: ListItem) => {
    setSelectedPrize(prize);

    setIsVisble(true);
  };
  return (
    <>
      <PrizeModal
        isOpen={isVisble}
        onCloseModal={onClose}
        selectedPrize={selectedPrize}
      />
      <div className="pb-2" id="goal">
        <p
          className={clsx(
            headingSmall
              ? "text-gray-700 font-semibold text-xl"
              : "text-gray-700 text-4xl font-semibold"
          )}
        >
          {heading}
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center  pt-0">
        {prizes &&
          prizes.slice(0, visible).map((item, index) => {
            return (
              <div
                key={`prize-${index}`}
                className="pb-4 w-full"
                // className={
                //   size === "small" ? "w-1/3 pr-4 pb-4" : "w-1/2 md:w-1/3 p-2"
                // }
              >
                <PrizeV2
                  prize={item}
                  size={size}
                  canSubmit={canSubmit}
                  onClick={() => onOpen(item)}
                  setPostRequest={setPostRequest}
                />
              </div>
            );
          })}
      </div>

      <div>
        {nextExists ? (
          <div className="bg-white w-full pb-4 md:pb-0">
            <NextButton onClick={onNext} />
          </div>
        ) : null}
      </div>

      {/* <div className="h-20" /> */}
    </>
  );
};

export default PrizesWrapperV2;

// date
// checkbox
// desc2
