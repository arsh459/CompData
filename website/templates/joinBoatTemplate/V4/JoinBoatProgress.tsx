interface Props {
  current: number;
  total: number;
}

const JoinBoatProgress: React.FC<Props> = ({ current = 0, total = 0 }) => {
  return (
    <div className="w-48 iphoneX:w-60 aspect-[10/1] relative z-0 overflow-hidden my-1 iphoneX:my-2">
      <svg
        className="w-full h-full overflow-hidden"
        viewBox="0 0 180 18"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 0a1 1 0 00-1 1v16a1 1 0 001 1h178a1 1 0 001-1V1a1 1 0 00-1-1H1zm8 8a1 1 0 000 2h34a1 1 0 100-2H9zm63 1a1 1 0 011-1h34a1 1 0 010 2H73a1 1 0 01-1-1zm65-1a1 1 0 000 2h34a1 1 0 000-2h-34zM62 9a4 4 0 11-8 0 4 4 0 018 0zm60 4a4 4 0 100-8 4 4 0 000 8z"
          fill="#100F1A"
        />
      </svg>
      <div className="absolute inset-0 -z-20 px-1 py-1.5">
        <div className="w-full h-full bg-[#464646]" />
      </div>
      <div className="absolute inset-0 -z-10 px-1 py-1.5">
        <div
          className="h-full bg-[#FF5970] transition-all duration-500"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default JoinBoatProgress;
