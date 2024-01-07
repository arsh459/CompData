import MediaCard from "@components/MediaCard";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  media: (CloudinaryMedia | AWSMedia)[];
}

const PrivateMediaSwiper: React.FC<Props> = ({ isOpen, onClose, media }) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);

  return (
    <CreateModal
      heading=""
      isOpen={isOpen}
      onBackdrop={onClose}
      onCloseModal={onClose}
      onButtonPress={onClose}
      bgData="bg-black fixed inset-0 z-50 w-full h-full max-w-md mx-auto"
    >
      <div className="w-full h-full relative z-0 flex items-center justify-center">
        {isPaused ? (
          <div className="absolute top-0 left-0 right-0 h-1/5 bg-gradient-to-b from-black to-transparent z-10">
            <button onClick={onClose} className="mx-4 my-8">
              <img
                src={`https://ik.imagekit.io/socialboat/Vector__16__TCdE80hiL.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658907677488`}
                className="w-6 h-6 iphoneX:w-8 iphoneX:h-8 object-contain"
                alt=" back icon"
              />
            </button>
          </div>
        ) : (
          true
        )}
        {media.length ? (
          <Swiper
            pagination={
              isPaused
                ? {
                    clickable: true,
                    dynamicBullets: true,
                  }
                : false
            }
            modules={[Pagination]}
            className="privateMediaSwiper w-full h-[80vh]"
          >
            {media.map((each) => (
              <SwiperSlide
                key={each.id}
                className="w-full h-full bg-[#C0D1DD] flex justify-center items-center"
              >
                <MediaCard
                  media={each}
                  setIsPaused={(val) => setIsPaused(val)}
                  webEngageEventname="gameCommunity_postMediaPlay"
                  HWClassStr="h-full w-fit"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-white text-xl iphoneX:text-3xl font-bold">
              No Media Found
            </p>
          </div>
        )}
      </div>
    </CreateModal>
  );
};

export default PrivateMediaSwiper;
