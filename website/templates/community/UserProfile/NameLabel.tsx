interface Props {
  name?: string;
  level: number;
}

const NameLabel: React.FC<Props> = ({ name, level }) => {
  return (
    <div className="">
      <p className="text-xl font-semibold text-gray-700">{name}</p>
      <div className="flex pt-1">
        <div className="bg-blue-500 px-2 py-1 rounded-md shadow-md">
          <p className="text-white font-semibold">{`Level ${level}`}</p>
        </div>
      </div>
    </div>
  );
};

export default NameLabel;
