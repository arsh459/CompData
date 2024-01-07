interface Props {
  label: string;
  count: string;
}

const InventoryElement: React.FC<Props> = ({ count, label }) => {
  return (
    <div className="text-[#383838] text-center flex flex-col justify-center items-center">
      <p className="text-lg">{count ? count : "-"}</p>
      <p className="font-semibold">{label}</p>
    </div>
  );
};

export default InventoryElement;
