import clsx from "clsx";
import { RefObject, useState } from "react";
import { TouchableOpacity } from "react-native";

import {
  View,
  Image,
  TouchableHighlight,
  FlatList,
  Animated,
} from "react-native";

interface Props {
  flatlistRef: RefObject<FlatList<any>>;
  scrollX: Animated.Value;
  snapWidth: number;
  leftIconUrl?: string;
  rightIconUrl?: string;
  iconsYPositioning?: string;
  iconStyle?: string;
  iconMargin?: string;
  onControlChange?: (type: controlsTypes) => void;
}

export type controlsTypes = "prev" | "next";

const Controls: React.FC<Props> = ({
  flatlistRef,
  scrollX,
  snapWidth,
  leftIconUrl,
  rightIconUrl,
  iconsYPositioning,
  iconStyle,
  iconMargin,
  onControlChange,
}) => {
  const [disable] = useState<{ [key in controlsTypes]: boolean }>({
    prev: false,
    next: false,
  });
  const handleControlsClick = async (type: controlsTypes) => {
    const currScrollX = (scrollX as any)._value;
    const newVal: number =
      type === "prev"
        ? currScrollX - snapWidth
        : type === "next"
        ? currScrollX + snapWidth
        : currScrollX;
    flatlistRef?.current?.scrollToOffset({
      offset: newVal,
      animated: true,
    });

    if (onControlChange) {
      onControlChange(type);
    }
  };

  return (
    <View
      className={clsx(
        "absolute left-0 right-0 top-1/2  z-20 flex flex-row justify-between items-center",
        iconsYPositioning ? iconsYPositioning : "-translate-y-1/2",
        iconMargin ? iconMargin : ""
      )}
    >
      {rightIconUrl || leftIconUrl ? (
        <>
          <TouchableOpacity
            onPress={() => handleControlsClick("prev")}
            disabled={disable.prev}
          >
            <Image
              source={{
                uri: leftIconUrl
                  ? leftIconUrl
                  : "https://img.icons8.com/color/48/000000/back--v1.png",
              }}
              className={clsx(
                iconStyle ? iconStyle : "w-12 h-12",
                disable.prev && "opacity-0"
              )}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleControlsClick("next")}
            disabled={disable.next}
          >
            <Image
              source={{
                uri: rightIconUrl
                  ? rightIconUrl
                  : "https://img.icons8.com/color/48/000000/forward.png",
              }}
              className={clsx(
                iconStyle ? iconStyle : "w-12 h-12",
                disable.next && "opacity-0"
              )}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableHighlight
            onPress={() => handleControlsClick("prev")}
            disabled={disable.prev}
          >
            <Image
              source={{
                uri: leftIconUrl
                  ? leftIconUrl
                  : "https://img.icons8.com/color/48/000000/back--v1.png",
              }}
              className={clsx(
                iconStyle ? iconStyle : "w-12 h-12",
                disable.prev && "opacity-0"
              )}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => handleControlsClick("next")}
            disabled={disable.next}
          >
            <Image
              source={{
                uri: rightIconUrl
                  ? rightIconUrl
                  : "https://img.icons8.com/color/48/000000/forward.png",
              }}
              className={clsx(
                iconStyle ? iconStyle : "w-12 h-12",
                disable.next && "opacity-0"
              )}
            />
          </TouchableHighlight>
        </>
      )}
    </View>
  );
};

export default Controls;
