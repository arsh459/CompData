import clsx from "clsx";
import { View, Text } from "react-native";
import QuestLockedIcon from "./QuestLockedIcon";

interface Props {
  progress: number;
  textStyle?: string;
  text?: string;
  inLineStyleObject?: { [ingKey: string]: string | number };
  showLockIcon?: boolean;
}
const QuestProgressChildComp: React.FC<Props> = ({
  progress,
  textStyle,
  inLineStyleObject,
  text,
  showLockIcon,
}) => {
  return (
    <View className="flex flex-row items-center justify-center">
      {showLockIcon ? (
        <>
          <View className="flex items-center justify-center mr-1">
            <View className="w-3 h-3">
              <QuestLockedIcon />
            </View>
          </View>
        </>
      ) : (
        <></>
      )}

      <View className="flex items-center justify-center">
        <Text
          className={clsx(
            "text-center  h-fit leading-none",
            progress > 0.5 ? "text-[#934400]" : " text-white/40 ",
            `text-xs`,
            textStyle ? textStyle : ""
          )}
          style={
            inLineStyleObject
              ? inLineStyleObject
              : { fontFamily: "Nunito-Regular", padding: 2 }
          }
        >
          {text ? text : ""}
        </Text>
      </View>
    </View>
  );
};
export default QuestProgressChildComp;
