import {
  fbIconGray,
  linkdeinIconGray,
  twitterIconGray,
} from "@constants/icons/iconURLs";
import clsx from "clsx";
import Link from "next/link";
import { InsideWingText } from "pages/blog/post/[slug]";
import React from "react";
interface Props {
  img: string;
  name: string;
  bio: string;
  achievement: string;
  profession: string;
  fbHandle: string;
  twitterHandle: string;
  linkdeinHandle: string;
  flexImage?: string;
  flexContent?: string;
  h1Tag?: boolean;
}
const AboutAuthor: React.FC<Props> = ({
  achievement,
  fbHandle,
  img,
  name,
  linkdeinHandle,
  profession,
  twitterHandle,
  bio,
  flexContent,
  flexImage,
  h1Tag,
}) => {
  return (
    <div className="flex flex-col  my-4 w-full h-full px-4 lg:gap-7 lg:flex-row ">
      <div className="w-full   border border-[#00000059]  max-w-3xl rounded-2xl overflow-hidden  flex">
        <div
          className={clsx(
            "  rounded-l-2xl ",
            "flex-[.4] md:flex-[.21]",
            flexImage
          )}
        >
          <img
            src={img}
            className="h-full w-full object-cover"
            alt="Avatar of Author"
          />
        </div>
        <div
          className={clsx(
            "p-2 md:p-4 rounded-r-2xl flex flex-col ",
            "flex-[.6] md:flex-[.79] ",
            flexContent
          )}
        >
          <div className=" flex justify-between items-center">
            <div className="flex-1 w-2/3">
              {h1Tag ? (
                <h1 className="font-popR text-lg lg:text-2xl text-black">
                  {name}
                </h1>
              ) : (
                <p className="font-popR text-lg lg:text-2xl text-black">
                  {name}
                </p>
              )}

              <p className="text-[#0000008C] text-[10px] md:text-xs font-popR">
                {profession}
              </p>
            </div>

            <div className="flex justify-end self-start pt-1 w-1/4">
              {fbHandle ? (
                <Link passHref href={fbHandle}>
                  <img
                    src={fbIconGray}
                    alt={`facebook handle of ${name ? name : "author"}`}
                    className="w-[22px] md:w-[30px] h-3 md:h-5 object-contain   cursor-pointer"
                  />
                </Link>
              ) : null}
              {linkdeinHandle ? (
                <Link passHref href={linkdeinHandle}>
                  <img
                    src={linkdeinIconGray}
                    alt={`linkdein handle of ${name ? name : "author"}`}
                    className="w-[22px] md:w-[30px] h-3 md:h-5 object-contain   cursor-pointer"
                  />
                </Link>
              ) : null}
              {twitterHandle ? (
                <Link passHref href={twitterHandle}>
                  <img
                    src={twitterIconGray}
                    alt={`twitter handle of ${name ? name : "author"}`}
                    className="w-[22px] md:w-[30px] h-3 md:h-5 object-contain   cursor-pointer"
                  />
                </Link>
              ) : null}
            </div>
          </div>
          <div className="flex-1  flex gap-10 md:gap-12 lg:gap-14 py-7 ">
            <InsideWingText text={achievement} />
          </div>

          <p className="text-[#000000CC]  text-[10px] tracking-wide font-popL md:text-xs">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;
