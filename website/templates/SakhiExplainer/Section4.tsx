import clsx from "clsx";
import { section4colors, section4data } from "./uttils/constants";
import { Section4DataType } from "./uttils/interface";

const Section4 = () => {
  return (
    <div className="snap-center h-screen flex flex-col justify-center items-center gap-8 overflow-hidden lg:overflow-visible">
      <p
        className="text-white text-2xl sm:text-3xl lg:text-5xl text-center px-5 mt-16 md:mt-28"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Ask
        <span style={{ color: "#53A2FF" }}> Sakhi </span>
        everything and anything
      </p>

      <div className="flex-1 w-[120vw] flex justify-center items-center">
        <div className="grid grid-flow-col lg:grid-flow-row auto-rows-fr auto-cols-fr justify-center items-center gap-2 sm:gap-4">
          {section4data.map((each, eachInd) => (
            <div
              key={`each-${eachInd}`}
              className={clsx(
                "w-full grid grid-flow-row lg:grid-flow-col auto-cols-fr gap-2 sm:gap-4",
                eachInd % 2 === 0
                  ? "lg:-translate-x-[5%]"
                  : "lg:translate-x-[5%]"
              )}
            >
              {each.map((item, itemInd) => (
                <ItemContainer
                  key={`item-${itemInd}`}
                  color={section4colors[eachInd % section4colors.length]}
                  classStr={clsx(
                    itemInd % 2 === 0
                      ? "-translate-x-[10%] lg:translate-x-0"
                      : "translate-x-[10%] lg:translate-x-0",
                    "md:aspect-[2.5]"
                  )}
                  {...item}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-28" />
    </div>
  );
};

export default Section4;

const ItemContainer: React.FC<
  Section4DataType & { color: string; classStr: string }
> = ({ head, text, color, classStr }) => {
  return (
    <div
      className={clsx(
        classStr,
        "flex-1 flex flex-col justify-between bg-white rounded-2xl px-4 p-2 sm:p-4"
      )}
    >
      <p className="text-[#8A8A8A] text-[10px] sm:text-xs lg:text-sm pb-2">
        {head}
      </p>
      <p
        style={{ color }}
        className="text-sm sm:text-base lg:text-lg leading-[1rem]"
      >
        {text}
      </p>
    </div>
  );
};
