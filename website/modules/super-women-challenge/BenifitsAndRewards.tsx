import { BenefitInterface } from "@models/Event/Round";

import clsx from "clsx";

interface Props {
  benifits?: BenefitInterface[];
}

const BenifitsAndRewards: React.FC<Props> = ({ benifits }) => {
  return (
    <div className="w-screen  max-w-screen-xl mx-auto relative z-0 mt-36 ">
      {benifits && benifits?.length > 0 && (
        <div className="w-full sm:w-[70%] lg:w-5/6  mx-auto px-4 flex flex-col">
          <div className="h-20 sm:h-40" />
          <h2
            className={clsx(
              "font-pJSSB text-center xs:text-[28px] sm:text-4xl lg:text-5xl",
              "bg-clip-text text-[#DCCBFF]",
              "w-full xs:px-2 sm:px-4 xs:mb-2 sm:mb-8 lg:mb-16 py-2",
              "block opacity-100"
            )}
          >
            Benefits and Rewards
          </h2>

          <div
            className={`grid lg:${
              benifits.length < 5
                ? `grid-cols-${benifits?.length}`
                : "grid-cols-4"
            } md:${
              benifits.length < 3
                ? `grid-cols-${benifits?.length}`
                : "grid-cols-2"
            }  xs:grid-cols-2 sm:${
              benifits.length < 2
                ? `grid-cols-${benifits?.length}`
                : "grid-cols-2"
            } gap-4 mt-16 `}
            style={{ alignContent: "flex-start" }}
          >
            {benifits?.length &&
              benifits.map((benifit, index) => {
                return (
                  <div className="flex flex-col m-auto h-full" key={index}>
                    <div className="xs:w-36 xs:h-36 sm:w-48 sm:h-48 bg-[#ffffff26] p-6 flex items-center justify-center rounded-[12px] mb-4">
                      <img
                        src={
                          benifit.img.url
                            ? benifit.img.url
                            : "https://ik.imagekit.io/socialboat/Frame%201000001118_Fab9Hda41.png?updatedAt=1696600635982"
                        }
                        className="w-full object-contain "
                      />
                    </div>
                    <div className="xs:w-36 sm:w-48 font-pJSL text-[##ffffff99] font-light xs:text-xs sm:text-lg  text-center m-auto">
                      {benifit.text ? benifit.text : ""}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BenifitsAndRewards;
