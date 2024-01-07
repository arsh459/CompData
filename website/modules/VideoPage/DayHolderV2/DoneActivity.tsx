import { fitPointIcon } from "@constants/icons";
import { refreshIcon } from "@constants/icons/iconURLs";
import { Task } from "@models/Tasks/Task";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  earnedFP: number;
  item: Task;
  slug?: string;
  actId?: string;
}

const DoneActivity: React.FC<Props> = ({ earnedFP, item, actId, slug }) => (
  <>
    <div
      className={clsx(
        "w-full gap-2 sm:items-end md:items-stretch lg:items-end absolute bottom-0 left-0 right-0 px-4 pb-2 md:pb-4 z-50 hidden group-hover:flex flex-col sm:flex-row md:flex-col lg:flex-row"
      )}
    >
      <Link
        href={`/activity/${item?.id}`}
        className="flex-1 relative z-0 cursor-pointer"
      >
        <div className="rounded-xl border border-white flex-1 px-2 h-6 md:h-8 bg-[#17EA5F] flex justify-center items-center">
          <img src={fitPointIcon} className="w-3 aspect-1" />
          <p className="text-[#252525E5] truncate pl-2 text-xs lg:text-sm font-popM">
            {earnedFP}/{item.fitPoints} Fitpoints
          </p>
        </div>
      </Link>

      <Link
        href={`/program/${slug}/${item.id}${
          actId ? `?activityId=${actId}` : ""
        }`}
        className="flex-1 relative z-0 cursor-pointer"
      >
        <div className="flex-1 relative z-0">
          <div className="rounded-xl border border-white flex-1 px-2 h-6 md:h-8 bg-white flex justify-center items-center">
            <img src={refreshIcon} className="w-3 aspect-1" />
            <p className="text-[#252525E5] truncate pl-2 text-xs lg:text-sm font-popM">
              Workout again
            </p>
          </div>
        </div>
      </Link>
    </div>
    <div className="absolute inset-0 group-hover:bg-[#1BDD5D66]" />
  </>
);

export default DoneActivity;
