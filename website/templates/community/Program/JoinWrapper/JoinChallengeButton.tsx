interface Props {
  onClick: () => void;
  text: string;
}
const JoinChallengeButton: React.FC<Props> = ({ onClick, text }) => {
  return (
    <div
      className="bg-white shadow-md rounded-full px-4 py-2 cursor-pointer border-2"
      onClick={onClick}
    >
      <div>
        <p className="text-lg text-gray-700 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default JoinChallengeButton;
