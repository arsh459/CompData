import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
import PostDate from "./PostDate";

interface Props {
  name?: string;
  customWidthHeight?: string;
  img?: CloudinaryMedia | AWSMedia;
  size?: "small" | "large" | "xs" | "medium";
  placeholderName?: string;
  sessionName?: string;
  updatedOn?: number;
  reply?: boolean;
  isCoach?: boolean;
  nameInvisible?: boolean;
  leftPadding?: string;
  selected?: boolean;
  onImgClick: () => void;
  teamName?: string;
  nameTextColor?: string;
}

const UserPhoto: React.FC<Props> = ({
  name,
  img,
  size,
  placeholderName,
  sessionName,
  updatedOn,
  // reply,
  nameInvisible,
  isCoach,
  children,
  leftPadding,
  selected,
  onImgClick,
  teamName,
  customWidthHeight,
  nameTextColor,
}) => {
  return (
    <div>
      <div className="flex items-center">
        {img ? (
          <div className="flex-none cursor-pointer" onClick={onImgClick}>
            <MediaTile
              media={img}
              width={400}
              height={400}
              roundedString={clsx(
                "rounded-full",
                selected ? "border-blue-500 border-4" : "shadow-md"
              )}
              alt="user"
              widthString={
                customWidthHeight
                  ? customWidthHeight
                  : size === "small"
                  ? "w-10"
                  : size === "medium"
                  ? "w-16"
                  : size === "large"
                  ? "w-24"
                  : size === "xs"
                  ? "w-8"
                  : "w-12"
              }
              heightString={
                customWidthHeight
                  ? customWidthHeight
                  : size === "small"
                  ? "h-10"
                  : size === "medium"
                  ? "h-16"
                  : size === "large"
                  ? "h-24"
                  : size === "xs"
                  ? "h-8"
                  : "h-12"
              }
            />
          </div>
        ) : (
          <div className="flex-none cursor-pointer" onClick={onImgClick}>
            <img
              src={`https://avatars.dicebear.com/api/initials/${
                name ? name : "user"
              }.svg`}
              alt="user"
              className={clsx(
                size === "small"
                  ? "w-10 h-10"
                  : size === "large"
                  ? "w-24 h-24"
                  : size === "medium"
                  ? "h-16 w-16"
                  : size === "xs"
                  ? "w-8 h-8"
                  : "w-12 h-12",
                " object-cover rounded-full",
                selected ? "border-blue-500 border-4 ring-1" : ""
              )}
            />
          </div>
        )}

        <div>
          {nameInvisible ? null : (
            <div
              className={clsx(
                leftPadding ? leftPadding : "pl-4",
                "flex  items-center"
              )}
            >
              <p
                onClick={onImgClick}
                className={clsx(
                  size === "small"
                    ? "text-sm"
                    : size === "xs"
                    ? "text-xs"
                    : "text-base",
                  "text-gray-700 font-medium",
                  "cursor-pointer",
                  "line-clamp-1",
                  nameTextColor ? nameTextColor : ""
                )}
              >
                {name ? name.trim() : placeholderName}
              </p>

              {teamName ? (
                <div className="flex items-center">
                  <div className="mx-1">
                    <p className="text-base font-light text-gray-500">with</p>
                  </div>

                  <p className="text-base font-medium text-gray-700 line-clamp-1">
                    {teamName}
                  </p>
                </div>
              ) : null}

              {isCoach ? (
                <div className="px-2 py-1 ml-2 bg-green-500 rounded-md">
                  <p className="text-xs text-white">Coach</p>
                </div>
              ) : null}

              {sessionName ? (
                <>
                  <p className="pl-2">{`👉`}</p>
                  <p
                    className={clsx(
                      size === "small"
                        ? "text-sm"
                        : size === "xs"
                        ? "text-xs"
                        : "text-base",
                      "text-gray-500 pl-3  underline"
                    )}
                  >
                    {sessionName}
                  </p>
                </>
              ) : null}
            </div>
          )}
          {updatedOn ? (
            <div className={clsx(leftPadding ? leftPadding : "pl-4")}>
              <PostDate size={size} date={updatedOn} />
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserPhoto;
