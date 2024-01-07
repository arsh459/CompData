import React from "react";
import { NextSeo } from "next-seo";
import { fbId } from "./constants";
// import { homeImg2 } from "@constants/seo";
import { getGraphData } from "./getGraphData";

interface Props {
  title: string;
  description: string;

  link: string;
  canonical: string;
  img?: string;
  noIndex?: boolean;
  siteName?: string;
  favIcon?: string;
  width?: number;
  height?: number;
  rectImg?: string;

  ogType: "basic" | "video" | "article" | "book" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  firstName?: string;
  lastName?: string;
  gender?: "female";
}

const GeneralSEOTemplate: React.FC<Props> = ({
  title,
  description,
  link,
  img,
  noIndex,
  siteName,
  favIcon,
  width,
  height,
  canonical,
  rectImg,
  ogType,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  firstName,
  lastName,
  gender,
}) => {
  // const staticMetadata: Metadata = {
  //   title,
  //   description,
  //   applicationName: "SocialBoat",
  //   alternates

  // };

  return (
    <div>
      <NextSeo
        title={title}
        description={description}
        nofollow={false}
        canonical={canonical}
        robotsProps={{
          nosnippet: false,
          noarchive: false,
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
          notranslate: false,
          noimageindex: false,
        }}
        additionalLinkTags={favIcon ? [{ rel: "icon", href: favIcon }] : []}
        additionalMetaTags={[
          {
            name: "facebook-domain-verification",
            content: "z4aey7agjnililwjy0r2rj482lxd7f",
          },
        ]}
        noindex={noIndex ? noIndex : false}
        openGraph={
          getGraphData(
            link,
            title,
            description,
            ogType,
            img,
            width,
            height,
            rectImg,
            publishedTime,
            modifiedTime,
            authors,
            tags,
            firstName,
            lastName,
            gender
          )
          //   {
          //   type: ogType ? ogType : "website",

          //   url: link,
          //   title: title,

          //   description: description,
          //   images: [
          //     // {
          //     //   url: homeImg,
          //     //   width: 1200,
          //     //   height: 630,
          //     //   alt: title,
          //     // },
          //     img
          //       ? {
          //           url: img,
          //           width: width ? width : 640,
          //           height: height ? height : 360,
          //           alt: title,
          //         }
          //       : {
          //           url: homeImg2,
          //           width: width ? width : 640,
          //           height: height ? height : 360,
          //           alt: title,
          //         },
          //     rectImg
          //       ? {
          //           url: rectImg,
          //           width: 640,
          //           height: 360,
          //           alt: title,
          //         }
          //       : {
          //           url: homeImg2,
          //           width: 640,
          //           height: 360,
          //           alt: title,
          //         },
          //   ],
          //   site_name: siteName ? siteName : "SocialBoat",
          // }}
        }
        twitter={{ handle: "socialboat_live", site: "socialboat_live" }}
        facebook={{ appId: fbId }}
      />
    </div>
  );
};

export default GeneralSEOTemplate;
