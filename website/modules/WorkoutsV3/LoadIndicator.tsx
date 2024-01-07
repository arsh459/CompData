interface Props {
  color?: string;
}

const LoadIndicator: React.FC<Props> = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1"
        stroke={color ? color : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="origin-center animate-spin"
      />
      <path
        d="M18.6 12C18.6 8.35492 15.6451 5.39999 12 5.39999C8.35492 5.39999 5.39999 8.35492 5.39999 12C5.39999 15.6451 8.35492 18.6 12 18.6"
        stroke={color ? color : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="origin-center animate-spin"
      />
    </svg>
  );
};

export default LoadIndicator;
