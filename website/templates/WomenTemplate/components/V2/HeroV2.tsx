import { weEventTrack } from "@analytics/webengage/user/userLog";
import Link from "next/link";
import { useRouter } from "next/router";
interface Props {
  route: string;
  btnText: string;
}

const HeroV2: React.FC<Props> = ({ route, btnText }) => {
  const router = useRouter();

  const onGetStarted = () => {
    weEventTrack("landingPage_ctaClick", { pageName: router.pathname });
  };

  const onPlansClick = () => {
    weEventTrack("landingPage_clickPlans", { pageName: router.pathname });
  };

  return (
    <div className="w-full h-screen relative z-0">
      <div className="w-full h-full max-w-screen-xl mx-auto flex flex-col lg:flex-row-reverse">
        <div className="w-full lg:w-2/5 h-3/5 lg:h-full flex justify-center items-end">
          <img
            src="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/newhero_288GTu5xt.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674656144641"
            alt="hero section women image"
            className="h-[90%] lg:h-full object-contain lg:mr-16"
          />
        </div>

        <img
          src="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/runningBg_MhHzrkOu2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674656291224"
          className="absolute left-0 right-0 bottom-1/2 lg:bottom-0 translate-y-full lg:translate-y-0 object-contain z-0 lg:-z-10"
          alt="women page wave image"
        />

        <div className="w-full lg:w-1/2 h-2/5 lg:h-full flex flex-col justify-center p-5">
          <h1
            className="text-white font-popL text-2xl sm:text-3xl lg:text-[42px]"
            style={{ lineHeight: "1.25em" }}
          >
            Treat <span className="text-[#FF33A1]">PCOD / PCOS</span> with
            <br className="hidden lg:block" /> diet and exercise at home
          </h1>
          <p className="text-[#FFFFFF80] font-popL text-xs sm:text:base lg:text-xl py-5 lg:py-8">
            A 100% personalised PCOD treatment program for{" "}
            <span className="text-[#FFFFFFCC]">
              Weight loss, irregular periods
            </span>{" "}
            and <span className="text-[#FFFFFFCC]">skin acne</span>
          </p>

          <div className="w-full flex flex-col lg:flex-row">
            <Link passHref href={route} className="flex-1 lg:flex-[0.4]">
              <div
                className="w-full bg-white border border-[#FF33A1] backdrop-blur-lg font-popL text-center rounded-full p-3 text-white text-sm iphoneX:text-base"
                onClick={onGetStarted}
                style={{
                  background: `linear-gradient(94.38deg, rgba(255, 51, 161, 0.8) 9.85%, rgba(252, 51, 251, 0.8) 94.86%)`,
                }}
              >
                {btnText}
              </div>
            </Link>
            <div className="w-5 aspect-1" />
            <Link passHref href={`/plans`} className="flex-1 lg:flex-[0.4]">
              <div
                className="w-full border border-[#FF33A1] font-popL backdrop-blur-lg text-center rounded-full p-3 text-white text-sm iphoneX:text-base"
                onClick={onPlansClick}
                style={{
                  background: `linear-gradient(94.38deg, rgba(255, 51, 161, 0.2) 9.85%, rgba(252, 51, 251, 0.2) 94.86%)`,
                }}
              >
                Our Plans
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroV2;
