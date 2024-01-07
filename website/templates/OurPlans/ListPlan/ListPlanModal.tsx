import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import { XIcon } from "@heroicons/react/solid";

interface Props {
  isOpen: boolean;
  imgURI?: string;
  text?: string;
  onClose: () => void;
  onBackdrop: () => void;
}

const ListPlanModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onBackdrop,
  imgURI,
  text,

  //   childEvents,
}) => {
  return (
    <>
      <CreateModal
        isOpen={isOpen}
        onBackdrop={onBackdrop}
        onCloseModal={onClose}
        onButtonPress={() => {}}
        heading=""
        maxW="max-w-[100vw]"
        bgProp="mx-0"
      >
        <div className="w-screen h-screen bg-black/70 flex justify-center items-center relative z-0">
          <div className="absolute inset-0 -z-10" onClick={onClose} />

          <div className="max-w-lg  p-5  relative z-0">
            <div className="  bg-white/10 backdrop-blur-3xl m-1 rounded-3xl">
              <div className="flex flex-col justify-between   ">
                <div className="px-4 py-4 ">
                  <div className="w-full">
                    <img
                      src={imgURI}
                      alt=""
                      className="w-full aspect-[336/151]"
                    />
                  </div>
                  <div className="pt-4 ">
                    <p className="text-white/60 text-base">{text}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute  bottom-full right-5 p-2 rounded-full cursor-pointer bg-white/10 backdrop-blur-3xl"
              onClick={onClose}
            >
              <XIcon className="w-5 aspect-[10/7] " color="#fff" />
            </div>
          </div>
        </div>
      </CreateModal>
    </>
  );
};

export default ListPlanModal;
