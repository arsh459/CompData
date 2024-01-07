import { playIconBlack } from "@constants/icons/iconURLs";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Badge } from "@models/Prizes/PrizeV2";
import { genderType } from "@models/User/User";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import ButtonWithIconV2 from "@templates/LandingPage/V2/components/ButtonWithIconV2";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

interface Props {
  badge: Badge;
  gender?: genderType;
}

const HeroV2: React.FC<Props> = ({ badge, gender }) => {
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
  const img = getBGImage(
    badge,
    // "female"
    gender
  );

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return badge ? (
    <>
      <div className="w-full aspect-[1440/667] h-[600px] object-cover ">
        <div className="absolute inset-0 -z-10 w-full h-full">
          {img ? (
            <MediaTile
              media={img}
              alt="media"
              width={2400}
              height={getHeight(img, 2400)}
              thumbnail={img}
              objectString="object-cover object-top"
              noControls={true}
              paused={true}
              muted={true}
            />
          ) : null}
        </div>
        <div
          className="absolute  -bottom-5 -left-8 -right-8    bg-gradient-to-t from-[#232136] 
            via-[#232136C7] to-[#23213670]/5  "
        >
          <div className="   px-12 py-4 mx-auto ">
            <div className="max-w-3xl mx-auto ">
              <div className="flex justify-between pt-5 items-center">
                <div className="flex">
                  <div
                    onClick={handleBack}
                    className="h-12 flex justify-center items-center pr-2"
                  >
                    <ArrowLeftIcon className="w-8 aspect-1 text-white" />
                  </div>
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
                {badge.badgeBGImage?.resource_type === "video" ? (
                  <ButtonWithIconV2
                    onClick={handleWatchTrailer}
                    btnText={"Play Trailer"}
                    iconImgSrc={playIconBlack}
                    iconImgSrcWithHttp={true}
                    textColor={"#000"}
                    imgStyle="w-6"
                    btnStyle="w-fit flex justify-center items-center py-1 px-6 rounded-lg bg-white text-black font-nunitoB  font-nunitoB"
                  />
                ) : null}
              </div>
              <p className="text-xl  text-white pt-0 font-nunitoM ">
                {badge.description}
              </p>
              {/* <p className="text-xl  text-white pt-8 font-nunitoM ">
                {badge.courseGoal}
              </p> */}
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

export default HeroV2;

export const getBGImage = (badge: Badge, gender?: genderType) => {
  if (gender === "male" && badge.bgImageMale) {
    return badge.bgImageMale;
  } else if (gender === "female" && badge.bgImageFemale) {
    return badge.bgImageFemale;
  } else if (badge.bgImageFemale) {
    return badge.bgImageFemale;
  } else if (badge.bgImageMale) {
    return badge.bgImageMale;
  }

  return undefined;
};
