import clsx from "clsx";

interface Props {
  img: string;
  text: string;
  fontColor: string;
}

const GamesKPI: React.FC<Props> = ({ img, text, fontColor }) => {
  return (
    <div className="flex items-center">
      <img className={clsx("w-5 h-5 object-cover")} src={img} />
      <div className="pl-1">
        <p className={clsx("text-base font-medium", fontColor)}>{text}</p>
      </div>
    </div>
  );
};

export default GamesKPI;
