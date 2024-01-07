import { View, Text } from "react-native";
import React from "react";
import { experWrapper } from "./utils";
import BulletListText from "./BulletListText";

const JoinTerms = () => {
  return (
    <View className="w-4/5 mx-auto">
      <Text
        className="text-white text-3xl pb-2"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Join our Women Only Community 👩🏼‍⚕️
      </Text>
      {experWrapper.feature.map((item) => (
        <React.Fragment key={item}>
          <BulletListText text={item} />
        </React.Fragment>
      ))}
      <Text
        className="text-white/70 text-lg pt-6"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Rules:
      </Text>
      {experWrapper.rules.map((item) => (
        <React.Fragment key={item}>
          <BulletListText text={item} />
        </React.Fragment>
      ))}
    </View>
  );
};

export default JoinTerms;
