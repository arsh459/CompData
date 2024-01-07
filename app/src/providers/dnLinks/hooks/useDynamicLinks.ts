// import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from "@react-native-firebase/dynamic-links";
// import { useNavigation } from "@react-navigation/native";
import { Dispatch, SetStateAction, useEffect } from "react";
import { DNParseResult, handleBranchLink, handleDNLink } from "./handleLink";
import branch, { BranchParams } from "react-native-branch";
import { linkAtt, userAttribute } from "@utils/analytics/webengage/userLog";
import { RouteKeys } from "@routes/MainStack";
import { viewLevelsTypes } from "@utils/post/utils";

export interface BranchSubscriptionEventSocialBoat extends BranchParams {
  navTo?: RouteKeys;
  actId?: string;
  badgeId?: string;
  blogSource?: string;
  attemptedDate?: string;
  taskId?: string;
  bootcampId?: string;

  userId?: string;
  roundId?: string;
  path?: string;
  viewLevel?: viewLevelsTypes;
}

export const useDynamicLinks = (
  setDNResult: Dispatch<SetStateAction<DNParseResult | undefined>>
) => {
  // const navigation = useNavigation();

  useEffect(() => {
    const ref = branch.subscribe((dt) => {
      const resp = handleBranchLink(
        dt.params as BranchSubscriptionEventSocialBoat
      );

      setDNResult(resp);

      userAttribute(dt);

      const params = dt.params as BranchSubscriptionEventSocialBoat;

      if (params.navTo) {
        linkAtt(resp);
      }
    });

    return () => {
      ref();
    };
  }, []);

  useEffect(() => {
    const handleLink = (link: FirebaseDynamicLinksTypes.DynamicLink) => {
      const resp = handleDNLink(link);

      setDNResult(resp);
      // setTimeout(() => handleNavigation(resp, navigation), 200);
    };

    // setDNResult({
    //   route: "ProgressScreen",
    //   params: {
    //     ProgressScreen: {
    //       teamId: "1d5523c2-339d-4472-97be-3a3133238155",
    //       sprintId: "week-16",
    //       captainId: "KJhyTFmhPHhnK7wmo0SmqBQb8FS2",
    //     },
    //   },
    // });

    const unsubscribe = dynamicLinks().onLink(handleLink);
    return () => unsubscribe();
  }, []);
};
