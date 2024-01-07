import ExpertsBookCallSection from "./ExpertBookCallSection";
import ExpertsImgSection from "./ExpertImgSection";

const ExpertsV4 = () => {
  return (
    <div className=" w-full grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-1 grid-rows-2 grid-flow-row-dense">
        <ExpertsBookCallSection />
        <ExpertsImgSection />
    </div>
  );
};

export default ExpertsV4;
