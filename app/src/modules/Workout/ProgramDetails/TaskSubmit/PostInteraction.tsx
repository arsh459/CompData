import Loading from "@components/loading/Loading";
import UseModal from "@components/UseModal";
// import clsx from "clsx";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
  readyForSubmit: boolean;
  // onGoToTeam: () => void;
  submitForAIScan: () => Promise<void>;
}

const PostInteraction: React.FC<Props> = ({
  isOpen,
  onClose,
  progress,
  // onGoToTeam,
  readyForSubmit,
  submitForAIScan,
}) => {
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  const onClick = async () => {
    setButtonLoader(true);
    await submitForAIScan();
    // onGoToTeam();
  };

  return (
    <UseModal
      visible={isOpen}
      onClose={onClose}
      width="w-full"
      height="h-full"
      bgColor="bg-black"
      tone="dark"
    >
      <View className="flex-1 flex flex-col items-center px-4 iphoneX:px-8 py-8 iphoneX:py-16">
        <Text className="text-xl iphoneX:text-3xl font-bold text-white">
          AI Scan
        </Text>
        <View className="flex-1 flex flex-col justify-center items-center">
          <View className="w-4/5 aspect-square relative -z-10">
            {/* <View
            className={clsx(
              "absolute -top-8 -left-8 -z-10 bg-[#AB41FF]/50 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-1000",
              progress >= 1
                ? "w-[250%] h-[250%] blobAnimation1"
                : "w-full h-full animate-pulse"
            )}
          />
          <View
            className={clsx(
              "absolute -top-8 -right-8 -z-10 bg-[#79FFDF]/50 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-1000",
              progress >= 1
                ? "w-[250%] h-[250%] blobAnimation2"
                : "w-full h-full animate-pulse"
            )}
          />
          <View
            className={clsx(
              "absolute -bottom-8 -right-8 -z-10 bg-[#5B41FF]/50 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-1000",
              progress >= 1
                ? "w-[250%] h-[250%] blobAnimation3"
                : "w-full h-full animate-pulse"
            )}
          />
          <View
            className={clsx(
              "absolute -bottom-8 -left-8 -z-10 bg-[#79BFFF]/75 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-1000",
              progress >= 1
                ? "w-[250%] h-[250%] blobAnimation4"
                : "w-full h-full animate-pulse"
            )}
          /> */}
            <Image
              source={{
                uri: readyForSubmit
                  ? `https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Component_2_lKtgaiNhd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659093179822`
                  : `https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Component_1__1__5hQlHRYgx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659117363799`,
              }}
              className="w-fill h-full"
              resizeMode="contain"
            />
          </View>
          {readyForSubmit ? (
            <Text className="text-sm iphoneX:text-lg text-white">
              Processing completed
            </Text>
          ) : null}
        </View>
        {readyForSubmit ? null : (
          <Text className="text-sm iphoneX:text-lg text-white">
            Progress {Math.floor(progress * 100)}%
          </Text>
        )}
        <View
        // className={clsx(!readyForSubmit && "opacity-0")}
        // pointerEvents={!readyForSubmit ? "none" : "auto"}
        >
          <Text className="py-6 iphoneX:py-12 iphoneX:text-xl text-center text-white">
            Your Results will be ready in 15 mins after submission
          </Text>
          <Pressable
            className="flex flex-row justify-center items-center bg-[#F5F8FF] border border-white rounded-lg py-2.5 iphoneX:py-4"
            onPress={onClick}
          >
            {buttonLoader ? (
              <View>
                <Loading
                  fill="#ff735c"
                  width="w-5 iphoneX:w-8"
                  height="h-5 iphoneX:h-8"
                />
              </View>
            ) : (
              <Image
                source={{
                  uri: `https://ik.imagekit.io/socialboat/Group_M1RelHbCm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659092518194`,
                }}
                className="w-4 iphoneX:w-5 h-4 iphoneX:h-5"
                resizeMode="contain"
              />
            )}
            <Text
              style={{ fontFamily: "BaiJamjuree-Bold" }}
              className="text-[#100F1A] font-bold text-xl ml-2.5 iphoneX:ml-4"
            >
              {buttonLoader ? "Submitting now" : "Submit For AI Scan"}
            </Text>
          </Pressable>
        </View>
      </View>
    </UseModal>
  );
};

export default PostInteraction;
