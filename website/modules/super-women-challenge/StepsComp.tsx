import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
import { BackUpImage } from "./ImageConstant";

interface Props {
  heading?: string;
  img?: AWSMedia | CloudinaryMedia;
  title?: string;
  route: string;
  btnText: string;
  index: number;
  bg?: string;
  imageInUrl?: string;
  marginTop?: string;
}

const StepsComp: React.FC<Props> = ({
  heading,
  route,
  btnText,
  img,
  title,
  bg,
  index,
  imageInUrl,
  marginTop,
}) => (
  <div
    className={clsx(
      " flex flex-col lg:flex-row items-center gap-8 py-4 relative z-0",
      marginTop ? marginTop : "mt-20"
    )}
  >
    <div className=" xs:w-full lg:w-3/5 py-4 flex flex-col justify-center xs:gap-4 sm:gap-10 lg:gap-8  xs:order-2 lg:order-1">
      <div className="px-4 lg:hidden flex justify-center items-center">
        <div className="w-full aspect-1 overflow-hidden flex items-center justify-center rounded-3xl">
          {img ? (
            <div className="relative">
              <MediaTile
                media={img ? img : BackUpImage}
                alt="media"
                width={2400}
                height={getHeight(img ? img : BackUpImage, 2400)}
                thumbnail={img ? img : BackUpImage}
                objectString="object-contain self-end object-bottom"
                noControls={true}
                paused={true}
                muted={true}
              />
              {bg ? (
                <img
                  src={bg}
                  className="absolute left-1/2 bottom-1.5 transform -translate-x-1/2 -z-10"
                />
              ) : null}
            </div>
          ) : imageInUrl ? (
            <div className="w-full aspect-1 overflow-hidden bg-white/10 border border-white/20 rounded-3xl">
              <img
                src={imageInUrl}
                className="w-full h-full object-contain object-bottom"
              />
            </div>
          ) : null}
        </div>
      </div>
      <p className="xs:text-lg sm:text-2xl lg:text-3xl font-pJSM xs:text-left sm:text-center lg:text-left text-[#A8E723] xs:px-10 sm:px-0">
        {heading}
      </p>
      <p className="font-pJSSB xs:text-left sm:text-center lg:text-left xs:text-2xl sm:text-3xl lg:text-[3rem] lg:leading-[3.6rem] text-[#EEE9FF] tracking-wide font-medium xs:px-6 xs:ml-4 sm:ml-0 sm:px-0">
        {title}
      </p>
    </div>
    <div className="relative hidden lg:flex w-2/5 aspect-1 overflow-hidden items-center justify-center rounded-3xl xs:order-1 lg:order-2">
      {img ? (
        <div className="relative">
          <div className="z-50">
            <MediaTile
              media={img ? img : BackUpImage}
              alt="media"
              width={2400}
              height={getHeight(img ? img : BackUpImage, 2400)}
              thumbnail={img ? img : BackUpImage}
              objectString="object-contain self-end object-bottom"
              noControls={true}
              paused={true}
              muted={true}
            />
          </div>
          {bg ? (
            <img
              src={bg}
              className="absolute left-1/2 bottom-1.5 transform -translate-x-1/2 -z-10"
            />
          ) : null}
        </div>
      ) : imageInUrl ? (
        <div className="w-full aspect-1 overflow-hidden bg-white/10 border border-white/20 rounded-3xl">
          <img
            src={imageInUrl}
            className="w-full h-full object-contain object-bottom"
          />
        </div>
      ) : null}
    </div>
  </div>
);

export default StepsComp;
