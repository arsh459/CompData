import clsx from "clsx";

interface Props {
  color: "bg-green-500" | "bg-yellow-500";
  text: string;
  //   textWhite: string;
  //   textPrimary: string;
}

const DotLabel: React.FC<Props> = ({
  color,
  //   textWhite,
  //   textPrimary,
  // userLevel,
  //   taskStatus,
  //   unlocksNext,
  //   isLocked,
  text,
}) => {
  // console.log("loading", userStreams, loading);

  return (
    <div
      className="w-full flex justify-center items-start absolute h-1/4 top-0 rounded-t-2xl left-0 right-0 bg-gradient-to-b to-transparent from-smoke-750 z-50"
      // className="w-full flex justify-center items-start absolute h-full top-0 rounded-b-2xl left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-smoke-750 z-50"
    >
      <div>
        <div className="mt-2 flex items-center justify-center">
          <div className={clsx("w-2 h-2 rounded-full", color)} />
          <p className="text-xs pl-1 text-white">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default DotLabel;
