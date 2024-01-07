import PostBlogCard from "@modules/NewBlog/PostBlogCard";
import { PostsOrPages } from "@tryghost/content-api";
import Link from "next/link";
import React from "react";

interface Props {
  posts: PostsOrPages;
}
const ReviewPageBlogs: React.FC<Props> = ({ posts }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="max-w-screen-lg mx-auto ">
        <h2 className="text-lg sm:text-xl lg:text-3xl font-popL pb-8 w-full text-center m-4">
          Some Gems Who Earned Our Respects 🙌🏻
        </h2>
        {posts
          ? posts?.map((post, index) => {
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
            })
          : null}
        <Link passHref href={`/blog`} className="flex justify-center py-20">
          <div className=" w-fit  border border-[#FF33A1] bg-[#FF33A126] backdrop-blur-lg font-popL text-center rounded-full px-5 py-2.5 text-white text-sm iphoneX:text-base">
            Explore more articles
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ReviewPageBlogs;
