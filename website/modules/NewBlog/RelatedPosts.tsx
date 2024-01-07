import { PostOrPage } from "@tryghost/content-api";
import Link from "next/link";
import React from "react";
interface Props {
  relatedPosts: PostOrPage[];
  baseId: string;
}
const RelatedPosts: React.FC<Props> = ({ relatedPosts, baseId }) => {
  return (
    <div className="hidden lg:block">
      <p className=" font-popR text-xl md:text-2xl lg:text-3xl py-4 ">
        {relatedPosts.length ? "Related topics" : ""}
      </p>
      {relatedPosts?.map((item) =>
        item.id !== baseId ? (
          <Link passHref href={`/blog/post/${item.slug}`} key={`${item.id}`}>
            <div
              className="w-full bg-[#0000000D]  rounded-full max-w-max"
              key={`${item.id}`}
            >
              <p className="px-3 py-2 m-3 font-popR text-base text-[#000000CC]">
                {item.title}
              </p>
            </div>
          </Link>
        ) : null
      )}
    </div>
  );
};

export default RelatedPosts;
