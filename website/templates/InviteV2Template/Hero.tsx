import { weEventTrack } from "@analytics/webengage/user/userLog";
import { dataTypes } from "@constants/inviteV2";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  data: dataTypes;
  link: string;
}

const Hero: React.FC<Props> = ({ data, link }) => {
  const router = useRouter();

  const onJoinNow = () => {
    weEventTrack("inviteV2_clickJoinNow", { name: data.name });

    weEventTrack("teamsLandingPage_ctaClick", {
      pageName: router.pathname,
    });
  };

  return (
    <div className="w-full h-screen max-w-screen-lg mx-auto flex flex-col-reverse lg:flex-row justify-center items-center p-5 lg:p-0">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 rounded-xl py-5 backdrop-blur-sm md:bg-inherit md:filter-none">
          {data.title}
          <p className="text-white/70 text-base md:text-xl font-popR font-extralight pt-5">
            {data.subtitle}
          </p>
        </div>

        <div className="py-5 w-full sm:max-w-[280px]">
          <Link passHref href={link}>
            <div
              className="flex justify-center w-full bg-[#FF4266] font-baiSb text-center rounded-full px-4 py-3 text-white"
              onClick={onJoinNow}
            >
              {"Let's Do This"}
            </div>
          </Link>
        </div>
      </div>
      <div className="w-8 aspect-1" />
      <div className="h-1/2 lg:h-full flex items-end lg:items-center">
        <div className="h-4/5 lg:h-3/5 aspect-[0.72] rounded-2xl overflow-hidden border-4 border-white/50 p-2">
          <iframe
            className="w-full h-full rounded-xl"
            src={`https://www.youtube-nocookie.com/embed/${data.youtubeId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            title={`${data.name} challenge`}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
