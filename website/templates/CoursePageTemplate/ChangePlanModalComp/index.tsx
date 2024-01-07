import { Badge } from "@models/Prizes/PrizeV2";
import { sectionTypes } from "../useChangePlan";
import Confirmation, { ConfirmationProps } from "./Confirmation";
import { UserInterface } from "@models/User/User";
import DateOfStartProgram from "./DateOfStartProgram";
import PreferWorkoutDays from "./PreferWorkoutDays";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import Loading from "@components/loading/Loading";
import NetworkErrorModal, {
  NetworkErrorProps,
} from "@modules/MyProgram/Components/NetworkErrorModal";
import { useState } from "react";
import ChangeProgram from "./ChangeProgram";

interface Props {
  section: sectionTypes;
  modalProps?: ConfirmationProps;
  setModalProps: (val: ConfirmationProps | undefined) => void;
  badge: Badge;
  user: UserInterface;
  loading: boolean;
  onSetUnknown: () => void;
  onGoToSection: (sec: sectionTypes) => void;
  setLoading: (sec: boolean) => void;
  onProceed: () => Promise<void>;
  noModal?: boolean;
}

const ChangePlanModalComp: React.FC<Props> = ({
  section,
  modalProps,
  setModalProps,
  badge,
  user,
  loading,
  onSetUnknown,
  onGoToSection,
  setLoading,
  onProceed,
  noModal,
}) => {
  const [networkErrorProps, setNetworkErrorProps] =
    useState<NetworkErrorProps>();

  // console.log("section", section);
  // console.log("badge", badge.name);

  return (
    <CreateModal
      isOpen={section !== "unknown" || !!modalProps || loading}
      onCloseModal={onSetUnknown}
      onBackdrop={onSetUnknown}
      onButtonPress={onSetUnknown}
      heading=""
      maxW="max-w-none"
      bgProp="w-full h-screen"
    >
      <div className="w-full h-full flex justify-center items-center bg-[#100F1A]/25 backdrop-blur-2xl relative z-0">
        <div className="w-full h-full max-w-md mx-auto flex justify-center items-center p-4">
          {networkErrorProps ? (
            <NetworkErrorModal {...networkErrorProps} />
          ) : modalProps ? (
            <Confirmation {...modalProps} />
          ) : section === "changeProgram" ? (
            <ChangeProgram
              user={user}
              onSetUnknown={onSetUnknown}
              setModalProps={setModalProps}
              onGoToSection={onGoToSection}
              setLoading={setLoading}
            />
          ) : section === "dateOfStartProgram" ? (
            <DateOfStartProgram
              badge={badge}
              user={user}
              onGoToSection={onGoToSection}
              setLoading={setLoading}
              setModalProps={setModalProps}
              setNetworkErrorProps={setNetworkErrorProps}
              noModal={noModal}
            />
          ) : section === "preferWorkoutDays" ? (
            <PreferWorkoutDays
              user={user}
              setLoading={setLoading}
              onProceed={onProceed}
              setNetworkErrorProps={setNetworkErrorProps}
            />
          ) : null}
        </div>
        {loading ? (
          <div className="absolute inset-0 z-10 bg-black/50 flex justify-center items-center">
            <Loading fill="#ff735c" height={75} width={75} />
          </div>
        ) : null}
      </div>
    </CreateModal>
  );
};

export default ChangePlanModalComp;
