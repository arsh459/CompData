interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onPress }) => {
  return (
    <div
      className="flex flex-row items-center justify-between"
      onClick={onPress}
    >
      <p
        className="text-base iphoneX:text-lg text-white capitalize"
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        {label}
      </p>
      <div
        className={`w-6 h-6 rounded-full border-[1px] flex items-center justify-center ${
          checked ? "bg-white" : "bg-[#343150] border-white"
        }`}
      >
        {checked ? <p className="text-[#2FB55C] text-sm">✓</p> : null}
      </div>
    </div>
  );
};
export default Checkbox;
