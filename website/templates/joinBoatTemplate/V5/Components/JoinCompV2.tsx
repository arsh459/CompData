import "swiper/css";
import "swiper/css/pagination";
// import WaveBtn from "@components/WaveBtn";
import { useRouter } from "next/router";
// import { joinCompBgImg } from "@constants/icons/iconURLs";
import { listCard } from "@templates/joinBoatTemplate/utils";
// import clsx from "clsx";
import AccesButtons from "./AccesButtons";
import FeatureListCardV2 from "./FeatureListV2";

interface Props {
  onGetStarted: () => void;
}

const JoinCompV2: React.FC<Props> = ({ onGetStarted }) => {
  // const { testimonials } = useTestimonials(8);
  const router = useRouter();
  // console.log(testimonials?.length, "length of swiper");

  return (
    <div className="relative inset-0 z-0 bg-[#100F1A] h-screen overflow-y-scroll">
      <div className="w-full pixelXl:h-full  pixelXl:max-h-[90vh] max-w-md mx-auto z-0 flex flex-col">
        <div className="flex-1 relative z-0">
          <div className="marquee w-full bg-transparent absolute left-0 right-0 top-0 z-[50] flex justify-between items-center p-4 ">
            <p className="font-baib text-2xl">
              &#9734; Subscribe to transform yourself &#9734;
            </p>
          </div>
          <div className="absolute left-0 right-0 top-0 z-[55] flex justify-between items-center p-4">
            <img
              src={`https://ik.imagekit.io/socialboat/Vector_qeTUiyHTG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658904429443`}
              className="w-6 iphoneX:w-8 h-6 iphoneX:h-8 object-contain cursor-pointer"
              onClick={router.back}
              alt="backIcon"
            />
          </div>

          <div className="h-[80vw]   relative z-10 ">
            <div
              className="absolute left-0 right-0  -bottom-full h-full  z-50 "
              // style={{
              //   background: `linear-gradient(180deg, rgba(17, 16, 27, 0) 0%, rgba(23, 22, 37, 0.88) 38.48%, rgba(23, 22, 37, 0.88) 49.83%, #100F1A 64.53%)`,
              // }}
            />
          </div>
          <img
            // src={joinCompBgImg}
            src={
              "https://ik.imagekit.io/socialboat/tr:w-700,c-maintain_ratio,fo-auto/Screenshot_2022-11-18_at_1.31_1_dk5SDE_Ju.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669191663159"
            }
            // className=" w-full h-1/2 object-cover "
            className="absolute left-0 right-0 top-0  w-full  object-cover"
          />
        </div>

        <div className="px-4 relative h-full z-0 pb-2 ">
          <div
            className="absolute -top-20 h-full left-0 right-0 text-center  -z-10 "
            style={{
              background: `linear-gradient(180deg, rgba(17, 16, 27, 0) 0%, rgba(23, 22, 37, 0.88) 38.48%, rgba(23, 22, 37, 0.88) 49.83%, #100F1A 64.53%)`,
            }}
          >
            <p className="text-[#FFFFFF] text-2xl text-center pt-6 font-baib">
              What will i get?
            </p>
          </div>

          <div className="bg-[#2C2C37] py-6  rounded-3xl flex-1">
            {listCard.map((plan, index) => (
              <FeatureListCardV2
                featureList={plan}
                key={`${plan.heading}-${index}`}
                isLast={index === listCard.length - 1}
              />
            ))}
          </div>
          {/* <p
            className="text-[#FFFFFF] text-xl text-center font-baib"
            style={{
              paddingTop: "1rem",
            }}
          >
            Our Plans
          </p>
          <div className="flex flex-row justify-between py-4">
            {planContent.map((plan) => (
              <ProPlanCard plan={plan} key={plan.id} />
            ))}
          </div> */}
        </div>
      </div>
      <div
        className="w-full py-3 px-4 sticky pixelXl:sticky iphoneX:absolute  left-0 right-0 bottom-0 z-20 "
        style={{
          background: `linear-gradient(180deg, rgba(17, 16, 27, 0) 0%, rgba(19, 18, 30, 0.55) 13.02%, rgba(23, 22, 37, 0.75) 38.48%, rgba(23, 22, 37, 0.88) 49.83%, #171624 64.53%)`,
        }}
      >
        {/* <AccesButtons
            btnTxt="Book Free Consultation"
            btnStyle="mx-auto max-w-[320px] "
          /> */}
        <div className="py-4 flex justify-center ">
          <AccesButtons
            isShowIcon={true}
            btnTxt="Get Access"
            btnStyle="border-none max-w-[320px] bg-white"
            txtStyle="text-base iphoneX:text-lg"
            textColor="#171624"
            gotoComponent={onGetStarted}
          />
        </div>
      </div>
    </div>
  );
};

export default JoinCompV2;
