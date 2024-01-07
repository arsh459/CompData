import { CourseReview } from "@models/Prizes/PrizeV2";

interface Props {
  badgeReview?: CourseReview[];
}

const Reviews: React.FC<Props> = ({ badgeReview }) => {
  return badgeReview && badgeReview.length ? (
    <div className="w-screen flex flex-col justify-end items-center pt-24">
      <h2 className="w-full sm:text-center text-white text-3xl sm:text-4xl lg:text-5xl px-5 font-qsSB">
        Reviews by our community
      </h2>
      <div className="w-12 aspect-1" />
      <div className="w-full relative z-0">
        <div className="w-full max-w-screen-lg mx-auto columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 px-5">
          {badgeReview.map((each, index) => (
            <div
              key={`${each.name}-${index}`}
              className="p-4 bg-[#DCF8C6] rounded-xl break-inside-avoid font-popR"
            >
              <p className="text-black text-xs md:text-sm whitespace-pre-wrap">
                {each.text}
                {" - "} <span className="uppercase">{each.name}</span>
              </p>
            </div>
          ))}
        </div>
        {/* <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#482D84] to-transparent flex justify-center items-center">
          <div className="bg-white/10 border border-white font-popL backdrop-blur-lg text-center rounded-full px-8 py-3 text-white text-sm iphoneX:text-base flex justify-center items-center">
            View All Reviews
          </div>
        </div> */}
      </div>
    </div>
  ) : null;
};

export default Reviews;
