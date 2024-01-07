import { weEventTrack } from "@analytics/webengage/user/userLog";
import { teamObj } from "@constants/teams";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  teamObj: teamObj;
  link: string;
}

const Hero: React.FC<Props> = ({ teamObj, link }) => {
  const router = useRouter();

  const onJoinNow = () => {
    weEventTrack("teams_clickJoinNow", { teamname: teamObj.teamname });

    weEventTrack("teamsLandingPage_ctaClick", {
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
            {teamObj.title}
            <p className="text-white/80 text-base md:text-xl font-popR text-center font-extralight pt-4">
              {teamObj.subtitle}
            </p>
          </div>

          <div className="flex-1 py-4 w-full max-w-[280px]">
            <Link passHref href={link}>
              <div
                className="flex justify-center w-full bg-white border font-baiSb text-center border-white/10 rounded-full px-4 py-3 text-black"
                onClick={onJoinNow}
              >
                Join Now
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
