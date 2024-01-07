import clsx from "clsx";
import { useEffect, useState } from "react";
import JoinBoatProgress from "./JoinBoatProgress";

interface Props {
  headText?: string;
  title?: string;
  onNext?: () => void;
  onBack?: () => void;
  current: number;
}

const JoinBoatWrapper: React.FC<Props> = ({
  children,
  headText,
  title,
  onNext,
  onBack,
  current,
}) => {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    setClicked(false);
  }, [title]);

  return (
    <div className="fixed inset-0 z-10 overflow-y-scroll scrollbar-hide bg-[#100F1A] text-[#F5F5F7] flex flex-col">
      <div className="flex items-center p-4">
        <img
          src={`https://ik.imagekit.io/socialboat/Vector_qeTUiyHTG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658904429443`}
          className="w-6 iphoneX:w-8 h-6 iphoneX:h-8 object-contain cursor-pointer"
          onClick={onBack}
          alt="backIcon"
        />
        <div className="flex-1 flex flex-col justify-center items-center">
          <h6 className="text-xs">{headText}</h6>
          <JoinBoatProgress current={current} total={7} />
        </div>
        <div className="w-6 iphoneX:w-8 h-6 iphoneX:h-8 opacity-0" />
      </div>
      <div className="flex-1 flex flex-col px-4 iphoneX:py-4">
        <h1 className="text-[#FF5970] text-xl iphoneX:text-3xl font-bold text-center py-4">
          {title}
        </h1>
        <div className="flex-1 flex flex-col iphoneX:py-4">{children}</div>
      </div>
      {onNext ? (
        <button
          className={clsx(
            "m-4 border border-[#FF93A2] rounded-lg font-medium iphoneX:text-xl p-3 iphoneX:p-4",
            clicked ? "bg-[#7D2834]" : "bg-[#FF556C]"
          )}
          onClick={() => {
            onNext && onNext();
            setClicked(true);
          }}
        >
          Next
        </button>
      ) : null}
    </div>
  );
};

export default JoinBoatWrapper;
