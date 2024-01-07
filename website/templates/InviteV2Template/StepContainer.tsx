interface Props {
  heading: string;
  text?: string;
}

const StepContainer: React.FC<Props> = ({ text, heading }) => {
  return (
    <div className="flex-1 mx-auto flex flex-col justify-center items-end px-8">
      <div className="w-full sm:w-4/5 lg:w-2/3 flex flex-col">
        <span className="text-white font-popR text-baase sm:text-xl lg:text-2xl pb-3 md:pb-5">
          {heading}
        </span>
        <p className="text-white/60 font-popR text-xl sm:text-2xl lg:text-3xl">
          {text}
        </p>
      </div>
    </div>
  );
};

export default StepContainer;
