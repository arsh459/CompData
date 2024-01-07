import clsx from "clsx";

interface Props {
  gotoComponent: () => void;
  text?: string;
}

const CYWBtn: React.FC<Props> = ({ gotoComponent, text }) => {
  return (
    <div
      className={clsx(
        "relative",
        "w-full py-2.5 px-4 flex justify-center items-center",
        "cursor-pointer text-white text-center",
        "bg-gradient-to-r from-[#FD6F6F] to-[#F19B38] rounded-xl"
      )}
      onClick={gotoComponent}
    >
      <p className="text-xl iphoneX:text-3xl">+</p>
      <p className="pl-4 text-sm iphoneX:text-xl">
        {text ? text : "Share custom workout"}
      </p>
    </div>
  );
};

export default CYWBtn;
