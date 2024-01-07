// import Button from "@components/button";
import IconButton from "@components/button/iconButton";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { handleCloudinaryURL } from "@templates/listing/HeaderImage/utils";
// import { buildVideoUrl } from "cloudinary-build-url";
import clsx from "clsx";
// import { RESIZE_TYPES } from "@cld-apis/utils";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
// import clsx from "clsx";

interface Props {
  mediaElement: CloudinaryMedia | AWSMedia;
  selected: boolean;
  tileHeight?: "small";
  index: number;
  onDelete?: (el: CloudinaryMedia | AWSMedia) => void;
}

const MediaFile: React.FC<Props> = ({
  mediaElement,
  onDelete,
  index,
  selected,
  tileHeight,
}) => {
  return (
    <div
      className={clsx(
        "relative",

        selected
          ? "shadow-2xl border-2 m-1 border-orange-500"
          : "shadow-lg border-2 m-1"
      )}
    >
      <MediaTile
        media={mediaElement}
        widthString={clsx(tileHeight === "small" ? "w-24 h-24" : " w-36 h-36")}
        width={250}
        height={250}
        forceHeight={true}
        alt="med"
      />

      {/* {mediaElement.resource_type === "image" ? (
        
      ) : (
        <img
          src={`https://res.cloudinary.com/htt-holidaying-travel-technologies/image/upload/w_250,h_250,c_fill/${mediaElement.public_id}.jpg`}
          // src={handleCloudinaryURL(
          //   "image",
          //   mediaElement.path,
          //   "c_fill,h_250,w_250,g_auto,f_auto"
          // )}
          className={clsx(
            "object-cover",
            tileHeight === "small" ? "w-24 h-24" : " w-36 h-36"
          )}
        /> ) :
        <video
          autoPlay={true}
          playsInline={true}
          controls={false}
          muted={true}
          src={buildVideoUrl(mediaElement.path, {
            cloud: { cloudName: "htt-holidaying-travel-technologies" },
            transformations: {
              resize: {
                width: 200,
                height: 200,
                type: RESIZE_TYPES.FILL,
              },
            },
          })}
          className="object-cover w-36 h-36"
        />
        // <img
        //   src={mediaElement.thumbnail_url}
        //   className="object-cover w-36 h-36"
        // />
      )} */}
      {onDelete ? (
        <div className="absolute top-1 right-1">
          <IconButton onClick={() => onDelete(mediaElement)} />
        </div>
      ) : null}
      <div className="absolute top-1 left-1 p-1 pl-2 pr-2 rounded-full bg-gray-50 shadow-md">
        <p className="text-xs">{index + 1}</p>
      </div>
    </div>
  );
};

export default MediaFile;
