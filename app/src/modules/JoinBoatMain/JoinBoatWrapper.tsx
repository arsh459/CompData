import Header from "@modules/Header";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import JoinBoatProgress from "./JoinBoatProgress";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  headText?: string;
  title?: string;
  onNext?: () => void;
  current?: number;
  lable: string;
}

const JoinBoatWrapper: React.FC<Props> = ({
  children,
  headText,
  title,
  onNext,
  current,
  lable,
}) => {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    setClicked(false);
  }, [lable]);

  return (
    <>
      <Header
        back={true}
        headerColor="#100F1A"
        tone="dark"
        titleNode={
          <View className="flex-1 flex justify-center">
            <Text className="text-center text-[#F5F5F7] text-xs my-1 iphoneX:my-2">
              {headText}
            </Text>
            <JoinBoatProgress current={current ? current : 1} total={7} />
          </View>
        }
        centerTitle={true}
      />
      <ScrollView
        className="flex-1 bg-[#100F1A]"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <SafeAreaView>
          <Text className="text-center text-[#FF5970] font-bold text-2xl iphoneX:text-3xl p-4">
            {title}
          </Text>
          <View className="flex-1 p-4">{children}</View>
          <Pressable
            className={clsx(
              "rounded-lg border boreder-[#FF93A2] p-4 m-4",
              clicked ? "bg-[#7D2834]" : "bg-[#FF556C]",
              !onNext && "opacity-0"
            )}
            onPress={() => {
              if (onNext) {
                onNext();
                setClicked(true);
              }
            }}
          >
            <Text className="font-medium text-white iphoneX:text-xl text-center">
              Next
            </Text>
          </Pressable>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default JoinBoatWrapper;
