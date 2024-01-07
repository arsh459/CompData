import { dataAddEnergy } from "../constants";
import { getIconByEnergy } from "./utils";

interface Props {
  selectedValue: number;
  handleValueSelect: (value: number) => void;
}
const EnergyIconToAdd: React.FC<Props> = ({
  selectedValue,
  handleValueSelect,
}) => {
  return (
    <div className="flex-1 ">
      <div className="flex flex-row items-center justify-between p-1.5">
        {dataAddEnergy.map((i, index) => (
          <div
            key={index}
            style={{
              backgroundColor:
                selectedValue === i.energy ? "#96617D" : "#FFE4F2",
            }}
            className="flex-1 flex flex-col py-2 rounded-lg items-center cursor-pointer justify-around mx-2 aspect-[97/129] "
            onClick={() => handleValueSelect(i.energy)}
          >
            <img
              src={getIconByEnergy(i.energy, true).icon}
              className="aspect-[30/60] w-1/3 "
            />
            <p
              style={{
                color: selectedValue === i.energy ? "#FFE4F2" : "#96617D",
              }}
              className="capitalize text-xs px-1.5  text-center"
            >
              {i.energyType}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyIconToAdd;
