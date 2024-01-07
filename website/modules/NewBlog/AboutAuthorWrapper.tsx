// import {
//   fbIconGray,
//   linkdeinIconGray,/
//   twitterIconGray,
// } from "@constants/icons/iconURLs";
import { Author, Nullable } from "@tryghost/content-api";
// import clsx from "clsx";
import Link from "next/link";
// import { InsideWingText } from "pages/blog/post/[slug]";
import React from "react";
import AboutAuthor from "./AboutAuthor";
import { blogAuthor } from "@constants/blogAuthor";
interface Props {
  primary_author?: Nullable<Author>;
  h1Tag?: boolean;
}
const AboutAuthorWrapper: React.FC<Props> = ({ primary_author, h1Tag }) => {
  // const {
  //   achievement,
  //   fbHandle,
  //   img,
  //   name,
  //   linkdeinHandle,
  //   profession,
  //   twitterHandle,
  //   bio,
  //   flexContent,
  //   flexImage,
  // } =

  const returnObj =
    blogAuthor[primary_author?.name ? primary_author.name : "no name"];

  //   console.log("p", primary_author, blogAuthor);
  return (
    <Link passHref href={`/authors/${primary_author?.slug}`}>
      <AboutAuthor
        h1Tag={h1Tag}
        img={primary_author?.profile_image || ""}
        achievement={returnObj?.achievement ? returnObj?.achievement : ""}
        fbHandle={primary_author?.facebook || ""}
        linkdeinHandle={returnObj?.linkedIn || ""}
        name={primary_author?.name || ""}
        profession="Clinical Nutrtionist"
        twitterHandle={primary_author?.twitter || ""}
        bio={primary_author?.bio || ""}
      />
    </Link>
  );
};

export default AboutAuthorWrapper;
