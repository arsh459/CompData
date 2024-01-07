import { readIconWhite } from "@constants/icons/iconURLs";
import { setChar } from "@templates/LandingPage/V2/utils/utils";
import { PostOrPage } from "@tryghost/content-api";
import clsx from "clsx";
import { format } from "date-fns";
import React from "react";
interface Props {
  post: PostOrPage;
  postCount: number;
  titleColorTw?: string;
  authorNameColorTw?: string;
  excerptColorTw?: string;
  readColorTw?: string;
  mainStyleTw?: string;
  readIconUrl?: string;
}
const PostBlogCard: React.FC<Props> = ({
  post,

  postCount,
  excerptColorTw,
  authorNameColorTw,
  readColorTw,
  titleColorTw,
  mainStyleTw,
  readIconUrl,
}) => {
  // console.log({ post });

  return (
    <div
      className={clsx(
        "w-full mb-2.5   lg:mb-9 lg:rounded-2xl bg-white/5 scrollbar-hide overflow-hidden flex ",
        mainStyleTw
      )}
    >
      <div className="w-[30%] bg-[#100F1A] min-w-[30%] lg:w-1/3  flex items-center ">
        {post.feature_image ? (
          <img
            src={post.feature_image}
            alt={`post image`}
            // className=" lg:w-full h-3/4  aspect-1 lg:aspect-[1.6] object-contain"
          />
        ) : null}
      </div>
      <div className="w-[70%] lg:w-2/3 flex flex-col p-2 lg:p-6 ">
        <div className="flex-1  flex flex-col-reverse md:flex-col ">
          <p
            className={clsx(
              " text-sm md:text-lg lg:text-3xl font-popR px-4 flex-1 font-normal ",
              titleColorTw ? titleColorTw : "text-[#FFFFFF] "
            )}
          >
            {post.title}
          </p>

          <div className="flex w-full items-center mb-4 px-4 lg:pt-2  ">
            <div className=" overflow-hidden rounded-full mr-2">
              <img
                className="w-4 h-4    object-cover "
                src={
                  post.primary_author?.profile_image
                    ? post.primary_author?.profile_image
                    : ""
                }
                alt="Avatar of Author"
              />
            </div>
            <div className="flex-1">
              <p
                className={clsx(
                  " font-bold text-xs  md:text-sm leading-none",
                  authorNameColorTw ? authorNameColorTw : "text-[#FFFFFF80]"
                )}
              >
                {post.primary_author?.name}
              </p>
            </div>
          </div>
          <p
            className={clsx(
              "text-xs sm:text-sm lg:text-base font-popR px-4 pt-0 hidden md:block  flex-1  font-light ",
              excerptColorTw ? excerptColorTw : "text-[#FFFFFFCC]"
            )}
          >
            {post.excerpt
              ? post.excerpt.length > 180
                ? `${setChar(post.excerpt, 180)}...`
                : setChar(post.excerpt, 180)
              : ""}
          </p>
        </div>
        <div className="flex justify-between p-4 pb-0">
          <div className="flex items-center justify-center ">
            <img
              // src=""
              src={readIconUrl ? readIconUrl : readIconWhite}
              alt={post?.feature_image_alt || "blog post image"}
              className="w-4 aspect-[16/11] "
            />
            <p
              className={clsx(
                "text-xs sm:text-sm lg:text-base font-popR pl-1.5 ",
                readColorTw ? readColorTw : "text-[#FFFFFF80]"
              )}
            >
              {post.reading_time} mins Read
            </p>
          </div>
          <p
            className={clsx(
              "text-xs sm:text-sm lg:text-base font-popR pl-1.5 ",
              readColorTw ? readColorTw : "text-[#FFFFFF80]"
            )}
          >
            {post.published_at
              ? format(new Date(post.published_at), "do LLL yy")
              : ""}
          </p>
          {/* <Link passHref href={`/blog/post/${post.slug}`}>
            <div
              className={clsx(
                "px-6 py-2 w-2/5 min-w-max cursor-pointer whitespace-nowrap",
                "text-xs sm:text-sm lg:text-base rounded-full text-center",
                "border-[1px]"
              )}
            >
              Let&apos;s Read
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default PostBlogCard;
