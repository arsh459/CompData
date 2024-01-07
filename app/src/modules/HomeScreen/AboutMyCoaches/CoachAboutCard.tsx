import { View, Image } from "react-native";
import { useUserV2 } from "@hooks/auth/useUserV2";
import MediaTile from "@components/MediaCard/MediaTile";
import { LinearGradient } from "expo-linear-gradient";
import GradientText from "@components/GradientText";

interface Props {
  uid: string;
  width: number;
}

const CoachAboutCard: React.FC<Props> = ({ uid, width }) => {
  const { user: coach } = useUserV2(uid);

  return coach ? (
    <View className="relative py-4" style={{ width }}>
      <LinearGradient
        colors={["#75E0E0", "#6F94FB"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className="rounded-xl p-px"
      >
        <View
          className="flex flex-row justify-end rounded-xl p-4"
          style={{ backgroundColor: "#171624EE" }}
        >
          <View className="w-2/3">
            <GradientText
              text={`Coach ${coach.name ? coach.name.split(" ")[0] : ""}`}
              colors={["#75E0E0", "#6F94FB"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              textStyle={{
                fontFamily: "BaiJamjuree-Regular",
                fontSize: 16,
              }}
            />
            <View className="py-4">
              <GradientText
                text={coach.description ? coach.description : ""}
                colors={["#75E0E0", "#6F94FB"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                textStyle={{
                  fontFamily: "BaiJamjuree-Light",
                  fontSize: 12,
                }}
              />
            </View>
            <View className="flex-1 flex flex-row justify-between items-center flex-wrap">
              {coach.awards?.map((award, index) => (
                <View
                  key={`${award}-${index}`}
                  className="w-[48%] flex flex-row justify-center items-center"
                >
                  <Image
                    source={{
                      uri: "https://ik.imagekit.io/socialboat/Union_eMQdvV90k.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674037517621",
                    }}
                    className="w-[15%] aspect-[12/30]"
                    resizeMode="contain"
                  />
                  <View className="flex-1">
                    <GradientText
                      text={award}
                      colors={["#75E0E0", "#6F94FB"]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      textStyle={{
                        fontFamily: "BaiJamjuree-Regular",
                        textAlign: "center",
                        fontSize: 9,
                      }}
                    />
                  </View>
                  <Image
                    source={{
                      uri: "https://ik.imagekit.io/socialboat/Union_eMQdvV90k.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674037517621",
                    }}
                    style={{ transform: [{ rotateY: "180deg" }] }}
                    className="w-[15%] aspect-[12/30]"
                    resizeMode="contain"
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </LinearGradient>
      <View className="absolute left-2 bottom-4 -top-4 w-1/3 flex justify-end items-end pb-px">
        <MediaTile
          media={coach.profileImgWithoutBG}
          fluid={true}
          fluidResizeMode="cover"
        />
      </View>
    </View>
  ) : null;
};

export default CoachAboutCard;
