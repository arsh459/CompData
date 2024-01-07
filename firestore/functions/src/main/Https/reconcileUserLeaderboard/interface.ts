interface userLeaderQuery {
  eventId?: string;
  round?: string;
  sprintId?: string;
}

interface userActivityQuery {
  uid?: string;
  limit?: number;
  unix?: number;
}
