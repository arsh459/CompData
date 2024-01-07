import CirclePercentV2 from "@components/CirclePercent/CirclePercentV2";
import { arrowRightWhite } from "@constants/icons/iconURLs";
import { Badge } from "@models/Prizes/PrizeV2";
import Link from "next/link";

interface Props {
  badge?: Badge;
  route?: string;
  btnText?: string;
  coachRef: string;
}

const Stickybottom: React.FC<Props> = ({ badge, route, btnText, coachRef }) => {
  const percent: number =
    (badge?.slotBooked || 0) / (badge?.totalSlots || 0) || 0;

  return badge && route ? (
    <div className="sticky bottom-0 z-10 w-full">
      <div className="w-full max-w-screen-lg mx-auto flex">
        <Link href={coachRef ? `/plans?${coachRef}` : "/plans"} passHref>
          <div className="bg-white/10 px-6 py-1 rounded-t-xl backdrop-blur-3xl flex justify-center items-center">
            <p className="text-base">
              Annual Plan @ Rs. {badge.planType === "proPlus" ? "1667" : "750"}
              /month
            </p>
            <img
              src={arrowRightWhite}
              alt="arrow right white"
              className="w-2 aspect-1 object-contain ml-3"
            />
          </div>
        </Link>
      </div>
      <div className="bg-white/95 backdrop-blur-2xl">
        <div className="w-full max-w-screen-lg mx-auto flex flex-col sm:flex-row justify-between sm:items-center gap-2 py-4">
          <h6 className="text-[#262626CC] text-base sm:text-xl lg:text-2xl font-qsB px-4">
            {badge.name}
          </h6>
          <div className="sm:hidden w-full h-px bg-black/20" />
          <div className="flex justify-between items-center gap-6 px-4">
            <div className="flex justify-center items-center gap-2">
              <CirclePercentV2
                circleSize={36}
                percent={percent}
                activeColor="#FF33A1"
                inactiveColor="#FF33A133"
              />
              <span className="text-black text-xs">
                {`${percent * 100}% Slots`}
                <br />
                booked
              </span>
            </div>
            <Link passHref href={route}>
              <button className="rounded-full backdrop-blur-lg px-4 py-2 bg-[#FF33A1] text-xs sm:text-sm lg:text-base font-popM">
                {btnText ? btnText : "Get free trial"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Stickybottom;
