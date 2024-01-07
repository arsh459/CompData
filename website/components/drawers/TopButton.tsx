interface Props {
  onTopButtonClick: () => void;
  topButtonText: string;
}

const TopButton: React.FC<Props> = ({ onTopButtonClick, topButtonText }) => {
  return (
    <div
      onClick={onTopButtonClick}
      className="pl-4 pr-4 p-2 bg-orange-500 hover:bg-orange-300 shadow-md hover:shadow-xl rounded-md"
    >
      <p className="pl-1 pr-1 font-semibold capitalize text-white">
        {topButtonText}
      </p>
    </div>
  );
};

export default TopButton;
