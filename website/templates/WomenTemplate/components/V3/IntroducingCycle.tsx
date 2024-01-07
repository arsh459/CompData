import IntroLeft from "./IntroComps/IntroLeft";
import IntroRight from "./IntroComps/IntroRight";

const IntroducingCycle = () => {
  return (
    <div className="w-screen h-screen overflow-hidden relative z-0">
      <div
        className="absolute w-[150vw] sm:w-[100vw] lg:w-[110vh] bottom-0 right-0 aspect-1 rotate-90 lg:rotate-0 translate-y-1/2 lg:translate-y-[5%] translate-x-[17.5%] sm:translate-x-0 lg:translate-x-1/2 -z-10 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, #EEACF3 0%, #D170F5 20%, #903DD2 50%, #411794 100%)",
        }}
      />
      <div className="w-full h-full max-w-screen-xl mx-auto z-20 flex flex-col lg:flex-row ">
        <div className="w-full lg:w-3/5 min-h-[50%] lg:max-h-[60%] px-2 border-5 mx-auto">
          <IntroLeft />
        </div>
        <div className=" w-full lg:w-2/5 max-h-[50%] lg:max-h-max py-10 mx-auto">
          <IntroRight />
        </div>
      </div>
      <img
        src="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Component_7__1__jvHg4QoWl.png?updatedAt=1687157518938"
        className="absolute left-0 right-0 bottom-1/2 translate-y-1/2 lg:bottom-0 lg:translate-y-0  object-contain -z-20"
        alt="women page wave image"
      />
    </div>
  );
};

export default IntroducingCycle;
