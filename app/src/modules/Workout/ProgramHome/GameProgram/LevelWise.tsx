import { getLevelColorV2 } from "@utils/level/levelColor";
import { View, Pressable } from "react-native";
import RoundedCircleButton from "./RoundedCircleButton";
interface Props {
  selectedLevel: number;
  setLevel: (newLevel: number) => void;
}

const LevelWise: React.FC<Props> = ({ selectedLevel, setLevel }) => {
  return (
    <View className="flex items-center flex-row  py-2 w-full justify-evenly">
      {[1, 2, 3, 4, 5].map((lvl, index) => {
        return (
          <Pressable key={`${lvl}-${index}`} onPress={() => setLevel(lvl)}>
            <RoundedCircleButton
              bgColor={getLevelColorV2(lvl).color}
              ringColor={getLevelColorV2(lvl).color}
              text={`Lvl ${lvl}`}
              noRing={selectedLevel !== lvl}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default LevelWise;
