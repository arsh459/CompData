import BotFloatingCta from "./BotFloatingCta";
import FloatingHelp from "./FloatingHelp";
import { useEffect, useState } from "react";
import {
  onKnowMoreSakhiDone,
  onRoomPopupRemove,
} from "../utills/guidedOnboardUtils";
import { useLastChatRoom } from "@hooks/chatbot/useLastChatRoom";
import FloatingLastChat from "./FloatingLastChat";
import { useIsFocused } from "@react-navigation/native";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  offsetBottom?: number;
}

const BotFloatingContent: React.FC<Props> = ({ offsetBottom }) => {
  const { uid, guidedOnboardDone, knowMoreSakhi } = useUserStore((state) => {
    return {
      uid: state.user?.uid,
      guidedOnboardDone: state.user?.guidedOnboardDone,
      knowMoreSakhi: state.user?.flags?.knowMoreSakhi,
    };
  }, shallow);

  const { lastRoom } = useLastChatRoom(uid);
  const isFocus = useIsFocused();
  const [dialogChecked, setDialog] = useState<boolean>(false);

  // console.log("last room", uid, lastRoom);
  const [showFloatingHelp, setShowFloatingHelp] = useState<
    "know-more" | "unseen-msg" | "unknown"
  >("unknown");

  useEffect(() => {
    if (guidedOnboardDone && isFocus && !dialogChecked) {
      let timer: NodeJS.Timeout | undefined;
      if (!knowMoreSakhi) {
        timer = setTimeout(() => {
          setShowFloatingHelp("know-more");
          setDialog(true);
        }, 2000);
      } else if (lastRoom?.restartConvPopup && lastRoom?.lastMessage) {
        timer = setTimeout(() => {
          setShowFloatingHelp("unseen-msg");
          setDialog(true);
        }, 2000);
      } else if (!lastRoom?.restartConvPopup && lastRoom?.lastMessage) {
        // set dialog true if no unseen message and old conv exists
        setDialog(true);
      }

      return () => {
        clearTimeout(timer);
      };
    }
  }, [
    guidedOnboardDone,
    dialogChecked,
    knowMoreSakhi,
    lastRoom?.restartConvPopup,
    lastRoom?.lastMessage,
    isFocus,
  ]);

  const onKnowMoreHide = () => {
    onKnowMoreSakhiDone(uid);
    setShowFloatingHelp("unknown");
  };

  const onHideChat = async () => {
    if (uid && lastRoom?.id) onRoomPopupRemove(uid, lastRoom?.id);
    setShowFloatingHelp("unknown");
  };

  return (
    <>
      {showFloatingHelp === "know-more" ? (
        <FloatingHelp offsetBottom={offsetBottom} onHide={onKnowMoreHide} />
      ) : showFloatingHelp === "unseen-msg" ? (
        <FloatingLastChat
          offsetBottom={offsetBottom}
          onHide={onHideChat}
          lastRoom={lastRoom}
        />
      ) : null}

      <BotFloatingCta
        offsetBottom={offsetBottom}
        unseenMsg={
          !!lastRoom?.unreadMessages && showFloatingHelp !== "unseen-msg"
        }
      />
    </>
  );
};

export default BotFloatingContent;
