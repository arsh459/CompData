// import { handleWODV2 } from "../../main/Https/refreshUserLevels/handleWODV2";
import { Reminder, TaskState } from "./Reminder";
import { handleTaskState } from "./taskState";
// import { handleLevelDowngrade } from "./whatsapp/levelUpgrade/handleLevelDowngrade";
// import { handleLevelUpgrade } from "./whatsapp/levelUpgrade/handleLevelUpgrade";
import { morningNotification } from "./whatsapp/morning";
import { optInHandler } from "./whatsapp/optIn/optInHandler";
// import { handleNewTeamInviteMessage } from "./whatsapp/newTeam/handleNewTeamInvite";
// import { handleNewTeamMessage } from "./whatsapp/newTeam/handleNewTeamMessage";
import { paymentWAHandler } from "./whatsapp/payment/paymentWAHandler";
import { newPostReminder_whatsapp } from "./whatsapp/postReminder";
import { postReplyMessage } from "./whatsapp/postReplyMessage";
import { handleRewardMessage } from "./whatsapp/reward/handleRewardMessage";
import { handleSlotReminder } from "./whatsapp/slotReminder/handleSlotReminder";
// import { userDemoMessage } from "./whatsapp/userDemo";
// import { userDemoMessage } from "./whatsapp/userDemo";
// import { handleWearableConnect } from "./whatsapp/wearableConnect/handleWearableConnect";
import { welcomeMessageToEvent } from "./whatsapp/welcomeMessage";
import { handleTicket } from "./whatsapp/workoutFinish/handleTicket";
import { handleWorkoutFinishV2 } from "./whatsapp/workoutFinish/handleWorkoutFinishV2";

