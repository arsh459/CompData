import { EventInterface } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
import UserPhoto from "../Program/Feed/PostView/UserPhoto";

interface Props {
  name?: string;
  tagline?: string;
  enrolledEvents: EventInterface[];
  cohortName?: string;
  profileImage?: CloudinaryMedia | AWSMedia;
  size?: "small" | "large";
  onImgClick: () => void;
}

const Member: React.FC<Props> = ({
  name,
  tagline,
  enrolledEvents,
  cohortName,
  profileImage,
  onImgClick,
  size,
}) => {
  return (
    <div
      onClick={onImgClick}
      className={clsx(
        "flex flex-col justify-center items-center",
        "cursor-pointer"
        // size === "small" ? "w-16" : "w-28"
      )}
    >
      <div className="flex-none">
        <UserPhoto
          nameInvisible={true}
          img={profileImage}
          onImgClick={() => {}}
          name={name}
          size={size ? size : "large"}
        />
      </div>

      {name ? (
        <p
          className={clsx(
            "flex-grow",
            "text-gray-700 text-center line-clamp-1 break-all",
            size ? "text-xs " : ""
          )}
        >
          {name}
        </p>
      ) : null}

      {enrolledEvents.slice(0, 2).map((item) => {
        return (
          <div key={item.id} className="">
            <p className="text-gray-500 text-sm text-center">{item.name}</p>
          </div>
        );
      })}

      {enrolledEvents.length > 2 ? (
        <p className="text-gray-700 text-xs text-center">And more</p>
      ) : null}
    </div>
  );
};

export default Member;
