import SocialBoatSVG from "@components/logo/SocialBoatSVG";

interface Props {
  data?: {
    text: string;
    img: string;
  };
}

const WhatYouGetCard: React.FC<Props | undefined> = ({ data }) => {
  return (
    <div
      className="w-full h-full rounded-[40px] overflow-hidden"
      style={{
        padding: data ? 0 : 16,
        background: data
          ? "radial-gradient(500% 100% at 40% 0%, #704FFF 0%, #6C95FF 68%, #61ECFF 100%)"
          : "linear-gradient(255deg, #49B3FF 0%, #497CFF 25%, #885FFF 68%, #AA5FFF 90%, #E961FF 100%)",
      }}
    >
      <div
        className="w-full h-full rounded-[28px] border-black/60 flex justify-center items-center"
        style={{ borderWidth: data ? 0 : 2 }}
      >
        {data ? (
          <div className="w-full h-full flex flex-col justify-between items-center border border-white/25 rounded-[40px]">
            <p className="w-full max-w-xs mx-auto text-white text-base iphoneX:text-xl lg:text-2xl font-nunitoSB px-6 lg:px-8 pt-4 lg:pt-6 lg:pb-4">
              {data.text}
            </p>
            <img
              src={data.img}
              className="flex-1 aspect-1 max-w-[80%] sm:max-w-[90%] object-contain object-bottom"
              alt={data.text}
            />
          </div>
        ) : (
          <div className="w-1/3 aspect-1 border-[6px] border-white rounded-full p-2">
            <SocialBoatSVG color="#FFFFFF" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatYouGetCard;
