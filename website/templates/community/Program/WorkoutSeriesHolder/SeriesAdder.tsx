import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import Divider from "@components/divider/Divider";
import { useWorkoutSeries } from "@hooks/workouts/useWorkoutSeries";
import SeriesCard from "@templates/SeriesEditor/SeriesCard";
import {
  addEventIdToSeries,
  removeEventIdToSeries,
} from "@models/Workouts/createUtils";
import Button from "@components/button";
import { Link } from "@mui/material";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  //   programsLength?: number;
  uid?: string;
  eventId?: string;
}

const SeriesAdder: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  eventId,
  //   enrolledSeries,
  //   programsLength,
  uid,
}) => {
  const { series } = useWorkoutSeries(uid);
  const addId = async (seriesId: string, action: "add" | "remove") => {
    if (eventId && action === "add") {
      await addEventIdToSeries(seriesId, eventId);
    } else if (eventId && action === "remove") {
      await removeEventIdToSeries(seriesId, eventId);
    }
  };

  return (
    <CreateModal
      isOpen={isOpen}
      onBackdrop={onCloseModal}
      onCloseModal={onCloseModal}
      heading=""
      onButtonPress={() => {}}
    >
      <div className="px-4 py-2">
        <div className="pb-2 cursor-pointer">
          <TopClose onCloseModal={onCloseModal} />
        </div>
        <div>
          <Divider />
        </div>

        {series.length === 0 ? (
          <div className="flex flex-col items-center py-4">
            <p className="text-2xl text-center font-semibold text-gray-700">
              {`You don't have any Programs`}
            </p>
            <div>
              <img
                className="w-24 h-24 object-cover"
                src="https://img.icons8.com/color/96/000000/stepper.png"
              />
            </div>
            <p className="text-gray-500 text-base pt-2 text-center">
              Create a program for your members to follow
            </p>
            <div className="flex py-4">
              <Link href="/createSeries">
                <Button appearance="contained">Create new</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex py-4">
              <Link href="/createSeries">
                <Button appearance="contained">Create new</Button>
              </Link>
            </div>
            <div className="max-h-[60vh] flex flex-wrap overflow-y-scroll">
              {series.map((item) => {
                const added = item.eventIds?.includes(eventId ? eventId : "");
                //   const enrolled = enrolledSeries?.includes(item?.id);

                return (
                  <div
                    key={item.id}
                    className="pb-8 sm:pr-4 w-full sm:w-[240px]"
                  >
                    <SeriesCard
                      series={item}
                      onAdd={() => addId(item.id, added ? "remove" : "add")}
                      onAddText={
                        added ? "Remove from Community" : "Add to Community"
                      }
                      selected={added}
                      onEditLink={`/createSeries?seriesId=${item.id}&section=home&mode=edit`}
                      // onDelete={() => {}}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-4 z-50">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={onCloseModal}
          >
            Close
          </button>
        </div>
      </div>
    </CreateModal>
  );
};

export default SeriesAdder;
