import { eventTypes } from "@models/Event/Event";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";

const courseProgramTemplates = [
  { heading: "Goal 1", text: "What is the goal 1" },
  {
    heading: "Goal 2",
    text: "Something interesting about this",
  },
];

const goalProgramTemplates = [
  { heading: "Prize 1", text: "This is sponsored by SocialBoat" },
  {
    heading: "Muscle Blaze",
    text: "4lb pack of Muscle Blaze",
  },
];

const howToParticipate: ListItem[] = [
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1633784641/Screenshot_2021-10-09_at_6.33.00_PM_e045kf.png",
    // } as CloudinaryMedia,
    heading: "Register & Join",
    text: "",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1633784639/Screenshot_2021-10-09_at_6.32.55_PM_mbprtr.png",
    // } as CloudinaryMedia,
    heading: "Plank",
    text: "Jump both feet back so you’re in plank position.",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1633784639/Screenshot_2021-10-09_at_6.32.47_PM_fzz8pj.png",
    // } as CloudinaryMedia,
    heading: "Push-up",
    text: "Drop to a push-up — your chest should touch the floor. You can also place your knees on the floor here, which makes the push-up easier.",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1633784635/Screenshot_2021-10-09_at_6.32.39_PM_lw8vok.png",
    // } as CloudinaryMedia,
    heading: "Plank",
    text: "Return to plank position. This can be a strict push-up, a push-up from the knees, or not a push-up at all. As in, just push yourself up from the floor as you would if you weren’t working out — your choice.",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1633784635/Screenshot_2021-10-09_at_6.32.22_PM_uijv2t.png",
    // } as CloudinaryMedia,
    heading: "Squat",
    text: "Jump feet back in toward hands.",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1633784640/Screenshot_2021-10-09_at_6.33.14_PM_vonulk.png",
    // } as CloudinaryMedia,
    heading: "Jump",
    text: "Explosively jump into the air, reaching arms straight overhead.",
  },
  {
    heading: "5-10 minute drill for 5 days",
    text: "30 seconds on & 30 seconds off. Start at 5 minutes & increase 1 minute every day",
  },
  {
    heading: "Game day: Make your final entry",
    text: "You have practiced & you have done well. Its time to go all out. Take a day rest before the final entry!",
  },
];

export const howToParticipate_burpee: ListItem[] = [
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1633784641/Screenshot_2021-10-09_at_6.33.00_PM_e045kf.png",
    // } as CloudinaryMedia,
    heading: "Squat",
    text: "From standing, squat and place hands on the floor in front of you, just outside of feet.",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1633784639/Screenshot_2021-10-09_at_6.32.55_PM_mbprtr.png",
    // } as CloudinaryMedia,
    heading: "Plank",
    text: "Jump both feet back so you’re in plank position.",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1633784639/Screenshot_2021-10-09_at_6.32.47_PM_fzz8pj.png",
    // } as CloudinaryMedia,
    heading: "Push-up",
    text: "Drop to a push-up — your chest should touch the floor. You can also place your knees on the floor here, which makes the push-up easier.",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1633784635/Screenshot_2021-10-09_at_6.32.39_PM_lw8vok.png",
    // } as CloudinaryMedia,
    heading: "Plank",
    text: "Return to plank position. This can be a strict push-up, a push-up from the knees, or not a push-up at all. As in, just push yourself up from the floor as you would if you weren’t working out — your choice.",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1633784635/Screenshot_2021-10-09_at_6.32.22_PM_uijv2t.png",
    // } as CloudinaryMedia,
    heading: "Squat",
    text: "Jump feet back in toward hands.",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1633784640/Screenshot_2021-10-09_at_6.33.14_PM_vonulk.png",
    // } as CloudinaryMedia,
    heading: "Jump",
    text: "Explosively jump into the air, reaching arms straight overhead.",
  },
  {
    heading: "5-10 minute drill for 5 days",
    text: "30 seconds on & 30 seconds off. Start at 5 minutes & increase 1 minute every day",
  },
  {
    heading: "Game day: Make your final entry",
    text: "You have practiced & you have done well. Its time to go all out. Take a day rest before the final entry!",
  },
];

export const cbcPlaceholder = [
  {
    heading: "Outcome driven",
    text: "The course has one defined goal, which is measured & achieved in course duration",
  },
  {
    heading: "Live & Small cohort",
    text: "In a max group of 25 people. This allows 2-way communication between instructor & students",
  },
  {
    heading: "Active community learning",
    text: "Everyone starts together & you learn and get inspired by your peers as you move forward",
  },
  {
    heading: "Demo day",
    text: "The course ends with your achievement & a lifelong access to the knowledgebase",
  },
];

