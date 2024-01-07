import { sbLogoAbsolute } from "@constants/imageKitURL";
import { baseImageKit } from "@constants/imageKitURL";
import clsx from "clsx";
import { useState } from "react";
import { View } from "react-native";
import FastImage, { FastImageProps, Source } from "react-native-fast-image";

const getURI = (uri: string, trWidth: number) => {
  const uriArr = uri.split("/");
  const uniqeUri = uriArr.length ? uriArr[uriArr.length - 1] : sbLogoAbsolute;
  return `${baseImageKit}/tr:w-${trWidth},c-maintain_ratio,fo-auto/${uniqeUri}`;
};

const ImageWithURL: React.FC<FastImageProps & { trWidth?: number }> = ({
  source,
  className,
  resizeMode,
  style,
  trWidth,
}) => {
  const defaultSource: Source =
    source && typeof source !== "number" ? source : {};
  const [isLoadDone, setIsLoadDone] = useState<boolean>(false);

  return (
    <View style={style} className={clsx(className, "relative z-0")}>
      <FastImage
        source={{
          ...defaultSource,
          uri: getURI(defaultSource.uri || "", trWidth ? trWidth : 500),
        }}
        className={clsx(
          "w-full h-full",
          isLoadDone ? "opacity-100" : "opacity-0"
        )}
        resizeMode={resizeMode}
        onLoad={() => setIsLoadDone(true)}
      />
      <FastImage
        source={{
          ...defaultSource,
          uri: getURI(defaultSource.uri || "", 50),
        }}
        className={clsx(
          isLoadDone && "hidden",
          "absolute left-0 right-0 top-0 bottom-0 z-10"
        )}
        resizeMode={resizeMode}
      />
    </View>
  );
};

export default ImageWithURL;
