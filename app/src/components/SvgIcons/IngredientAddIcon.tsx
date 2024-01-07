import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { View, StyleSheet } from "react-native";
interface Props {
  color?: string;
}
const IngredientAddIcon: React.FC<Props> = ({ color }) => (
  <>
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Circle cx={10.5} cy={10.5} r={10.5} fill={color ? color : "#6D55D1"} />
    </Svg>
    <View style={styles.centeredChild}>
      <Svg width={11} height={11} viewBox="0 0 11 11" fill="none">
        <Path
          d="M5.5 10V5.5M5.5 5.5V1M5.5 5.5H10M5.5 5.5H1"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
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
    top: "25%",
    left: "24%",
  },
});

export default IngredientAddIcon;
