import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import React from "react";
interface Props {
  heroImg: AWSMedia | CloudinaryMedia;
}
const HeroSuperWomenRight: React.FC<Props> = ({ heroImg }) => {
  return (
    <>
      <div className="h-full flex items-center">
        <div>
          <MediaTile
            media={heroImg}
            alt="media"
            width={2400}
            height={getHeight(heroImg, 2400)}
            thumbnail={heroImg}
            objectString="object-contain self-end object-bottom"
            noControls={true}
            paused={true}
            muted={true}
          />
        </div>
      </div>
    </>
  );
};

export default HeroSuperWomenRight;
