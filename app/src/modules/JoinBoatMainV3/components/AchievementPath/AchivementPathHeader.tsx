import Header from "@modules/Header";
import { Text, TouchableOpacity } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import ConfirmationModalV2 from "@components/ConfirmationModal/V2";
import { useRoadmapUpdateStore } from "@providers/progress/roadmapUpdateStore";
import { shallow } from "zustand/shallow";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  dark?: boolean;
  canEdit?: boolean;
}

const AchivementPathHeader: React.FC<Props> = ({ canEdit, dark }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigation = useNavigation();

  const { setUpdate } = useRoadmapUpdateStore(
    (state) => ({ setUpdate: state.setUpdate }),
    shallow
  );

  // console.log("updateMap HI", updateMap);

  const onPress = () => {
    navigation.navigate("JoinBoat", { section: "welcome" });
    setUpdate(true);

    weEventTrack("editGoal_yes", {});
  };

  return (
    <>
      <Header
        back={true}
        titleNode={
          canEdit ? (
            <Text
              className="text-white text-2xl"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              My Goal
            </Text>
          ) : undefined
        }
        optionNode={
          canEdit ? (
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              className="flex flex-row items-center px-4 py-2 rounded-full"
              style={{ backgroundColor: dark ? "#343150" : "#FBF6FF" }}
            >
              <ImageWithURL
                source={{
                  uri: "https://ik.imagekit.io/socialboat/Group%20(1)_5tm_ooDUP.png?updatedAt=1690210760599",
                }}
                className="w-4 aspect-square mr-2"
                resizeMode="contain"
              />
              <Text
                className="text-[#FF6069] text-sm"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                My Goal
              </Text>
            </TouchableOpacity>
          ) : undefined
        }
        tone="dark"
        headerType="transparent"
      />
      <ConfirmationModalV2
        visible={showModal}
        text="Are you sure you want to edit your goal. By doing this your badges and goals will be reset."
        onNext={onPress}
        onClose={() => {
          setShowModal(false);
          weEventTrack("editGoal_no", {});
        }}
      />
    </>
  );
};

export default AchivementPathHeader;
