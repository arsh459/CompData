import { Story } from "@models/Stories/interface";
import Link from "next/link";
import React from "react";
import NewStoryCard from "../../LandingTestimonials/components/NewStoryCard";
interface Props {
  story: Story;
  bgColor?: string;
}
const StoryCardLinkable: React.FC<Props> = ({ story, bgColor }) => {
  return story.link ? (
    <Link href={story.link} key={story.id}>
      <div key={story.id} className="w-[459px] h-full">
        <NewStoryCard story={story} bgColor={bgColor} />
      </div>
    </Link>
  ) : (
    <div key={story.id} className="w-[459px] h-full">
      <NewStoryCard story={story} bgColor={bgColor} />
    </div>
  );
};

export default StoryCardLinkable;
