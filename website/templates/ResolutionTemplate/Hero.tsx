import { weEventTrack } from "@analytics/webengage/user/userLog";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  link: string;
}

const Hero: React.FC<Props> = ({ link }) => {
  const router = useRouter();

  const onGetStarted = () => {
    weEventTrack("women_clickGetStarted", {});

    weEventTrack("landingPage_ctaClick", {
      pageName: router.pathname,
    });
  };

  return (
    <div className="w-full h-screen flex relative z-0">
      <div className="absolute inset-0 -z-10 flex justify-center lg:justify-end lg:items-end">
        <img
          src="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Group_1017_xVihz-130.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672758806882"
          alt="women workout"
          className="h-1/2 lg:h-[90%] aspect-1 object-contain mt-20 lg:mt-0"
        />
      </div>
      <div className="self-end lg:self-center w-full max-w-screen-xl mx-auto min-h-[50%] lg:min-h-full flex flex-col justify-center z-10 relative">
        <div className="w-full sm:w-2/3 lg:w-1/2 h-full flex flex-col justify-center items-center mx-auto lg:mx-0">
          <div className="rounded-xl p-4 backdrop-blur-sm md:bg-inherit md:filter-none">
            <h1 className="text-white text-4xl md:text-5xl font-popR text-center md:text-left">
              Take the
              <span className="text-[#FF4266] font-baiSb"> 1 min </span>
              New
              <br className="hidden md:block" />
              Year Resolution Test
            </h1>
            <p className="text-white/60 text-base md:text-xl text-center md:text-left font-popR font-extralight pt-4">
              Achieve your 2023 fitness goals with SocialBoat&apos;s
              <br className="hidden md:block" />
              AI-powered resolutions
            </p>
          </div>

          <div className="flex-1 py-4 w-full max-w-[280px]">
            <Link passHref href={link}>
              <div
                className="flex justify-center w-full bg-white border font-baiSb text-center border-white/10 rounded-full px-4 py-3 text-black"
                onClick={onGetStarted}
              >
                Get Started
              </div>
            </Link>
          </div>

          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-[#212C4A] lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
