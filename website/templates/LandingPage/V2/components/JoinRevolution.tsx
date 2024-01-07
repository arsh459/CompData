import LandingFeatures from "./LandingFeatures";
import {
  landingJoinTv,
  landingJoinLaptop,
  landingJoinMobile,
} from "@constants/icons/iconURLs";
import JoinCta from "./JoinCta";

interface Props {
  origin: string;
}

const JoinRevolution: React.FC<Props> = ({ origin }) => {
  return (
    <LandingFeatures
      imgArr={[landingJoinTv, landingJoinLaptop, landingJoinMobile]}
      personImg="https://ik.imagekit.io/socialboat/Fitbit_Coach_Hero-hero_1__1__B4ybU3aEQ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666988172763"
      slide={true}
      personImgStyleTW="top-[75%] left-0 mr-4"
    >
      <div className="flex  flex-col items-center w-full" id="get_started">
        <div className="text-white text-5xl md:text-7xl font-bold text-center md:text-left font-baib leading-tight">
          Join The
          <br className="flex sm:hidden lg:flex" />
          <span className="text-[#FF4165]"> Revolution</span>
        </div>

        <JoinCta origin={origin} />
      </div>
    </LandingFeatures>
  );
};

export default JoinRevolution;
