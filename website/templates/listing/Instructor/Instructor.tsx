import { formLabelValues } from "@components/drawers/constants";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { socialMediaLinkProps } from "@templates/profile/ProfileTemplateV1";
import SocialMediaHeaderV1 from "@templates/profile/SocialMediaHeader/SocialMediaHeaderV1";
import clsx from "clsx";
import MediaTile from "../HeaderImage/MediaTile";
import Linkify from "react-linkify";

interface Props {
  profileName?: string;
  socialMediaIcons: socialMediaLinkProps;
  aboutCreator: string;
  profileImg?: CloudinaryMedia | AWSMedia;
  bio?: string;
  live?: boolean;
  linksLive?: boolean;
  size?: "sm";
  editingSection: formLabelValues | undefined;
  viewStyle?: "mobile" | "desktop";
}

const Instructor: React.FC<Props> = ({
  profileImg,
  profileName,
  aboutCreator,
  viewStyle,
  editingSection,
  bio,
  socialMediaIcons,
  live,
  size,
  linksLive,
}) => {
  return (
    <div className="">
      <div className="">
        <p
          className={clsx(
            "text-2xl text-gray-700 font-medium pb-4",
            viewStyle === "mobile"
              ? "text-center"
              : " text-center md:text-left "
          )}
        >
          Know your Instructor
        </p>
      </div>
      <div
        className={clsx(
          viewStyle === "mobile" ? "" : "sm:flex justify-between",
          "pt-4"
        )}
      >
        <div
          className={clsx(
            viewStyle === "mobile" ? "pb-4" : "pb-4 sm:pb-0",
            "flex-none flex justify-center"
          )}
        >
          <div>
            {profileImg ? (
              <MediaTile
                heightString="h-80"
                widthString="w-56"
                media={profileImg}
                width={300}
                height={430}
                rounded={true}
                alt="Creator img"
              />
            ) : (
              <div className="w-56 h-80 bg-gray-50 rounded-lg shadow-lg" />
            )}
            <div
              className={clsx(
                viewStyle === "mobile" ? "" : "md:hidden",
                "flex justify-center"
              )}
            >
              <div>
                <p
                  className={clsx(
                    viewStyle === "mobile" ? "text-center" : "",
                    "text-gray-600 text-xl font-normal"
                    // "bg-red-50"
                  )}
                >
                  {profileName ? profileName : "Creator"}
                </p>
                <SocialMediaHeaderV1
                  live={live}
                  size={size}
                  editing={editingSection !== undefined}
                  active={
                    editingSection === "social-media-links" ? true : false
                  }
                  linksLive={linksLive}
                  socialMediaIcons={socialMediaIcons}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-2xl sm:ml-4">
          <div
            className={clsx(
              viewStyle === "mobile" ? "hidden" : "hidden md:block"
            )}
          >
            <p className="text-gray-600 md:text-2xl lg:text-3xl font-normal pb-2">
              {profileName ? profileName : "Creator"}
            </p>
            <SocialMediaHeaderV1
              live={live}
              size={size}
              editing={editingSection !== undefined}
              active={editingSection === "social-media-links" ? true : false}
              linksLive={linksLive}
              socialMediaIcons={socialMediaIcons}
            />
          </div>
          <p
            className={clsx(
              "text-gray-700",
              "whitespace-pre-wrap",
              "prose",
              viewStyle === "mobile"
                ? "text-center"
                : "lg:text-lg text-center md:text-left"
            )}
          >
            <Linkify>{bio}</Linkify>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
