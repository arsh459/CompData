interface Props {
  equipmentString?: string;
}

const EquipmentRequired: React.FC<Props> = ({ equipmentString }) => {
  return equipmentString ? (
    <div className="bg-black/30 p-4 rounded-2xl flex items-center">
      <p className="text-white/60 text-base sm:text-xl font-sans py-3">
        <span className="font-bold">Equipment needed: </span>
        {equipmentString}
      </p>
    </div>
  ) : null;
};

export default EquipmentRequired;
