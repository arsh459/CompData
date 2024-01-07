import EventCard from "@components/cards/meetingCard/eventCard";
import DialogBox from "@components/dialog/Dialog";
import TopButton from "@components/drawers/TopButton";
// import { Dialog, Transition } from "@headlessui/react";
import { useUserEvents } from "@hooks/editEvent/useUserEvents";
import { deleteEvent } from "@models/Event/createUtils";
import { EventInterface } from "@models/Event/Event";
import clsx from "clsx";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

interface Props {
  uid: string;
  onEventClick: (id: string) => void;
  onTopButtonClick: () => void;
  onCreateEvent: () => void;
}

const sampleEvent: EventInterface = {
  name: "Your first event",
  media: [],
  description: "A catchy first line",
  cost: 0,
  currency: "₹",
  id: "sample",
  ownerUID: "",
  createdOn: 0,
  updatedOn: 0,
  joinURL: "",
  earnings: 0,
  views: 0,
  students: 0,
};

const EventBrowser: React.FC<Props> = ({
  uid,
  onEventClick,
  onCreateEvent,
  onTopButtonClick,
}) => {
  const { userEvents, fetching } = useUserEvents(uid);
  const [deleteId, setToDeleteId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const handleDelete = async () => {
    await deleteEvent(deleteId);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={clsx(
        "pt-24 pl-4 pr-4",
        "lg:pl-8 lg:pr-8",
        "lg:pt-14"
        // "bg-pink-800"
      )}
    >
      <div className="flex lg:hidden">
        <TopButton
          onTopButtonClick={onTopButtonClick}
          topButtonText="Create new"
        />
      </div>

      <div
        className={clsx(
          "pt-2 lg:pt-0",
          // "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
          // "max-w-screen-lg mx-auto",
          // "space-y-4",
          // "space-x-4",
          "w-full",
          "flex flex-wrap"
        )}
      >
        {userEvents.map((item) => {
          return (
            <div className="w-full p-2 pixelXl:w-48 sm:w-52" key={item.id}>
              <EventCard
                minWidth="sm"
                validEventText="Go to event"
                invalidEventText="Draft"
                invitationVisible={true}
                event={item}
                onButtonClick={() => router.push(`/events/${item.eventKey}`)}
                onClick={() => onEventClick(item.id)}
                onDelete={() => {
                  console.log("CLICKED");
                  setIsOpen(true);
                  setToDeleteId(item.id);
                }}
              />
            </div>
          );
        })}
        {!fetching && userEvents.length === 0 ? (
          <div className="w-full p-2 pixelXl:w-48 sm:w-52">
            <EventCard
              event={sampleEvent}
              onButtonClick={onCreateEvent}
              validEventText="Go to event"
              invalidEventText="Draft"
              onClick={onCreateEvent}
              invitationVisible={true}
            />
          </div>
        ) : null}
      </div>

      <DialogBox
        heading="Delete event?"
        buttonLeftText="Delete"
        buttonRightText="Cancel"
        explainer="This will permanently delete the event"
        isOpen={isOpen}
        leftClick={handleDelete}
        rightClick={closeModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default EventBrowser;
