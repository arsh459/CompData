import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ImageWithURL from "@components/ImageWithURL";
import { FlashList } from "@shopify/flash-list";
import ContentCard from "./ContentCard";
import { useState } from "react";
import { GetDataType } from "./utils/constants";
import { useGoalAchievments } from "./hook/useGoalAchievments";
import Loading from "@components/loading/Loading";
import AchivementPathHeader from "./AchivementPathHeader";
import AchievmentPathCta from "./AchievmentPathCta";
import { ItemSeparatorComponent, ListHeaderComponent } from "./Helper";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import { DNParseResult } from "@providers/dnLinks/hooks/handleLink";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useDNContext } from "@providers/dnLinks/DNProvider";
import { UserInterface } from "@models/User/User";
import { useUserStore } from "@providers/user/store/useUserStore";
import { AchievementPathData } from "./utils/interface";
import { useDeviceStore } from "@providers/device/useDeviceStore";
import { shallow } from "zustand/shallow";
import { format } from "date-fns";
import { createFBRequest } from "@utils/analytics/webengage/fb/main";

interface Props {
  type: GetDataType;
  ctaText?: string;
  onCtaPress?: (
    subStatus: subscriptionStatus,
    dnResult?: DNParseResult,
    user?: UserInterface
  ) => void;
  dark?: boolean;
  canEdit?: boolean;
}

const AchievementPath: React.FC<Props> = ({
  type,
  ctaText,
  onCtaPress,
  dark,
  canEdit,
}) => {
  const { dnResult } = useDNContext();
  const { subStatus } = useSubscriptionContext();
  const user = useUserStore((state) => state.user);
  const { data, loading } = useGoalAchievments(type);
  const { top, bottom } = useSafeAreaInsets();
  const [scollEnded, setScollEnded] = useState<boolean>(false);
  const { deviceData } = useDeviceStore(
    (state) => ({ deviceData: state.data }),
    shallow
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: AchievementPathData;
    index: number;
  }) => {
    return (
      <ContentCard
        item={item}
        scollEnded={scollEnded}
        isLast={index === data.length - 1}
        dark={dark}
      />
    );
  };

  const keyExtractor = (_: any, index: number) => `ContentCard-${index}`;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;

    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - (bottom || 16)
    ) {
      setScollEnded(true);
    }
  };

  const remoteColorArr = dark
    ? ["#232136", "#232136"]
    : ["#4846A6", "#9D5CEA", "#CD62FF"];

  const onFBConversionRequest = () => {
    if (onCtaPress) {
      onCtaPress(subStatus, dnResult, user);

      if (user?.uid) {
        createFBRequest(
          "Lead",
          user.uid,
          format(new Date(), "yyyy-MM-dd"),
          deviceData
        );
      }
    }
  };

  return (
    <LinearGradient colors={remoteColorArr} className="h-full flex flex-col">
      <ImageWithURL
        source={{
          uri: "https://ik.imagekit.io/socialboat/Frame%201762%20(1)_ma55UDnzJ.png?updatedAt=1690205435129",
        }}
        className="absolute -left-1 -right-1 -top-1 -bottom-1 bh-red-200"
      />

      <AchivementPathHeader canEdit={canEdit} dark={dark} />

      {loading ? (
        <View className="flex-1 flex justify-center items-center">
          <Loading />
        </View>
      ) : (
        <>
          <FlashList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            estimatedItemSize={250}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: top || 16,
              paddingBottom: bottom || 16,
              paddingHorizontal: 16,
            }}
            onScroll={onScroll}
            ListHeaderComponent={
              canEdit ? <View className="h-20" /> : <ListHeaderComponent />
            }
            ListFooterComponent={<View className="h-20" />}
            ItemSeparatorComponent={() => <ItemSeparatorComponent />}
          />

          <AchievmentPathCta
            color={remoteColorArr[remoteColorArr.length - 1]}
            ctaText={ctaText}
            onCtaPress={onFBConversionRequest}
          />
        </>
      )}
    </LinearGradient>
  );
};

export default AchievementPath;
