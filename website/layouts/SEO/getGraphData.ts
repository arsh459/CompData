import {
  OpenGraph,
  OpenGraphArticle,
  OpenGraphProfile,
} from "next-seo/lib/types";
import { homeImg2 } from "@constants/seo";

const getOpenGraphArticle = (
  publishedTime?: string,
  modifiedTime?: string,
  authors?: string[],
  tags?: string[]
): OpenGraphArticle | undefined => {
  if (!publishedTime) {
    return undefined;
  }

  return {
    publishedTime,
    ...(modifiedTime ? { modifiedTime: modifiedTime } : {}),
    ...(authors ? { authors: authors } : {}),
    ...(tags ? { tags: tags } : {}),
  };
};

const getOpenGraphProfile = (
  firstName?: string,
  lastName?: string,
  gender?: "female"
): OpenGraphProfile | undefined => {
  if (!firstName) {
    return undefined;
  }

  return {
    firstName,
    ...(lastName ? { lastName: lastName } : {}),
    ...(gender ? { gender: gender } : {}),
  };
};

export const getGraphData = (
  link: string,
  title: string,
  description: string,
  ogType: "basic" | "video" | "article" | "book" | "profile",
  img?: string,
  width?: number,
  height?: number,
  rectImg?: string,
  publishedTime?: string,
  modifiedTime?: string,
  authors?: string[],
  tags?: string[],
  firstName?: string,
  lastName?: string,
  gender?: "female"
): OpenGraph => {
  const articleG = getOpenGraphArticle(
    publishedTime,
    modifiedTime,
    authors,
    tags
  );
  const genderG = getOpenGraphProfile(firstName, lastName, gender);
  return {
    type: ogType ? ogType : "website",

    url: link,
    title: title,

    description: description,
    ...(articleG ? { article: articleG } : {}),
    ...(genderG ? { profile: genderG } : {}),

    images: [
      // {
      //   url: homeImg,
      //   width: 1200,
      //   height: 630,
      //   alt: title,
      // },
      img
        ? {
            url: img,
            width: width ? width : 640,
            height: height ? height : 360,
            alt: title,
          }
        : {
            url: homeImg2,
            width: width ? width : 640,
            height: height ? height : 360,
            alt: title,
          },
      rectImg
        ? {
            url: rectImg,
            width: 640,
            height: 360,
            alt: title,
          }
        : {
            url: homeImg2,
            width: 640,
            height: 360,
            alt: title,
          },
    ],
    site_name: "SocialBoat",
  };
};
