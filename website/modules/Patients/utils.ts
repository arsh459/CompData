import { maitreeUID, monaUID } from "@templates/joinBoatTemplate/V6/utils";

export const getDocString = (ids: string[]) => {
  const docNames = ids.map((item) => {
    if (item === monaUID) {
      return "Dr. Mona";
    } else if (item === maitreeUID) {
      return "Dr. Maitree";
    } else {
      return "Admin";
    }
  });

  return docNames.join(", ");
};
