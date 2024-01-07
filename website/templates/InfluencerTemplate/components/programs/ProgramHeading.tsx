interface Props {
  title?: string;
}
const ProgramHeading: React.FC<Props> = ({ title }) => {
  return (
    <div className="-mb-12">
      <h2 className="w-full font-nunitoSB text-center text-white text-3xl sm:text-4xl lg:text-5xl my-12 ">
        {title}
      </h2>
    </div>
  );
};

export default ProgramHeading;
