import BackIcon from "public/icons/BackIcon";

interface Props {
  onBack: () => void;
  heading: string;
  freeDaysLeft?: number;
}

const HeaderProgram: React.FC<Props> = ({ onBack, heading, freeDaysLeft }) => {
  return (
    <div className="flex items-center p-4">
      <div onClick={onBack} className="cursor-pointer">
        <BackIcon
          style={{
            height: "25",
            width: "25",
            fill: "#000",
          }}
        />
      </div>
      <div className="pl-2">
        <p className="text-2xl  text-gray-700 font-medium">{heading}</p>
        {freeDaysLeft ? (
          <p className="text-red-700 font-medium">
            {`${freeDaysLeft} ${freeDaysLeft === 1 ? `Day` : `Days`} Left`} to
            try
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default HeaderProgram;
