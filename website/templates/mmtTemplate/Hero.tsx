import { weEventTrack } from "@analytics/webengage/user/userLog";
import Link from "next/link";
import { useRouter } from "next/router";

const partnersImgUrl = [
  "https://ik.imagekit.io/socialboat/tr:h-200,c-maintain_ratio,fo-auto/Component_75_cJbdH6Xejg.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671002763620",
  "https://ik.imagekit.io/socialboat/tr:h-200,c-maintain_ratio,fo-auto/Component_75__1__P3y5N2mFwK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671002763383",
  "https://ik.imagekit.io/socialboat/tr:h-200,c-maintain_ratio,fo-auto/Component_75__2__YfLYPlKsrW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671002763574",
];

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
      <div className="absolute inset-0 -z-10 flex justify-center lg:justify-end">
        <img
          src="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/women_website_page_95_5YTOy7VqW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671002765199"
          alt="women workout"
          className="h-1/2 lg:h-full aspect-1 object-contain"
        />
      </div>
      <div className="self-end lg:self-center w-full min-h-[50%] lg:min-h-full flex flex-col justify-center z-10 relative">
        <div className="w-full sm:w-2/3 lg:w-1/2 h-full flex flex-col justify-center items-center mx-auto lg:mx-0">
          <div className="rounded-xl p-4 backdrop-blur-sm md:bg-inherit md:filter-none">
            <h1 className="text-white text-4xl md:text-5xl font-popR text-center">
              Join the <span className="text-[#FF4266] font-baiSb">GO-MMT</span>{" "}
              <br className="hidden lg:block" /> SuperWoman Challenge
            </h1>
            <p className="text-white/80 text-base md:text-xl font-popR text-center font-extralight pt-4">
              {"10K steps/day. Let's hit our fitness goals this Womens Day"}
            </p>
          </div>

          <div className="flex-1 py-4 w-full max-w-[280px]">
            <Link passHref href={link}>
              <div
                className="flex justify-center w-full bg-white border font-baiSb text-center border-white/10 rounded-full px-4 py-3 text-black"
                onClick={onGetStarted}
              >
                Join Now
              </div>
            </Link>
          </div>
          <div className="lg:absolute bottom-0 flex justify-center items-center py-12">
            {partnersImgUrl.map((each) => (
              <img
                key={each}
                src={each}
                className="w-1/4 sm:w-1/2 max-w-[120px] aspect-[2.8]"
                alt=""
              />
            ))}
          </div>

          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-[#212C4A] lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
