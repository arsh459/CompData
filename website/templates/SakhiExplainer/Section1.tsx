import { meetSakhiBg } from "@constants/icons/iconURLs";

const Section1 = () => {
  return (
    <div className="snap-center h-screen flex flex-col lg:flex-row-reverse justify-center items-center gap-4 px-4 pt-16 pb-32 lg:pb-16">
      <div className="w-full flex-1 max-h-[80vw] lg:h-full relative z-0">
        <div className="absolute inset-0 z-0">
          <img
            src={meetSakhiBg}
            className="w-full h-full object-contain"
            alt="meet sakhi"
          />
        </div>
      </div>

      <h6 className="text-white text-4xl sm:text-5xl lg:text-7xl font-canelaL lg:w-1/2">
        Harness The
        <span style={{ fontFamily: "BaiJamjuree-Bold" }}> Power </span>of your
        <span style={{ fontFamily: "BaiJamjuree-Bold" }}> Menstrual </span>
        cycle using AI
        <span style={{ fontFamily: "Nunito-Bold", color: "#53A2FF" }}>
          {" "}
          Sakhi
        </span>
      </h6>
    </div>
  );
};

export default Section1;
