import HowItWorksV2 from "./HowItWorksV2";
import { howWorksData } from "./utils";

interface Props {
  route: string;
  btnText: string;
}

const HowItWorkSteps: React.FC<Props> = ({ route, btnText }) => {
  return (
    <div className="w-screen min-h-screen max-w-screen-xl mx-auto relative z-0">
      {/* <div
        ref={target}
        className="sticky top-0 z-20 w-full h-screen flex flex-col py-16 sm:py-[15%] lg:py-[8%]"
      >
        <h2 className="w-full font-popR text-center text-transparent bg-clip-text bg-gradient-to-br from-[#FBE5FB] to-[#FFF6FF] text-3xl sm:text-4xl lg:text-5xl p-5">
          How it <span className="font-popSB">Works?</span>
        </h2>

        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="flex-1" />
          <div className="p-5 sm:px-[20%] lg:pr-[15%] flex flex-row lg:flex-col">
            {howWorksData?.map((each, index) => (
              <div
                key={`Step ${index + 1}`}
                className={clsx(
                  index !== 0 && "flex-1",
                  "flex flex-row lg:flex-col justify-end items-center"
                )}
              >
                {index === 0 ? null : (
                  <div className="flex-1 h-1 w-1 m-2 rounded-full bg-white/30" />
                )}
                <div
                  className={clsx(
                    "w-5 lg:w-6 aspect-1 rounded-full transition-all flex justify-center items-center",
                    index === curr
                      ? "bg-white scale-100"
                      : "bg-white/30 scale-75"
                  )}
                >
                  {curr === index ? (
                    <span className="text-[#3E43D9] text-sm">{curr + 1}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Link passHref href={`/plans`}>
            <button className="bg-white px-8 py-3 text-base text-black rounded-full">
              Start Journey
            </button>
          </Link>
        </div>
      </div> */}

      {howWorksData?.map((each, index) => (
        <HowItWorksV2
          route={route}
          btnText={btnText}
          key={`Step ${index + 1}`}
          each={each}
          index={index}
        />
      ))}
    </div>
  );
};

export default HowItWorkSteps;
