import { AwardReportParams } from "@screens/Awards/AwardReport";
import { View, Text, ScrollView } from "react-native";
import { useAwardReport } from "../hook/useAwardReport";
import Header from "@modules/Header";
import SpreadColorBall from "@components/SpreadColorBall";
import MediaTile from "@components/MediaCard/MediaTile";
import ActivityRegularity from "./ActivityRegularity";
import GoodChanges from "./GoodChanges";

const ReportMain: React.FC<AwardReportParams> = ({ achivementId }) => {
  const { award, awardReport } = useAwardReport(achivementId);

  return (
    <View className="flex-1 bg-[#232136]">
      <Header
        back={true}
        headerColor="#23213600"
        tone="dark"
        titleNode={
          <Text
            className="text-white text-xl"
            style={{ fontFamily: "Nunito-Medium" }}
          >
            My Report
          </Text>
        }
        centerTitle={true}
      />
      <ScrollView className="flex-1 p-4">
        <View className="flex justify-center items-center py-6">
          <View className="w-1/2 aspect-square relative z-0">
            {award?.themeColor ? (
              <View className="absolute -left-[10%] -right-[10%] -top-[10%] -bottom-[10%]">
                <SpreadColorBall
                  color1={award.themeColor}
                  color2={award.themeColor}
                  opacity2={0}
                />
              </View>
            ) : null}
            <MediaTile media={award?.img} fluid={true} />
          </View>
        </View>

        <View className="w-4 aspect-square" />

        <ActivityRegularity awardReport={awardReport} />

        <View className="w-4 aspect-square" />

        <GoodChanges awardReport={awardReport} />

        {/* <View className="bg-white rounded-xl my-4 relative z-0">
          <View className="absolute bottom-0 left-0 right-0 -z-10">
            <ImageWithURL
              className="w-full aspect-[333/92]"
              source={{
                uri: "https://ik.imagekit.io/socialboat/Group_1605_2_exXTuKjCx.png?updatedAt=1681285249305",
              }}
            />
          </View>
          <View className="flex flex-row items-center p-4">
            <ImageWithURL
              className="w-1/5 aspect-[326/180]"
              source={{
                uri: "https://ik.imagekit.io/socialboat/Group_1642_4bW23P6iT.png?updatedAt=1681542476325",
              }}
              resizeMode="contain"
            />
            <View className="w-4 aspect-square" />
            <Text
              className="flex-1 text-sm leading-5"
              style={{ fontFamily: "Nunito-Medium" }}
            >
              Hey, Astha looks like you did not worked out much this week .
              Start pushing more from this week!
            </Text>
          </View>
        </View> */}
        <View className="w-4 aspect-square" />
      </ScrollView>
    </View>
  );
};

export default ReportMain;
