import { recommendationBg } from "../data/data";
import RecommendationHeading from "./RecommendationHeading";
import RecommendationSection from "./RecommendationSection";

const RecomendationV4 = () => {
  return (
    <div className=" w-full py-14 relative bg-white">
      {/* <div className="w-full"> */}

      <RecommendationHeading />
      <RecommendationSection />

      {/* </div> */}

      {/*--------Background Image----------*/}
      <img
        src={recommendationBg}
        className=" absolute bottom-0 left-0 right-0  z-0"
        alt="sakhi-ai-background"
      />
    </div>
  );
};

export default RecomendationV4;
