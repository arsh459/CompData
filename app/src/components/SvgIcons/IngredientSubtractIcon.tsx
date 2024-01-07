import * as React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";
interface Props {
  color?: string;
}
const IngredientSubtractIcon: React.FC<Props> = ({ color }) => (
  <>
    <View className="">
      <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
        <Circle cx={10} cy={10} r={10} fill={color ? color : "#6D55D1"} />
      </Svg>
      <View style={styles.centeredChild}>
        <Svg width={12} height={2} viewBox="0 0 12 2" fill="none">
          <Rect
            width={12}
            height={2}
            rx={1}
            transform="matrix(1 0 0 -1 0 2)"
            fill="white"
          />
        </Svg>
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredChild: {
    position: "absolute",
    top: "45%",
    left: "20%",
  },
});
export default IngredientSubtractIcon;
