import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import TestimonialCardV3 from "./TestimonialCardV3";
import { useState } from "react";
import TestimonialModal from "./TestimonialModal";
import { Testimonial } from "@models/Testimonial/interface";

interface Props {
  // parentEvent: EventInterface;
  // paddingTop?: boolean;
}

const TestimonialContainerV2: React.FC<Props> = ({}) => {
  const { testimonials } = useTestimonials(100);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTestimonial, setTestimonial] = useState<Testimonial>();
  return (
    <div className="flex relative justify-center flex-col items-center w-full full">
      <p className="text-xl pt-10 iphoneX:pt-20 justify-center flex  iphoneX:text-3xl font-bold text-white">
        Our Testimonials
      </p>
      <div className="flex flex-wrap flex-col h-[20rem] iphoneX:h-[23rem] my-2.5 iphoneX:my-8 w-full no-scrollbar scrollbar-hide overflow-x-scroll">
        {testimonials?.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            onClick={() => {
              setTestimonial(item);
              setIsOpen(true);
            }}
          >
            <TestimonialCardV3 testimonial={item} />
          </div>
        ))}
      </div>
      <TestimonialModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        testimonial={selectedTestimonial}
      />
      <p className="py-2 animate-pulse text-xs iphoneX:text-sm">
        Tap to view their story
      </p>
    </div>
  );
};

export default TestimonialContainerV2;
