export const GREESHA_UID = "tw2b3klNtDcKbASqnoNSWXrUxoh2";

export const getTeamName = (uid?: string) => {
  if (uid === GREESHA_UID) {
    return "Talk to Coach Greesha's Team?";
  }

  return "Book Health Consultation";
};
