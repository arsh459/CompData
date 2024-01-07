export const cancelRequest = (
  reason: string,
): { status: boolean; reason: string } => {
  return {
    status: false,
    reason,
  };
};

export const acceptRequest = (): { status: boolean } => {
  return {
    status: true,
  };
};
