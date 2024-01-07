interface Props {
  color?: string;
}

const SentencesphyIconSvg: React.FC<Props> = ({ color }) => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 107 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.707 1.293a1 1 0 00-1.414 0l-6.364 6.364a1 1 0 001.414 1.414L22 3.414l5.657 5.657a1 1 0 101.414-1.414l-6.364-6.364zM23 30V2h-2v28h2zM7.293 30.707a1 1 0 001.414 0l6.364-6.364a1 1 0 00-1.414-1.414L8 28.586l-5.657-5.657A1 1 0 00.93 24.343l6.364 6.364zM7 2v28h2V2H7z"
        fill={color ? color : "#FFF"}
      />
      <path
        d="M38 2h69M38 16h69M38 30h46"
        stroke={color ? color : "#FFF"}
        strokeWidth={3}
      />
    </svg>
  );
};

export default SentencesphyIconSvg;