export const challengePlaceholderUser: ListItem[] = [
  {
    // media: {
    //   resource_type: "image",
    //   format: "jpg",
    //   path: "v1634734324/pexels-pixabay-50987_1_pnzqos.jpg",
    // } as CloudinaryMedia,
    heading: "Set your fitness goal",
    text: "Create your profile, set your fitness goals and see your progress",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "jpg",
    //   path: "v1634734598/pexels-matilda-wormwood-4099096_vnwfv5.jpg",
    // } as CloudinaryMedia,
    heading: "Get daily workouts, diet and more",
    text: "Your coach will share a program with you to follow, which will help you succeed",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "jpg",
    //   path: "v1634734669/pexels-anton-46924_eeg2k2.jpg",
    // } as CloudinaryMedia,
    heading: "Share & motivate",
    text: "Create accountability by sharing your workouts on the community & answering questions",
  },
  {
    heading: "Win rewards",
    text: "Fitness has never been so rewarding. As you achieve your goals, we give you real prizes",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1634734779/Screenshot_2021-10-20_at_6.29.22_PM_bco0hi.png",
    // } as CloudinaryMedia,
    heading: "Build the habit",
    text: "Purpose of the challenge is to help you build a healthy habit. Stay fit, live strong!",
  },
];

export const challengeCoachFAQ: ListItem[] = [
  {
    heading: "How to connect your smart watch?",
    text: "Over the leaderboard you will see a button to connect your smart watch. Simple click and follow the steps",
  },
  {
    heading: "My calories don't show up?",
    text: "Give at least 60 minutes for data to sync. If they still don't show up, please share a screenshot of the activity. We will update the leaderboard as soon as possible",
  },
  {
    heading: "Is my health data safe?",
    text: "Yes. We will never share your data with any third party or push you ads.",
  },
  {
    heading:
      "I am joining late to the challenge, How should I sync my previous data?",
    text: "Simply share your previous workouts or connect your wearable. We will get data from your past 7 days",
  },
  {
    heading: "When will I get my rewards?",
    text: "Expect 5-7 days for physical goods to arrive your location and 1-2 days for us to email you your vouchers",
  },
];

export const challengePlaceholder: ListItem[] = [
  {
    // media: {
    //   resource_type: "image",
    //   format: "jpg",
    //   path: "v1634734324/pexels-pixabay-50987_1_pnzqos.jpg",
    // } as CloudinaryMedia,
    heading: "Start a team",
    text: "Create a team and describe what will you do in the challenge",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "jpg",
    //   path: "v1634734598/pexels-matilda-wormwood-4099096_vnwfv5.jpg",
    // } as CloudinaryMedia,
    heading: "Grow your team",
    text: "Invite people from your social media or your area who you think want to be fit and help the team win!",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "jpg",
    //   path: "v1634734669/pexels-anton-46924_eeg2k2.jpg",
    // } as CloudinaryMedia,
    heading: "Send workout & nutrition tips",
    text: "Engage with your community and teach them how they can win the challenge",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "png",
    //   path: "v1634734779/Screenshot_2021-10-20_at_6.29.22_PM_bco0hi.png",
    // } as CloudinaryMedia,
    heading: "Monetise by paid programs",
    text: "Launch paid on-demand programs or live classes where people can learn from you",
  },
  {
    // media: {
    //   resource_type: "image",
    //   format: "jpg",
    //   path: "v1634734826/gym-planking-fitness-616_inf7eu.jpg",
    // } as CloudinaryMedia,
    heading: "Share & grow",
    text: "As you win prizes, boast on social media and grow your following",
  },
];

export const useEventHeadings = (eventType?: eventTypes) => {
  return {
    keyWord: eventType === "challenge" ? "Challenge" : "Cohort",
    list1Heading:
      eventType === "challenge" ? "What's the prize?" : "What you get?",
    list1Placeholder:
      eventType === "challenge" ? goalProgramTemplates : courseProgramTemplates,
    list2Heading: eventType === "challenge" ? "How to participate?" : "",
    list2Placeholder: eventType === "challenge" ? howToParticipate : [],
    creativeList:
      eventType === "challenge" ? challengePlaceholder : cbcPlaceholder,
  };
};

// challenge kpis: Challenge starts | Challenge duration | Expertise level
