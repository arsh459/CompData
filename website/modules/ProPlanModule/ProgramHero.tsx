import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Badge } from "@models/Prizes/PrizeV2";
import { genderType } from "@models/User/User";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import ButtonWithIconV2 from "@templates/LandingPage/V2/components/ButtonWithIconV2";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

interface Props {
  badge: Badge;
  gender?: genderType;
}

const ProgramHero: React.FC<Props> = ({ badge, gender }) => {
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

  const trailer = badge?.badgeBGImage || badge?.marketImage;
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return badge ? (
    <>
      <div className="w-full h-1/2 md:h-[65%] max-w-6xl mx-auto flex items-center px-4 py-8 snap-start">
        <div className="flex gap-2">
          <div
            onClick={handleBack}
            className="h-8 flex justify-center items-center"
          >
            <ArrowLeftIcon className="w-8 aspect-1 text-white" />
          </div>

          <div className="">
            <div className="w-2/6 md:w-1/6">
              {badge.courseDecorImage ? (
                <MediaTile
                  media={badge.courseDecorImage}
                  alt="media"
                  width={232}
                  height={getHeight(badge.courseDecorImage, 232)}
                  objectString="object-cover object-top"
                  noControls={true}
                  paused={fullScreen}
                  muted={true}
                />
              ) : null}
            </div>

            <div className="flex gap-4 py-4 w-4/5">
              {trailer?.resource_type === "video" ? (
                <ButtonWithIconV2
                  onClick={handleWatchTrailer}
                  btnText={"Play Trailer"}
                  textColor={"#000000B2"}
                  bgColor="#FFFFFF80"
                  btnStyle="w-2/3 sm:w-1/3 lg:w-1/4 flex justify-center items-center p-3 rounded-full font-nunitoB"
                />
              ) : null}
              <Link
                href={`/coursePage/${badge.id}`}
                className="w-2/3 sm:w-1/3 lg:w-1/4 flex justify-center items-center cursor-pointer"
              >
                <ButtonWithIconV2
                  onClick={() => {}}
                  btnText="View Full Details"
                  textColor={"#FFFFFFB2"}
                  bgColor="#00000080"
                  btnStyle="w-full flex justify-center items-center p-3 rounded-full font-nunitoB"
                />
              </Link>
            </div>

            <p className="w-4/5 md:w-3/5 text-xl text-white font-nunitoM">
              {badge.description}
            </p>
          </div>

          <div className="w-8 aspect-1" />
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
            {trailer ? (
              <MediaTile
                media={trailer}
                alt="media"
                width={400}
                height={getHeight(trailer, 400)}
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

export default ProgramHero;
