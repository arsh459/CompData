import ImageWithURL from "@components/ImageWithURL";
import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
// import useQuestCalendar from "@hooks/quest/useQuestCalendar";
import { View } from "react-native";
import { shallow } from "zustand/shallow";

const ToggleIcon = () => {
  const isVisible = useDietCalendar((state) => state.isVisible, shallow);

  return (
    <View className={`w-5`}>
      <ImageWithURL
        source={{
          uri: isVisible
            ? "https://ik.imagekit.io/socialboat/tr:w-30,c-maintain_ratio,fo-auto/Frame%201000001303%20(1)_YwWc9t9dHl.png?updatedAt=1697205122915"
            : "https://ik.imagekit.io/socialboat/tr:w-30,c-maintain_ratio,fo-auto/Frame%201000001303_I588Tq9jeS.png?updatedAt=1697202421998",
        }}
        className="w-full aspect-square"
      />
    </View>
  );
};
export default ToggleIcon;
