import clsx from "clsx";
import React from "react";
// import Divider from "@components/divider/Divider";
import { EventInterface } from "@models/Event/Event";
import EventCard from "@components/cards/meetingCard/eventCard";
import { formLabelValues } from "@components/drawers/constants";
import Link from "next/link";
// import Link from "next/link";
// import TextLayout from "../Layout/TextLayout";
// import Linkify from "react-linkify";

interface Props {
  //   about?: string;
  editing: boolean | undefined;
  active: boolean;
  heading: string;
  editingHeading: string;
  events: EventInterface[];
  onEventClick: (eventId?: string, eventKey?: string) => void;
  onEditingClick: (val: formLabelValues) => void;
  live: boolean;
  //   placeholderText: string;
  //   noMinHeight?: boolean;
  //   noDivider?: boolean;
}
const UpcomingEvents: React.FC<Props> = ({
  events,
  active,
  editing,
  heading,
  editingHeading,
  onEditingClick,
  onEventClick,
  live,
  //   placeholderText,
  //   noMinHeight,
  //   noDivider,
}) => {
  // console.log("events", events);
  return (
    <div className={clsx("pt-4 pl-4 pr-4 ")}>
      {/* {editing ? null : (
        <div className="pb-2">
          <Divider />
        </div>
      )} */}
      <div
        className={editing ? "cursor-pointer" : ""}
        onClick={() => onEditingClick("all-events")}
      >
        <p
          className={clsx(
            editing && !active ? "text-gray-400" : "text-gray-700",
            "text-xl font-medium"
          )}
        >
          {editing ? editingHeading : heading}
        </p>
      </div>
      <div
        className={clsx(
          "pt-4 grid grid-cols-2",
          "gap-x-2 gap-y-4"
          //   "justify-items-center"
          //   "gap-x-2"
        )}
      >
        {events.map((item) => {
          console.log(
            "item",
            live,
            item.name,
            item.cost,
            item.id,
            item.joinURL,
            item.eventKey
          );
          if (
            live &&
            item.name &&
            typeof item.cost === "number" &&
            // item.description &&
            // item.joinURL &&
            item.eventKey
          ) {
            return (
              <Link key={item.id} href={`/events/${item.eventKey}`}>
                <div className="p-0">
                  <EventCard
                    validEventText="Join now"
                    invalidEventText="Upcoming"
                    invitationVisible={false}
                    event={item}
                    onButtonClick={() => {}}
                    onClick={() => {}}
                  />
                </div>
              </Link>
            );
          } else if (!live) {
            return (
              <div className="p-0" key={item.id}>
                <EventCard
                  validEventText="Join now"
                  invalidEventText="Upcoming"
                  invitationVisible={false}
                  event={item}
                  onButtonClick={() => {}}
                  onClick={() => onEventClick(item.id, item.eventKey)}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default UpcomingEvents;
