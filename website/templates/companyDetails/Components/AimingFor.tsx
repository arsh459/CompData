const AimingFor = () => {
  return (
    <div className="text-[#BFBFBF] text-xl max-w-screen-lg flex justify-center items-center flex-col px-6 mx-auto">
      <div className="lg:w-3/4 mx-auto">
        <h1 className="w-full  text-3xl sm:text-4xl lg:text-5xl lg:leading-[52px] text-[#EEE9FF] font-popSB text-left">
          An App to manage <br className="hidden sm:block" /> Chronic Menstrual
          Issues
        </h1>
        <div className="h-5 sm:6 lg:h-8" />
        <p className="text-xs sm:text-sm lg:text-base text-white/70 font-popM">
          SocialBoat (SB) is an AI that helps women manage chronic menstrual
          issues like PCOS & Thyroid with medicine, diet and exercise. In India,
          of the 300 million menstruating women, over 97 million suffer from
          PCOS and often go untreated due to social stigma & lack of awareness.
          People suffer with anxiety, acne, obesity in short term and often
          develop infertility and diabetes in the long-term.
        </p>
        <p className=" text-[#EEE9FF] text-3xl w-full  sm:text-4xl lg:text-5xl font-popSB pt-10 pb-7">
          Our mission is to
        </p>
        <p
          className="text-xs sm:text-sm lg:text-base text-white/70 font-popM px-1 pb-4"
          // className=" text-base sm:text-lg lg:text-xl font-popM text-[#E8CAF5] px-1 pb-7"
        >
          1. Create a safe space, where women can talk and understand their
          menstrual cycle
        </p>
        <p
          className="text-xs sm:text-sm lg:text-base text-white/70 font-popM px-1 pb-4"
          // className=" text-base sm:text-lg lg:text-xl font-popM text-[#E8CAF5] px-1 pb-7"
        >
          2. Build predictive diagnostics, so people can identify any menstrual
          issues are developing
        </p>
        <p
          className="text-xs sm:text-sm lg:text-base text-white/70 font-popM px-1"
          // className=" text-base sm:text-lg lg:text-xl font-popM text-[#E8CAF5]  pb-7"
        >
          3. Personalized and affordable science-backed programs to manage
          chronic menstrual disorders.
        </p>
      </div>
      {/* <img
        src={landingTeamUp}
        className="w-full max-w-3xl aspect-[774/672]"
        alt="image of four fit people "
      /> */}
    </div>
  );
};

export default AimingFor;
