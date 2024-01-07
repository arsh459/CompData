import clsx from "clsx";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  disabled?: boolean;
  onNext: () => void;
  nextBtnText?: string;
}

const ClickButton: React.FC<Props> = ({ disabled, onNext, nextBtnText }) => {
  return (
    <TouchableOpacity
      className={clsx(
        "rounded-2xl px-4 py-3 w-full",
        disabled ? "bg-[#6D55D1]/20" : "bg-[#6D55D1]"
      )}
      onPress={onNext}
      disabled={disabled}
    >
      <Text
        className={clsx(
          disabled ? "text-white/40" : "text-white ",
          " text-base iphoneX:text-xl text-center"
        )}
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {nextBtnText ? nextBtnText : "Next"}
      </Text>
    </TouchableOpacity>
  );
};

export default ClickButton;
