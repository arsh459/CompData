// import { useTestimonials } from "@hooks/stories/useTestimonial";

import { Story } from "@models/Stories/interface";
import AutoScroll from "../components/AutoScroll";
import StoryCardLinkable from "./Components/StoryCardLinkable";
// import AutoScroll from "../components/AutoScroll";

interface Props {
  stories: Story[];
  bgColor?: string;
}

const StoriesLanding: React.FC<Props> = ({ stories, bgColor }) => {
  const n = stories.length;
  const arr1 = stories.slice(0, n / 2);
  const arr2 = stories.slice(n / 2);
  return (
    <div className="my-16 sm:my-20 lg:my-24 w-full ">
      <p className="text-[24px] lg:text-[48px] font-bold text-center text-white font-baib">
        #Superwoman 2022 Trend Stories
      </p>
      <div className="pb-8" />
      <AutoScroll pauseAnimationOnHover={true}>
        {arr1.length ? (
          <div className="grid grid-flow-col  auto-rows-max auto-cols-max gap-4 md:gap-8 mr-4 md:mr-8">
            {arr1.map((story) => (
              <StoryCardLinkable
                key={story.id}
                story={story}
                bgColor={bgColor}
              />
            ))}
          </div>
        ) : null}
      </AutoScroll>
      <div className="w-4 md:w-8 aspect-1" />
      <AutoScroll pauseAnimationOnHover={true} isReverseFlow={true}>
        {arr2.length ? (
          <div className="grid grid-flow-col  auto-rows-max auto-cols-max gap-4 md:gap-8 mr-4 md:mr-8">
            {arr2.map((story) => (
              <StoryCardLinkable
                key={story.id}
                story={story}
                bgColor={bgColor}
              />
            ))}
          </div>
        ) : null}
      </AutoScroll>
    </div>
  );
};

export default StoriesLanding;
