import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TeamCardV2 from "./TeamCardV2";
import { EventInterface } from "@models/Event/Event";

interface Props {
  userEvents: EventInterface[];
  onNext: () => void;
}

const TeamsViewV2: React.FC<Props> = ({ userEvents, onNext }) => {
  return (
    <>
      {userEvents.length > 0 ? (
        <h3 className="px-4 text-xl font-extrabold iphoneX:text-2xl">
          My Teams
        </h3>
      ) : null}
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        className="teamsViewSwiper"
        onReachEnd={onNext}
      >
        {userEvents.map((item) => (
          <SwiperSlide
            key={item.id}
            className="min-w-[260px] iphoneX:min-w-[350px]"
          >
            <TeamCardV2 sbEvent={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TeamsViewV2;
