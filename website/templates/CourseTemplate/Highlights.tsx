import MediaCard from "@components/MediaCard";
import { Task } from "@models/Tasks/Task";
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  dayZeroTasks: Task[];
}

const Highlights: React.FC<Props> = ({ dayZeroTasks }) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container });

  const translateX = useTransform(scrollXProgress, [0, 1], ["0%", "-100%"]);
  const left = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  const handlePrev = () => {
    if (container.current) {
      container.current.scrollTo({
        top: 0,
        left:
          container.current.scrollLeft -
          container.current.children[1].clientWidth -
          32,
        behavior: "smooth",
      });
    }
  };
  const handleNext = () => {
    if (container.current) {
      container.current.scrollTo({
        top: 0,
        left:
          container.current.scrollLeft +
          container.current.children[1].clientWidth +
          32,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h2 className="w-full sm:text-center text-white text-3xl sm:text-4xl lg:text-5xl px-8 font-qsSB">
        Snippets from the Course
      </h2>

      <div
        ref={container}
        className="w-screen overflow-x-scroll scrollbar-hide grid grid-flow-col gap-8 my-12"
      >
        <div className="w-[calc(calc(100vw-1024px)/2)] inline-block" />
        {dayZeroTasks.map((each) => (
          <div key={each.id} className="w-64 sm:w-72 lg:w-80 inline-block">
            <MediaCard
              media={each.avatar}
              thumbnail={each.videoThumbnail}
              setIsPaused={() => {}}
              HWClassStr="w-full aspect-[1.65]"
              roundedString="rounded-2xl overflow-hidden"
            />
            <h3 className="my-4 font-medium text-base sm:text-xl lg:text-2xl font-nunitoB">
              {each.name}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm lg:text-base font-popR">
              {each.rules ? each.rules : each.description}
            </p>
          </div>
        ))}
        <div className="w-[calc(calc(100vw-1024px)/2)] inline-block" />
      </div>

      <div className="w-full max-w-screen-lg mx-auto px-8">
        <div className="w-full bg-white/20 h-1 md:h-1.5 rounded-full">
          <motion.div
            style={{ translateX, left }}
            className="w-1/6 h-full bg-white relative rounded-full"
          />
        </div>
      </div>

      <div className="flex justify-center items-center mt-8">
        <img
          onClick={handlePrev}
          src="https://ik.imagekit.io/socialboat/tr:h-200,c-maintain_ratio,fo-auto/Vector-1_rZuEjhAxl.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676035730416"
          className="w-1/12 aspect-1 cursor-pointer"
          alt="previous icon"
        />
        <div className="w-4 aspect-1" />
        <img
          onClick={handleNext}
          src="https://ik.imagekit.io/socialboat/tr:h-200,c-maintain_ratio,fo-auto/Vector_DGjgwxOPq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676035729946"
          className="w-1/12 aspect-1 cursor-pointer"
          alt="next icon"
        />
      </div>
    </div>
  );
};

export default Highlights;
