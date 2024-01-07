import { CSSProperties, useState } from "react";
import { arrowDownBlack } from "@constants/icons/iconURLs";
import { useRouter } from "next/router";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { LandingButton } from "@templates/LandingPage/V2/components/LandingButton";
import SocialModal from "@templates/LandingPage/V2/components/SocialModal";
import AllLinks, { activeLinkType } from "./AllLinks";
import { LandingButtonStyleObj } from ".";
import clsx from "clsx";

interface Props {
  route?: string;
  btnText?: string;
  activeLink?: activeLinkType;
  finalRef: string;
  hideAllLinks?: boolean;
  customStyle?: CSSProperties;
  landingButtonStyleObj?: LandingButtonStyleObj;
  hideOnMobile?: boolean;
  onBtnClick?: () => void;
}

const LinksContainer: React.FC<Props> = ({
  route,
  btnText,
  activeLink,
  finalRef,
  hideAllLinks,
  customStyle,
  landingButtonStyleObj,
  hideOnMobile,
  onBtnClick,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const helperFunc = () => {
    document
      .getElementById("get_started")
      ?.scrollIntoView({ behavior: "smooth" });

    weEventTrack("landingPage_headerMainCTA", {});

    onBtnClick && onBtnClick();
    //
  };

  return (
    <div className="text-white flex items-center gap-3 md:gap-6">
      {hideAllLinks ? null : (
        <>
          <div className="hidden md:flex items-center gap-3 md:gap-6">
            <AllLinks activeLink={activeLink} finalRef={finalRef} />
          </div>
          <img
            src={arrowDownBlack}
            alt="arrow to open modal to select about-us and blog"
            className="w-4 aspect-1 object-contain md:hidden font-baim"
            onClick={() => setIsOpen(true)}
          />
        </>
      )}
      <SocialModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={clsx(
          "rounded-full backdrop-blur-lg",
          hideOnMobile && "hidden sm:block"
        )}
        style={
          customStyle
            ? customStyle
            : {
                background: `linear-gradient(94.38deg, rgba(255, 51, 161, 0.2) 9.85%, rgba(252, 51, 251, 0.2) 94.86%)`,
              }
        }
      >
        <LandingButton
          txtColor={
            landingButtonStyleObj?.txtColor
              ? landingButtonStyleObj.txtColor
              : "#FFFFFF"
          }
          borderColor={
            landingButtonStyleObj?.borderColor
              ? landingButtonStyleObj.borderColor
              : "#FF33A2"
          }
          btnText={btnText ? btnText : "Get Started"}
          btnStyle={clsx(
            "whitespace-nowrap text-xs md:text-sm font-popL rounded-full",
            landingButtonStyleObj?.styleTw
          )}
          onClickJump={() =>
            route
              ? router.push(route).then(() => {
                  helperFunc();
                })
              : helperFunc()
          }
        />
      </div>
    </div>
  );
};

export default LinksContainer;
