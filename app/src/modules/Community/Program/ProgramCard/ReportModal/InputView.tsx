import CloseBtn from "@components/Buttons/CloseBtn";
import SvgIcons from "@components/SvgIcons";
import TextField from "@components/TextField";
import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  text: string;
  setText: (val: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  target?: string;
  action: "Block" | "Report";
}

const InputView: React.FC<Props> = ({
  onCancel,
  text,
  setText,
  onSubmit,
  target,
  action,
}) => {
  return (
    <View className="p-4">
      <View className="flex flex-row justify-between items-center">
        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="text-[#FFFFFF] text-2xl capitalize"
        >
          {action} {target ? target : "Content"}
        </Text>

        <CloseBtn classStr="w-5 h-5" color="white" onClose={onCancel} />
      </View>

      <View className="py-4">
        <TextField
          text={text}
          onChange={(val) => {
            setText(val);
          }}
          multiline={true}
          placeHolder={text ? "" : "Please explain the issue"}
          roundStr="rounded-lg"
          bgColor="bg-[#4E497D]"
          frezePlaceHolder={true}
        />
      </View>

      <TouchableOpacity
        onPress={onSubmit}
        disabled={text.length <= 0}
        className={clsx(
          "rounded-lg border-[1px] border-[#D15555] flex flex-row justify-center items-center p-2",
          text.length > 0 ? "bg-[#D15555]" : "bg-transparent"
        )}
      >
        <View className="w-5 aspect-square mr-3">
          <SvgIcons iconType="report" color="#FFFFFF" />
        </View>

        <Text
          style={{ fontFamily: "Nunito-Bold" }}
          className="font-medium text-xl text-center text-white"
        >
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputView;
