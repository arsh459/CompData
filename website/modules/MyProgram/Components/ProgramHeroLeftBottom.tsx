import { arrowRightIconFrame30 } from "@constants/icons/iconURLs";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import Image from "next/image";

interface Props {
  courseDecorImage?: CloudinaryMedia | AWSMedia;
  badgeId?: string;
}

const ProgramHeroLeftBottom: React.FC<Props> = ({
  courseDecorImage,
  badgeId,
}) => {
  return (
    <div className="absolute left-0 right-0 bottom-2 lg:bottom-8 flex justify-between px-4 items-end">
      <div className="w-full max-w-[150px] lg:max-w-[225px]">
        {courseDecorImage ? (
          <MediaTile
            media={courseDecorImage}
            alt="media"
            width={225}
            height={getHeight(courseDecorImage, 225)}
            objectString="object-contain object-bottom"
          />
        ) : null}
      </div>
      <div className="bg-white/80 backdrop-blur w-12 lg:w-16 aspect-1 rounded-full flex items-center justify-center relative z-0 shadow-2xl">
        <div className="bg-white absolute inset-0 -z-10 rounded-full group-hover:blur shadow" />
        <Image
          src={arrowRightIconFrame30}
          width={24}
          height={24 * (140 / 148)}
          className="w-6 aspect-[140/148]"
          alt="arrow to visit myprogram"
        />
      </div>
    </div>
  );
};

export default ProgramHeroLeftBottom;
