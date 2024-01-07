import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  DayStepDoc,
  useUserPreviousSteps,
} from "@hooks/steps/useUserPreviousSteps";
import HistoryCardV2 from "./HistoryCardV2";

import { useSteps } from "@hooks/steps/useSteps";
import Header from "@modules/Header";
import { useGoogleFitV2 } from "@providers/GoogleFit/hooks/useGoogleFitV2";
import { infoBtn, retryBtn } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";

import { FlashList } from "@shopify/flash-list";
import ListHeader from "./Header/ListHeader";

// const nowTime = Date.now();
// const nowSt = format(new Date(), "yyyy-MM-dd");
const renderItemMyCard = ({ item }: { item: DayStepDoc }) => {
  return <HistoryCardV2 item={item} dtString={item.dtString} />;
};

const StepsGrantedHistoryFlow = ({}) => {
  const { dayStepDocs, onNext, loading } = useUserPreviousSteps();

  const navigation = useNavigation();

  // const { today } = useAuthContext();

  const keyExtractor = (item: DayStepDoc) => item.id;

  const { onRefreshIOS, refreshIOS } = useSteps();
  const { refresh, onRefreshFit } = useGoogleFitV2();

  const onRefreshFunc = () => {
    if (Platform.OS === "ios") {
      onRefreshIOS();
    } else if (Platform.OS === "android") {
      onRefreshFit();
    }
  };
  const getRefreshState = () => {
    if (Platform.OS === "ios") {
      return refreshIOS;
    } else if (Platform.OS === "android") {
      return refresh;
    }
  };

  // const manualRefreshFn = getRefreshFn();
  // const manualRefreshState = getRefreshState();
  return (
    <>
      <Header
        back={true}
        headerColor={"transparent"}
        tone="dark"
        headerType="transparent"
        optionNode={
          <View className="h-5 iphoneX:h-6 flex flex-row justify-center items-center">
            {getRefreshState() === "REQUESTED" ? (
              <View>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            ) : (
              <TouchableOpacity onPress={onRefreshFunc}>
                <Image
                  source={{ uri: retryBtn }}
                  className="h-full aspect-square"
                />
              </TouchableOpacity>
            )}
            {Platform.OS === "android" ? (
              <TouchableOpacity
                className="ml-3"
                onPress={() => navigation.navigate("StepInfoScreen")}
              >
                <Image
                  source={{ uri: infoBtn }}
                  className="h-full aspect-square"
                />
              </TouchableOpacity>
            ) : null}
          </View>
        }
      />
      <View className="bg-[#13121E] h-full">
        <FlashList
          data={dayStepDocs}
          renderItem={renderItemMyCard}
          bounces={false}
          keyExtractor={keyExtractor}
          estimatedItemSize={100}
          onEndReached={onNext}
          className="flex-1"
          ListHeaderComponent={<ListHeader />}
          ListFooterComponent={<View className="h-5" />}
        />
        {loading ? (
          <View className="flex flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : !loading && dayStepDocs.length === 0 ? (
          <View className="flex-1 flex items-center justify-start">
            <Text className="text-3xl text-gray-700 text-center font-bold">
              No Steps as of now
            </Text>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default StepsGrantedHistoryFlow;
