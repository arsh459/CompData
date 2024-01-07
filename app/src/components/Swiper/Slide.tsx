import { View } from "react-native";

interface Props {
  children: React.ReactNode;
  slideWidth: number;
  spaceBetween?: number;
}

const Slide: React.FC<Props> = ({ children, slideWidth, spaceBetween }) => {
  return (
    <View
      style={{
        width: slideWidth,
        marginHorizontal: (spaceBetween ? spaceBetween : 0) / 2,
      }}
    >
      {children}
    </View>
  );
};

export default Slide;
