import { waTemplateNames } from "../../PubSub/notifications/constants";

export const MAX_NOTIFICATIONS_USER_DAY = 2;
export const MIN_NOTIFICATION_DURATION_MS = 2 * 60 * 60 * 1000;

export interface MixPanelResponse {
  action: "members" | "add_members" | "remove_members";
  status: "success" | "failure";
  error?: {
    message: string;
    code: number;
  };
}

export interface mixpanelPageInfo {
  total_pages: number;
  page_count: number;
}

export interface MixPanelRequest {
  action: "members" | "add_members" | "remove_members";
  parameters: {
    mixpanel_project_id: string;
    mixpanel_cohort_name: string;
    mixpanel_cohort_id: string;
    mixpanel_cohort_description: string;
    mixpanel_session_id: string;
    page_info: mixpanelPageInfo;
    members: MixpanelMember[];
  };
}

export interface MixpanelMember {
  // email: string;
  mixpanel_distinct_id: string;
  // first_name: string;
  // last_name: string;
  phone?: string;
  $timezone?: string;

  user_id?: string;
}

// /mixpanel/cohorts/cohort_id/members/member_id
export interface MixpanelMemberFirstore extends MixpanelMember {
  lastSync: number;
  lastSent: number; // message sent time
  sendTemplateId?: waTemplateNames;
  timezoneOffset?: number;
}

// /sends/mixpanelId
export interface NotificationStatus {
  sentUnix: number;
  notificationId: string;

  id: string;
  mixpanel_distinct_id: string;
  uid: string;

  sent?: boolean;
  delivered?: boolean;
  read?: boolean;
  failed?: boolean;
}

// /mixpanel/cohorts
export interface MixPanelCohort {
  cohortId: string;
  cohortName: string;
  cohortDescription: string;

  numMembers: number;
  lastSync: number; // unix ts of sync

  // notificationIds
  onAddNotification?: string;
  onCronNotifications?: string[];
  resync?: {
    totalPages: number;
    donePages: number[];
  };
}
