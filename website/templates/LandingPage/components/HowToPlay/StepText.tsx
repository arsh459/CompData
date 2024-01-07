interface Props {
  lightText: string;
  boldText: string;
}

const StepText: React.FC<Props> = ({ lightText, boldText }) => {
  return (
    <div>
      <p className="text-gray-300 text-5xl font-montL font-extralight text-center">
        {lightText}
      </p>
      <p className="text-5xl pt-1 text-center font-mont text-white">
        {boldText}
      </p>
    </div>
  );
};

export default StepText;
