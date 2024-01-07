import { weEventTrack } from "@analytics/webengage/user/userLog";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  redirectLink: string;
  popupMsg?: string;
  additionalFunc?: () => void;
  position?: string;
}

const WhatsAppChat: React.FC<Props> = ({
  redirectLink,
  popupMsg,
  additionalFunc,
  position,
}) => {
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [showMsg, setShowMsg] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShowIcon(true);
      setTimeout(() => {
        setShowMsg(true);
      }, 2000);
    }, 3000);
  }, []);

  const onClick = () => {
    additionalFunc && additionalFunc();

    weEventTrack("landingPage_clickWA", {});
  };

  return (
    <div
      className={clsx(
        "fixed z-40 flex items-center",
        position ? position : "right-4 bottom-4"
      )}
    >
      {showMsg && popupMsg ? (
        <div className="bg-white border shadow-md rounded-xl relative z-0 mr-2 px-2 md:px-4 py-1 md:py-2">
          <p className="text-[#121212] font-bair text-base md:text-base">
            {popupMsg}
          </p>
          <div
            className="absolute -top-1 md:-top-2 -left-1 md:-left-2 z-10 aspect-1 flex justify-center items-center w-3 md:w-5 p-[3px] md:p-[5px] bg-zinc-500 text-white rounded-full cursor-pointer"
            onClick={() => setShowMsg(false)}
          >
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
              <path d="M1 1L23.5 23.5" stroke="white" strokeWidth="1.5" />
              <path d="M23.5 1L1.00001 23.5" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      ) : null}
      {showIcon ? (
        <Link href={redirectLink} passHref>
          <div className="cursor-pointer relative z-0">
            <img
              onClick={onClick}
              src="https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_2_Qi5YiiglY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668078601964"
              className="w-8 md:w-12 aspect-1 object-contain"
              alt=""
            />
            <div className="absolute -top-1 md:-top-2 -right-1 md:-right-2 z-10 w-2 md:w-3 aspect-1 bg-[#FF2E55] rounded-full" />
          </div>
        </Link>
      ) : null}
    </div>
  );
};

export default WhatsAppChat;
