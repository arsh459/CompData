import clsx from "clsx";
import { useEffect } from "react";
import { Animated, Pressable, Text } from "react-native";

export type menuItemsType = { text: string; callback?: () => void };

interface Props {
  visible: boolean;
  onClose: () => void;
  menuItems: menuItemsType[];
  menuColor?: string;
  menuItemsColor?: string;
  textStyle?: string;
}

const Menu: React.FC<Props> = ({
  visible,
  onClose,
  menuItems,
  menuColor,
  menuItemsColor,
  textStyle,
}) => {
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(-10);

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateY, {
        toValue: -10,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return menuItems.length && visible ? (
    <Animated.View
      className={clsx(
        "absolute top-full right-0 rounded-xl w-40 p-2 my-4",
        menuColor ? menuColor : "bg-stone-100"
      )}
      style={{
        opacity,
        transform: [{ translateY }],
        elevation: 100,
        zIndex: 100,
      }}
    >
      {menuItems.map((item, index) => (
        <Pressable
          key={item.text}
          className={clsx(
            "rounded-lg p-2",
            index === menuItems.length - 1 ? "" : "mb-2",
            menuItemsColor ? menuItemsColor : "bg-white"
          )}
          onPress={() => {
            item.callback && item.callback();
            onClose();
          }}
        >
          <Text className={clsx(textStyle, "capitalize")}>{item.text}</Text>
        </Pressable>
      ))}
    </Animated.View>
  ) : null;
};

export default Menu;
