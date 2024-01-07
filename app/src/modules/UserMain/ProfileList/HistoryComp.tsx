import Loading from "@components/loading/Loading";
import DefaultNutritionV2 from "@modules/Nutrition/DefaultNutritionV2";
import { PreviewProvider } from "@modules/Workout/ProgramHome/PreviewProvider/PreviewProvider";
import { SectionList, View } from "react-native";

import { UserInterface } from "@models/User/User";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useEarnedTasksSectionsAlgolia } from "../FitPointExpanderMain/hooks/useEarnedTaskSectionsAlgolia";
import {
  renderItemFpHome,
  renderSectionHeaderFpHome,
} from "../FitPointExpanderMain";

interface Props {
  ListHeaderComponent: () => JSX.Element;
  profile?: UserInterface;
}

const HistoryComp: React.FC<Props> = ({ ListHeaderComponent, profile }) => {
  const isMe = useUserStore(({ user }) => user?.uid === profile?.uid, shallow);
  // const { loading, onNext, earnedTasksSectionList } = useEarnedTasksAlgolia(
  //   profile?.uid
  // );

  const { onNext, sections, init } = useEarnedTasksSectionsAlgolia(
    profile?.uid
  ); //to check on dev

  return (
    <>
      {!init || !sections.length ? ListHeaderComponent() : null}
      {!init ? (
        <View className="flex-1 flex justify-start items-center py-5 iphoneX:py-8">
          <Loading width="w-12" height="h-12" />
        </View>
      ) : !sections.length ? (
        <DefaultNutritionV2
          img="https://ik.imagekit.io/socialboat/Group%201841_gJUPOl-5m.png?updatedAt=1694435896924"
          primaryHeading={`No workouts done so far${
            isMe ? " let's move to make a change" : ""
          }`}
          arrow={isMe ? true : false}
          btnText2={isMe ? "Start Workout" : ""}
          onPress2={() => {}}
          primaryHeadingColor="#514C7E"
          solidCta2={true}
        />
      ) : (
        <PreviewProvider>
          <SectionList
            sections={sections}
            renderItem={renderItemFpHome}
            className="flex-1"
            onEndReachedThreshold={0.1}
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onEndReached={onNext}
            renderSectionHeader={renderSectionHeaderFpHome}
            ItemSeparatorComponent={() => (
              <View className="w-3 aspect-square" />
            )}
            ListHeaderComponent={ListHeaderComponent}
            key={`${isMe ? "My" : profile?.name || "User"} Activites`}
          />
        </PreviewProvider>
      )}
    </>
  );
};

export default HistoryComp;
