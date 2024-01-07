import { Testimonial } from "@models/Testimonial/interface";
import clsx from "clsx";

interface TestimonialProps {
  testimonial: Testimonial;
  linClanmStr?: string;
}

const TestimonialComp: React.FC<TestimonialProps> = ({
  testimonial,
  linClanmStr,
}) => {
  return (
    <div className="h-full bg-[#100F1A]/40 border border-white/20 rounded-xl p-4">
      <div className="w-full flex flex-row justify-between items-center">
        <p
          className="text-[#F1F1F1] text-sm iphoneX:text-base flex-1"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {testimonial.name}
        </p>
        <div className="w-16 iphoneX:w-20 aspect-[72/12]">
          <div
            style={{ width: `${(5 / 5) * 100}%` }} // Here first 5 will be rating from 0 to 5
            className="h-full overflow-hidden"
          >
            <img
              src="https://ik.imagekit.io/socialboat/tr:h-300,c-maintain_ratio,fo-auto/Component_49_8kdkqM6tF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666176307073"
              className="w-16 iphoneX:w-20 h-full object-contain"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="h-2" />
      <p
        className={clsx(
          "text-[#C5C5C5] font-baim text-xs iphoneX:text-sm",
          linClanmStr ? linClanmStr : "line-clamp-3"
        )}
      >
        {testimonial.quote}
      </p>
    </div>
  );
};

export default TestimonialComp;
