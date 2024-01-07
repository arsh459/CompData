import { Testimonial } from "@models/Testimonial/interface";
import { useCallback, useRef, useState } from "react";
import clsx from "clsx";

interface Props {
  videoTestimonials: Testimonial[];
  showSuperWoman?: boolean;
}

const Transformations: React.FC<Props> = ({
  videoTestimonials,
  showSuperWoman,
}) => {
  const root = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="w-full mx-auto py-16 sm:py-20 lg:py-24">
      {showSuperWoman ? (
        <p className="text-3xl  text-white/80  w-4/5 mx-auto  md:w-full  text-center  font-popM pb-14  ">
          <span className="text-white font-popSB">Superwoman</span> who have
          achieved their goals
        </p>
      ) : (
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-popR text-center p-2 text-transparent bg-clip-text bg-gradient-to-br from-[#B269FF] via-[#E3C6FF] to-[#D45FFF]">
          Success stories on SocialBoat
        </h2>
      )}
      <div ref={root} className="w-screen overflow-hidden relative z-0">
        <div
          className={clsx(
            "overflow-x-scroll scrollbar-hide px-4 py-8 grid grid-flow-col auto-cols-[10%] lg:auto-cols-[25%] gap-4",
            showSuperWoman && "lg:auto-cols-[15%]"
          )}
        >
          <div />
          {videoTestimonials?.map((item, index) => (
            <HelperComp
              key={item.id}
              item={item}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              root={root.current}
            />
          ))}
          <div />
        </div>
      </div>

      <div className="pb-8" />

      <div className="flex justify-center items-center gap-3">
        {videoTestimonials?.map((item, index) => (
          <div
            key={item.id}
            className={clsx(
              "w-1/12 max-w-[60px] aspect-[60/5] rounded-full",
              index === activeIndex ? "bg-white" : "bg-white/60"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Transformations;

interface HelperCompProps {
  item: Testimonial;
  index: number;
  activeIndex: number;
  setActiveIndex: (val: number) => void;
  root: HTMLDivElement | null;
}

const HelperComp: React.FC<HelperCompProps> = ({
  item,
  index,
  activeIndex,
  setActiveIndex,
  root,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const targetRef = useCallback(
    (node) => {
      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((element) => {
            if (element.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        { root: root, rootMargin: "0px -20%", threshold: 0.75 }
      );

      if (node) observer?.current.observe(node);
    },
    [root, index, setActiveIndex]
  );

  return (
    <div
      ref={targetRef}
      className={clsx(
        "w-full aspect-[16/9] overflow-hidden rounded-3xl col-span-6 lg:col-span-2 relative z-0",
        index !== activeIndex && "scale-90 transition-all"
      )}
    >
      <iframe
        className="w-full h-full rounded-xl"
        src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        title={item.name}
        loading="lazy"
      />
      {index === activeIndex ? null : (
        <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur" />
      )}
    </div>
  );
};
