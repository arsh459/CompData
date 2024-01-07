import { EvolutionBodyType } from "@constants/Avatar/utils";
import { genderType } from "@models/User/User";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import "swiper/css";

interface Props {
  gender?: genderType;
  targetBodyTypeArr: EvolutionBodyType[];
  onCurrentIndexChange: (val: number) => void;
  currentActiveIndex: number;
  isDesired?: boolean;
}

const SelectBodyType: React.FC<Props> = ({
  gender,
  targetBodyTypeArr,
  onCurrentIndexChange,
  currentActiveIndex,
  isDesired,
}) => {
  return (
    <div className="flex-1 w-full h-full flex flex-col justify-around">
      <Swiper
        slidesPerView={2}
        centeredSlides={true}
        className="w-full aspect-[1.5] swiperBotyType"
        onActiveIndexChange={(swiper) =>
          onCurrentIndexChange(swiper.activeIndex)
        }
        onSwiper={(swiper) => {
          swiper.slideTo(currentActiveIndex, 1000, false);
        }}
      >
        {targetBodyTypeArr.map((each, index) => (
          <SwiperSlide
            key={each.name}
            className="relative z-0 w-1/2 h-full flex justify-center items-center"
          >
            <img
              src={
                each.image[
                  gender && gender !== "notSpecified" ? gender : "female"
                ]
              }
              alt="body type image"
              className={clsx(
                "w-full h-full bg-[#343150] rounded-2xl overflow-hidden object-contain",
                currentActiveIndex === index ? "scale-100" : "scale-75"
              )}
            />
            {currentActiveIndex === index ? (
              <img
                src="https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Group_397__1__Eps4M2u6a.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657028769124"
                className="absolute top-2.5 right-2.5 w-5 aspect-1 object-contain"
                alt="right tick"
              />
            ) : null}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="bg-[#343150] rounded-3xl overflow-hidden m-4 p-4">
        <h4 className="text-[#F1F1F1] text-base iphoneX:text-lg font-bold line-clamp-1">
          {targetBodyTypeArr[currentActiveIndex].name}
        </h4>
        <h4
          className={clsx(
            "text-[#9F9F9F] text-sm iphoneX:text-base mt-2",
            isDesired ? "line-clamp-2" : "line-clamp-3"
          )}
        >
          {targetBodyTypeArr[currentActiveIndex].description}
        </h4>
        {isDesired ? (
          <div className="bg-[#323242] rounded-xl overflow-hidden mt-4 flex flex-row justify-between items-center px-4 py-2">
            <h4
              className="text-sm iphoneX:text-base line-clamp-3"
              style={{
                color: targetBodyTypeArr[currentActiveIndex].color,
                fontFamily: "BaiJamjuree-SemiBold",
              }}
            >
              {`Level : ${targetBodyTypeArr[currentActiveIndex].level}`}
            </h4>
            <h4
              className="text-sm iphoneX:text-base line-clamp-3"
              style={{
                color: targetBodyTypeArr[currentActiveIndex].color,
                fontFamily: "BaiJamjuree-SemiBold",
              }}
            >
              {`Duration : ${targetBodyTypeArr[currentActiveIndex].duration} Months`}
            </h4>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SelectBodyType;
