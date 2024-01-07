import { View, Text, Image, ScrollView } from "react-native";
import { useState } from "react";
import Header from "@modules/Header";
import IconTextArrow from "./IconTextArrow";
import { whatIsFpData } from "./utils";
import ImageWithURL from "@components/ImageWithURL";

const WhatIsFpMain = () => {
  const [headerHeight, setHeaderHeight] = useState(80);

  return (
    <View className="flex-1 bg-[#232136] relative z-0">
      <ImageWithURL
        source={{
          uri: "https://ik.imagekit.io/socialboat/Frame_1762__1__A8UFFYh0S.png?updatedAt=1685449228580",
        }}
        className="absolute -left-1 -right-1 -top-1 -bottom-1"
      />
      <Header
        back={true}
        tone="dark"
        headerType="transparent"
        setHeaderHeight={setHeaderHeight}
      />
      <ScrollView className="flex-1 px-4">
        <View style={{ marginTop: headerHeight }} />
        <View className="">
          <Image
            className="w-36 aspect-square mx-auto "
            resizeMode="contain"
            source={{
              uri: "https://ik.imagekit.io/socialboat/Group_1202_IyBkYiOtS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676294837158",
            }}
          />
          <Text className="text-lg pb-3 pt-10  iphoneX:text-xl font-bold text-[#FFFFFF]">
            What is Fitpoint?
          </Text>
          <Text className="text-xs  iphoneX:text-sm font-medium text-[#FFFFFFB2]">
            FP or FitPoints are reward points that you get for leading a healthy
            life. You can earn these points by following your workout, diet or
            walking plan on the app.
          </Text>
        </View>

        <View className=" pt-6">
          {whatIsFpData.map((item) => (
            <IconTextArrow
              heading={item.heading}
              data={item.data}
              key={item.heading}
            />
          ))}
        </View>
      </ScrollView>
      <Image
        className="absolute w-full h-full -z-10"
        source={{
          uri: "https://ik.imagekit.io/socialboat/tr:w-375,c-maintain_ratio,fo-auto/home_new_screen_-VAUR9HZbh.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676357604323",
        }}
      />
    </View>
  );
};

export default WhatIsFpMain;