export const handleReminders = async (
  reminders: Reminder[],
  successState: TaskState,
  failedState: TaskState,
) => {
  for (const reminder of reminders) {
    // handle opt in message
    if (reminder.templateId === "opt_in_communications" && reminder.authorId) {
      const state = await optInHandler(reminder.authorId);
      await handleTaskState(reminder, state, successState, failedState);
    } else if (
      reminder.templateId === "slot_booking_confirmation" &&
      reminder.id &&
      reminder.slotId
    ) {
      const state = await handleSlotReminder(reminder.id, reminder.slotId);
      await handleTaskState(reminder, state, successState, failedState);
    } else if (
      reminder.templateId === "new_team" &&
      reminder.authorId &&
      reminder.eventId
    ) {
      // const state = await handleNewTeamMessage(
      //   reminder.authorId,
      //   reminder.eventId,
      // );
      await handleTaskState(reminder, true, successState, failedState);
    } else if (
      reminder.templateId === "new_team_invite" &&
      reminder.authorId &&
      reminder.eventId
    ) {
      // const state = await handleNewTeamInviteMessage(
      //   reminder.authorId,
      //   reminder.eventId,
      // );
      await handleTaskState(reminder, true, successState, failedState);
    } else if (
      reminder.templateId === "wearable_connect" &&
      reminder.authorId
    ) {
      // const state = await handleWearableConnect(reminder.authorId);
      await handleTaskState(reminder, true, successState, failedState);
    } else if (
      reminder.templateId === "level_upgrade" &&
      reminder.authorId &&
      reminder.parentId
    ) {
      // const state = await handleLevelUpgrade(
      //   reminder.authorId,
      //   reminder.parentId,
      // );
      await handleTaskState(reminder, true, successState, failedState);
    } else if (
      reminder.templateId === "level_downgrade" &&
      reminder.authorId &&
      reminder.parentId
    ) {
      // const state = await handleLevelDowngrade(
      //   reminder.authorId,
      //   reminder.parentId,
      // );
      await handleTaskState(reminder, true, successState, failedState);
    } else if (
      reminder.templateId === "reward" &&
      reminder.positionName &&
      reminder.rewardName &&
      reminder.authorId &&
      reminder.parentId &&
      reminder.communityId &&
      reminder.postId
    ) {
      // console.log("eherh");
      const state = await handleRewardMessage(
        reminder.id,
        reminder.rewardName,
        reminder.positionName,
        reminder.communityId,
        reminder.authorId,
        reminder.parentId,
        reminder.postId,
      );
      await handleTaskState(reminder, state, successState, failedState);
    } else if (
      (reminder.templateId === "new_post" ||
        reminder.templateId === "new_post_user") &&
      reminder.postId
    ) {
      try {
        // throw new Error("HI");
        const state = await newPostReminder_whatsapp(reminder);
        await handleTaskState(reminder, state, successState, failedState);
      } catch (error) {
        console.log("error in post creation");
      }
    } else if (
      reminder.templateId === "task_of_day_v2" &&
      reminder.levelTaskObj &&
      reminder.parentId
    ) {
      try {
        // const state = await handleWODV2(
        //   reminder.levelTaskObj,
        //   reminder.parentId,
        //   reminder.id,
        // );
        await handleTaskState(reminder, true, successState, failedState);
      } catch (error) {
        console.log("error in task_of_day_v2", error);
      }
    }

    // else if (
    //   reminder.templateId === "live_session" &&
    //   reminder.meetingTime
    // ) {
    //   try {
    //     const state = await liveReminder_whatsapp(reminder);
    //     await handleTaskState(reminder, state, successState, failedState);
    //   } catch (error) {
    //     console.log("error in message creation");
    //   }
    // }
    else if (
      reminder.templateId === "welcome_message" &&
      reminder.authorId &&
      reminder.eventId
    ) {
      // console.log("reminder", reminder);
      try {
        const state = await welcomeMessageToEvent(
          reminder.eventId,
          reminder.authorId,
        );
        await handleTaskState(reminder, state, successState, failedState);
      } catch (error) {
        console.log("error in message creation");
      }
    }

    // else if (
    //   reminder.templateId === "coach_invite" &&
    //   reminder.authorId &&
    //   reminder.eventId
    // ) {
    //   try {
    //     const state = await inviteMessageToEvent(
    //       reminder.eventId,
    //       reminder.authorId,
    //     );
    //     await handleTaskState(reminder, state, successState, failedState);
    //   } catch (error) {
    //     console.log("error in coach invite");
    //   }
    // }
    else if (
      (reminder.templateId === "post_reply" ||
        reminder.templateId === "post_reply_2") &&
      reminder.eventId &&
      reminder.postId &&
      reminder.parentPostId
    ) {
      try {
        const state = await postReplyMessage(
          reminder.eventId,
          reminder.parentPostId,
          reminder.postId,
          reminder.childPostId,
        );

        await handleTaskState(reminder, state, successState, failedState);
      } catch (error) {
        console.log("error in reply creation");
      }
    } else if (
      reminder.templateId === "morning_workout_reminder" &&
      reminder.eventId &&
      reminder.parentId
    ) {
      try {
        const state = await morningNotification(
          reminder.id,
          reminder.eventId,
          reminder.parentId,
          reminder.templateId,
        );
        await handleTaskState(reminder, state, successState, failedState);
      } catch (error) {
        console.log("error in message creation");
      }
    }

    // else if (
    //   reminder.templateId === "evening_workout_reminder" &&
    //   reminder.eventId &&
    //   reminder.parentId
    // ) {
    //   const state = await eveningNotificationV2(
    //     reminder.eventId,
    //     reminder.parentId,
    //   );
    //   await handleTaskState(reminder, state, successState, failedState);
    // }
    else if (
      reminder.templateId === "post_workout_finish" &&
      reminder.parentId &&
      reminder.authorId &&
      reminder.activityId
    ) {
      try {
        const state = await handleWorkoutFinishV2(
          // reminder.parentId,
          reminder.authorId,
          reminder.activityId,
        );

        await handleTaskState(reminder, state, successState, failedState);
      } catch (error) {
        console.log("error in post_workout_finish notification");
      }
    } else if (
      (reminder.templateId === "try_again" ||
        reminder.templateId === "need_info" ||
        reminder.templateId === "workout_rejected" ||
        reminder.templateId === "ticket_resolved") &&
      reminder.parentId &&
      reminder.authorId &&
      reminder.postId &&
      reminder.taskId
    ) {
      // console.log("HEHEE");
      try {
        const state = await handleTicket(
          reminder.parentId,
          reminder.authorId,
          reminder.taskId,
          reminder.postId,
          reminder.templateId,
        );

        await handleTaskState(reminder, state, successState, failedState);
      } catch (error) {
        console.log("error in handle ticket notification");
      }
    } else if (
      reminder.templateId === "notify_agent_activity" &&
      reminder.activityId &&
      reminder.authorId
    ) {
      try {
        // await notifyAgents(reminder.authorId, reminder.activityId, false);
        // await notifyAgents_pager(reminder.authorId, reminder.activityId, false);
        await handleTaskState(reminder, true, successState, failedState);
      } catch (error) {
        console.log("error in notify agent");
      }
    } else if (
      reminder.templateId === "notify_agent_activity_esc" &&
      reminder.activityId &&
      reminder.authorId
    ) {
      try {
        // await notifyAgents(reminder.authorId, reminder.activityId, true);
        // await notifyAgents_pager(reminder.authorId, reminder.activityId, true);
      } catch (error) {
        console.log("error in notify agent");
      }
    }

    // else if (
    //   reminder.templateId === "workout_series" &&
    //   reminder.seriesId &&
    //   reminder.authorId
    // ) {
    //   try {
    //     const state = await workoutSeriesMessage(
    //       reminder.authorId,
    //       reminder.seriesId,
    //     );
    //     await handleTaskState(reminder, state, successState, failedState);
    //   } catch (error) {
    //     console.log("error in workout series notification");
    //   }
    // }
    else if (
      reminder.templateId === "user_demo" &&
      reminder.authorId &&
      reminder.eventId
      // reminder.eventId
    ) {
      try {
        // const state = await userDemoMessage(
        //   reminder.authorId,
        //   reminder.eventId,
        // );
        await handleTaskState(reminder, true, successState, failedState);
      } catch (error) {
        console.log("error in user_demo notification");
      }
    } else if (
      reminder.templateId === "game_payment" &&
      reminder.parentId &&
      reminder.authorId &&
      reminder.paymentId
    ) {
      try {
        // console.log("here");
        const state = await paymentWAHandler(
          reminder.id,
          reminder.parentId,
          reminder.authorId,
          // reminder.paymentId,
        );
        // console.log("here", state);
        await handleTaskState(reminder, state, successState, failedState);
      } catch (error) {
        console.log("error in payment notification");
      }
    }

    // else if (
    //   reminder.templateId === "profile_complete" &&
    //   reminder.authorId &&
    //   reminder.eventId
    // ) {
    //   try {
    //     const state = await profileCompleteMessage(
    //       reminder.authorId,
    //       reminder.eventId,
    //     );
    //     console.log("profile create notif state", state);
    //     await handleTaskState(reminder, state, successState, failedState);
    //   } catch (error) {
    //     console.log("error in profile complete notification");
    //   }
    // }
  }
};
