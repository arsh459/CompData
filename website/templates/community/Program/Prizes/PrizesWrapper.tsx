import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import clsx from "clsx";
import { useState } from "react";
import Prize from "./Prize";
import PrizeModal from "./PrizeModal";

interface Props {
  prizes?: ListItem[];
  size?: "small";
  heading: string;
  setPostRequest: () => void;
  canSubmit?: boolean;
}

const PrizesWrapper: React.FC<Props> = ({
  prizes,
  size,
  heading,
  canSubmit,
  setPostRequest,
}) => {
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
      <div className="pb-4" id="goal">
        <p
          className={clsx(
            size === "small" ? "text-lg" : "text-2xl lg:text-2xl ",
            "text-center text-gray-700 font-semibold"
          )}
        >
          {heading}
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center  pt-0">
        {prizes &&
          prizes.map((item, index) => {
            return (
              <div
                key={`prize-${index}`}
                className={
                  size === "small" ? "w-1/3 pr-4 pb-4" : "w-1/2 md:w-1/3 p-2"
                }
              >
                <Prize
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
    </>
  );
};

export default PrizesWrapper;

// date
// checkbox
// desc2
