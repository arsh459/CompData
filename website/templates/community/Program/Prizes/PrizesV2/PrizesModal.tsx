import { SBPrize } from "@models/Prizes/PrizeV2";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import CreateModal from "../../CreateModal/CreateModal";
import CloseBtn from "../../Feed/CloseBtn";
import { getHeight } from "../../getAspectRatio";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  prizes: SBPrize[];
}

const PrizesModal: React.FC<Props> = ({ isOpen, setIsOpen, prizes }) => {
  return (
    <CreateModal
      isOpen={isOpen}
      onBackdrop={() => setIsOpen(false)}
      onCloseModal={() => setIsOpen(false)}
      onButtonPress={() => setIsOpen(false)}
      heading={""}
      bgProp="bg-gradient-to-b from-[#242424]/75 via-[#262626]/75 to-[#1A1A1A]/75 backdrop-blur-xl fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full flex flex-col justify-center text-white">
        <div className="flex justify-between items-center p-4">
          <p className="text-xl iphoneX:text-3xl font-extrabold">Rewards</p>
          <CloseBtn onCloseModal={() => setIsOpen(false)} />
        </div>
        <div className="overflow-y-scroll py-4">
          {prizes.map((each, index) => (
            <div
              key={`${each.name}-${index}`}
              className="flex items-center p-4 border-t border-[#6B6B6B]"
            >
              <div className="flex-[0.35]">
                <MediaTile
                  media={each.media}
                  alt="media"
                  width={400}
                  height={getHeight(each.media, 400)}
                  rounded
                />
              </div>
              <div className="flex-[0.65] text-xs iphoneX:text-sm pl-4">
                <p className="font-medium">{each.name}</p>
                <p className="">{each.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CreateModal>
  );
};

export default PrizesModal;
