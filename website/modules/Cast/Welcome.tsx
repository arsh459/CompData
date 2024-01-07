import Loading from "@components/loading/Loading";
import SocialBoatSVG from "@components/logo/SocialBoatSVG";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { getLevelColorV2 } from "@templates/LandingPage/levelColor";
import UserImage from "@templates/listing/Header/UserImage";
import { useEffect } from "react";
import { updateCastState } from "@models/Cast/utils";

interface Props {
  castId: string;
  userId?: string;
  size: number;
}

const Welcome: React.FC<Props> = ({ castId, userId, size }) => {
  const { leader, loaded } = useLeaderboard(userId);
  const { color } = getLevelColorV2(
    leader?.userLevelV2 ? leader.userLevelV2 : 0
  );

  useEffect(() => {
    setTimeout(() => {
      updateCastState(castId);
    }, 5000);
  }, [castId]);

  return loaded ? (
    <>
      <div className="absolute top-0 left-0 right-0 h-1/4 flex justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <div className="w-8 h-8 mr-2">
            <SocialBoatSVG color="#7D91C3" />
          </div>
          <p
            className="text-4xl"
            style={{ color: "#7D91C3", fontFamily: "BaiJamjuree-Bold" }}
          >
            SocialBoat
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 flex flex-col justify-center items-center">
        <p
          className="text-white text-center text-4xl"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          Welcome
        </p>
        <p
          className="text-white text-center text-4xl capitalize"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {leader?.name}!
        </p>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div style={{ width: size, height: size }} className="relative z-0">
          <div
            className="absolute -inset-[20%] -z-20 rounded-full blur-3xl"
            style={{ backgroundColor: `${color}80` }}
          />
          <div
            className="absolute -inset-[15%] -z-10 rounded-full"
            style={{ borderColor: color, borderWidth: 0.25 }}
          />
          <div
            className="absolute -inset-[10%] -z-10 rounded-full"
            style={{ borderColor: color, borderWidth: 0.5 }}
          />
          <div
            className="absolute -inset-[5%] -z-10 rounded-full"
            style={{ borderColor: color, borderWidth: 1 }}
          />
          <UserImage
            image={leader?.profileImage}
            name={leader?.name}
            boxWidth="w-full"
            boxHeight="h-full"
          />
        </div>
      </div>
    </>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <Loading fill="#ff735c" width={50} height={50} />
    </div>
  );
};

export default Welcome;
