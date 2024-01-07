import UseModal from "@components/UseModal";
import { useState } from "react";
import ReportPost, { ReportStateTypes } from "./ReportPost";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  contentUID?: string;
  postId?: string;
  target?: "User" | "Post";
  screen: "user" | "community";
}

const ReportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  contentUID,
  postId,
  target,
  screen,
}) => {
  const [state, setState] = useState<ReportStateTypes>("selector");

  const onCancel = () => {
    onClose();
    setState("selector");
  };

  return (
    <UseModal
      visible={isOpen}
      onClose={onCancel}
      width="w-full"
      height="h-full"
      blurAmount={18}
      fallbackColor="#100F1A"
      tone="dark"
    >
      <ReportPost
        userId={contentUID}
        postId={postId}
        state={state}
        setState={setState}
        onCancel={onClose}
        target={target}
        screen={screen}
      />
    </UseModal>
  );
};

export default ReportModal;
