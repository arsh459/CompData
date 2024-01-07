import clsx from "clsx";

interface Props {
  HWString?: string;
}

const CircleComp: React.FC<Props> = ({ children, HWString }) => {
  return (
    <div
      className={clsx(
        HWString ? HWString : "w-full h-screen",
        "max-w-screen-xl mx-auto flex justify-center items-center"
      )}
    >
      <div
        className={clsx(
          HWString ? HWString : "w-3/5 max-w-[512px]",
          "aspect-1 rounded-full bg-gradient-to-tl from-white to-[#4F1594] p-1"
        )}
      >
        <div className="w-full aspect-1 border-4 border-[#4F1594] rounded-full bg-gradient-to-br from-white to-[#4F1594] p-1">
          <div
            className="w-full aspect-1 bg-[#4F1594] rounded-full flex justify-center items-center relative z-0"
            style={{ boxShadow: "inset 0px 0px 78px 33px #3B2068" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleComp;
