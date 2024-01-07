import {
  createCohort,
  createMemberList,
  removeMembersFromCohort,
  replaceMainCohort,
  saveTempCohort,
  updateCohort,
} from "./createUtils";
import { MixPanelRequest } from "./interface";

export const handleCreateCohort = async (req: MixPanelRequest) => {
  const now = Date.now();

  // create members
  const members = await createMemberList(req, now);
  console.log("new members", members.length);

  const cohort = createCohort(req, now, members.length);

  console.log("new cohort", cohort);
  await saveTempCohort(cohort, members, req.parameters.page_info);
  console.log("saved temp cohort");

  await replaceMainCohort(cohort.cohortId);
};

export const handleUpdateMembers = async (req: MixPanelRequest) => {
  const now = Date.now();

  console.log("add members number", req.parameters.members.length);

  // create members
  const members = await createMemberList(req, now);
  console.log("members in add", members.length);

  await updateCohort(
    req.parameters.mixpanel_cohort_id,
    members,
    now,
    req.parameters.mixpanel_cohort_name,
    req.parameters.mixpanel_cohort_description,
  );
};

export const handleRemoveMembers = async (req: MixPanelRequest) => {
  const now = Date.now();

  console.log("remove members number", req.parameters.members.length);

  await removeMembersFromCohort(
    req.parameters.mixpanel_cohort_id,
    req.parameters.members,
    now,
    req.parameters.mixpanel_cohort_name,
    req.parameters.mixpanel_cohort_description,
  );
};
