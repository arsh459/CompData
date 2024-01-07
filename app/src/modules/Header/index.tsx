import { LayoutChangeEvent, Platform, StatusBar, View } from "react-native";
import { ReactNode, useState } from "react";
import clsx from "clsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AbsoluteOverlay, { headerElevation } from "./AbsoluteOverlay";
import OptionNode from "./OptionNode";
import BackNode from "./BackNode";
import TitleNode from "./TitleNode";
import GradientBG, { gradientDirectionType } from "./GradientBG";

export type headerTypes = "transparent" | "overlay" | "solid";

interface Props {
  back?: boolean;
  orientation?: "landscape" | "portrait";
  onBack?: () => void;
  backIconSvg?: ReactNode;
  backIcon?: "arrow" | "arrow_circle" | "arrow_filled";
  tone?: "dark" | "light";
  headerColor?: string;
  title?: string;
  backIconColor?: string;
  titleNode?: ReactNode;
  centerTitle?: boolean;
  optionNode?: ReactNode;
  defaultOption?: boolean;
  headerType?: headerTypes;
  setHeaderHeight?: (val: number) => void;
  defaultOptionOnPress?: () => void;
  gradientColors?: string[];
  gradientDirection?: gradientDirectionType;
}

const Header: React.FC<Props> = ({
  back,
  onBack,
  backIconSvg,
  backIcon,
  tone,
  headerColor,
  title,
  titleNode,
  centerTitle,
  optionNode,
  defaultOption,
  headerType,
  setHeaderHeight,
  orientation,
  defaultOptionOnPress,
  backIconColor,
  gradientColors,
  gradientDirection,
}) => {
  const [headerHeightRemote, setHeaderHeightRemote] = useState<number>(0);
  const { top: SafeAreaInsetsTop, bottom: SafeAreaInsetsBottom } =
    useSafeAreaInsets();

  const headerColorRemote: string = headerColor
    ? headerColor
    : tone === "dark"
    ? "#000000"
    : "#FFFFFF";

  const handleOnLayout = (e: LayoutChangeEvent) => {
    setHeaderHeight && setHeaderHeight(e.nativeEvent.layout.height);
    setHeaderHeightRemote(e.nativeEvent.layout.height);
  };

  return (
    <View
      style={{
        paddingTop: headerType
          ? 0
          : Platform.OS === "android"
          ? StatusBar.currentHeight
          : SafeAreaInsetsTop,
        // paddingLeft: orientation === "landscape" ? SafeAreaInsetsBottom : 0,
        backgroundColor:
          gradientColors && gradientColors.length >= 2
            ? undefined
            : headerColorRemote,
        position: "relative",
        width: "100%",
        elevation: headerElevation,
        zIndex: headerElevation,
      }}
    >
      <AbsoluteOverlay
        headerType={headerType}
        headerColorRemote={headerColorRemote}
        headerHeightRemote={headerHeightRemote}
      />
      <GradientBG
        gradientColors={gradientColors}
        gradientDirection={gradientDirection}
      />
      <StatusBar
        barStyle={tone === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent={true}
        animated={true}
      />
      <View
        onLayout={handleOnLayout}
        className={clsx(
          headerType
            ? "absolute left-0 right-0 top-0"
            : "bg-inherit relative z-0",
          "flex flex-row px-4 py-3 items-center "
        )}
        style={{
          elevation: headerElevation,
          zIndex: headerElevation,
          paddingTop: headerType
            ? Platform.OS === "android"
              ? StatusBar.currentHeight
              : SafeAreaInsetsTop
            : 0,
          marginTop: orientation === "landscape" ? 20 : 0,
        }}
      >
        {back ? (
          <View
            style={{
              left: orientation === "landscape" ? SafeAreaInsetsBottom : 0,
            }}
          >
            <BackNode
              backIcon={backIcon}
              onBack={onBack}
              backIconSvg={backIconSvg}
              tone={tone}
              backIconColor={backIconColor}
            />
          </View>
        ) : null}
        {centerTitle && (defaultOption || optionNode) ? (
          <View className="opacity-0">
            <OptionNode defaultOption={defaultOption} optionNode={optionNode} />
          </View>
        ) : null}
        <TitleNode
          title={title}
          titleNode={titleNode}
          tone={tone}
          centerTitle={centerTitle}
        />
        {centerTitle && back ? (
          <View className="opacity-0">
            <BackNode
              backIcon={backIcon}
              onBack={onBack}
              tone={tone}
              backIconColor={backIconColor}
            />
          </View>
        ) : null}
        <OptionNode
          defaultOption={defaultOption}
          optionNode={optionNode}
          defaultOptionOnPress={defaultOptionOnPress}
        />
      </View>
    </View>
  );
};

export default Header;
