import CreateModal from "../../CreateModal/CreateModal";
import CloseBtn from "../../Feed/CloseBtn";
import Linkify from "react-linkify";
import UserImage from "@templates/listing/Header/UserImage";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export type contentType = {
  profileImage?: CloudinaryMedia | AWSMedia;
  name?: string;
  description?: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  content?: contentType;
}

const ShowMoreModal: React.FC<Props> = ({ isOpen, onClose, content }) => {
  return (
    <CreateModal
      isOpen={isOpen}
      heading=""
      onBackdrop={onClose}
      onButtonPress={onClose}
      onCloseModal={onClose}
      bgData="bg-black fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="p-4 flex items-center flex-col justify-center h-full w-full relative z-0">
        <div className="self-end my-4">
          <CloseBtn onCloseModal={onClose} />
        </div>
        <div className="bg-[#1F1F1F]/25 border border-[#373737] mx-4 my-2 iphoneX:my-4 p-2 iphoneX:p-4 rounded-xl relative z-0">
          {content?.profileImage || content?.name ? (
            <div className="flex items-center mb-2 iphoneX:mb-4">
              <UserImage
                image={content.profileImage}
                boxWidth="w-8"
                boxHeight="h-8"
              />
              <h6 className="text-[#EBEBEB] pl-2 iphoneX:text-xl font-bold">
                {content.name}
              </h6>
            </div>
          ) : null}
          <p className="text-[#EBEBEB] text-xs iphoneX:text-base prose whitespace-pre-wrap">
            <Linkify>{content?.description}</Linkify>
          </p>
        </div>
      </div>
    </CreateModal>
  );
};

export default ShowMoreModal;
