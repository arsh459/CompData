import clsx from "clsx";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { BackUpImage } from "./ImageConstant";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
interface Props {
  description?: string;
  challengeImg?: AWSMedia | CloudinaryMedia;
}

const ChallengeComp: React.FC<Props> = ({ description, challengeImg }) => {
  return (
    <div className="w-screen min-h-screen max-w-screen-xl mx-auto relative z-0">
      <div className="w-full sm:w-[70%] lg:w-5/6 h-screen sm:h-max mx-auto px-4 flex flex-col">
        <div className="h-20 sm:h-40" />
        <p
          className={clsx(
            "font-pJSSB text-center xs:text-[28px] sm:text-4xl lg:text-5xl",
            "bg-clip-text text-[#DCCBFF]",
            "block opacity-100",
            "w-full xs:px-2 sm:px-4 xs:mb-16 sm:mb-8 lg:mb-16 py-2"
          )}
        >
          What is this Challenge ?
        </p>

        <div className=" xs:mt-3 lg:mt-20 flex flex-col lg:flex-row items-center gap-8 py-4 relative z-0">
          <div className="flex-1 py-4 flex flex-col justify-center gap-4 sm:gap-12 lg:gap-8 xs:px-4 sm:px-2 lg:pl-12 order-2 ">
            <div className="flex-1 lg:hidden flex justify-center items-center">
              <div className="flex-1 w-full aspect-1 overflow-hidden bg-white/10 border border-white/20 rounded-3xl">
                <MediaTile
                  media={challengeImg ? challengeImg : BackUpImage}
                  alt="media"
                  width={2400}
                  height={getHeight(
                    challengeImg ? challengeImg : BackUpImage,
                    2400
                  )}
                  thumbnail={challengeImg ? challengeImg : BackUpImage}
                  objectString="object-contain self-end object-bottom"
                  noControls={true}
                  paused={true}
                  muted={true}
                />
              </div>
            </div>
            <p className="font-pJSM text-center lg:text-left xs:text-lg lg:text-[2rem] lg:leading-[2.6rem] text-[#DCCBFF] tracking-normal ">
              {description
                ? description
                : "A 21-day fun challenge is designed for busy women to help them get into a routine of a healthy lifestyle. This challenge requires a minimum of 15 mins commitment daily"}
            </p>
          </div>
          <div className="hidden lg:flex w-2/5 aspect-1 overflow-hidden  rounded-3xl items-center justify-center order-1">
            <div>
              <MediaTile
                media={challengeImg ? challengeImg : BackUpImage}
                alt="media"
                width={2400}
                height={getHeight(
                  challengeImg ? challengeImg : BackUpImage,
                  2400
                )}
                thumbnail={challengeImg ? challengeImg : BackUpImage}
                objectString="object-contain self-end object-bottom"
                noControls={true}
                paused={true}
                muted={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeComp;
