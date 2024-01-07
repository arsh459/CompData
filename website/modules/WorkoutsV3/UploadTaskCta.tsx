interface Props {
  onClick: () => void;
  text?: string;
}

const UploadTaskCta: React.FC<Props> = ({ onClick, text }) => {
  return (
    <button
      className="mx-auto bg-gradient-to-r from-[#F88456] to-[#F29C39] flex justify-center items-center px-8 iphoneX:px-10 py-2 iphoneX:py-4 rounded-xl"
      onClick={onClick}
    >
      <img
        src={`https://ik.imagekit.io/socialboat/Group_356_rVoCqMAyqi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656071305562`}
        alt="camera icon"
        className="w-4 iphoneX:w-6"
      />
      <span className="pl-2.5 iphoneX:text-2xl text-white">
        {text ? text : "Start Workout"}
      </span>
    </button>
  );
};

export default UploadTaskCta;
