import { useTaskReels } from "@hooks/reels/useTaskReels";
import { useNextOnScroll } from "@hooks/useNextOnScroll";
import Link from "next/link";
import React from "react";
import ReelItemCard from "./ReelItemCard";

const ReelItem = () => {
  const { reels, nextExists, onNext } = useTaskReels();
  // console.log({ reels });
  const { targetRef } = useNextOnScroll(onNext, nextExists);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 m-4 max-w-6xl mx-auto ">
      {reels?.map((item, index) => {
        const isRecipe = item.tags?.includes("Recipes");
        return (
          <Link
            href={
              isRecipe ? `/blog/recipe/${item.id}` : `/blog/reel/${item.id}`
            }
            key={item.id}
          >
            <ReelItemCard index={index} item={item} />
          </Link>
        );
      })}
      {nextExists && <div ref={targetRef} className="w-1 h-1" />}
    </div>
  );
};

export default ReelItem;
