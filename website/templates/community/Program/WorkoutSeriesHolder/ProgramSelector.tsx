import { WorkoutSeries } from "@models/Workouts/Series";
import clsx from "clsx";
import { useState } from "react";
import ProgramDesc from "./ProgramDesc";
import SeriesAdder from "./SeriesAdder";
import { Link } from "@mui/material";

interface Props {
  programs: WorkoutSeries[];
  selectedSeries?: WorkoutSeries;
  setCurrSeries: (newSeries: WorkoutSeries) => void;
  enrolledSeries?: string[];
  eventId?: string;
  isOwner?: boolean;
  uid?: string;
  communityKey: string;
}

const ProgramSelector: React.FC<Props> = ({
  programs,
  setCurrSeries,
  selectedSeries,
  enrolledSeries,
  isOwner,
  eventId,
  uid,
  communityKey,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const enrolled = selectedSeries
    ? enrolledSeries?.includes(selectedSeries?.id)
    : false;

  return (
    <div>
      <SeriesAdder
        // programsLength={enrolledSeries?.length}
        eventId={eventId}
        isOpen={isOpen}
        onCloseModal={onClose}
        uid={uid}
      />
      {programs.length > 0 ? (
        <>
          <div className="flex items-baseline">
            <p className="text-gray-700 text-2xl font-semibold">
              Programs for you
            </p>
            {isOwner ? (
              <div className="flex pl-2">
                {/* <Link href={`/createSeries?id=${selectedSeries?.id}`}> */}
                <div onClick={onOpen}>
                  <p className="text-sm font-medium text-orange-500  cursor-pointer">
                    (Change program)
                  </p>
                </div>
                {/* </Link> */}
              </div>
            ) : null}
          </div>
          <div className="flex overflow-x-auto no-scrollbar pt-2">
            {programs.map((item) => {
              return (
                // <Link key={item.id} href={`workout/${item.seriesKey}`}>
                <div
                  key={item.id}
                  className={clsx(
                    item.id === selectedSeries?.id
                      ? "border-2 border-blue-500"
                      : "",
                    "bg-white px-4 py-1 rounded-full cursor-pointer flex items-baseline"
                  )}
                  onClick={() => setCurrSeries(item)}
                >
                  <p
                    className={clsx(
                      item.id === selectedSeries?.id
                        ? "text-gray-700 font-semibold"
                        : "text-gray-500"
                    )}
                  >
                    {item.name}
                  </p>
                  {isOwner ? (
                    <div className="pl-2">
                      <Link
                        href={`/createSeries?id=${item?.id}&communityKey=${communityKey}`}
                      >
                        <p className="text-xs text-orange-500 underline">
                          Edit
                        </p>
                      </Link>
                    </div>
                  ) : null}
                </div>
                // </Link>
              );
            })}
          </div>

          {selectedSeries ? (
            <div className="pt-2">
              <ProgramDesc
                isOwner={isOwner}
                enrolled={enrolled}
                currSeries={selectedSeries}
              />
            </div>
          ) : null}
        </>
      ) : isOwner ? (
        <div
          className="bg-white p-4 rounded-lg shadow-sm cursor-pointer"
          onClick={onOpen}
        >
          <p className="text-lg font-semibold text-gray-700 text-center">
            Add a Program
          </p>
          <p className="text-gray-500 text-base text-center">
            Add workout videos & nutrition tips for your teammates to follow
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default ProgramSelector;
