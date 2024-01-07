import { useState } from "react";
import { arrowDownBlack } from "@constants/icons/iconURLs";

import { LandingButton } from "./LandingButton";
import SocialModal from "./SocialModal";
import Link from "next/link";
import { useRouter } from "next/router";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  route?: string;
  btnText?: string;
}

const LandingLinks: React.FC<Props> = ({ route, btnText }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const helperFunc = () => {
    document
      .getElementById("get_started")
      ?.scrollIntoView({ behavior: "smooth" });

    weEventTrack("landingPage_ctaClick", {});
  };

  return (
    <div className="text-white flex items-center ">
      <Link passHref href={`/about/company-details`}>
        <LandingButton
          btnText="About Us"
          btnStyle="rounded-lg px-6 py-3 mr-4 text-[17px] font-baim hidden sm:block "
        />
      </Link>
      <Link passHref href={`/blog`}>
        <LandingButton
          btnText="Blog"
          btnStyle="rounded-lg px-6 py-3 mr-4 text-[17px] font-baim hidden sm:block "
        />
      </Link>
      <img
        src={arrowDownBlack}
        alt="arrow to open modal to select about-us and blog"
        className="w-4 h-2 object-contain mr-4 sm:hidden font-baim "
        onClick={() => setIsOpen(true)}
      />
      <SocialModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <LandingButton
        txtColor="#FF4266"
        borderColor="#FF4266"
        btnText={btnText ? btnText : "Get Started"}
        btnStyle="whitespace-nowrap text-[10px] md:text-xs font-semibold font-baib rounded-[19px]"
        onClickJump={() =>
          route
            ? router.push(route).then(() => {
                helperFunc();
              })
            : helperFunc()
        }
      />
    </div>
  );
};

export default LandingLinks;
