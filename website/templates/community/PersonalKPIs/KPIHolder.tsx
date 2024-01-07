import clsx from "clsx";

interface Props {
  value?: number;
  text: string;
  img: string;
  onClick: () => void;
}

const KPIHolder: React.FC<Props> = ({ value, text, onClick, img }) => {
  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <div className="flex items-center">
        <p className="text-gray-600 text-center font-semibold text-xl">
          {value ? value : 0}
        </p>
        <div className="pl-2">
          <img alt="tick" className="w-10 h-10 object-cover" src={img} />
        </div>
      </div>
      <div className="cursor-pointer" onClick={onClick}>
        <p className={clsx("text-gray-500 text-center text-base", "underline")}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default KPIHolder;
