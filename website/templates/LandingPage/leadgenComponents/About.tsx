import { leadgenTypes } from "@constants/leadgen";
import DetailInfo from "../V2/DetailedInfo/DetailInfo";
import StarRating from "../V2/DetailedInfo/StarRating";

interface Props {
  leadgen: leadgenTypes;
}

const About: React.FC<Props> = ({ leadgen }) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto my-20 p-4 flex flex-col md:flex-row">
      <div className="flex-[0.4]">
        <img
          src={leadgen.about.media}
          alt="about image"
          className="w-full object-cover"
        />
      </div>
      <div className="flex-[0.1]" />
      <div className="flex-[0.5] py-20 md:py-0 flex flex-col justify-center">
        <h6 className="text-[#FF4165] tracking-wider">Download App</h6>
        <h2 className="py-8 text-2xl md:text-3xl font-bold">
          {leadgen.about.title}
        </h2>
        <p className="text-xs md:text-base">{leadgen.about.subTitle}</p>
        <div className="pt-8 flex">
          {leadgen.about.rating ? (
            <div className="sm:scale-90 lg:scale-75">
              <DetailInfo
                topTextNode={
                  <p className="text-2xl sm:text-4xl lg:text-6xl font-baib">
                    <span>{leadgen.about.rating}</span>
                  </p>
                }
                mediumTextNode={<StarRating rating={leadgen.about.rating} />}
                footerText="App Rating"
                footerTextClassStr="text-base sm:text-xl lg:text-2xl"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default About;
