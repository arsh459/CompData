import { useLandingDataContext } from "../providers/LandingDataProvider";
import JoinCta from "./JoinCta";
import MentionedBy from "./MentionedBy";

const HeroDetails = () => {
  const { data } = useLandingDataContext();

  return (
    <>
      <div className="text-white text-4xl lg:text-6xl font-bold font-baib text-center md:text-left">
        {data.heroDetails.prefix}{" "}
        <span className="text-[#FF4266]">{data.heroDetails.primary}</span>{" "}
        {data.heroDetails.suffix} <br /> {data.heroDetails.nextLine}
      </div>

      <div className="py-10 w-max mx-auto md:mx-0">
        <JoinCta origin="landing" />
      </div>

      <div className="md: h-20" />
      <MentionedBy />
    </>
  );
};

export default HeroDetails;
