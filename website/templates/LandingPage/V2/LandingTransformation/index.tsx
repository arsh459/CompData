// import MediaCard from "@components/MediaCard";
// import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import { Testimonial } from "@models/Testimonial/interface";
import React from "react";
// import AutoScroll from "../components/AutoScroll";

interface Props {
  videoTestimonials: Testimonial[];
}

const TransformationLanding: React.FC<Props> = ({ videoTestimonials }) => {
  // const { testimonials } = useTestimonials(100);
  // const urlsId = ["XW7ujltKbCA", "yG6mzLmfZS0", "JHZXsMZ8iKE"];
  return (
    <div className="w-full mx-auto py-16 sm:py-20 lg:py-24">
      <p className="text-[32px] lg:text-[64px] font-bold text-center text-white font-baib">
        Our Stories
      </p>
      {/* <AutoScroll pauseAnimationOnHover={true}>
        </AutoScroll> */}
      <div className="pb-8" />
      <div className="overflow-x-scroll scrollbar-hide py-8 grid grid-flow-col auto-cols-[90%] sm:auto-cols-[75%] lg:auto-cols-[45%] gap-4 px-4">
        {videoTestimonials?.map((item) =>
          item.isTransformation && item.youtubeId ? (
            <div
              key={item.id}
              className="w-full aspect-[16/9] overflow-hidden rounded-3xl"
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
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TransformationLanding;
