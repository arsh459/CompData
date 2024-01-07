import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import { useCurrentPeriodStore } from "../store/periodStore";
import { format } from "date-fns";
import clsx from "clsx";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";

interface Props {
  onClose: () => void;
}

const PreviousCycleList: React.FC<Props> = ({ onClose }) => {
  const { todayUnix } = useTodayDate();
  const cycles = useCurrentPeriodStore((state) => state.cyclesArray);

  return (
    <div className="w-11/12 sm:w-1/2 aspect-[9/16] sm:aspect-[16/9] mx-auto">
      <div className="flex justify-between items-center px-6 pb-2">
        <p
          className="text-base text-[#242424]"
          style={{
            fontFamily: "Nunito-Bold",
          }}
        >
          Previous Cycles
        </p>

        <CloseBtn onCloseModal={onClose} color="#242424" />
      </div>

      <div className="h-full bg-[#FFF6FB] px-4 mx-4 rounded-2xl overflow-y-scroll">
        {cycles.map((item, index) => {
          const predictedCycle = item.startUnix > todayUnix;
          const currentCycle =
            todayUnix >= item.startUnix && todayUnix <= item.endUnix;

          const { id, length, startUnix, endUnix, status } = item;
          const title = currentCycle ? `Current Cycle` : `Previous Cycle`;

          if (predictedCycle) {
            return null;
          }

          return (
            <div
              key={id}
              className={clsx(
                "flex justify-between py-5",
                index !== 0 && "border-t border-[#2D2D2D]/20"
              )}
            >
              <div>
                <p className="text-sm text-[#242424] font-nunitoM">{title}</p>
                <p className="text-xs text-[#232323CC] pt-1 font-nunitoR">
                  {startUnix ? format(new Date(startUnix), "do MMM yy") : ""}
                  {"  "}-{"  "}
                  {format(new Date(endUnix), "do MMM yy")}
                </p>
              </div>

              <div>
                <p
                  className="text-sm text-[#242424] font-nunitoR"
                  style={{
                    color: status === "regular" ? "#30E763" : "#FFAA29",
                  }}
                >
                  {length} days
                </p>
                <p className="text-xs text-[#555555] capitalize text-right font-nunitoR">
                  {status}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreviousCycleList;
