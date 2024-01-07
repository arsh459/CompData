import { Equipment } from "@models/Tasks/Task";

export const getEquipmentNames = (arr: Equipment[] | undefined) => {
  return arr
    ?.map(({ equipmentName = "" }: { equipmentName?: string }) => equipmentName)
    .filter(Boolean)
    .join(" , ");
};
