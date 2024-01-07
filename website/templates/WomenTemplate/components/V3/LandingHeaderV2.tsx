import LogoName from "@templates/LandingPage/V2/components/LogoName";
import Link from "next/link";
import { activeLinkType } from "../V2/LandingHeader/AllLinks";
import LinksContainerV2 from "./LinkContainerV2";
import { LandingButton } from "@templates/LandingPage/V2/components/LandingButton";
import { useRouter } from "next/router";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  route?: string;
  btnText?: string;
  activeLink?: activeLinkType;
  noLinks?: boolean;
  coachRef: string;
}

const LandingHeaderV2: React.FC<Props> = ({
  route,
  btnText,
  activeLink,
  noLinks,
  coachRef,
}) => {
  const router = useRouter();
  const helperFunc = () => {
    document
      .getElementById("get_started")
      ?.scrollIntoView({ behavior: "smooth" });

    weEventTrack("landingPage_headerMainCTA", {});
  };

  const btnAction = () => {
    if (route) {
      router.push(route).then(() => {
        helperFunc();
      });
    } else {
      helperFunc();
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-[#0000003B] backdrop-blur-2xl">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2 h-14">
        <Link passHref href={coachRef ? `/?${coachRef}` : `/`}>
          <LogoName />
        </Link>
        {noLinks ? null : (
          <LinksContainerV2
            finalRef={coachRef}
            route={route}
            btnText={btnText}
            activeLink={activeLink}
            btnAction={btnAction}
          />
        )}
        {btnAction ? (
          <div className="hidden lg:block rounded-full backdrop-blur-lg bg-white">
            <LandingButton
              txtColor="#000"
              btnText={btnText ? btnText : "Get Started"}
              btnStyle="whitespace-nowrap text-xs md:text-sm font-popM rounded-full"
              onClickJump={btnAction}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LandingHeaderV2;
