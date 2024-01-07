import { useRoute } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useEffect } from "react";

export const useScreenTrack = (scName?: string) => {
  const route = useRoute();
  useEffect(() => {
    if (route.name) {
      weEventTrack("screenLoad", { screenName: scName ? scName : route.name });
    }
  }, [route.name, scName]);

  //   useFocusEffect(() => {
  //     if (route.name) {
  //       weEventTrack("screenFocus", { screenName: route.name });
  //     }
  //   });
};
