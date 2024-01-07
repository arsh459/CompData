import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/router";
import { listCard } from "@templates/joinBoatTemplate/utils";
import FeatureListCard from "./FeatureListCard";
import AccesButtons from "./AccesButtons";

interface Props {
  onGetStarted: () => void;
}

const JoinCompV3: React.FC<Props> = ({ onGetStarted }) => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex relative z-0">
      {/* <div className="absolute inset-0 w-full h-full -z-[5] backdrop-blur-sm"></div> */}
      <div className="absolute left-0 right-0 top-0 z-[55] flex justify-between items-center p-4">
        <img
          src={`https://ik.imagekit.io/socialboat/Vector_qeTUiyHTG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658904429443`}
          className="w-6 iphoneX:w-8 h-6 iphoneX:h-8 object-contain cursor-pointer"
          onClick={router.back}
          alt="backIcon"
        />
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Screenshot_2022-11-18_at_1.31_3_iJJa-QwEU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669373355703"
          className="h-full lg:w-full object-cover"
          alt=""
        />
      </div>
      <div className="w-full  max-w-max m-auto ">
        <p className="text-[#FFFFFF]  text-3xl md:text-5xl  text-center pb-6 font-baib">
          What will i get?
        </p>
        <div className="bg-[#2C2C3759] backdrop-blur-3xl p-4  rounded-3xl flex-1">
          {listCard.map((plan, index) => (
            <FeatureListCard
              featureList={plan}
              key={`${plan.heading}-${index}`}
              isLast={index === listCard.length - 1}
            />
          ))}
        </div>
        <div className="py-4 pt-8 flex justify-center ">
          <AccesButtons
            isShowIcon={true}
            btnTxt="Get Access"
            btnStyle="border-none max-w-[255px] bg-white"
            txtStyle="text-base iphoneX:text-lg"
            textColor="#171624"
            gotoComponent={onGetStarted}
          />
        </div>
      </div>
    </div>
  );
};

export default JoinCompV3;
