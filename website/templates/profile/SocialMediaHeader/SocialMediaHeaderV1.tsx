import {
  externalLinkIcon,
  externalLinkIconB,
  fbIcon,
  fbIconB,
  instaIcon,
  instaIconB,
  linkedInIcon,
  whatsappIcon,
  linkedInIconB,
  youtubeIcon,
  youtubeIconB,
} from "@templates/editEvent/Form/SocialMedia/constants";
import clsx from "clsx";
import React from "react";
import { socialMediaLinkProps } from "../ProfileTemplateV1";
import MediaIcon from "./MediaIcon";
// import { socialMediaIcons } from "./constants";

interface Props {
  editing: boolean | undefined;
  active: boolean;
  socialMediaIcons: socialMediaLinkProps;
  size?: "sm";
  live?: boolean;
  linksLive?: boolean;
  phone?: string;
}

export type linkType =
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "youtube"
  | "linkedIn"
  | "website";

const SocialMediaHeaderV1: React.FC<Props> = ({
  editing,
  active,
  socialMediaIcons,
  size,
  live,
  linksLive,
  phone,
}) => {
  return (
    <div
      className={clsx(
        "flex items-center",
        // "space-x-1",
        editing && active ? "bg-white shadow-xl rounded-md pl-2 pr-2 pt-2" : ""
      )}
    >
      {phone ? (
        <MediaIcon
          live={live}
          linksLive={linksLive}
          editing={editing}
          active={active}
          size={size}
          link={`https://wa.me/${phone}?text=Hi!`}
          icon={whatsappIcon}
          fallbackIcon={whatsappIcon}
          alt="wp"
          linkType="whatsapp"
        />
      ) : null}
      <MediaIcon
        live={live}
        linksLive={linksLive}
        editing={editing}
        active={active}
        size={size}
        link={socialMediaIcons.instagram}
        icon={instaIcon}
        fallbackIcon={instaIconB}
        alt="insta"
        linkType="instagram"
      />
      <MediaIcon
        live={live}
        linksLive={linksLive}
        editing={editing}
        size={size}
        active={active}
        link={socialMediaIcons.facebook}
        icon={fbIcon}
        fallbackIcon={fbIconB}
        alt="fb"
        linkType="facebook"
      />
      <MediaIcon
        live={live}
        linksLive={linksLive}
        editing={editing}
        active={active}
        size={size}
        link={socialMediaIcons.youtube}
        icon={youtubeIcon}
        fallbackIcon={youtubeIconB}
        alt="youtube"
        linkType="youtube"
      />
      <MediaIcon
        live={live}
        linksLive={linksLive}
        size={size}
        editing={editing}
        active={active}
        link={socialMediaIcons.linkedIn}
        icon={linkedInIcon}
        fallbackIcon={linkedInIconB}
        alt="linkedin"
        linkType="linkedIn"
      />
      <MediaIcon
        live={live}
        linksLive={linksLive}
        editing={editing}
        size={size}
        active={active}
        link={socialMediaIcons.external}
        icon={externalLinkIcon}
        fallbackIcon={externalLinkIconB}
        alt="website"
        linkType="website"
      />
    </div>
  );
};

export default SocialMediaHeaderV1;
