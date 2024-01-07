import { formatWithCommas } from "@utils/number";
import clsx from "clsx";

interface Props {
  headText?: string;
  showImg?: boolean;
  onClick?: () => void;
  cost?: number;
  moneyBackDays?: number;
  freeTrialDays?: number;
}

const LockedProgramWrapper: React.FC<Props> = ({
  children,
  headText,
  showImg,
  onClick,
  cost,
  moneyBackDays,
  freeTrialDays,
}) => {
  return (
    <>
      <div
        className={clsx(
          "px-12 iphoneX:px-16 h-16 iphoneX:h-20 flex items-center",
          "max-w-md mx-auto fixed top-0 left-0 right-0 z-30 pointer-events-none",
          showImg && "bg-black"
        )}
      >
        <h1 className="text-xl iphoneX:text-2xl font-extrabold line-clamp-1">
          {headText}
        </h1>
      </div>
      {children}
      <div className="h-16 iphoneX:h-20" />
      <div
        className="max-w-md mx-auto fixed bottom-0 left-0 right-0 bg-[#1D1D1D]/20 backdrop-blur-xl flex p-2 iphoneX:p-4 h-16 iphoneX:h-20 border-y border-[#AFAFAF]/75"
        style={{
          boxShadow: "0px 0px 22px #96A7FF",
        }}
      >
        <div className="flex-1 flex-col flex justify-center text-center">
          <p className="font-bold text-base iphoneX:text-lg">
            {cost ? `Rs ${formatWithCommas(cost)}` : "Free"}
          </p>
          {/* <br /> */}

          <span className="text-sm font-medium">
            {freeTrialDays
              ? `${freeTrialDays} day Free Trial`
              : moneyBackDays
              ? `${moneyBackDays} day money back`
              : "Your Entry Bet"}
          </span>
        </div>
        <button
          className="flex-1 font-bold text-center bg-[#EF6275] rounded-xl"
          onClick={onClick}
        >
          Join The Game
        </button>
      </div>
      <div className="fixed inset-0 -z-10 max-w-md mx-auto overflow-hidden">
        <div
          className={clsx(
            "h-full aspect-1 relative left-1/2 -translate-x-1/2 translate-y-1/2",
            "rounded-full blur transition-transform duration-1000"
          )}
          style={{
            background:
              "radial-gradient(70% 70% at 50% 50%, rgba(150, 167, 255, 0.5) 0%, rgba(0, 0, 0, 0) 80%)",
          }}
        />
      </div>
    </>
  );
};

export default LockedProgramWrapper;
