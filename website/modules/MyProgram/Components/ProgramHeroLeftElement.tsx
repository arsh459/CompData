import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import React from "react";
import ProgramHeroLeftBottom from "./ProgramHeroLeftBottom";
import Link from "next/link";
interface Props {
  img?: CloudinaryMedia | AWSMedia;
  courseDecorImage?: CloudinaryMedia | AWSMedia;
  badgeId?: string;
  navPath: string;
}

const ProgramHeroLeftElement: React.FC<Props> = ({
  img,
  courseDecorImage,
  badgeId,
  navPath,
}) => {
  // console.log("");
  return (
    <Link
      href={navPath}
      className="group flex-[1.5] lg:flex-[2.25] h-full shadow border-4 rounded-[28px] overflow-hidden border-white border-opacity-30 cursor-pointer"
    >
      {img ? (
        <div className="relative z-0 w-full h-full">
          <MediaTile
            media={img}
            alt="media"
            width={736}
            height={getHeight(img, 736)}
            thumbnail={img}
            objectString="object-cover object-center"
            roundedString="rounded-3xl"
            noControls={true}
            paused={true}
            muted={true}
          />

          <ProgramHeroLeftBottom
            courseDecorImage={courseDecorImage}
            badgeId={badgeId}
          />
        </div>
      ) : null}
    </Link>
  );
};

export default ProgramHeroLeftElement;
