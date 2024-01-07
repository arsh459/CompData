import Loading from "@components/loading/Loading";
import UseModal from "@components/UseModal";
// import clsx from "clsx";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { getProgressToShow } from "./utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orientation?: "landscape" | "portrait";
  progress: { [uploadId: string]: number };
  readyForSubmit: boolean;
  supportedOrientations?: ("portrait" | "landscape")[];
  submitForAIScan: () => Promise<void>;
}

const PostInteractionV2: React.FC<Props> = ({
  isOpen,
  onClose,
  progress,
  supportedOrientations,
  readyForSubmit,
  submitForAIScan,
  orientation,
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
      supportedOrientations={supportedOrientations}
      onClose={onClose}
      width="w-full"
      height="h-full"
      bgColor="bg-black"
      tone="dark"
    >
      <View className="flex-1  flex flex-col items-center justify-between p-4">
        <Text className="text-xl iphoneX:text-3xl font-bold text-white">
          AI Scan
        </Text>
        {orientation === "landscape" ? (
          <View className="">
            <Image
              source={{
                uri: false
                  ? `https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Component_2_lKtgaiNhd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659093179822`
                  : `https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Component_1__1__5hQlHRYgx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659117363799`,
              }}
              className={"w-36 h-36"}
              // className="w-fill h-full"
              resizeMode="contain"
            />
          </View>
        ) : (
          <>
            {/* <View className="flex-1 flex flex-col justify-center items-center"> */}
            <View
            // className="w-full"
            // className="w-4/5 aspect-square relative -z-10"
            >
              <Image
                source={{
                  uri: false
                    ? `https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Component_2_lKtgaiNhd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659093179822`
                    : `https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Component_1__1__5hQlHRYgx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659117363799`,
                }}
                className={"w-72 h-72"}
                // className="w-fill h-full"
                resizeMode="contain"
              />
            </View>
            {/* </View> */}
          </>
        )}

        {!buttonLoader ? null : (
          <Text className="text-sm font-bold iphoneX:text-lg text-white">
            Progress {getProgressToShow(progress)}%
          </Text>
        )}

        <View>
          <Text className="pb-4  iphoneX:text-xl text-center text-white">
            Your Results will be ready in 15 mins after submission.
          </Text>
          {readyForSubmit ? (
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
          ) : null}
        </View>
      </View>
    </UseModal>
  );
};

export default PostInteractionV2;
