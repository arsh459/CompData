import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import MwdiaCard from "@components/MediaCard";

export interface Props {
  photos?: (CloudinaryMedia | AWSMedia)[];
  gotoComponent: () => void;
  onDeleteMedia: (media: CloudinaryMedia | AWSMedia) => void;
}

const WorkoutMediaSwiper: React.FC<Props> = ({
  photos,
  gotoComponent,
  onDeleteMedia,
}) => {
  // console.log("p", photos);
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={10}
      centeredSlides={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="workoutMediaSwiper"
    >
      {photos?.length
        ? photos.map((img, index) => (
            <SwiperSlide key={`${img.id}-${index}`}>
              <div className="relative z-10 bg-[#C0D1DD] rounded-2xl overflow-hidden">
                {/* <img src={img.url} className="rounded-3xl object-cover" /> */}
                {/* <MediaTile
                  media={img}
                  width={400}
                  height={300}
                  alt="p-media"
                  roundedString="rounded-2xl"
                /> */}
                <div className="h-60 flex justify-center items-center">
                  <MwdiaCard
                    media={img}
                    HWClassStr="h-full w-fit rounded-2xl"
                  />
                </div>

                <div
                  onClick={() => onDeleteMedia(img)}
                  // onClick={() => console.log(img)}
                  className="cursor-pointer absolute top-2 left-2 w-12 h-12 bg-gray-50 flex items-center justify-center p-2 rounded-full"
                >
                  <img src="https://img.icons8.com/fluency-systems-regular/24/E93737/trash--v1.png" />
                </div>
              </div>
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
};

export default WorkoutMediaSwiper;
