// import TrackListBtn from "./TrackListBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import {
  AWSMedia,
  //   cloudinaryBaseURL,
  CloudinaryMedia,
} from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
import { formatWithCommas } from "@utils/number";
import MediaCard from "../MediaCard";
import { useState } from "react";
import { baseImageKit, fPointsWhite } from "@constants/icons/iconURLs";

interface Props {
  postMedia?: (CloudinaryMedia | AWSMedia)[];
  date: string;
  fitPoints: number;
  pointsVisible?: boolean;
  gameName?: string;
  // setIsVisible: (val: boolean) => void;
}

// const month: { [key: string]: string } = {
//   "01": "January",
//   "02": "February",
//   "03": "March",
//   "04": "April",
//   "05": "May",
//   "06": "June",
//   "07": "July",
//   "08": "August",
//   "09": "September",
//   "10": "October",
//   "11": "November",
//   "12": "December",
// };

const CardSwiper: React.FC<Props> = ({
  postMedia,
  // date,
  fitPoints,
  pointsVisible,
  gameName,
  // setIsVisible,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);

  return (
    <Swiper
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="activitySwiper rounded-b-lg"
    >
      {postMedia?.map((each, index) => (
        <SwiperSlide key={`activityCardMedia-${index}`} className="w-full">
          <MediaCard media={each} setIsPaused={(val) => setIsPaused(val)} />
        </SwiperSlide>
      ))}
      {isPaused ? (
        <div
          className={clsx(
            "flex justify-between items-end px-3 py-2",
            postMedia?.length &&
              "absolute left-0 right-0 top-2/3 bottom-0 z-10 pointer-events-none",
            postMedia?.length && "bg-gradient-to-t from-black text-white"
          )}
        >
          {pointsVisible ? (
            <h3 className="flex justify-center items-center text-xl font-bold">
              {fitPoints > 0 ? (
                <img
                  className="pr-1"
                  src={`${baseImageKit}/tr:w-20,c-maintain_ratio/${fPointsWhite}`}
                />
              ) : null}
              {fitPoints > 0
                ? `${formatWithCommas(Math.round(fitPoints))} FP`
                : "In Review"}
            </h3>
          ) : (
            <div />
          )}
          <p className="text-base font-bold">{gameName}</p>
          {/* <h3>
            {date.slice(0, 2)}, {month[date.slice(3, 5)]}
          </h3> */}
        </div>
      ) : null}
    </Swiper>
  );
};

export default CardSwiper;
