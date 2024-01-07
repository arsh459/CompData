import Button from "@components/button";
import {
  SourceType,
  useUserPrevActivities,
  sourceTypeArr,
} from "@hooks/activities/useUserPreviousActs";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { SortTypes } from "@hooks/tasks/useTasks";
import { MenuItem, TextField } from "@mui/material";
import Link from "next/link";
import React from "react";
interface Props {
  uid?: string;
}
const now_2 = Date.now() - 24 * 2 * 60 * 60 * 1000;
const ListUserActivity: React.FC<Props> = ({ uid }) => {
  const { user } = useUserV2(uid);
  const { activities, setSortBy, setTaskType, taskType, sortBy } =
    useUserPrevActivities(uid, now_2);

  return (
    <div className="w-4/5 mx-auto pt-8">
      <div className="flex pb-4 pl-4">
        <Link href={`/admin/dashboardV2/${uid}/add`}>
          <Button appearance="contained">Add New Activity</Button>
        </Link>
      </div>

      <p>list of Activity </p>
      <div className="w-full mx-auto py-8 flex gap-3">
        <TextField
          select
          placeholder={"Filter by type"}
          label={"Filter by type"}
          variant="outlined"
          onChange={(e) => setTaskType(e.target.value as SourceType | "all")}
          value={taskType}
          className="uppercase w-1/2"
          InputLabelProps={{
            shrink: true,
          }}
        >
          {sourceTypeArr.map((each) => (
            <MenuItem key={each} value={each} className="uppercase">
              {each}
            </MenuItem>
          ))}
          <MenuItem value="all" className="uppercase">
            all
          </MenuItem>
        </TextField>
        <TextField
          select
          placeholder={"Sort by order"}
          label={"Sort by order"}
          variant="outlined"
          onChange={(e) => setSortBy(e.target.value as SortTypes)}
          value={sortBy}
          className="uppercase w-1/2"
          InputLabelProps={{
            shrink: true,
          }}
        >
          <MenuItem value="new_to_old" className="uppercase">
            {"new_to_old".replaceAll("_", " ")}
          </MenuItem>
          <MenuItem value="old_to_new" className="uppercase">
            {"old_to_new".replaceAll("_", " ")}
          </MenuItem>
          <MenuItem value="nothing" className="uppercase">
            {"nothing".replaceAll("_", " ")}
          </MenuItem>
        </TextField>
      </div>
      <div className="flex flex-wrap gap-3">
        {activities?.map((item) => {
          return (
            <div
              className=" border p-4 cursor-pointer font-medium text-red-500 capitalize "
              key={`${item?.id}_${item?.postId}`}
            >
              <Link
                passHref
                legacyBehavior
                href={`/admin/dashboardV2/${item.authorUID}/${item.id}`}
              >
                <a target="_blank">
                  <div>
                    <ListActivityItem
                      primaryText="ActivityName"
                      secondaryText={item?.activityName}
                    />

                    <ListActivityItem
                      primaryText="userName"
                      secondaryText={
                        item?.authorUID === user?.uid ? user?.name : ""
                      }
                    />
                    <ListActivityItem
                      primaryText="Calories"
                      secondaryText={item?.calories?.toString()}
                    />
                    <ListActivityItem
                      primaryText="Source"
                      secondaryText={item?.source}
                    />
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListUserActivity;
const ListActivityItem: React.FC<{
  primaryText?: string;
  secondaryText?: string;
}> = ({ primaryText, secondaryText }) => (
  <p>
    {primaryText}: <span className="text-blue-500">{secondaryText}</span>
  </p>
);
