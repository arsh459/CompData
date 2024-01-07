import CircleComp from "./CircleComp";

const IntroducingComp = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-end overflow-hidden relative z-0">
      <video
        preload="auto"
        autoPlay
        playsInline
        loop
        muted={true}
        controls={false}
        src="https://s3.ap-south-1.amazonaws.com/www.socialboat.live/socialboat-pcod-treatment.mp4"
        className="w-full h-full object-cover"
        poster="https://ik.imagekit.io/socialboat/surya-namaskar-sunrise_imcIrb0H3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675749387154"
      />

      <div className="absolute inset-0 z-10 flex justify-center items-end overflow-hidden">
        <CircleComp>
          <div className="absolute inset-8 lg:inset-12 flex justify-center items-center">
            <p className="text-white font-popR text-sm sm:text-2xl lg:text-4xl">
              Introducing the
              <span className="text-[#FF4266]"> SuperWoman Game. </span>A fun
              way to gamify healthy living
            </p>
          </div>
        </CircleComp>
      </div>
    </div>
  );
};

export default IntroducingComp;
