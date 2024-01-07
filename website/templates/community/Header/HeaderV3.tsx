// import { Link } from "@mui/material";
import MoreMenu from "@components/MoreMenu";
import ShareModal from "@components/ShareModal";
import { backImage, shareIcon } from "@constants/icons/iconURLs";
// import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { useState } from "react";

interface Props {
  //   signedInUserImage?: CloudinaryMedia | AWSMedia;
  //   signedInUserKey?: string;
  //   signedInUserName?: string;
  uid?: string;
  onSignIn: () => void;
  onSignOut: () => void;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  onGoBack?: () => void;
  leaderId: string;
}

const HeaderV3: React.FC<Props> = ({
  // name,
  // headerItems,
  // viewStyle,
  // userKey,
  //   signedInUserImage,
  onGoBack,
  //   signedInUserKey,
  //   signedInUserName,
  uid,

  onSignIn,
  onSignOut,
  authStatus,
  // onNavChange,
  leaderId,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  return (
    <>
      <ShareModal
        isOpen={isVisible}
        onBackdrop={() => setIsVisible(false)}
        onButtonPress={() => setIsVisible(false)}
        onCloseModal={() => setIsVisible(false)}
        shareURL={`https://socialboat.live/p/${leaderId}`}
      />
      <MoreMenu
        isOpen={isMenuVisible}
        toClose={() => setIsMenuVisible(false)}
        authStatus={authStatus}
        onSignOut={onSignOut}
        canEdit={uid === leaderId ? true : false}
      />
      <div className="flex px-4 h-16 justify-between items-center">
        <div onClick={onGoBack} className="cursor-pointer">
          <img
            // className="w-5 h-4 object-cover"
            src={`${backImage}`}
            // src="https://img.icons8.com/ios-filled/100/363636/left.png"
          />
        </div>
        <div className="flex items-center">
          {/* <div className="cursor-pointer ml-5 relative">
                        <div className="absolute top-1 right-1 w-2 h-2 bg-[#F15454] rounded-full" />
                        <img
                            className="w-6 h-6 object-cover"
                            src="https://img.icons8.com/ios/50/363636/appointment-reminders--v1.png"
                        />
                    </div> */}
          <div
            className="cursor-pointer ml-5"
            onClick={() => setIsVisible(true)}
          >
            <img
              //   className="w-5 h-4 object-cov"
              src={`${shareIcon}`}
              //   src="https://img.icons8.com/ios-glyphs/30/363636/share--v1.png"
            />
          </div>
          {authStatus === "FAILED" ? (
            <div onClick={onSignIn} className="cursor-pointer ml-5">
              <p className="text-orange-500">Sign in</p>
            </div>
          ) : (
            <div
              className="cursor-pointer ml-5"
              onClick={() => setIsMenuVisible(true)}
            >
              <img
                className="w-6 h-5 object-cover"
                src="https://img.icons8.com/external-neu-royyan-wijaya/32/000000/external-more-neu-development-neu-royyan-wijaya.png"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderV3;
