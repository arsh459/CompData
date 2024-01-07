import { Pagination, PostOrPage } from "@tryghost/content-api";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import PostBlogCard from "./PostBlogCard";
import Banner from "./Banner";

interface Props {
  pagination?: Pagination;
  posts?: PostOrPage[];
}
const BlogItem: React.FC<Props> = ({ pagination, posts }) => {
  return (
    <>
      <Banner
        btnText="Talk to an expert"
        heading="Reverse PCOS/PCOD. Book health consultation"
        btnStyleTw="pt-5 "
      />
      <div className="w-full lg:py-4 max-w-5xl  mx-auto ">
        {/* <h1 className=" mt-4 px-4 md:px-0 pb-1 text-white  text-left   text-lg lg:text-3xl font-popR">
          SocialBoat Blog
          {pagination?.page && pagination?.page > 1 ? (
            <span className="font-popL text-sm pl-2 text-[#EAEAEA85]">
              {`Page: ${`${pagination.page} of ${pagination.pages}`}`}
            </span>
          ) : null}
        </h1>
        <p className="text-sm px-4 md:px-0 font-nunitoL text-[#EAEAEA85]">
          Health, fitness and diet tips on weight loss, PCOD treatment, fixing
          acne and hairloss by experts
        </p> */}
        <div className="w-8 aspect-1" />

        {posts?.map((post, index) => {
          return (
            <Link
              passHref
              href={`/blog/post/${post.slug}`}
              key={`${post.id}_${index}`}
            >
              <PostBlogCard
                post={post}
                postCount={posts.length}
                key={`${post.id}_${index}`}
              />
            </Link>
          );
        })}

        <div className="w-full  max-w-4xl overflow-hidden">
          <div className="flex justify-center items-center py-6">
            {pagination && pagination?.page > pagination?.pages ? (
              <div className="flex flex-col  h-[35vh] justify-center items-center ">
                <p className="  text-center text-sm pb-8 text-white">
                  Not Valid Page Number{" "}
                </p>
                <Link href={`/blog`} className="">
                  <span className="text-bold text-lg text-white cursor-pointer">
                    Click Here
                  </span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                {pagination?.prev ? (
                  <a href={`/blog?page=${pagination.prev}`}>
                    <p
                      className={clsx(
                        "  text-white/70 text-center mr-4   ",
                        pagination?.prev
                          ? "cursor-pointer underline"
                          : "cursor-not-allowed"
                      )}
                      onClick={() => {}}
                    >
                      Previous
                    </p>
                  </a>
                ) : null}
                <p className=" text-center  text-white/70 ">
                  Page
                  <span className="text-white px-1">{pagination?.page}</span>
                  of
                  <span className="text-white px-1">{pagination?.pages}</span>
                </p>
                {pagination?.next ? (
                  <a href={`/blog?page=${pagination?.next}`}>
                    <p
                      className={clsx(
                        " cursor-pointer text-white/70 text-center ml-4   ",
                        pagination?.next
                          ? "cursor-pointer underline"
                          : "cursor-not-allowed"
                      )}
                      onClick={() => {}}
                    >
                      Next
                    </p>
                  </a>
                ) : (
                  <p
                    className={clsx(
                      " text-white/70 text-center ml-4   ",
                      "cursor-not-allowed"
                    )}
                    onClick={() => {}}
                  >
                    End
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
