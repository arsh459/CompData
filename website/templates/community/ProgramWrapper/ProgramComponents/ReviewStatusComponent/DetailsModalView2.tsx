import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import CreateModalV2 from "./CreateModalV2";
import { ModalData } from ".";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  modalData: ModalData;
}

const DetailsModalView2: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  modalData,
}) => {
  return (
    <CreateModalV2 isOpen={isOpen} bgProps="bg-black/80">
      <div className="w-4/5 h-full mx-auto flex flex-col justify-center items-center text-[#CBCBCB] overflow-y-scroll scrollbar-hide">
        <div className="w-max self-end bg-[#111111]/60 backdrop-blur-xl rounded-full p-2.5">
          <CloseBtn onCloseModal={onCloseModal} />
        </div>
        <div className="flex flex-col justify-center items-center bg-[#111111]/60 backdrop-blur-xl rounded-2xl border border-[#808080] my-2">
          {modalData.head ? (
            <div className="flex justify-center items-center mt-5">
              <img
                src={`https://ik.imagekit.io/socialboat/Group_181_xvqWxR7Py.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653724850315`}
                alt="caution icon"
              />
              <h2 className="text-[#FD6F6F] text-center text-lg  iphoneX:text-2xl font-extrabold px-2">
                {modalData.head}
              </h2>
            </div>
          ) : null}
          {modalData.text ? (
            <p className="text-center text-xs iphoneX:text-base px-2 py-2.5 iphoneX:py-5">
              {modalData.text}
            </p>
          ) : null}
          {modalData.viewBtn || modalData.tryBtn ? (
            <div className="w-full h-px bg-[#808080]" />
          ) : null}
          <div className="w-full flex justify-evenly items-center">
            {modalData.viewBtn ? (
              <button
                className="flex items-center my-2 iphoneX:my-4"
                onClick={modalData.viewBtnFunc}
              >
                <img
                  src={`https://ik.imagekit.io/socialboat/Group_kO0RJ0sP9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653726108330`}
                  alt="view icon"
                />
                <p className="text-xs iphoneX:text-base pl-2">View Reason</p>
              </button>
            ) : null}
            {modalData.viewBtn && modalData.tryBtn ? (
              <div className="w-px h-full bg-[#808080]" />
            ) : null}
            {modalData.tryBtn && modalData.tryBtnLink ? (
              <a href={modalData.tryBtnLink}>
                <button
                  className="flex items-center my-2 iphoneX:my-4"
                  onClick={modalData.tryBtnFunc}
                >
                  <img
                    src={`https://ik.imagekit.io/socialboat/Vector_fKVgwSMuV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653726108354`}
                    alt="retry icon"
                  />
                  <p className="text-xs iphoneX:text-base pl-2">
                    {modalData.tryBtnText ? modalData.tryBtnText : "Try Again"}
                  </p>
                </button>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </CreateModalV2>
  );
};

export default DetailsModalView2;
