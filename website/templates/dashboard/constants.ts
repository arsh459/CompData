export const earnings = 13520;
export const students = 38;
export const due = 7524;
export const currency = "₹";

export interface NotificationInterface {
  heading: string;
  img: string;
  timeLabel: string;
  text: string;
}

export const notifications: NotificationInterface[] = [
  {
    heading: "Facebook view",
    text: "Someone just viewed your Advanced Yoga I",
    img: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2F5296499_fb_facebook_facebook%20logo_icon.png?alt=media&token=9f044986-84ec-4de7-9a92-f90b4d1462c8",
    timeLabel: "5 minutes ago",
  },
  {
    heading: "Payment due: Smriti",
    text: "Smriti's payment is due. Send her a reminder?",
    img: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-katie-e-3671083.jpg?alt=media&token=2124fb59-d35e-455a-aefc-30adf8d4681a",
    timeLabel: "2 hours ago",
  },
  // {
  //   heading: "Smriti just sent a message",
  //   text: "Hi ma'am, Can you pay in next class?",
  //   img: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-katie-e-3671083.jpg?alt=media&token=2124fb59-d35e-455a-aefc-30adf8d4681a",
  //   timeLabel: "3 hours ago",
  // },
  {
    heading: "New subscription",
    text: "Someone just booked single class on BookMyShow",
    img: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fbms.png?alt=media&token=3304f7a2-918b-416a-9879-f1abd019f81c",
    timeLabel: "20 minutes ago",
  },
];
