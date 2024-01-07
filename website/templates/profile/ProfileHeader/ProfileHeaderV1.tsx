import Divider from "@components/divider/Divider";
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
  phone?: string;
  userKey: string | undefined;
  onEditingClick: (newVal: formLabelValues) => void;
  divider?: boolean;
  size?: "sm";
  live?: boolean;
  vertical?: boolean;
  linksLive?: boolean;
  wDivider?: "w-1/2" | "w-full";
  dummy?: boolean;
}

const ProfileHeaderV1: React.FC<Props> = ({
  editing,
  profileImg,
  profileName,
  editingSection,
  socialMediaIcons,
  userKey,
  onEditingClick,
  phone,
  divider,
  size,
  live,
  vertical,
  linksLive,
  wDivider,
  dummy,
  //   website,
}) => {
  // console.log("userKey", userKey, live);
  return (
    <TextLayout editing={editing} active={false}>
      {divider ? (
        <div
          className={clsx(
            // "p-2"
            "pb-2",
            "pt-2",
            wDivider === "w-1/2" ? "w-1/2" : ""
            //"pl-4 pr-4"
          )}
        >
          <Divider />
        </div>
      ) : null}
      <div
        className={clsx(
          "flex flex-wrap",
          vertical ? "flex-col items-center" : "",
          !editing ? "pb-0" : ""
        )}
      >
        <div
          onClick={() => onEditingClick("profile-img")}
          className="flex-none md:pr-4"
        >
          {profileImg ? (
            <ProfileImg
              live={live}
              onClickURL={dummy ? "/" : `/${userKey}`}
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
        <div
          className={clsx(
            vertical ? "flex flex-col items-center" : "pl-4 md:pl-0"
          )}
        >
          <div onClick={() => onEditingClick("your-name")}>
            <TextSection
              live={live}
              onClickURL={`/${userKey}`}
              text={profileName}
              // text="Rahul"
              editing={editing}
              boldLevel="semibold"
              textPrefix=""
              active={editingSection === "your-name"}
              placeholder="A fab creator"
              editingPlaceholder="Your Name"
              textSize="xl"
              vertical={vertical}
            />
          </div>

          <div onClick={() => onEditingClick("your-handle")}>
            <TextSection
              live={live}
              onClickURL={`/${userKey}`}
              text={userKey}
              textPrefix={`@`}
              boldLevel="normal"
              editing={editing}
              active={editingSection === "your-handle"}
              placeholder="@your-handle"
              editingPlaceholder="@your-handle"
              textSize={live ? "base" : "sm"}
              vertical={vertical}
            />
          </div>

          <div
            className="pt-0"
            onClick={() => onEditingClick("social-media-links")}
          >
            <SocialMediaHeaderV1
              size={size}
              live={live}
              linksLive={linksLive}
              phone={phone}
              socialMediaIcons={socialMediaIcons}
              editing={editingSection !== undefined}
              active={editingSection === "social-media-links" ? true : false}
            />
          </div>
        </div>
      </div>
    </TextLayout>
  );
};

export default ProfileHeaderV1;
