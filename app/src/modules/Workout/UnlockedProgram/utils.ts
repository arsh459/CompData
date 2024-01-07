import { userBootcampStatus } from "@hooks/bootcamp/useBootCamp";
import { Badge } from "@models/Prizes/Prizes";

export const isBootcampBadge = (badge?: Badge, bootcampBadgeId?: string) => {
  if (bootcampBadgeId && badge && badge.id === bootcampBadgeId) {
    return true; // user.bootcampDetails.bootcampId;
  }

  return false;
};

export const hasAccess = (
  bootcampStatus: userBootcampStatus,
  bootcampBadge: boolean
) => {
  if (
    bootcampBadge &&
    (bootcampStatus === "ONGOING_JOINED" || bootcampStatus === "FUTURE")
  ) {
    return true;
  }

  return false;
};
