import EventCard from "@components/cards/meetingCard/eventCard";
import { EventInterface } from "@models/Event/Event";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  courses: EventInterface[];
}

const CoursesTemplate: React.FC<Props> = ({ courses }) => {
  //   console.log("boats", boats);
  return (
    <div className="">
      <div className="min-h-screen p-12 rounded-b-xl">
        <div className="pb-10">
          <h1 className="text-5xl font-medium text-gray-700 text-center ">
            Courses by creators
          </h1>
          <p className="text-gray-500 text-xl font-light text-center">
            Discover and learn
          </p>
        </div>
        <div
          className={clsx(
            // "bg-green-50",
            "gap-y-10",
            "justify-items-center",
            "max-w-screen-xl mx-auto",
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          )}
        >
          {courses.map((item) => {
            // if (
            //   item.name &&
            //   item.description &&
            //   typeof item.cost === "number" &&
            //   item.media &&
            //   item.media.length > 0
            // ) {
            //   console.log(
            //     "el",
            //     item.name,
            //     item.cost,
            //     item.eventKey,
            //     item.media
            //   );

            return (
              <Link
                key={item.id}
                href={`/events/${item.eventKey}`}
                legacyBehavior
              >
                <a target="_blank">
                  <div className="p-4">
                    <EventCard
                      onButtonClick={() => {}}
                      onClick={() => {}}
                      event={item}
                      invitationVisible={false}
                      validEventText="Book"
                      invalidEventText="Coming soon"
                    />
                  </div>
                </a>
              </Link>
            );
            // }
          })}
        </div>
      </div>
    </div>
  );
};

export default CoursesTemplate;
