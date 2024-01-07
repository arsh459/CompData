import { View, Text } from "react-native";

import clsx from "clsx";
import ImageWithURL from "@components/ImageWithURL";

interface Props {}
const PdfPickButton: React.FC<Props> = ({}) => {
  return (
    <View className="  bg-[#343150] flex flex-row items-center justify-between rounded-xl py-2">
      <>
        <Text className=" text-[#f1f1f1]/50 text-base  leading-5 pl-4 flex-1">
          Attach a file or document {`\n`}
          <Text className="text-[#F1F1F14D]">PDF, Docx</Text>
        </Text>
        <View
          className={clsx(
            "bg-[#343150] p-2.5 pr-0",
            "rounded-2xl flex justify-center items-center  w-16 aspect-square"
          )}
        >
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Vector_4LJpdloPxm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666006035966",
            }}
            className="w-4 iphoneX:w-6 aspect-square"
            resizeMode="contain"
          />
        </View>
      </>
    </View>
  );
};

export default PdfPickButton;
