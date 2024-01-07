import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
// import SlotBooked from "@modules/JoinBoatMainV2/Components/SlotBooked";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Animated } from "react-native";
import { useEffect, useRef } from "react";
import SlotBookedV2 from "@modules/JoinBoatMainV3/components/SlotBookedV2";

const SlotConfirmation = () => {
  useScreenTrack();

  const navigation = useNavigation();

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const onSlotConfirmationNext = () => {
    navigation.navigate("Home");
  };

  return (
    <View className="flex-1">
      <SlotBookedV2 onProceed={onSlotConfirmationNext} />
    </View>
  );
};

export default SlotConfirmation;
