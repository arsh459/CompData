import Loading from "@components/loading/Loading";
import MediaTile from "@components/MediaCard/MediaTile";
import UploadMedia from "@components/MediaPicker/UploadMedia";
import {
  addImageIcon,
  deleteImageLogo,
  weightMeterIcon,
} from "@constants/imageKitURL";
import { Journey } from "@models/Jounrney/Jourrney";
import Header from "@modules/Header";
import { getIntialWeight } from "@modules/JoinBoatMainV3/components/utils2";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { deleteJourney, saveJourney } from "@utils/journey/utills";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useLocalJourney } from "../hooks/useLocalJourney";
import CustomDate from "./CustomDate";
import { CTA, EditImage, EditWeight, NextBtn } from "./HelperComponents";
import WarningModal from "./WarningModal";
import SetWeightNew from "@modules/JoinBoatMainV3/components/SetWeightNew";

interface Props {
  JourneyId?: string;
}

const AddNewJourney: React.FC<Props> = ({ JourneyId }) => {
  const { user } = useUserContext();
  const { localJourney, onUploadMedia, setWeight, setDisplayOn, resetJourney } =
    useLocalJourney(JourneyId);
  const [progress, setProgress] = useState<number>(0);
  const [showWeightMeter, setShowWeightMeter] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigation = useNavigation();

  const onSave = (uid: string, journey: Journey) => {
    weEventTrack("journey_clickSave", { journeyId: journey.id });
    saveJourney(uid, journey);
    navigation.goBack();
    resetJourney();
  };

  const onDelete = (uid: string, journeyId: string) => {
    if (JourneyId) {
      deleteJourney(uid, journeyId);
    }
    weEventTrack("journey_clickDelete", {
      journeyId: JourneyId ? JourneyId : "not_created_yet",
    });
    navigation.goBack();
    resetJourney();
  };

  const onDone = () => {
    if (!localJourney.currWeight) {
      setWeight(
        getIntialWeight(
          user?.weight,
          user?.height,
          user?.gender,
          user?.fitnessGoal
        )
      );
    }
    setShowWeightMeter(false);
  };

  return user ? (
    <View className="flex-1 bg-[#100F1A]">
      <Header
        back={true}
        onBack={showWeightMeter ? () => setShowWeightMeter(false) : undefined}
        headerColor="#100F1A"
        tone="dark"
        title={JourneyId ? undefined : "Create a new journey"}
      />
      <LinearGradient
        colors={
          showWeightMeter
            ? ["#100F1A", "#100F1A"]
            : ["#100F1A00", "#859EFF80", "#C285FF"]
        }
        className="flex-1 w-full flex justify-center items-center p-4"
      >
        {showWeightMeter ? (
          <View className="w-full flex-1">
            <SetWeightNew
              initialValue={
                localJourney?.currWeight ? localJourney.currWeight : 0
              }
              onNumberFieldsUpdate={setWeight}
              target="weight"
            />
          </View>
        ) : (
          <View className="flex-1 w-full flex justify-center items-center">
            {localJourney.media ? (
              <View
                style={{ aspectRatio: localJourney.currWeight ? 0.9 : 1 }}
                className="bg-[#262630] w-full flex justify-center items-center mx-4 rounded-2xl overflow-hidden border border-white relative z-0"
              >
                <MediaTile
                  media={localJourney.media}
                  fluid={true}
                  fluidResizeMode="cover"
                />
                <UploadMedia
                  setMedia={onUploadMedia}
                  uid={user.uid}
                  setProgress={setProgress}
                  className="absolute top-4 right-4"
                  mediaSelectType="Images"
                >
                  <EditImage />
                </UploadMedia>
                {localJourney.currWeight ? (
                  <LinearGradient
                    colors={["transparent", "black"]}
                    className="absolute bottom-0 left-0 right-0 h-1/3 p-4 flex justify-end"
                  >
                    <EditWeight
                      text={`${localJourney.currWeight}kg`}
                      onPress={() => setShowWeightMeter(true)}
                    />
                  </LinearGradient>
                ) : null}
              </View>
            ) : (
              <>
                {progress > 0 && progress < 1 ? (
                  <View className="bg-[#262630] w-full px-6 py-4 mx-4 rounded-2xl flex flex-row justify-center items-center">
                    <Loading width="w-1/5" height="aspect-square" />
                  </View>
                ) : (
                  <UploadMedia
                    setMedia={onUploadMedia}
                    uid={user.uid}
                    setProgress={setProgress}
                    className="w-full mx-4"
                    mediaSelectType="Images"
                  >
                    <CTA iconUrl={addImageIcon} text="Add Image to journey" />
                  </UploadMedia>
                )}
              </>
            )}

            {localJourney.currWeight ? (
              <>
                {localJourney.media ? null : (
                  <EditWeight
                    text={`${localJourney.currWeight}kg`}
                    onPress={() => setShowWeightMeter(true)}
                  />
                )}
              </>
            ) : (
              <>
                <View className="w-4 aspect-square" />
                <TouchableOpacity onPress={() => setShowWeightMeter(true)}>
                  <CTA iconUrl={weightMeterIcon} text="Add Weight to journey" />
                </TouchableOpacity>
              </>
            )}

            <View className="w-4 aspect-square" />
            <CustomDate
              displayOn={localJourney.displayOn}
              setDisplayOn={setDisplayOn}
            />
            <View className="w-4 aspect-square" />

            {localJourney.media && localJourney.currWeight ? (
              <>
                <TouchableOpacity onPress={() => setIsOpen(true)}>
                  <Image
                    source={{ uri: deleteImageLogo }}
                    className="w-10 iphoneX:w-12 aspect-square"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <View className="w-4 aspect-square" />
              </>
            ) : null}
          </View>
        )}

        {!localJourney.media || !localJourney.currWeight ? (
          <Text className="text-white text-sm">{`Note: To save journey add ${
            localJourney.media
              ? "weight as well"
              : localJourney.currWeight
              ? "image as well"
              : "image and weight"
          }`}</Text>
        ) : null}
        <NextBtn
          onDone={showWeightMeter ? onDone : undefined}
          onSave={
            localJourney.media && localJourney.currWeight
              ? () => onSave(user.uid, localJourney)
              : undefined
          }
          JourneyId={JourneyId}
        />
      </LinearGradient>
      <WarningModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={() => onDelete(user.uid, localJourney.id)}
      />
    </View>
  ) : null;
};

export default AddNewJourney;
