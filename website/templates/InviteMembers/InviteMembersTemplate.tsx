import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addMembersToEvent } from "@models/Event/inviteMembers";
import Loading from "@components/loading/Loading";
import DialogBox from "@components/dialog/Dialog";
import AuthForm from "@templates/editEvent/ProfileEditor/AuthForm";
import AddMembers, {
  whatsappMessageWarning,
} from "@templates/editEvent/Form/MemberAdder/AddMembers";
import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
// import { useCurrentEvent } from "@hooks/editEvent/useCurrentEvent";

interface Props {}

export interface editorQuery {
  eventId?: string;
}

export type editorQueryKeys = "section" | "eventId" | "leaderKey" | "action";

const InviteMembersTemplate: React.FC<Props> = ({}) => {
  const router = useRouter();
  const q = router.query as editorQuery;
  const [eventId, setEventId] = useState<string>("");

  const { selectedEvent } = useCommunityEvent(eventId);

  useEffect(() => {
    if (router.isReady && q.eventId) {
      setEventId(q.eventId as string);
    }
  }, [router.isReady, q.eventId]);

  const [whatsappWarning, showWhatsappWarning] = useState<boolean>(false);
  const [interimMembers, setInterimMembers] = useState<{
    [memberId: string]: boolean;
  }>({});

  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  const [loading, setLoading] = useState<boolean>(false);

  const onSaveEventRequest = (newMembers: { [uid: string]: boolean }) => {
    showWhatsappWarning(true);
    setInterimMembers(newMembers);
  };

  const onSendInvites = async () => {
    if (user?.userKey && selectedEvent?.ownerUID) {
      try {
        showWhatsappWarning(false);
        setLoading(true);
        await addMembersToEvent(
          selectedEvent?.ownerUID,
          interimMembers,
          eventId
        );
        router.push(`/${user.userKey}/?eventId=${eventId}&nav=program`);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const onBack = () => {
    router.back();
  };

  const onClose = () => {
    showWhatsappWarning(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <DialogBox
        heading="Are you sure?"
        explainer={whatsappMessageWarning}
        buttonLeftText="Send invites"
        buttonRightText="Cancel"
        leftClick={onSendInvites}
        rightClick={onClose}
        isOpen={whatsappWarning}
        closeModal={onClose}
      />
      {loading ? (
        <div className="flex items-center justify-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : user && user.uid ? (
        <AddMembers
          onBack={onBack}
          onNext={onSaveEventRequest}
          communityId={user.uid}
        />
      ) : (
        <AuthForm
          user={user}
          //   brandName="Soc"
          recaptcha={recaptcha}
        />
      )}
      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
    </div>
  );
};

export default InviteMembersTemplate;
