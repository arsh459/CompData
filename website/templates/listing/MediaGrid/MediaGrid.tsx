import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
import MediaTile from "../HeaderImage/MediaTile";

interface Props {
  media: CloudinaryMedia[];
}

const MediaGrid: React.FC<Props> = ({ media }) => {
  return (
    <div
      className={clsx(
        "grid",
        // "h-[56vh]",
        // "bg-red-50",
        media.length <= 1
          ? "grid-cols-1"
          : media.length === 2
          ? "grid-cols-2"
          : media.length >= 3
          ? "grid-cols-3"
          : ""
      )}
    >
      {media.slice(0, 3).map((item, index) => {
        return (
          <div
            className={clsx(
              index <= 1 || media.length <= 3 ? "row-span-2" : "",
              "w-full h-full pb-1",
              // "aspect-w-9 aspect-h-16",
              media.length === 1 ? "flex justify-center" : ""
              // "border-2"
            )}
            key={item.public_id}
          >
            <MediaTile
              media={item}
              width={400}
              height={400}
              alt={`img-${index}`}
              paused={true}
              widthString={media.length === 1 ? "max-w-[600px]" : ""}
              heightString={
                "max-h-[480px]"
                // "max-h-[300px]"
                // index <= 1 || media.length <= 3 ? "h-[480px]" : "h-[236px]"

                // "h-[56vh]" : "h-[27.5vh]"
              }
              roundedString={
                media.length > 3 && index === 0
                  ? "rounded-tl-lg rounded-bl-lg"
                  : media.length > 3 && index === 2
                  ? "rounded-tr-lg"
                  : media.length > 3 && index === 3
                  ? "rounded-br-lg"
                  : media.length === 1
                  ? "rounded-lg"
                  : media.length === 2 && index === 0
                  ? "rounded-l-lg"
                  : media.length === 2 && index === 1
                  ? "rounded-r-lg"
                  : media.length === 3 && index === 0
                  ? "rounded-l-lg"
                  : media.length === 3 && index === 2
                  ? "rounded-r-lg"
                  : ""
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default MediaGrid;
