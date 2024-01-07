interface Props {
  onClick: () => void;
}
const ViewResult: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      className="flex justify-center items-center bg-white/40 backdrop-blur-2xl border border-[#F1F1F1] rounded-full px-2 py-0.5 iphoneX:px-3 iphoneX:py-1"
      onClick={onClick}
    >
      <img
        src={`https://ik.imagekit.io/socialboat/Group__1__0lpeDnE_5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659168275789`}
        className="w-2.5 h-2.5 iphoneX:w-3 iphoneX:h-3 object-contain mr-1 iphoneX:mr-2"
        alt="file icon"
      />
      <p className="text-sm text-white whitespace-nowrap">View Results</p>
    </button>
  );
};

export default ViewResult;
