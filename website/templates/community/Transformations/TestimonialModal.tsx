import React from "react";
import { Testimonial } from "@models/Testimonial/interface";
import CreateModal from "../Program/CreateModal/CreateModal";
import CloseBtn from "../Program/Feed/CloseBtn";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { getLevelColor } from "@templates/LandingPage/levelColor";
import UserImage from "@templates/listing/Header/UserImage";

interface Props {
  testimonial?: Testimonial;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}
const TestimonialModal: React.FC<Props> = ({
  testimonial,
  isOpen,
  setIsOpen,
}) => {
  const { leader } = useLeaderboard(testimonial?.submittedBy);
  const color = getLevelColor(leader?.userLevelV2 ? leader.userLevelV2 : 0);
  // console.log(leader, "leader", testimonial?.submittedBy, testimonial);

  return (
    <CreateModal
      isOpen={isOpen}
      heading=""
      onBackdrop={() => setIsOpen(false)}
      onButtonPress={() => setIsOpen(false)}
      onCloseModal={() => setIsOpen(false)}
      bgData="bg-black fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="flex items-center flex-col justify-center h-full w-full relative z-0">
        <div className="self-end m-4">
          <CloseBtn onCloseModal={() => setIsOpen(false)} />
        </div>
        <div className="px-6 py-4 border-y  flex flex-col w-full bg-[#AFAFAF20]  backdrop-blur-[80px] text-[#E6E6E6]">
          <div
            className="absolute left-1/2  -z-10 top-1/2 -translate-y-1/2 -translate-x-1/2 h-60 w-60 iphoneX:h-72 iphoneX:w-72 rounded-full blur-[100px]"
            style={{
              background: `linear-gradient(180deg, ${color.colorPrimary} 0%,${color.colorAdditional} 50%, ${color.colorSecondary} 100%)`,
            }}
          />
          <div className="flex  items-center ">
            <UserImage
              boxHeight="h-8 iphoneX:h-12"
              boxWidth="w-8 iphoneX:w-12"
              image={testimonial?.media}
              name={testimonial?.name}
              unknown={!testimonial?.media && !testimonial?.name}
            />
            <p className=" ml-5  w-full flex-1 font-bold text-lg iphoneX:text-2xl line-clamp-1">
              {testimonial?.name}
            </p>
          </div>
          <p className="text-white font-medium iphoneX:text-lg pt-2">
            {testimonial?.achievement}
          </p>
          <p className=" text-sm font-light iphoneX:text-lg flex-1 leading-5 ">
            {testimonial?.quote}
          </p>
        </div>
      </div>
    </CreateModal>
  );
};

export default TestimonialModal;
