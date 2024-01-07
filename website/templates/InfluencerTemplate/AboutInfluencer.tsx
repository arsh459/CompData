import MediaCard from "@components/MediaCard";
import { UserInterface } from "@models/User/User";

interface Props {
  influencer: UserInterface;
}

const AboutInfluencer: React.FC<Props> = ({ influencer }) => {
  return (
    <div className="relative z-0">
      <div className="absolute inset-0 -z-10 w-screen h-screen flex justify-end overflow-hidden">
        <div className="w-full max-w-screen-lg mx-auto aspect-1 overflow-hidden relative z-0">
          <img
            src="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Group_1187_FFQte1GpF5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676019840225"
            className="w-full h-full object-cover"
            alt=""
          />

          <div className="absolute bottom-0 sm:bottom-1/2 sm:translate-y-1/2 right-0 lg:-translate-x-1/2 h-3/5">
            <MediaCard
              media={influencer.landingContent?.img}
              HWClassStr="h-full"
              objectString="object-contain"
            />
          </div>
          {/* <img
            src="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/WhatsApp_Image_2023-01-19_at_17.56_1_96ZRyKUnn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676019832823"
            className="absolute inset-0 z-10 w-full h-full object-contain object-bottom"
            alt=""
          /> */}
        </div>
      </div>
      <div className="w-screen h-screen max-w-screen-md mx-auto">
        <div className="w-full sm:w-1/2 pt-16 sm:pt-20 lg:pt-24 p-4">
          <h2 className="text-white/80 text-base sm:text-xl lg:text-2xl font-popR">
            <span className="text-white text-3xl sm:text-4xl lg:text-5xl font-nunitoB">
              {influencer.name}
            </span>
            <br />
            {influencer.landingContent?.qualification}
          </h2>
          <div className="w-6 aspect-1" />
          <p className="text-white/80 text-sm sm:text-base lg:text-base  whitespace-pre-wrap  font-popL">
            {influencer.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutInfluencer;
