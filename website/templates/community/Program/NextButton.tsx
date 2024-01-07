interface Props {
  onClick: () => void;
  text?: string;
}

const NextButton: React.FC<Props> = ({ onClick, text }) => {
  return (
    <div>
      <div className="border p-2 cursor-pointer w-full" onClick={onClick}>
        <p className="text-blue-500 text-center font-semibold text-lg capitalize">
          {text ? text : "Show More"}
        </p>
      </div>
    </div>
  );
};

export default NextButton;
