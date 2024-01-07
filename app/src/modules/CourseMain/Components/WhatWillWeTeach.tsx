import { View, Text } from "react-native";

import WillTeach from "./WillTeach";

import { TextAndImgType } from "@models/Prizes/Prizes";
interface Props {
  whatWeTeach?: TextAndImgType[];
}
const WhatWillWeTeach: React.FC<Props> = ({ whatWeTeach }) => {
  return (
    <View className="py-4">
      {whatWeTeach ? (
        <Text
          className="text-sm px-4 iphoneX:text-sm text-white"
          style={{
            fontFamily: "BaiJamjuree-SemiBold",
          }}
        >
          What will we teach
        </Text>
      ) : null}
      <View className="flex flex-row p-2">
        {whatWeTeach?.map((item, index) => (
          <WillTeach
            imgUrl={item.icon}
            text={item.text}
            key={`${item.text}_${index}`}
          />
        ))}
      </View>
    </View>
  );
};

export default WhatWillWeTeach;
