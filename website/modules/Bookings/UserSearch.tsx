import { usePlayerSearch } from "@hooks/search/usePlayerSearch";
import TextField from "@mui/material/TextField";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import PaidUsers from "./PaidUsers";

interface Props {
  baseRoute: string;
}

type userFilter = "paid" | "all" | "phone-number";

const UserSearch: React.FC<Props> = ({ baseRoute }) => {
  const [filterState, setFilterState] = useState<userFilter>("paid");
  const { searchString, setSearchString, fetchedData } = usePlayerSearch(
    "",
    25,
    filterState === "phone-number" ? "phone" : "name"
  );

  return (
    <div>
      <div className="py-4 flex">
        <div
          onClick={() => setFilterState("phone-number")}
          className={clsx(
            "px-4",
            filterState === "phone-number" ? "underline" : ""
          )}
        >
          <p>Search Phone Numbers</p>
        </div>
        <div
          onClick={() => setFilterState("all")}
          className={clsx("px-4", filterState === "all" ? "underline" : "")}
        >
          <p>Search All Users</p>
        </div>
        <div
          onClick={() => setFilterState("paid")}
          className={clsx("px-4", filterState === "paid" ? "underline" : "")}
        >
          <p>Paid Users</p>
        </div>
      </div>
      {filterState === "all" || filterState === "phone-number" ? (
        <div className="p-8">
          <TextField
            className="w-full"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            id="outlined-basic"
            label="Search player"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {fetchedData.map((item) => {
            return (
              <div key={item.uid} className="p-4 border">
                <div className="">
                  <div className="py-1">
                    <p className={clsx(" text-sm text-left")}>
                      {item.name ? item.name : "NO NAME"} |{" "}
                      {item.fpCredit ? item.fpCredit : "0"} FP | Phone:{" "}
                      {item.phone} | {item.uid} |{" "}
                      {item.fitnessGoal?.length ? item.fitnessGoal[0] : ""}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <Link
                    href={`https://socialboat.live/admin/patients/${item.uid}`}
                  >
                    <p className="underline text-red-500 text-sm">
                      Medical Record
                    </p>
                  </Link>
                </div>

                <div className="flex">
                  <Link
                    href={`https://socialboat.live/admin/patients/${item.uid}/progress`}
                  >
                    <p className="underline text-green-500 text-sm">
                      View Progress
                    </p>
                  </Link>
                </div>

                <div className="flex">
                  <Link href={`/admin/teamCheck/${item.uid}`}>
                    <p className="underline text-green-500 text-sm">
                      Team Check Page
                    </p>
                  </Link>
                </div>

                <div className="flex">
                  <Link href={`/admin/teamCheck/${item.uid}/config`}>
                    <p className="underline text-green-500 text-sm">
                      Configuration
                    </p>
                  </Link>
                </div>

                {/* <Link href={`${baseRoute}/${item.uid}/reports`}>
                  <p className="underline text-gray-500 text-sm">
                    Create Report
                  </p>
                </Link> */}

                <div className="flex">
                  <Link href={`${baseRoute}/${item.uid}/path`}>
                    <p className="underline text-lime-500 text-sm">
                      Achievement Path
                    </p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <PaidUsers />
        </>
      )}
    </div>
  );
};

export default UserSearch;
