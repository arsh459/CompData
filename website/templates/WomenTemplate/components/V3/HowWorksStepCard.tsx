import React from "react";
interface Props {
  step: string;
  title: string;
  img: string;
}
const HowWorksStepCard: React.FC<Props> = ({ img, step, title }) => (
  <div className="w-4/5 md:w-full md:h-[40%] my-40  mx-auto bg-[#FFFFFF1C]  aspect-[326/478] md:aspect-[832/350] rounded-2xl flex flex-col md:flex-row">
    <div className="  w-full md:w-1/2 self-center px-4 md:pl-12">
      <p className="text-xl  md:text-4xl font-popM text-center md:text-left py-4 text-[#FFFFFFE0]">
        {step}
      </p>
      <p className="text-xl  md:text-4xl font-spectralSB text-center md:text-left pb-12  text-[#EEE9FF]">
        {title}
      </p>
    </div>
    <div className="w-full md:w-1/2 flex-1 rounded-b-2xl  flex justify-center  items-end md:justify-center  ">
      <img
        src={img}
        alt={`${step} img`}
        className=" w-full h-3/4 object-contain aspect-[248/251] "
      />
    </div>
  </div>
);

export default HowWorksStepCard;
