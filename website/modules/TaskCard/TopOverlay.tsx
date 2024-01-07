interface Props {
  textWhite: string;
  textPrimary: string;
}

const TopOverlay: React.FC<Props> = ({
  textWhite,
  // userLevel,
  //   taskStatus,
  //   unlocksNext,
  //   isLocked,
  textPrimary,
}) => {
  // console.log("loading", userStreams, loading);

  return (
    <div className="w-full flex justify-center items-start absolute h-1/4 rounded-t-2xl left-0 right-0  bg-gradient-to-b from-smoke-750 to-transparent z-50">
      <div className="mt-2 flex items-center justify-center">
        <p className="text-sm text-white">{textWhite}</p>
        <p className="text-sm text-red-400 pl-1">{textPrimary}</p>
      </div>
    </div>
  );
};

export default TopOverlay;
