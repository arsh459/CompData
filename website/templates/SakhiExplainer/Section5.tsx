import { superwomenImage } from "@constants/icons/iconURLs";

const Section5 = () => {
  return (
    <div className="snap-center h-screen flex flex-col lg:flex-row justify-center items-center">
      <div className="flex justify-center items-center px-4 my-16 sm:my-28 lg:my-0">
        <p
          className="text-white text-4xl sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "Canela-Light" }}
        >
          Become a
          <span style={{ fontFamily: "BaiJamjuree-Bold" }}> Superwoman</span>
        </p>
      </div>
      <div className="flex-1 w-full h-full relative z-0">
        <div className="absolute inset-0 z-0">
          <img
            src={superwomenImage}
            className="h-full aspect-[426/592] lg:pt-40 object-bottom mx-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Section5;
