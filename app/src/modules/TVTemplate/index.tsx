import * as ScreenOrientation from "expo-screen-orientation";
import { Text, useWindowDimensions, View } from "react-native";
import { useEffect } from "react";
import { useNewCast } from "@hooks/cast/useNewCast";
import Loading from "@components/loading/Loading";
import QRCode from "./QRCode";
import Welcome from "./Welcome";
import Stream from "./Stream";

const TVTemplate = () => {
  const { cast, loading } = useNewCast();
  const { height } = useWindowDimensions();

  useEffect(() => {
    const func = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    };
    func();
  }, []);

  return (
    <View className="flex-1 bg-[#100F1A] relative">
      {loading ? (
        <View className="flex-1 flex justify-center items-center">
          <Loading />
        </View>
      ) : cast ? (
        <>
          {cast.state === "created" ? (
            <QRCode castId={cast.id} size={Math.min(height / 3, 500)} />
          ) : cast.state === "scanned" ? (
            <Welcome
              castId={cast.id}
              userId={cast.userUID}
              size={Math.min(height / 3, 500)}
            />
          ) : cast.state === "welcomed" ? (
            <Stream cast={cast} />
          ) : (
            <View className="w-full h-full flex justify-center items-center">
              <Text
                className="text-white text-center text-3xl"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                There is a problum
                {"\n"}
                Try reopen the app
              </Text>
            </View>
          )}
        </>
      ) : null}
    </View>
  );
};

export default TVTemplate;
