import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { baseImageKit } from "@constants/icons/iconURLs";

interface Props {
  gotoComponent: () => void;
}

const data = [
  {
    img: "selfie_6RM0fNsI1f.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651311089583",
    text: "Share a selfie at the gym, the studio or while working out",
    key: "selfie",
  },
  {
    img: "wearable_1Phi8xaH2o.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651311089030",
    text: "Share a screenshot of your workout from your wearable app",
    key: "wearable",
  },
];

const CreateYourOwnTask: React.FC<Props> = ({ gotoComponent }) => {
  return (
    <div>
      <h1 className="text-3xl">Share custom workout</h1>
      <p className="my-6">
        {
          "Want to share your own workout at the gym or at the court to earn FPs? You can share any sort of workout to flex & motivate the community."
        }
      </p>
      <p className="text-center">
        Note : You will earn only 1FP and the next task can be created after
        only 24 hours
      </p>
      <Swiper
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="createYourWorkout-swiper w-full h-full rounded-xl my-6"
      >
        {data.map((item) => {
          return (
            <SwiperSlide key={item.key}>
              <div className="w-full flex justify-center items-center relative rounded-2xl">
                <img
                  src={`${baseImageKit}/tr:w-400,c-maintain-ratio/${item.img}`}
                  alt="man tying his shoelaces"
                  className="w-full h-full"
                />
                <div className="absolute top-2/3 h-1/3 bg-gradient-to-t from-black/50 flex items-end pointer-events-none">
                  <p className="text-white text-sm p-4">{item.text}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button
        className="w-full cursor-pointer py-4 flex justify-center items-center text-white bg-gradient-to-l from-[#F19B38] to-[#FD6F6F] rounded-xl"
        onClick={gotoComponent}
      >
        <p className="text-3xl">+</p>
        <p className="pl-4 pt-0.5">Share Custom Workout</p>
      </button>
    </div>
  );
};

export default CreateYourOwnTask;
