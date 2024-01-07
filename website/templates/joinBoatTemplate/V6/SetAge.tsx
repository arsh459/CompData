import { LocalUser } from "@hooks/joinBoat/V6/interface";

interface Props {
  localUser?: LocalUser;
  onAgeUpdate: (val: number) => void;
}

const SetAge: React.FC<Props> = ({ localUser, onAgeUpdate }) => {
  return (
    <div className="p-4 flex items-center my-4">
      <label className="w-[60%] font-popL text-lg iphoneX:text-xl whitespace-nowrap">
        My age is
      </label>
      <input
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        className="w-[40%] p-4 bg-[#343150] font-popL text-white text-center text-lg iphoneX:text-xl rounded-xl"
        value={localUser?.age || ""}
        onChange={(e) => onAgeUpdate(parseInt(e.target.value))}
        placeholder="24"
      />
    </div>
  );
};

export default SetAge;
