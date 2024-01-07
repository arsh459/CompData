import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import MediaCarousel from "@templates/listing/HeaderImage/MediaCarousel";
import clsx from "clsx";

interface Props {
  coverVideo?: CloudinaryMedia[];
  editing: boolean | undefined;
  active: boolean;
}

const CoverVideo: React.FC<Props> = ({ coverVideo, editing, active }) => {
  // console.log("cover video", coverVideo);
  return (
    <div className={editing ? "cursor-pointer" : ""}>
      {coverVideo && coverVideo.length > 0 ? (
        <div className={clsx(active ? "shadow-2xl" : "")}>
          <MediaCarousel media={coverVideo} size="45vh" live={false} />
        </div>
      ) : editing ? (
        <div
          className={clsx(
            "w-full h-48 rounded-t-xl",
            "shadow-sm",
            active ? "bg-white" : "",
            // editing ? "cursor-pointer" : "",
            // !active && editing
            // ? "opacity-40 bg-black hover:opacity-0 hover:shadow-2xl"
            // : "bg-gradient-to-b from-white to-gray-100",

            "flex items-end pl-5 pb-2 cursor-pointer"
          )}
        >
          <p
            className={clsx(
              "text-2xl font-semibold",
              editing && !active ? "text-gray-400" : "text-gray-500"
            )}
          >
            {editing ? "Add a cover video" : "Add a cover video"}
          </p>
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-b from-white to-gray-200" />
      )}
    </div>
  );
};
export default CoverVideo;
