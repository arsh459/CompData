import LogoName from "../../../../LandingPage/V2/components/LogoName";
import Link from "next/link";
// import { useRouter } from "next/router";
import LinksContainer from "./LinksContainer";
import { activeLinkType } from "./AllLinks";
import { CSSProperties } from "react";
export interface LandingButtonStyleObj {
  txtColor?: string;
  borderColor?: string;
  styleTw?: string;
}
interface Props {
  route?: string;
  btnText?: string;
  activeLink?: activeLinkType;
  noLinks?: boolean;
  noMiddleLinks?: boolean;
  coachRef: string;
  customStyle?: CSSProperties;
  landingButtonStyleObj?: LandingButtonStyleObj;
  hideOnMobile?: boolean;
  onBtnClick?: () => void;
}

const LandingHeader: React.FC<Props> = ({
  route,
  btnText,
  activeLink,
  noLinks,
  coachRef,
  noMiddleLinks,
  customStyle,
  landingButtonStyleObj,
  hideOnMobile,
  onBtnClick,
}) => {
  // const router = useRouter();

  // const q = router.query as { home?: string; coach?: string };

  // const finalRef = coachRef ? coachRef : q.coach ? q.coach : "";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-black/10 backdrop-blur-2xl">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-10 py-3">
        <Link passHref href={coachRef ? `/?${coachRef}` : `/`}>
          <LogoName />
        </Link>
        {noLinks ? null : (
          <LinksContainer
            finalRef={coachRef}
            route={route}
            btnText={btnText}
            activeLink={activeLink}
            hideAllLinks={noMiddleLinks}
            customStyle={customStyle}
            landingButtonStyleObj={landingButtonStyleObj}
            hideOnMobile={hideOnMobile}
            onBtnClick={onBtnClick}
          />
        )}
      </div>
    </div>
  );
};

export default LandingHeader;
