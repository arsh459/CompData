import { ButtonInterface } from "@models/User/questionResponseInterface ";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  buttons: ButtonInterface[];
  onClickCta: (targetBtn: ButtonInterface) => void;
  filled?: boolean;
}

const Buttons: React.FC<Props> = ({ buttons, onClickCta, filled }) => {
  return buttons?.length ? (
    <View
      className="flex gap-4 pt-4"
      style={{ flexDirection: buttons.length === 2 ? "row" : "column" }}
    >
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.text}
          onPress={() => onClickCta(button)}
          className="rounded-xl border border-[#6D55D1]"
          style={{
            backgroundColor: filled ? "#6D55D1" : "#FFFFFF",
            paddingVertical: buttons.length === 2 ? 8 : 10,
            flex: buttons.length === 2 ? 0.5 : undefined,
          }}
        >
          <Text
            className="text-center"
            style={{
              fontFamily: "Nunito-Bold",
              color: filled ? "#FFFFFF" : "#6D55D1",
            }}
          >
            {button.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  ) : null;
};

export default Buttons;
