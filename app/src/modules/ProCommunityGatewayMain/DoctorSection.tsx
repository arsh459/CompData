import { View, Text } from "react-native";

import { doctorImage } from "@constants/imageKitURL";
import ImageWithURL from "@components/ImageWithURL";

const DoctorSection = () => {
  return (
    <>
      <View className="w-full">
        <ImageWithURL
          source={{
            uri: doctorImage,
          }}
          className=" aspect-[216/216]"
        />
      </View>
      <View className="p-4">
        <>
          <Text
            className="text-white text-2xl leading-9"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Doctor Consultations Not Included 🗓️🩺
          </Text>

          <Text
            className="text-white/70 text-sm pt-6"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            Presently we offer doctor consultations only in 3 month & Yearly
            programs
          </Text>

          <Text
            className="text-white/70 text-sm pt-6"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            In this consultation, the doctor will understand your issue and
            prescribe medicine, exercises and dietary guidelines you need to
            follow.
          </Text>

          <Text
            className="text-white/70 text-sm pt-6"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            Basis the consultation, your dietician and health coach will create
            a customised workout and diet plan you would have to follow to
            achieve your goal.
          </Text>

          {/* <Text className="text-white/70 text-base py-6 pb-3">Schedule</Text> */}
        </>
      </View>
    </>
  );
};

export default DoctorSection;
