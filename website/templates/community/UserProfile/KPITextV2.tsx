interface Props {
  label: string;
  value: string;
}

const KPITextV2: React.FC<Props> = ({ label, value }) => {
  return (
    <div className="">
      <div>
        <p className="text-gray-500 text-base font-medium text-center">
          {value}
        </p>
      </div>
      <div className="cursor-pointer">
        <p className="text-gray-700 font-bold text-base text-center">{label}</p>
      </div>
    </div>
  );
};

export default KPITextV2;
