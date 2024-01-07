import { weEventTrack } from "@analytics/webengage/user/userLog";
import { setChar } from "@templates/LandingPage/V2/utils/utils";
import { PostOrPage } from "@tryghost/content-api";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import PaginationDots from "./PaginationDots";
interface Props {
  post: PostOrPage;
  postCount: number;
  currentPostIndex: number;
  setCurrentPostIndex: (index: number) => void;
}
const PostCollectionCard: React.FC<Props> = ({
  post,
  currentPostIndex,
  postCount,
  setCurrentPostIndex,
}) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto rounded-2xl bg-white/5 overflow-hidden lg:flex">
      <div className="w-full lg:w-1/2 bg-[#100F1A]">
        {post.feature_image ? (
          <img
            src={post.feature_image}
            alt={`post image`}
            className="w-full aspect-[1.6] object-contain"
          />
        ) : null}
      </div>
      <div className="w-full lg:w-1/2 flex flex-col px-6 py-2">
        <PaginationDots
          postCount={postCount}
          currentPostIndex={currentPostIndex}
          setCurrentPostIndex={setCurrentPostIndex}
        />
        <div className="py-2 flex-1">
          <p className="text-xl sm:text-2xl lg:text-3xl font-popR px-4 flex-1 font-normal mb-6">
            {post.title}
          </p>
          <p className="text-xs sm:text-sm lg:text-base font-popR px-4 pt-0 text-[#FFFFFFCC] flex-1  font-light">
            {post.excerpt
              ? post.excerpt.length > 180
                ? `${setChar(post.excerpt, 180)}...`
                : setChar(post.excerpt, 180)
              : ""}
          </p>
        </div>
        <div className="flex justify-between p-4 lg:flex-row-reverse">
          <div className="flex items-center justify-center ">
            <img
              src="https://ik.imagekit.io/socialboat/Vector__57__QgC3m3lwy.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673858681360"
              alt={post?.feature_image_alt || "blog post image"}
              className="w-4 aspect-[16/11] "
            />
            <p className="text-xs sm:text-sm lg:text-base pl-1.5 text-[#FFFFFF80] font-popM">
              {post.reading_time} mins Read
            </p>
          </div>
          <Link passHref href={`/blog/post/${post.slug}`}>
            <div
              onClick={() => {
                weEventTrack("landing_blogClick", {});
              }}
              className={clsx(
                "px-6 py-2 w-2/5 min-w-max cursor-pointer whitespace-nowrap",
                "text-xs sm:text-sm lg:text-base rounded-full text-center",
                "border-[1px] font-popM"
              )}
            >
              Let&apos;s Read
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCollectionCard;
