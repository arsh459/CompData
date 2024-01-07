import { weEventTrack } from "@analytics/webengage/user/userLog";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import clsx from "clsx";
import { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  onBackdrop: () => void;
  onButtonPress: () => void;
  shareURL: string;
}

const ShareModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  onBackdrop,
  onButtonPress,
  shareURL,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleWebEngage = (eventName: string) => {
    weEventTrack(eventName, { shareURL });
  };

  const handleCopy = (e: any) => {
    e.target.previousSibling.select();
    navigator.clipboard.writeText(shareURL);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000 * 60);
    handleWebEngage("share_copyURL");
  };

  return (
    <CreateModal
      onBackdrop={onBackdrop}
      onButtonPress={onButtonPress}
      isOpen={isOpen}
      heading=""
      onCloseModal={onCloseModal}
      bgData="bg-white/[0.50] backdrop-blur fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full grid place-content-center gap-4">
        <div className="justify-self-end">
          <TopClose onCloseModal={onCloseModal} />
        </div>
        <div className="grid gap-6 p-6 bg-white rounded-2xl">
          <h3 className="cursor-default m-auto text-sm iphoneX:text-base">
            Share
          </h3>
          <div className="flex justify-around items-center">
            <FacebookShareButton
              url={shareURL}
              onClick={() => handleWebEngage("share_viaFacebook")}
            >
              <FacebookIcon size={50} borderRadius={10} />
            </FacebookShareButton>
            <LinkedinShareButton
              url={shareURL}
              onClick={() => handleWebEngage("share_viaLinkdin")}
            >
              <LinkedinIcon size={50} borderRadius={10} />
            </LinkedinShareButton>
            <WhatsappShareButton
              url={shareURL}
              onClick={() => handleWebEngage("share_viaWhatsApp")}
            >
              <WhatsappIcon size={50} borderRadius={10} />
            </WhatsappShareButton>
          </div>
          <div className="flex border rounded-lg">
            <input
              type="text"
              value={shareURL}
              readOnly
              className="flex-1 py-1 px-4 text-xs iphoneX:text-sm focus:outline-none focus:select-text bg-[#F1F1F1] rounded-l-lg"
            />
            <button
              className={clsx(
                "py-1 px-4 text-xs iphoneX:text-sm border-l border-[#C6C6C6] cursor-pointer uppercase bg-[#F1F1F1] rounded-r-lg",
                clicked && "text-sky-500"
              )}
              onClick={handleCopy}
            >
              copy
            </button>
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default ShareModal;
