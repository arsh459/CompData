import { useRegistrationsV2 } from "@hooks/registrations/useRegistrationsV2";
import { updateRegistrationValue } from "@models/Registrations/updateRegistration";
import { UserInterface } from "@models/User/User";
import KPIContainer from "@templates/dashboard/KPIContainer";
import clsx from "clsx";
import { useState } from "react";
import CohortChange from "./CohortChange";
import { MessageInterface } from "./Message/DashboardMessage";
import RegistrationsMessages from "./RegsitrationMesages";

interface Props {
  user: UserInterface;
}

const currency = "₹";

const Registrations: React.FC<Props> = ({ user }) => {
  const { payEvents, remoteEvents, remoteCohorts } = useRegistrationsV2(
    user.uid
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editingMessage, setEditingMessage] = useState<MessageInterface>();
  // const [editingEventId, setEditingEventId] = useState<string>("");
  // const [regisId, setEditingRegistrationId] = useState<string>("");
  // const [selectedCohortId, setSelectedCohortId] = useState<string>("");
  function closeModal() {
    setIsOpen(false);
  }

  const onCohortChange = (messageToEdit: MessageInterface) => {
    setEditingMessage(messageToEdit);
    // setEditingEventId(eId);
    // setSelectedCohortId(cId ? cId : "");
    // setEditingRegistrationId(registrationId);

    setIsOpen(true);
  };

  const onCohortClick = async (newId: string, newName: string) => {
    if (editingMessage) {
      await updateRegistrationValue(
        user.uid,
        editingMessage?.registrationId,
        newId,
        newName
      );
      setIsOpen(false);
    }
  };

  return (
    <div className="p-4">
      {editingMessage ? (
        <CohortChange
          selectedCohortId={editingMessage?.cohortId}
          cohorts={remoteCohorts[editingMessage?.eventId]}
          isOpen={isOpen}
          closeModal={closeModal}
          onCohortclick={onCohortClick}
        />
      ) : null}

      <div
        className={clsx(
          "w-full",
          // "bg-red-50",
          "flex pt-20",
          "justify-center lg:pt-10"
        )}
      >
        <div className="pr-4">
          <KPIContainer
            label="Students"
            value={user.sbStudents ? user.sbStudents : 0}
            color="primary"
          />
        </div>

        <KPIContainer
          label="Earnings"
          currency={currency}
          value={user.sbEarnings ? user.sbEarnings : 0}
          color="primary"
        />

        <div className="pl-4">
          <KPIContainer
            label="Views"
            value={user.sbViews ? user.sbViews : 0}
            color="primary"
          />
        </div>
      </div>
      <div className="pt-4 max-w-5xl mx-auto">
        <RegistrationsMessages
          onCohortChangeClick={onCohortChange}
          messages={payEvents}
          remoteEvents={remoteEvents}
          remoteCohorts={remoteCohorts}
        />
      </div>
    </div>
  );
};

export default Registrations;

// Ragini
// Ragini
// Dancer to entrepreneur
// Ragini
// Girl who rededined dance
//
//
