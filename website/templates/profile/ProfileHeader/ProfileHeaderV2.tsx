// import Divider from "@components/divider/Divider";
import { formLabelValues } from "@components/drawers/constants";
import {
  AWSMedia,
  // cloudinaryBaseURL,
  CloudinaryMedia,
} from "@models/Media/cloudinaryUpload";
import { getURLToFetch } from "@templates/listing/HeaderImage/utils";
import TextLayout from "@templates/listing/Layout/TextLayout";
// import { getCloudinaryURLWithParams } from "@utils/cloudinary";
import clsx from "clsx";
import React from "react";
import { socialMediaLinkProps } from "../ProfileTemplateV1";
import SocialMediaHeaderV1 from "../SocialMediaHeader/SocialMediaHeaderV1";
import TextSection from "../TextSection/TextSection";
import ProfileImg from "./ProfileImg";
// import { profileImg, name } from "./constants";

interface Props {
  editing: boolean | undefined;
  profileImg: CloudinaryMedia | AWSMedia | undefined;
  profileName: string | undefined;
  editingSection: formLabelValues | undefined;
  socialMediaIcons: socialMediaLinkProps;
  userKey: string | undefined;
  onEditingClick: (newVal: formLabelValues) => void;
  divider?: boolean;
  size?: "sm";
  live?: boolean;
  vertical?: boolean;
  linksLive?: boolean;
  aboutCreator?: string;
  viewStyle?: "mobile" | "desktop";
  //   wDivider?: "w-1/2" | "w-full";
}

const ProfileHeaderV2: React.FC<Props> = ({
  editing,
  profileImg,
  profileName,
  editingSection,
  socialMediaIcons,
  userKey,
  onEditingClick,
  divider,
  size,
  live,
  vertical,
  aboutCreator,
  linksLive,
  viewStyle,
  //   wDivider,
  //   website,
}) => {
  // console.log("editing", editing, live);
  return (
    <TextLayout editing={editing} active={false}>
      <div className="flex justify-between">
        <div>
          <div className="flex items-center">
            <p
              className={clsx(
                "font-medium",
                editing ? "text-gray-500" : "text-gray-700",
                viewStyle === "mobile" ? "text-lg" : "text-lg md:text-xl"
              )}
            >
              Created by -
            </p>

            <div onClick={() => onEditingClick("your-name")} className="pl-1">
              <TextSection
                live={live}
                onClickURL={`/${userKey}`}
                text={profileName}
                // text="Rahul"
                editing={editing}
                boldLevel="medium"
                textPrefix=""
                active={editingSection === "your-name"}
                placeholder="A fab creator"
                editingPlaceholder="Your Name"
                textSize="xl"
                vertical={vertical}
              />
            </div>
          </div>

          {editing || aboutCreator ? (
            <div className="" onClick={() => onEditingClick("aboutCreator")}>
              <TextSection
                live={live}
                onClickURL={`/${userKey}`}
                text={aboutCreator}
                lineClamp="line-clamp-1"
                editing={editing}
                boldLevel="normal"
                textPrefix=""
                active={editingSection === "aboutCreator"}
                placeholder="2 lines about creator"
                editingPlaceholder="Add tagline"
                textSize="base"
                vertical={vertical}
              />
            </div>
          ) : null}

          <div
            className="pt-0"
            onClick={() => onEditingClick("social-media-links")}
          >
            <SocialMediaHeaderV1
              size={size}
              live={live}
              linksLive={linksLive}
              socialMediaIcons={socialMediaIcons}
              editing={editing}
              active={editingSection === "social-media-links" ? true : false}
            />
          </div>
        </div>
        <div
          onClick={() => onEditingClick("profile-img")}
          className="flex-none pl-2"
        >
          {profileImg ? (
            <ProfileImg
              live={live}
              onClickURL={`/${userKey}`}
              imgUrl={getURLToFetch(profileImg, 200, 200)}
              // imgUrl={`${cloudinaryBaseURL}/${profileImg.resource_type}/upload/w_200,h_200,c_thumb,g_face/${profileImg.path}`}
              size={size}
              selected={
                editing && editingSection === "profile-img" ? true : false
              }
            />
          ) : !profileImg && !editing ? (
            <ProfileImg
              live={live}
              onClickURL={`/${userKey}`}
              imgUrl="https://avatars.dicebear.com/api/croodles-neutral/i.svg"
              size={size}
              selected={false}
            />
          ) : (
            <div
              className={clsx(
                editing && editingSection === "profile-img"
                  ? "bg-white shadow-xl"
                  : "bg-gray-300 shadow-md",
                "w-16 h-16 rounded-full"
              )}
            />
          )}
        </div>
      </div>
    </TextLayout>
  );
};

export default ProfileHeaderV2;
