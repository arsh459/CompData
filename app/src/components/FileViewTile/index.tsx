import CirclePercent from "@components/CirclePercent";
import SvgIcons from "@components/SvgIcons";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import RNFetchBlob from "rn-fetch-blob";

interface Props {
  name?: string;
  date?: number;
  doctorId?: string;
  id: string;
  uri?: string;
  downloadUrl?: string | undefined;
  progress?: number | undefined;
  download?: boolean;
  fileName?: string;
}

const FileViewTile: React.FC<Props> = (props) => {
  const formatedDate = props.date && format(props.date, "dd/MM/yy");
  const navigation = useNavigation();

  const { user: doctor } = useUserV2(props.doctorId);

  let name = props.fileName;
  if (doctor?.name) {
    name = doctor.name;
  }

  // console.log("props", props);

  return (
    <View className="flex  justify-between w-full bg-[#343150] rounded-xl p-4">
      <View className="flex flex-row justify-between  items-center w-full">
        <View className=" flex flex-row gap-3  items-center">
          <View className="w-8 h-8">
            <SvgIcons iconType="pdfIcon" />
          </View>

          <View className="overflow-hidden max-w-[60vw]">
            <Text numberOfLines={2} className=" text-[#F1F1F180] font-medium">
              {`${name} ${props.date ? `| ${formatedDate}` : ""}`}{" "}
            </Text>
          </View>
        </View>
        {props.progress && props.progress >= 0 && props.progress < 1 ? (
          <View className=" w-7 h-7">
            <CirclePercent
              circleSize={50}
              percent={
                props.progress >= 1
                  ? 1
                  : props.progress <= 0
                  ? 0
                  : props.progress
              }
              activeColor={"#19C8FF"}
              inActiveColor={"#22bdff40"}
              strokeWidth={3}
              padding={2}
            />
          </View>
        ) : props.download ? (
          <TouchableOpacity
            onPress={() => {
              // console.log("download btn pressed");
              // console.log(RNFetchBlob.fs.dirs.DocumentDir + props.fileName);
              props.downloadUrl &&
                RNFetchBlob.config({
                  path: RNFetchBlob.fs.dirs.DownloadDir + props.fileName,
                })
                  .fetch("GET", props.downloadUrl)
                  .then((response) => {
                    console.log("The file saved to ", response.path());

                    Alert.alert(
                      "Download completed",
                      "Please check your files for the downloaded report"
                    );
                  })
                  .catch((error) => {
                    console.log(error);

                    Alert.alert(
                      "Download Failed",
                      "Please contact customer support to resolve this"
                    );
                  });
            }}
          >
            <View className=" w-7 h-7">
              <SvgIcons iconType="rightArrow" />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("WebViewScreen", {
                source: props.uri
                  ? props.uri
                  : `https://socialboat.live/prescription/${props.id}`,
              })
            }
          >
            <View className=" w-4 h-4">
              <SvgIcons iconType="rightArrow" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FileViewTile;
