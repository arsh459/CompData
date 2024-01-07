import { PostsOrPages } from "@tryghost/content-api";
import React, { useEffect, useState } from "react";

import PostCollectionCard from "./PostCollectionCard";
interface Props {
  posts: PostsOrPages;
}
const FeaturedCollection: React.FC<Props> = ({ posts }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPostIndex((currentPostIndex + 1) % posts.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentPostIndex, posts.length]);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      <h2 className="w-4/5 lg:w-full text-center text-xl lg:text-3xl font-qsSB">
        Explore our blogs
      </h2>
      <div className="w-4 lg:w-8 aspect-1" />
      <PostCollectionCard
        post={posts[currentPostIndex]}
        postCount={posts.length}
        currentPostIndex={currentPostIndex}
        setCurrentPostIndex={setCurrentPostIndex}
      />
    </div>
  );
};

export default FeaturedCollection;
