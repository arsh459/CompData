import crashlytics from "@react-native-firebase/crashlytics";
import {
  addBlockedPost,
  addBlockedUser,
  createNewReport,
  saveNewReport,
} from "@models/Reports/createUtils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useState } from "react";
import { View } from "react-native";
import SelectorView from "./SelectorView";
import InputView from "./InputView";
import SubmittedView from "./SubmittedView";

export type ReportStateTypes = "selector" | "input" | "submitted";

interface Props {
  state: ReportStateTypes;
  setState: (val: ReportStateTypes) => void;
  onCancel: () => void;
  userId?: string;
  postId?: string;
  target?: "User" | "Post";
  screen: "user" | "community";
}

const ReportPost: React.FC<Props> = ({
  state,
  setState,
  onCancel,
  userId,
  postId,
  target,
  screen,
}) => {
  const {
    state: { uid: loadedUserId },
  } = useAuthContext();
  const [text, setText] = useState<string>("");

  const onReport = () => {
    setState("input");
    weEventTrack(`${screen}_clickReport`, {
      target: target ? target : "no_target",
    });
  };
  const onBlockRequest = () => {
    setState("input");
    weEventTrack(`${screen}_clickBlockRequest`, {
      target: target ? target : "no_target",
    });
  };

  const onBlockUser = async () => {
    if (userId && loadedUserId) {
      await addBlockedUser(loadedUserId, userId);
    }
    weEventTrack(`${screen}_clickBlockUser`, {
      userUID: loadedUserId ? loadedUserId : "no_userUID",
      blockUID: userId ? userId : "no_blockUID",
    });
    setState("submitted");
  };

  const onBlockPost = async () => {
    if (postId && loadedUserId) {
      await addBlockedPost(loadedUserId, postId);
    }
    weEventTrack(`${screen}_clickBlockPost`, {
      userUID: loadedUserId ? loadedUserId : "no_userUID",
      postId: postId ? postId : "no_postId",
    });

    setState("submitted");
  };

  const onSubmit = async () => {
    try {
      const report = createNewReport(userId, loadedUserId, postId, text);

      await saveNewReport(report);

      weEventTrack(`${screen}_clickReportSubmit`, {
        userUID: loadedUserId ? loadedUserId : "no_userId",
        userId: userId ? userId : "no_userId",
        postId: postId ? postId : "no_userId",
      });

      setText("");

      if (target === "User") {
        await onBlockUser();
      } else if (target === "Post") {
        await onBlockPost();
      }
    } catch (error: any) {
      crashlytics().recordError(error);
    }

    setState("submitted");
  };

  return (
    <View className="flex items-center justify-start flex-1 p-4">
      {state === "selector" ? (
        <SelectorView
          text={undefined}
          onCancel={onCancel}
          onReport={onReport}
          onBlockRequest={onBlockRequest}
          target={target}
        />
      ) : state === "input" ? (
        <InputView
          text={text}
          setText={setText}
          onCancel={onCancel}
          onSubmit={onSubmit}
          target={target}
          action={state === "input" ? "Report" : "Block"}
        />
      ) : (
        <SubmittedView onCancel={onCancel} />
      )}
    </View>
  );
};

export default ReportPost;
