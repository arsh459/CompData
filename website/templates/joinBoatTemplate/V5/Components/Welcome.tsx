import { socialboatLogoColor2 } from "@constants/icons/iconURLs";

const Welcome = () => {
  return (
    <div className="flex-1 p-4">
      <div className="flex flex-row justify-center items-center">
        <img
          src={socialboatLogoColor2}
          className="w-2/3 max-w-xs aspect-1 object-contain"
          alt="socialboat logo with gradient "
        />
      </div>
      <h1 className="text-transparent text-2xl sm:text-3xl bg-clip-text font-popM text-center bg-gradient-to-r from-[#75E0DF] to-[#7B8DE3] font-black my-6 mx-2">
        {`Welcome to SocialBoat!`}
      </h1>
      <p className="w-5/6 mx-auto text-base iphoneX:text-lg text-[#CECCDE] text-center">
        Help us understand your goal.
        <br /> Will take {"< 1"} min
      </p>
    </div>
  );
};

export default Welcome;
