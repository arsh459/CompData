import LoadIndicator from "@modules/WorkoutsV3/LoadIndicator";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import CreateModalV2 from "./CreateModalV2";
import { ModalData } from ".";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  modalData: ModalData;
}

const DetailsModalView1: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  modalData,
}) => {
  // console.log("m", modalData);
  return (
    <CreateModalV2 isOpen={isOpen}>
      <div className="w-full h-full flex flex-col text-[#203C51] overflow-y-scroll scrollbar-hide">
        <div className="flex justify-end">
          <CloseBtn onCloseModal={onCloseModal} tone="dark" />
        </div>
        <div className="w-4/5 h-full mx-auto flex flex-col justify-center items-center">
          {modalData.head ? (
            <h2 className="text-center text-lg iphoneX:text-2xl font-extrabold py-2">
              {modalData.head}
            </h2>
          ) : null}
          {modalData.subHead ? (
            <h3 className="text-center iphoneX:text-xl py-2">
              <span className="font-extrabold">{`${modalData.subHead.head} : `}</span>
              {modalData.subHead.text}
            </h3>
          ) : null}
          {modalData.loadInd ? (
            <div className="pb-2">
              <LoadIndicator color="#203C51" />
            </div>
          ) : null}
          {modalData.text ? (
            <p className="text-center text-xs iphoneX:text-base pb-2">
              {modalData.text}
            </p>
          ) : null}

          {modalData.tryBtn && modalData.tryBtnLink ? (
            <a href={modalData.tryBtnLink}>
              <button
                className="flex items-center bg-gradient-to-r from-[#F98258] via-[#EF9937] to-[#F29C39] rounded-lg text-white px-6 py-2 mt-2"
                onClick={modalData.tryBtnFunc}
              >
                <img
                  src={`https://ik.imagekit.io/socialboat/Vector__1__wsErjcigg.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653726678127`}
                  alt="retry icon"
                />
                <p className="pl-2 text-xs iphoneX:text-base">
                  {modalData.tryBtnText ? modalData.tryBtnText : "Try Again"}
                </p>
              </button>
            </a>
          ) : null}
          {modalData.reportBtn ? (
            <a
              href={`https://api.whatsapp.com/send?phone=919958730020&text=Hi!`}
            >
              <button
                className="flex items-center rounded-lg  px-6 py-2 my-2"
                // className="flex items-center bg-gradient-to-r from-[#F98258] via-[#EF9937] to-[#F29C39]  "
                onClick={modalData.reportBtnFunc}
              >
                <img
                  src={`https://ik.imagekit.io/socialboat/Vector__4__X4Na5-xfU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653904714709`}
                  alt="view icon"
                />
                <p className="pl-2 text-xs iphoneX:text-base">
                  {modalData.reportBtnText
                    ? modalData.reportBtnText
                    : "Contact us"}
                </p>
              </button>
            </a>
          ) : null}
        </div>
      </div>
    </CreateModalV2>
  );
};

export default DetailsModalView1;
