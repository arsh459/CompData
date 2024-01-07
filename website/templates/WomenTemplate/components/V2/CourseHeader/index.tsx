import LogoName from "../../../../LandingPage/V2/components/LogoName";
import Link from "next/link";

import UserProfileDropdown from "./UserProfileDropdown";
import { UserInterface } from "@models/User/User";
interface Props {
  btnText?: string;
  userObj: UserInterface;
  onSignOut: () => void;
}

const CourseHeader: React.FC<Props> = ({ btnText, userObj, onSignOut }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-black/10 backdrop-blur-2xl">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-10 py-3 relative z-0">
        <Link passHref href={`/`}>
          <LogoName />
        </Link>

        <UserProfileDropdown userObj={userObj} onSignOut={onSignOut} />
      </div>
    </div>
  );
};

export default CourseHeader;
