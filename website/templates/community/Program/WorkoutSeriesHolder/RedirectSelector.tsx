import Divider from "@components/divider/Divider";
// import { WorkoutSeries } from "@models/Workouts/Series";
import { Link } from "@mui/material";
// import clsx from "clsx";
// import { useState } from "react";
import CreateModal from "../CreateModal/CreateModal";
import TopClose from "../Feed/TopClose";
// import ProgramDesc from "./ProgramDesc";
// import SeriesAdder from "./SeriesAdder";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  seriesId?: string;
  // dayNumber: number;
  communityKey: string;
}

const options = [
  {
    text: "Add wokout",
    link: "createWorkout",
    icon: "https://img.icons8.com/office/80/000000/treadmill.png",
  },
  {
    text: "Add Live class",
    link: "createLive",
    icon: "https://img.icons8.com/office/80/000000/zoom.png",
  },
  {
    text: "Add nutrition",
    link: "createNutrition",
    icon: "https://img.icons8.com/office/80/000000/avocado.png",
  },
];

const RedirectSelector: React.FC<Props> = ({
  isOpen,
  onClose,
  seriesId,
  // dayNumber,
  communityKey,
}) => {
  //   const [isOpen, setIsOpen] = useState<boolean>(false);
  //   const onClose = () => setIsOpen(false);
  //   const onOpen = () => setIsOpen(true);

  return (
    <CreateModal
      isOpen={isOpen}
      onBackdrop={onClose}
      onCloseModal={onClose}
      heading=""
      onButtonPress={() => {}}
    >
      <div className="px-4 py-2">
        <div className="pb-2 cursor-pointer">
          <TopClose onCloseModal={onClose} />
        </div>
        <div>
          <Divider />
        </div>

        <p className="pt-4 text-lg font-semibold text-center text-gray-700">
          What do you want to add?
        </p>

        <div className="flex flex-wrap justify-start py-4">
          {options.map((item) => {
            return (
              <div className="w-1/2 pb-4 " key={item.text}>
                <Link
                  href={`/${item.link}?seriesId=${seriesId}&communityKey=${communityKey}`}
                >
                  <div className="flex flex-col items-center">
                    <img src={item.icon} className="object-cover w-12 h-12" />
                    <p className="text-gray-700 underline">{item.text}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="z-50">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </CreateModal>
  );
};

export default RedirectSelector;
