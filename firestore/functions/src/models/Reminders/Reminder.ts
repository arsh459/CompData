export type TaskState =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "URGENT"
  | "URGENT_DONE";

export type whatsappTemplates =
  | "new_team" // when creator makes team
  | "new_team_invite" // invite members to the team
  | "wearable_connect" // connect wearable message
  | "level_upgrade" // level upgrage
  | "level_downgrade"
  | "reward"
  | "new_post" // on post creation by host
  | "new_post_user" // on post creation by anyone
  | "welcome_message" // on community/event join
  | "coach_invite" // on invite message
  | "live_session" // live session reminder
  | "new_task_challenge" // new event task
  | "post_workout_finish"
  | "try_again"
  | "workout_rejected"
  | "need_info"
  | "ticket_resolved"
  | "profile_complete"
  | "user_demo"
  | "workout_series"
  | "morning_workout_reminder"
  | "evening_workout_reminder"
  | "post_reply_2"
  | "post_reply"
  | "new_claps_to_session"
  | "new_checkin_to_session"
  | "new_claps_to_author"
  | "new_reply_to_author"
  | "task_of_day_v2"
  | "notify_agent_activity"
  | "notify_agent_activity_esc"
  | "game_payment"
  | "slot_booking_confirmation"
  | "workout_reminder_notification"
  | "summary_message"
  | "opt_in_communications"
  | "diet_form_filled"
  | "slot_booking_reminder"
  | "appointment_booking_confirmation"
  | "appointment_booking_reminder";

export interface Reminder {
  id: string;
  state: TaskState;
  templateId: whatsappTemplates;
  communityId?: string;

  // for event reminders
  eventId?: string;
  badgeId?: string;
  badgeDay?: number;
  seriesId?: string;
  cohortId?: string;
  postId?: string; // if someone did an update to the session
  taskId?: string;
  childPostId?: string; // to see if 2nd degree post
  parentPostId?: string; // to know the name of person who is replied to
  authorId?: string; // if someone clapped for you or replied to you

  createdOn: number;
  scheduledAt?: number; // every 30 minutes, scan for PENDING with past scheduledOn
  meetingTime?: number; // for scheduled meeting time

  after?: number;
  parentId?: string;

  streamId?: string;
  workoutType?: "lives" | "exercises";
  liveId?: string;

  positionName?: string;
  rewardName?: string;
  date?: string;
  activityId?: string;

  levelTaskObj?: levelTaskObjInterface;
  paymentId?: string;
  slotId?: string;
  slotBookingId?: string;
  appointmentId?: string;
}

export interface ReminderProgress {
  [uid: string]: string;
}

export interface levelTaskObjInterface {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
}

export interface levelPointObjInterface {
  level0: number;
  level1: number;
  level2: number;
  level3: number;
  level4: number;
  level5: number;
}

export type levelStrings =
  | "level0"
  | "level1"
  | "level2"
  | "level3"
  | "level4"
  | "level5";
