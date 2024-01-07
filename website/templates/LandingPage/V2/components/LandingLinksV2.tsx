import { useState } from "react";
import { arrowDownBlack } from "@constants/icons/iconURLs";
import Link from "next/link";
import { useRouter } from "next/router";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { LandingButton } from "@templates/LandingPage/V2/components/LandingButton";
import SocialModal from "@templates/LandingPage/V2/components/SocialModal";

interface Props {
  route?: string;
  btnText?: string;
}

const LandingLinksV2: React.FC<Props> = ({ route, btnText }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const helperFunc = () => {
    document
      .getElementById("get_started")
      ?.scrollIntoView({ behavior: "smooth" });

    weEventTrack("landingPage_ctaClick", {});
  };

  return (
    <div className="text-white flex items-center gap-3 sm:gap-6">
      <Link passHref href={`/reviews`}>
        <LandingButton
          btnText="Reviews"
          btnStyle="rounded-lg px-0 py-3 text-base font-popL hidden sm:block "
        />
      </Link>
      <Link passHref href={`/blog`}>
        <LandingButton
          btnText="Blog"
          btnStyle="rounded-lg px-0 py-3 text-base font-popL hidden sm:block "
        />
      </Link>
      <Link passHref href={`/plans`}>
        <LandingButton
          btnText="Our Plans"
          btnStyle="rounded-lg px-0 py-3 text-base font-popL hidden sm:block "
        />
      </Link>
      <Link passHref href={`/about/company-details`}>
        <LandingButton
          btnText="About Us"
          btnStyle="rounded-lg px-0 py-3 text-base font-popL hidden sm:block "
        />
      </Link>
      <img
        src={arrowDownBlack}
        alt="arrow to open modal to select about-us and blog"
        className="w-4 aspect-1 object-contain sm:hidden font-baim"
        onClick={() => setIsOpen(true)}
      />
      <SocialModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className="rounded-full backdrop-blur-lg"
        style={{
          background: `linear-gradient(94.38deg, rgba(255, 51, 161, 0.2) 9.85%, rgba(252, 51, 251, 0.2) 94.86%)`,
        }}
      >
        <LandingButton
          txtColor="#FFFFFF"
          borderColor="#FF33A2"
          btnText={btnText ? btnText : "Get Started"}
          btnStyle="whitespace-nowrap text-xs sm:text-sm font-popL bg-[#FF33A126] rounded-[19px]"
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

export default LandingLinksV2;
