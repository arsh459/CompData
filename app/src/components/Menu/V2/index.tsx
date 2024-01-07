import { paramsType } from "@components/OnboardPopup/utils";
import UseModal from "@components/UseModal";
import clsx from "clsx";
import { useRef, useState } from "react";
import {
  ColorValue,
  Dimensions,
  FlexStyle,
  Pressable,
  Text,
  View,
} from "react-native";

type positionType = "left-top" | "left-bottom" | "right-top" | "right-bottom";

export type menuItemsType = {
  text: string;
  callback?: () => void;
  textStyle?: string;
};

const { width, height } = Dimensions.get("window");

interface Props {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  menuItems: menuItemsType[];
  menuColor?: string;
  menuItemsColor?: string;
  textStyle?: string;
  position?: positionType;
  separate?: boolean;
  gap?: number;
  itemSeperatorColor?: ColorValue;
  blurAmount?: number;
  fallbackColor?: string;
}

const MenuV2: React.FC<Props> = ({
  children,
  visible,
  onClose,
  menuItems,
  menuColor,
  menuItemsColor,
  textStyle,
  position,
  separate,
  gap,
  itemSeperatorColor,
  blurAmount,
  fallbackColor,
}) => {
  const menuCtaRef = useRef<View>(null);
  const [menuParam, setMenuParam] = useState<paramsType>();

  const getMenuParam = () => {
    if (menuCtaRef.current) {
      menuCtaRef.current.measure((fx, fy, width, height, px, py) => {
        setMenuParam({ fx, fy, width, height, px, py });
      });
    }
  };

  return (
    <>
      <View ref={menuCtaRef} collapsable={false} onLayout={getMenuParam}>
        {children}
      </View>
      <UseModal
        visible={!!menuItems.length && !!menuParam && visible}
        onClose={onClose}
        width="w-full"
        height="h-full"
        tone="dark"
        blurAmount={blurAmount}
        fallbackColor={fallbackColor}
      >
        <Pressable
          onPress={onClose}
          className="absolute left-0 right-0 top-0 bottom-0 z-"
        />
        <View
          className={clsx(
            "overflow-hidden",
            menuColor ? menuColor : "bg-stone-100"
          )}
          style={{
            position: "absolute",
            ...getPosition(position, menuParam, gap, separate),
          }}
        >
          {(position === "left-bottom" ||
            position === "right-bottom" ||
            !position) &&
          !separate
            ? children
            : null}
          {menuItems.map((item, index) => (
            <Pressable
              key={item.text}
              className={clsx(
                "p-2",
                menuItemsColor ? menuItemsColor : "bg-white",
                itemSeperatorColor
                  ? separate && index === 0
                    ? ""
                    : "border-t"
                  : ""
              )}
              onPress={() => {
                item.callback && item.callback();
                onClose();
              }}
              style={{ borderColor: itemSeperatorColor }}
            >
              <Text className={clsx(textStyle || "", item.textStyle || "")}>
                {item.text}
              </Text>
            </Pressable>
          ))}
          {(position === "left-top" || position === "right-top") && !separate
            ? children
            : null}
        </View>
      </UseModal>
    </>
  );
};

export default MenuV2;

const getPosition = (
  position?: positionType,
  menuParam?: paramsType,
  gap?: number,
  separate?: boolean
): FlexStyle => {
  const data = {
    top:
      (menuParam?.py || 0) +
      (separate ? menuParam?.height || 0 : 0) +
      (gap || 0),
    right: width - ((menuParam?.px || 0) + (menuParam?.width || 0)),
    bottom:
      height -
      ((menuParam?.py || 0) +
        (separate ? 0 : menuParam?.height || 0) -
        (gap || 0)),
    left: menuParam?.px || 0,
  };

  switch (position) {
    case "left-bottom":
      return {
        top: data.top,
        right: data.right,
      };
    case "left-top":
      return {
        bottom: data.bottom,
        right: data.right,
      };
    case "right-top":
      return {
        bottom: data.bottom,
        left: data.left,
      };
    default:
      return {
        top: data.top,
        left: data.left,
      };
  }
};
