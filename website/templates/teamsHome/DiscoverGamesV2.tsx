// import { useActiveGames } from "@hooks/games/useActiveGames";
import GamesCardV2 from "./GameCard/GamesCardV2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { UserInterface } from "@models/User/User";
import { EventInterface } from "@models/Event/Event";

interface Props {
  signedInUser?: UserInterface;
  vertical?: boolean;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  gameTeams: { [gameId: string]: EventInterface };
  games: EventInterface[];
}

const DiscoverGamesV2: React.FC<Props> = ({
  signedInUser,
  authStatus,
  gameTeams,
  vertical,
  games,
}) => {
  return (
    <>
      <h3 className="px-4 pb-2 text-xl iphoneX:text-2xl font-extrabold">
        {authStatus === "FAILED" ? "Select your universe" : "Fitness Games"}
      </h3>
      {authStatus === "FAILED" || vertical ? (
        <div>
          {games.map((item) => (
            <div className="px-2 py-2" key={item.id}>
              <GamesCardV2
                game={item}
                event={gameTeams[item.id]}
                signedInUser={signedInUser}
                authStatus={authStatus}
              />
            </div>
          ))}
        </div>
      ) : games.length > 0 ? (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="gamessCardSwiper bg-[#ECECEC]"
        >
          {games.map((item) => (
            <SwiperSlide key={item.id}>
              <GamesCardV2
                game={item}
                event={gameTeams[item.id]}
                signedInUser={signedInUser}
                authStatus={authStatus}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </>
  );
};

export default DiscoverGamesV2;
