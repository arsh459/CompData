interface Props {
  text: string;
  subtext: string;
  img: string;
  isAtStake: boolean;
}

const PrizeBadge: React.FC<Props> = ({ text, subtext, img, isAtStake }) => {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer w-32">
      <img className="w-16 sm:w-12 h-16 sm:h-12 object-cover" src={img} />

      <div className="flex justify-center items-center">
        <p className="text-base sm:text-base text-gray-700">{text}</p>
        {isAtStake ? (
          <div className="pl-1">
            <div className="px-1 py-1 bg-green-500 rounded-full shadow-sm"></div>
          </div>
        ) : null}
      </div>

      <p className="text-sm text-gray-500 font-medium text-center line-clamp-1 truncate">
        {subtext}
      </p>
    </div>
  );
};

export default PrizeBadge;
