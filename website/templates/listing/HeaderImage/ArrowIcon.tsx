interface Props {
  onClick: () => void;
  arrow: "left" | "right";
}

const leftArrow = "https://img.icons8.com/ios-glyphs/30/000000/left.png";
const rightArrow = "https://img.icons8.com/ios-glyphs/30/000000/right--v3.png";

const ArrowIcon: React.FC<Props> = ({ onClick, arrow }) => {
  return (
    <div
      className="bg-white p-2 py-4 flex justify-center items-center rounded-full cursor-pointer"
      onClick={onClick}
    >
      <img
        src={arrow === "left" ? leftArrow : rightArrow}
        className="w-4 h-4 object-cover"
      />
    </div>
  );
};

export default ArrowIcon;
