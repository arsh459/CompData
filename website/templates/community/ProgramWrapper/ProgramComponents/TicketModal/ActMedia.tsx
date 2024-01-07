import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import MediaCard from "@components/MediaCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import PrivateMedia from "@components/PrivateMedia";

interface Props {
  media: (CloudinaryMedia | AWSMedia)[];
  showPrivateCard: boolean;
}

const ActMedia: React.FC<Props> = ({ media, showPrivateCard }) => {
  return showPrivateCard ? (
    <PrivateMedia />
  ) : (
    <Swiper
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="ticketSwipe w-full my-2"
    >
      {media.map((each) => (
        <SwiperSlide key={each.id} className="px-8">
          <div className="bg-[#C0D1DD] rounded-xl overflow-hidden flex justify-center items-center">
            <MediaCard
              media={each}
              HWClassStr="h-full w-fit rounded-2xl"
              heightString="max-h-60"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ActMedia;
