interface Props {
  onClick: () => void;
}

const TopHeader: React.FC<Props> = ({ onClick }) => {
  return (
    <div className=" bg-white p-2 px-4">
      <div className="flex items-center cursor-pointer" onClick={onClick}>
        <div className="pr-2">
          <img
            className="w-6 h-6 object-cover"
            src="https://img.icons8.com/ios-filled/100/000000/left.png"
          />
        </div>
        <div className="text-gray-700 text-base">Back</div>
      </div>
    </div>
  );
};

export default TopHeader;
