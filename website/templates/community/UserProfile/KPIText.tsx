interface Props {
  label: string;
  value: string;
}

const KPIText: React.FC<Props> = ({ label, value }) => {
  return (
    <div className="">
      <div>
        <p className="text-gray-700 text-lg font-semibold text-left">{value}</p>
      </div>
      <div className="cursor-pointer">
        <p className="text-gray-500 font-semibold text-sm text-left">{label}</p>
      </div>
    </div>
  );
};

export default KPIText;
