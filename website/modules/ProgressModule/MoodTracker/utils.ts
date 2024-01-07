import {
  badMoodEmoji,
  goodMoodEmoji,
  greatMoodEmoji,
  mehMoodEmoji,
  notGoodMoodEmoji,
} from "@constants/icons/iconURLs";

export const getEmojiByMood = (
  mood: number
): { icon: string; text: string } => {
  switch (mood) {
    case 1:
      return { text: "Sad", icon: badMoodEmoji };

    case 2:
      return { text: "Bit Low", icon: notGoodMoodEmoji };

    case 3:
      return { text: "Meh", icon: mehMoodEmoji };

    case 4:
      return { text: "Good", icon: goodMoodEmoji };

    case 5:
      return { text: "Great", icon: greatMoodEmoji };

    default:
      return { text: "-", icon: badMoodEmoji };
  }
};

export const getMoodString = (mood?: number): string => {
  switch (mood) {
    case 1:
      return "Some days are bad. Reach out to us or talk to Sakhi to help you through";

    case 2:
      return "One day at a time! Reach out to us or talk to Sakhi to help you through";

    case 3:
      return "A lot of ways to make this a happy day! Go for a walk or do your workout. You will feel better";

    case 4:
      return "Amazing! Keep following the plan to keep this feeling up!";

    case 5:
      return "You are awesome! Keep up the good work";

    default:
      return "";
  }
};
