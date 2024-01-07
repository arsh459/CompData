import { Badge } from "@models/Prizes/PrizeV2";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import Link from "next/link";
import { useRef, useState } from "react";
// import Link from "next/link";

interface Props {
  badge: Badge;
  route?: string;
  ctaText?: string;
  ctaCallBack?: () => void;
}

const Hero: React.FC<Props> = ({ badge, route, ctaText, ctaCallBack }) => {
  const target = useRef<HTMLDivElement>(null);
  const targetModal = useRef<HTMLDivElement>(null);
  const [fullScreen, setfullScreen] = useState<boolean>(false);

  const handleWatchTrailer = () => {
    setfullScreen(true);
    if (
      target.current &&
      target.current.children[0] &&
      badge.badgeBGImage?.resource_type === "video"
    ) {
      const video = target.current.children[0] as HTMLVideoElement;

      video.pause();
    }
  };

  const handleModalClose = () => {
    setfullScreen(false);
    if (
      target.current &&
      target.current.children[0] &&
      badge.badgeBGImage?.resource_type === "video"
    ) {
      const video = target.current.children[0] as HTMLVideoElement;
      video.play();
    }
  };

  return badge ? (
    <>
      <div className="w-screen h-screen overflow-hidden relative z-0">
        <div ref={target} className="absolute inset-0 -z-10 w-full h-full">
          {badge.badgeBGImage ? (
            <MediaTile
              media={badge.badgeBGImage}
              alt="media"
              width={2400}
              height={getHeight(badge.badgeBGImage, 2400)}
              thumbnail={badge.marketingImage}
              objectString="object-cover object-top"
              noControls={true}
              paused={fullScreen}
              muted={true}
            />
          ) : null}
        </div>
        <div className="h-full w-full max-w-screen-lg mx-auto flex">
          <div className="w-full lg:w-1/2 h-max self-end lg:h-full flex flex-col justify-center p-4 relative z-0">
            <div className="lg:hidden absolute -inset-4 -top-6 -z-10 bg-gradient-to-t from-[#482D84]/20 to-transparent backdrop-blur-[2px]" />
            <div className="lg:hidden absolute -inset-4 -top-2 -z-10 backdrop-blur-[2px]" />
            <div className="lg:hidden absolute -inset-4 top-2 -z-10 backdrop-blur-[2px]" />
            <h1 className="tex-white font-semibold text-3xl sm:text-4xl lg:text-5xl font-nunitoB">
              {badge.name}
            </h1>
            <h3 className="text-white/80 text-base sm:text-lg lg:text-xl my-4 font-popR">
              {badge.courseGoal}
            </h3>
            <div className="w-full flex flex-col sm:flex-row mt-5">
              {/* <Link passHref href={route ? route : `/start`} className="flex-1">
                <div className="w-full bg-white border font-popM text-center rounded-full p-3 text-black text-sm iphoneX:text-base">
                  Get Started
                </div>
              </Link> */}
              {route ? (
                <Link
                  passHref
                  href={route ? route : `/start`}
                  className="flex-1"
                >
                  <div className="w-full bg-white border font-popM text-center rounded-full p-3 text-black text-sm iphoneX:text-base">
                    {ctaText}
                  </div>
                </Link>
              ) : (
                <div
                  onClick={ctaCallBack}
                  className="flex-1 bg-white border font-popM text-center rounded-full p-3 text-black text-sm iphoneX:text-base cursor-pointer"
                >
                  {ctaText}
                </div>
              )}
              <div className="w-5 aspect-1" />
              <button
                onClick={handleWatchTrailer}
                className="flex-1 bg-white/10 border border-white font-popL backdrop-blur-lg text-center rounded-full p-3 text-white text-sm iphoneX:text-base flex justify-center items-center cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 aspect-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 font-popM">Watch Trailer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <CreateModal
        isOpen={fullScreen && badge.badgeBGImage !== undefined}
        onBackdrop={handleModalClose}
        onCloseModal={handleModalClose}
        onButtonPress={handleModalClose}
        heading=""
        maxW="max-w-[100vw]"
        bgProp="mx-0"
      >
        <div className="w-screen h-screen bg-black/20 backdrop-blur-2xl flex justify-center items-center relative z-0">
          <div className="absolute inset-0 -z-10" onClick={handleModalClose} />
          <div
            ref={targetModal}
            className="w-11/12 sm:w-2/3 h-2/3 relative z-0"
          >
            {badge.marketImage ? (
              <MediaTile
                media={badge.marketImage}
                alt="media"
                width={400}
                height={getHeight(badge.marketImage, 400)}
                thumbnail={badge.marketingImage}
                objectString="object-cover object-top"
                noControls={false}
                paused={false}
                muted={!fullScreen}
                roundedString="rounded-2xl"
              />
            ) : badge.badgeBGImage ? (
              <MediaTile
                media={badge.badgeBGImage}
                alt="media"
                width={400}
                height={getHeight(badge.badgeBGImage, 400)}
                thumbnail={badge.marketingImage}
                objectString="object-cover object-top"
                noControls={false}
                paused={false}
                muted={!fullScreen}
                roundedString="rounded-2xl"
              />
            ) : null}
            <div className="absolute right-0 bottom-full py-3">
              <CloseBtn onCloseModal={handleModalClose} />
            </div>
          </div>
        </div>
      </CreateModal>
    </>
  ) : null;
};

export default Hero;
