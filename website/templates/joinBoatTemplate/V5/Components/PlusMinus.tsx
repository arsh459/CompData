import clsx from "clsx";

interface Props {
  current: number;
  onChange: (val: number) => void;
  currStr?: string;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
  vertical?: boolean;
  btnRounded?: string;
}

const PlusMinus: React.FC<Props> = ({
  current,
  onChange,
  currStr,
  step,
  min,
  max,
  unit,
  vertical,
  btnRounded,
}) => {
  const text = currStr ? currStr : `${current} ${unit}`;

  return (
    <div
      className={clsx(
        "flex  justify-center items-center",
        vertical ? "flex-col-reverse" : "flex-row"
      )}
    >
      <button
        className={clsx(
          "bg-[#343150] p-2.5 cursor-pointer aspect-1",
          btnRounded ? btnRounded : "rounded-full"
        )}
        onClick={() => onChange(current - (step ? step : 1))}
        disabled={current <= (min ? min : 0)}
      >
        <img
          src="https://ik.imagekit.io/socialboat/Vector_JkTHqMX5j.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666006052058"
          alt=""
          className="w-4 iphoneX:w-6 aspect-1 object-contain "
        />
      </button>
      <div className="w-4" />
      <div
        className="bg-[#343150] rounded-2xl flex flex-row justify-center items-center my-2 py-2"
        style={
          {
            // width: (currStr ? 4 : text.length) * (width >= iPhoneX ? 24 : 20),
          }
        }
      >
        <p className="text-white px-8 text-xl iphoneX:text-2xl font-baib">
          {text}
        </p>
      </div>
      <div className="w-4" />
      <button
        className={clsx(
          "bg-[#343150] p-2.5 cursor-pointer aspect-1",
          btnRounded ? btnRounded : "rounded-full"
        )}
        onClick={() => onChange(current + (step ? step : 1))}
        disabled={current >= (max ? max : 100)}
      >
        <img
          src="https://ik.imagekit.io/socialboat/Vector_4LJpdloPxm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666006035966"
          alt=""
          className="w-4 iphoneX:w-6 aspect-1 object-contain"
        />
      </button>
    </div>
  );
};

export default PlusMinus;
