import Link from "next/link";
import { UserInterface } from "@models/User/User";
import LogoName from "@templates/LandingPage/V2/components/LogoName";
import UserProfileDropdownV2 from "@templates/WomenTemplate/components/V2/CourseHeader/UserProfileDropdownV2";
import { LandingButton } from "@templates/LandingPage/V2/components/LandingButton";
import clsx from "clsx";

interface Props {
  btnText?: string;
  userObj: UserInterface;
  onSignOut: () => void;
  hideBg?: boolean;
}

const MyProgramHeader: React.FC<Props> = ({
  btnText,
  userObj,
  onSignOut,
  hideBg,
}) => {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 z-50",
        !hideBg && "bg-black/10 backdrop-blur-2xl border-b border-white/10"
      )}
    >
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <Link passHref href={`/`}>
          <LogoName />
        </Link>
        <div className="flex items-center">
          <a
            href="https://socialboat.app.link/download"
            target="_blank"
            rel="noreferrer"
            className="hidden md:block rounded-full backdrop-blur-lg mx-4"
            style={{
              background: `linear-gradient(94.38deg, rgba(255, 51, 161, 0.2) 9.85%, rgba(252, 51, 251, 0.2) 94.86%)`,
            }}
          >
            <LandingButton
              txtColor="#FFFFFF"
              borderColor="#FF33A2"
              btnText={"Download App"}
              btnStyle="whitespace-nowrap text-xs md:text-sm font-popL rounded-full"
              onClickJump={() => {}}
            />
          </a>
          <UserProfileDropdownV2 userObj={userObj} onSignOut={onSignOut} />
        </div>
      </div>
    </div>
  );
};

export default MyProgramHeader;
