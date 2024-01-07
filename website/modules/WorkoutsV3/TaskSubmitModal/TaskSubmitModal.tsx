import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import UploadTaskCta from "../UploadTaskCta";

interface Props {
  isOpen: boolean;
  onBackdrop: () => void;
  onCloseModal: () => void;
  canCheckin: boolean;
  onCheckinClick: () => void;
  onPostClick: () => void;
}

const TaskSubmitModal: React.FC<Props> = ({
  onCloseModal,
  isOpen,
  onBackdrop,
  canCheckin,
  onCheckinClick,
  onPostClick,
}) => {
  // console.log("can", canCheckin);
  return (
    <CreateModal
      heading=""
      onButtonPress={() => {}}
      isOpen={isOpen}
      onBackdrop={onBackdrop}
      onCloseModal={onCloseModal}
      bgData="backdrop-blur-2xl bg-white fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full p-4 flex flex-col">
        <div className="flex justify-end items-center">
          <TopClose
            onCloseModal={onCloseModal}
            sizeString="w-6 iphoneX:w-8 h-6 iphoneX:h-8 object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-2xl iphoneX:text-3xl text-[#335E7D] font-medium text-center">
            Record your workout
          </p>

          {/* <div className="my-2 iphoneX:my-4 flex justify-center items-center">
            <img
              src={`https://ik.imagekit.io/socialboat/Component_2__1__BqmugCfHF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655493156229`}
              alt="example image"
              className="max-h-60"
            />
          </div> */}
          <div
            className="my-2 iphoneX:my-4 flex-1 flex justify-center items-center max-h-[500px]"
            style={{
              backgroundImage:
                "url('https://ik.imagekit.io/socialboat/Component_2__1__BqmugCfHF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655493156229)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
          />

          <p className="text-sm iphoneX:text-lg text-[#335E7D] text-center">
            Use your camera app to record a video of the task and upload it here
          </p>

          <div className="py-2 iphoneX:py-4">
            <UploadTaskCta onClick={onPostClick} />
          </div>
        </div>
        {canCheckin ? (
          <div>
            <p className="text-sm iphoneX:text-lg text-[#335E7D] text-center py-2">
              {`Don't want to record?`}
              <br />
              {`Checkin for 1FP`}
            </p>

            <button
              className="mx-auto bg-transparent flex justify-center items-center px-8 iphoneX:px-10 py-2 iphoneX:py-4 rounded-xl border border-[#589AC5]"
              onClick={onCheckinClick}
            >
              <img
                src={`https://ik.imagekit.io/socialboat/Group_-xWIBjR6u.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656071267700`}
                alt="check icon"
                className="w-4 iphoneX:w-6"
              />
              <span className="pl-2.5 iphoneX:text-xl text-[#589AC5]">
                Checkin for 1FP
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </CreateModal>
  );
};

export default TaskSubmitModal;
