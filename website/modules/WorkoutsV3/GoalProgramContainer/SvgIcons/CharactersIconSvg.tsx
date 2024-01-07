interface Props {
  color?: string;
}

const CharactersIconSvg: React.FC<Props> = ({ color }) => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 96 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M96 29H84a4.005 4.005 0 01-4-4V5a4.004 4.004 0 014-4h12v4H84v20h12v4zM76 7a6.006 6.006 0 00-6-6H60v28h10a6.006 6.006 0 006-6v-4a5.954 5.954 0 00-1.56-4A5.954 5.954 0 0076 11V7zM64 5h6a2.002 2.002 0 012 2v4a2.002 2.002 0 01-2 2h-6V5zm8 18a2 2 0 01-2 2h-6v-8h6a2 2 0 012 2v4zM52 1h-8a4.004 4.004 0 00-4 4v24h4V19h8v10h4V5a4.004 4.004 0 00-4-4zm-8 14V5h8v10h-8zM22.707.293a1 1 0 00-1.414 0l-6.364 6.364a1 1 0 001.414 1.414L22 2.414l5.657 5.657a1 1 0 101.414-1.414L22.707.293zM23 29V1h-2v28h2zM7.293 29.707a1 1 0 001.414 0l6.364-6.364a1 1 0 00-1.414-1.414L8 27.586l-5.657-5.657A1 1 0 00.93 23.343l6.364 6.364zM7 1v28h2V1H7z"
        fill={color ? color : "#FFF"}
      />
    </svg>
  );
};

export default CharactersIconSvg;
