import {
  View,
  StyleSheet,
  Linking,
  Text,
  Platform,
  StatusBar,
} from "react-native";
// import Loading from "@components/loading/Loading";
import RequestPermission from "../TaskSubmitV2/RequestPermission";
import CloseBtn from "@components/Buttons/CloseBtn";
import BlurBG from "@components/BlurBG";
import ScanExample from "@components/ScanSVG/ScanExample";
import CodePosition from "@components/ScanSVG/CodePosition";
import { updateOnScan } from "@utils/cast/utils";
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { Camera } from "expo-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { usePlainTaskContext } from "@providers/task/PlainTaskProvider";
import {
  getActivityForTask,
  useTaskStream,
} from "@providers/task/hooks/useTaskStream";
import Loading from "@components/loading/Loading";
import { useCallback, useState } from "react";
// import { useState } from "react";

// const delay = async (time: number): Promise<void> => {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => resolve(), time);
//   });
// };

// function debounce<T extends (...args: any[]) => any>(
//   func: T,
//   delay: number
// ): (...args: Parameters<T>) => void {
//   let timeoutId: ReturnType<typeof setTimeout> | undefined;

//   return (...args: Parameters<T>): void => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }

//     timeoutId = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// }

function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let isFirstCall = true;

  return (...args: Parameters<T>): void => {
    if (isFirstCall) {
      func(...args);
      isFirstCall = false;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func(...args);
        isFirstCall = true;
      }, delay);
    }
  };
}

interface Props {
  attemptedDate: string;
}

const CodeScanner: React.FC<Props> = ({ attemptedDate }) => {
  const goToSettings = () => Linking.openSettings();
  const navigation = useNavigation();

  const {
    selectedActivity,
    checked,
    //  onInitActivity
  } = useTaskStream(attemptedDate);
  // const { game } = useGameContext();
  const { state } = useAuthContext();
  const { task } = usePlainTaskContext();
  const [status, requestPermission] = Camera.useCameraPermissions();
  const { top } = useSafeAreaInsets();
  const [scanned, setScanStatus] = useState<boolean>(false);

  const handleBarCodeScanned = useCallback(
    async ({ data }: { data: string }) => {
      // await delay(1000);

      // if (!scanned) {
      const castId = data.slice(0, -1);
      if (castId.includes("sbCastId")) {
        const castIdList = castId.split("sbCastId");
        if (castIdList.length === 2) {
          setScanStatus(true);

          const finalId = castIdList[1];
          let id: string | undefined = selectedActivity?.id;
          if (!selectedActivity?.id) {
            if (state.uid && task?.id) {
              const selectedActRetry = await getActivityForTask(
                state.uid,
                task?.id,
                attemptedDate
              );

              if (selectedActRetry?.id) {
                id = selectedActRetry.id;
              } else {
                // const updatedAct = await onInitActivity();
                // id = updatedAct?.id;
              }
            }
          }

          if (id) {
            await updateOnScan(
              finalId,
              state.uid ? state.uid : "",
              task?.playbackId ? task?.playbackId : "",
              task?.name,
              task?.avatar,
              id
            );

            navigation.dispatch((navState) => {
              const routes = navState.routes.filter(
                (r) => r.name !== "CastScreen"
              );
              routes.push({
                key: `UploadTask-${Math.round(Math.random() * 1000)}`,
                name: "UploadTask",
                params: {
                  gameId: state.gameId ? state.gameId : "",
                  // teamId: team ? team.id : "",
                  taskId: task?.id ? task.id : "",
                  // selectedDayNumber,
                  attemptedDate,
                  castId: finalId,
                },
              });

              return CommonActions.reset({
                ...navState,
                routes,
                index: routes.length - 1,
              });
            });
          }
        }
      }
      // }
    },
    [
      task?.id,
      state.gameId,
      attemptedDate,
      state.uid,
      task?.playbackId,
      task?.name,
      selectedActivity?.id,
    ]
  );

  const debouncedFunction = debounce(handleBarCodeScanned, 1500);

  const isFocus = useIsFocused();

  return (
    <View className="flex-1 bg-[#100F1A]">
      {!checked ? (
        <View className="flex-1 flex justify-center items-center">
          <Loading />
        </View>
      ) : !status?.canAskAgain ? (
        <RequestPermission
          onPress={goToSettings}
          cta="Go To Settings"
          text="You would have to go to settings in your phone to grant us camera access"
        />
      ) : !status.granted ? (
        <View className="flex-1 flex justify-center items-center">
          <RequestPermission
            text="Need camera access to scan QR Code"
            onPress={requestPermission}
            cta="Grant Camera access"
          />
        </View>
      ) : status?.granted ? (
        <>
          {isFocus ? (
            <Camera
              onBarCodeScanned={!scanned ? debouncedFunction : undefined}
              style={StyleSheet.absoluteFillObject}
            />
          ) : null}
          <View className="flex-1 flex">
            <View
              className="self-start bg-white/50 rounded ml-4 mt-6"
              style={{
                marginTop:
                  Platform.OS === "android" ? StatusBar.currentHeight : top,
              }}
            >
              <CloseBtn
                onClose={() => navigation.goBack()}
                classStr="w-4 m-2 aspect-square"
              />
            </View>
            <View className="flex-1 flex justify-center items-center px-16">
              <CodePosition />
            </View>
            <View className="relative h-1/3 rounded-t-2xl flex justify-center items-center p-4">
              <BlurBG
                blurAmount={20}
                blurType="dark"
                fallbackColor="#00000080"
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              />
              <Text
                className="text-2xl iphoneX:text-3xl text-white text-center"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                Scan to Cast on TV
              </Text>
              <Text
                className="text-white pb-4"
                style={{ fontFamily: "BaiJamjuree-Medium" }}
              >
                Visit{" "}
                <Text
                  onPress={() =>
                    Linking.openURL("https://socialboat.live/cast")
                  }
                  className="underline"
                >
                  https://socialboat.live/cast
                </Text>
              </Text>
              <View style={{ flex: 1, aspectRatio: 2 }}>
                <ScanExample />
              </View>
            </View>
          </View>
        </>
      ) : (
        <RequestPermission
          text="Need camera access to scan QR Code"
          onPress={goToSettings}
          cta="Go To Settings"
        />
      )}
    </View>
  );
};

export default CodeScanner;
