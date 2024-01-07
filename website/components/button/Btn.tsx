import clsx from "clsx";

interface Props {
  text: string;
  onClick: () => void;
  size?: "large";
  color1?: string;
  color2?: string;
}

const Btn: React.FC<Props> = ({ text, onClick, size, color1, color2 }) => {
  return (
    <div className="flex justify-center items-centers">
      <button
        className={clsx(
          "rounded-xl text-white text-center text-sm iphoneX:text-lg py-2.5 w-1/2 iphoneX:w-2/3 max-w-[300px]"
          // size === "large" ? "w-30 h-16" : "w-36 h-12"
        )}
        style={{
          background: `linear-gradient(270.25deg, ${
            color1 ? color1 : "#FD6F6F"
          } 0.19%, ${color2 ? color2 : "#F19B38"} 123.09%)`,
        }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Btn;
