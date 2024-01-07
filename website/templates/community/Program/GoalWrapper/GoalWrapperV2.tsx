interface Props {
  text: string;
}

const GoalWrapperV2: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <p className="text-gray-700 font-semibold text-xl">
        Goal of the Challenge
      </p>
      <p className="text-gray-500">{text}</p>
    </div>
  );
};

export default GoalWrapperV2;
