export interface MixpanelMember {
  email: string;
  mixpanel_distinct_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;

  user_id?: string;
}

// /mixpanel/cohorts/cohort_id/members/member_id
export interface MixpanelMemberFirstore extends MixpanelMember {
  lastSync: number;
}

// /mixpanel/cohorts
export interface MixPanelCohort {
  cohortId: string;
  cohortName: string;
  cohortDescription: string;

  numMembers: number;
  lastSync: number; // unix ts of sync

  // notificationIds
  onAddNotification: string;
  onCronNotifications?: string[];
}
