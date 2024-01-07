import { weEventTrack } from "@analytics/webengage/user/userLog";
import MentionedBy from "@templates/LandingPage/V2/components/MentionedBy";
import Link from "next/link";
import { useRouter } from "next/router";
import { WomenImg } from "./Background";

interface Props {
  route: string;
}

const Hero: React.FC<Props> = ({ route }) => {
  const router = useRouter();

  const onGetStarted = () => {
    weEventTrack("women_clickGetStarted", {});

    weEventTrack("landingPage_ctaClick", { pageName: router.pathname });
  };

  // const onGift = () => {
  //   weEventTrack("women_clickGiftHer", {});
  // };

  return (
    <div className="w-full h-screen flex  relative z-0">
      <WomenImg />
      <div className="self-end lg:self-center w-full min-h-[50%] flex flex-col z-10 relative">
        <div className="flex-1 w-full sm:w-2/3 lg:w-1/2 h-full flex flex-col justify-center items-center mx-auto lg:mx-0">
          <div className="rounded-xl p-4 backdrop-blur-sm md:bg-inherit md:filter-none">
            <h1 className="text-white text-4xl md:text-5xl font-popR text-center">
              A Health
              <br />
              Transformation
              <br />
              App for
              <span className="text-[#FF4266] font-baiSb"> Women</span>
            </h1>
            <p className="text-white/80 text-base md:text-xl font-popR text-center font-extralight pt-4">
              PCOS/PCOD | Weightloss | Body toning
            </p>
          </div>

          <div className="flex-1 py-4 w-full max-w-[280px]">
            <Link passHref href={route}>
              <div
                className="flex justify-center w-full bg-white border font-baiSb text-center border-white/10 rounded-full p-4 text-black"
                onClick={onGetStarted}
              >
                Get Started
              </div>
            </Link>

            {/* <a
            href="https://www.producthunt.com/posts/socialboat-for-women?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-socialboat&#0045;for&#0045;women"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=367053&theme=dark&period=daily"
              alt="SocialBoat&#0032;for&#0032;Women - AI&#0032;Powered&#0032;fitness&#0032;game&#0032;for&#0032;women | Product Hunt"
              width="260"
              height="54"
            />
          </a> */}

            {/* <Link passHref href={`/gift`}>
            <a className=" text-center font-baib border border-white rounded-full p-4 backdrop-blur-xl bg-[#0000001A] md:backdrop-blur-none md:bg-white/5">
              <div className="flex justify-center" onClick={onGift}>
                <img
                  src="https://ik.imagekit.io/socialboat/tr:w-40,c-maintain_ratio,fo-auto/Vector__45__krZtP2H7_z.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668182020519"
                  alt=""
                  className="w-5 h-5 object-contain mr-2"
                />
                Gift Her
              </div>
            </a>
          </Link> */}
          </div>

          <div className="w-full py-4">
            {/* <Link
              href="/gift"
              // href="https://www.producthunt.com/posts/socialboat-for-women"
            >
              <div
                onClick={onGift}
                className="flex cursor-pointer  justify-center pb-8"
              >
                <img
                  src="https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Vector__44__CzO3Uh46B.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668181812435"
                  alt=""
                  className="w-6 h-6 object-contain"
                />
                <p className="text-[#FDBF21] text-light text-base underline pl-2 ">
                  Gift SocialBoat to a Loved one
                </p>
              </div>
            </Link> */}
            <MentionedBy />
          </div>

          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-[#212C4A] md:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
