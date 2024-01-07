// import { ScoreEntry } from "@models/ScoreEntry/ScoreEntry";
import { ListingProps } from "@templates/listing";
import { listingTemplateV1Props } from "@templates/listing/listingTemplateV1";
import { QuestionProps } from "@templates/liveVideo/QuestionTile/QuestionTile";
// import { socialMediaIcons } from "@templates/profile/SocialMediaHeader/constants";
import { WhatsappProps } from "@templates/whatsapp";

export const liveMakeup =
  "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fproduction_ID_4110446_msjjyz.mp4?alt=media&token=362e73f5-2082-47a8-9ddf-4c7f23512497";
("https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2Fmakeup.mp4?alt=media&token=0cda4617-93cf-487a-8f28-b2584a2bb857");
export const liveClass =
  "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fproduction_ID_4359315_zvc85t.mp4?alt=media&token=b113f416-0fa4-47c0-b05f-a4e0157485e8";
// "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2Fpexels-anthony-shkraba-production-8134905_fiad1e.mp4?alt=media&token=d3807f1c-5a4d-4dc5-bcfb-09f35438db6e";
// "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2Flive.mp4?alt=media&token=129fee95-9bb0-4611-b570-8a3871522950";

export const heading = "Product design";
export const currentQuestion = "Mindfull Yoga";

export const headingMakeup = "Top Products";
export const makeupDesc = "How to makeup for glow";

export const questions: QuestionProps[] = [
  {
    question: "How to select brand colors?",
    upvotes: 2,
    comments: 1,
    status: "unanswered",
    viewStyle: "question",
  },
  {
    question: "How to design UI?",
    upvotes: 0,
    comments: 1,
    status: "duplicate",
    viewStyle: "question",
  },
];

export const commentsInLive: QuestionProps[] = [
  {
    question: "Love the class. I always leave the session relaxed",
    upvotes: 2,
    comments: 1,
    status: "unanswered",
    viewStyle: "comment",
    person:
      "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2Fpexels-andrea-piacquadio-733872.jpg?alt=media&token=bde10d34-815e-4e70-807b-7a810f1369d1",
  },
  {
    question:
      "I am not able to sit in padma asan. Can you suggest something else?",
    upvotes: 0,
    comments: 1,
    status: "duplicate",
    viewStyle: "comment",
    person:
      "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2Fpexels-justin-shaifer-1222271.jpg?alt=media&token=af5e3ec4-a94d-4e2a-836e-f6085ab97476",
  },
];

export const personURLs = [
  "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2Fpexels-andrea-piacquadio-733872.jpg?alt=media&token=bde10d34-815e-4e70-807b-7a810f1369d1",
  "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2Fpexels-justin-shaifer-1222271.jpg?alt=media&token=af5e3ec4-a94d-4e2a-836e-f6085ab97476",
];

export const live = true;
export const numClasses = 16;
export const durationInWeeks = 8;
export const oneLiner = "8 week advanced Yoga for weightloss and flexibility";
export const durationEachClassMinutes = 40;

export const yogaListingProps: ListingProps = {
  headerVideo:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fyogalisting_h9wcbr.mp4?alt=media&token=72b06f99-4301-4f12-beb1-841e367b5b7b",
  heading: "Advanced Yoga I",
  rating: 4.8,
  numRatings: 1325,
  price: 455,
  currency: "₹",
  registratinCloseDate: "14 July",
  live: true,
  numClasses: 16,
  durationInWeeks: 8,
  oneLiner: "8 week advanced Yoga for weightloss and flexibility",
  durationEachClassMinutes: 40,
  icons: [
    {
      icon: "./images/people-outline.svg",
      text: "8 person batch",
    },
    {
      icon: "./images/clock-outline.svg",
      text: "3 slots available",
    },
    {
      icon: "./images/headphones-outline.svg",
      text: "English & hindi",
    },
  ],
  about: `Yoga Nidra, also known as yogic sleep, is a guided meditation technique, performed in savasana or resting position on your back. This guided meditation guides you through 5 stages to allow you to reboot and end the practice feeling completely rejuvenated. Therapeutic yoga classes are gentle and include yoga poses modified to individual’s needs, gentle movement sequences to help improve the body’s movement patterns, yogic breath techniques, and guided relaxation.  Each class is structured to address a region or system of the body that may need balancing for better health and well being. These classes are appropriate for individuals with musculoskeletal dis-ease or injury, neuromuscular issues, chronic pain, balance or movement deficits, anxiety or depression, respiratory issues, or other imbalances or dysfunctions that individuals may suffer.`,
};

export const yogaMessage: WhatsappProps = {
  nameOfPerson: "Arjun",
  course: "Advanced Yoga I",
  toStartIn: "2 hours (4:00pm - 4:45pm)",
  instructorName: "Megha",
  msgType: "reminder",
};

export const inviteMessage: WhatsappProps = {
  nameOfPerson: "Arjun",
  course: "Advanced Yoga I",
  toStartIn: "2 hours (4:00pm - 4:45pm)",
  instructorName: "Megha",
  msgType: "invite",
  pointers: [
    { text: "8 * 4 pushups" },
    { text: "8 * 4 Squats" },
    { text: "8 * 4 Lunges" },
    { text: "4 * 3 Pullups" },
  ],
};

export const yogaMessage2: WhatsappProps = {
  nameOfPerson: "Arjun",
  course: "Advanced Yoga I",
  toStartIn: "2 hours (4:00pm - 4:45pm)",
  instructorName: "Megha",
  msgType: "workout",
  pointers: [
    { text: "8 * 4 pushups" },
    { text: "8 * 4 Squats" },
    { text: "8 * 4 Lunges" },
    { text: "4 * 3 Pullups" },
  ],
  img: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2FScreenshot%202021-10-27%20at%201.31.34%20PM.png?alt=media&token=74a04914-c962-4821-88d6-824c6cea4be5",
};

export const beautyListingProps: ListingProps = {
  headerVideo:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fproduction_ID_3698759_azboeg.mp4?alt=media&token=b08addf0-088c-4079-9831-35b648d352eb",
  heading: "Bridal makeup",
  rating: 4,
  numRatings: 2325,
  price: 999,
  currency: "₹",
  registratinCloseDate: "12 July",
  live: true,
  numClasses: 4,
  durationInWeeks: 4,
  oneLiner: "4 week course to learn bridal makeup",
  durationEachClassMinutes: 30,
  icons: [
    {
      icon: "./images/people-outline.svg",
      text: "4 person batch",
    },
    {
      icon: "./images/clock-outline.svg",
      text: "2 slots available",
    },
    {
      icon: "./images/headphones-outline.svg",
      text: "English & hindi",
    },
  ],
  about: `- You will learn advanced professional techniques including: creating looks for editorial photography, television, film, high fashion, and creative makeup.

- One-on-one instructions with our professional Makeup Artist tutors who are directly involved within the industry.

- There is a strong focus on advanced content creation and portfolio building within this course. We highly encourage our students to use the course assignments to build their professional portfolio.`,
};

export const beautyMessage: WhatsappProps = {
  nameOfPerson: "Shefali",
  course: "Bridal makeup",
  toStartIn: "2 hours (4:00pm - 4:30pm)",
  instructorName: "Nikita",
  msgType: "reminder",
};

export const cookingListingProps: ListingProps = {
  headerVideo:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fvideo_2_xf2bsk.mp4?alt=media&token=226085f8-a14e-4500-b0bb-34426a21f562",
  heading: "Sushi masterclass",
  rating: 4,
  numRatings: 325,
  price: 399,
  currency: "₹",
  registratinCloseDate: "10 July",
  live: true,
  numClasses: 4,
  durationInWeeks: 2,
  oneLiner: "2 week course to learn bridal makeup",
  durationEachClassMinutes: 45,
  icons: [
    {
      icon: "./images/people-outline.svg",
      text: "10 person batch",
    },
    {
      icon: "./images/clock-outline.svg",
      text: "3 slots available",
    },
    {
      icon: "./images/headphones-outline.svg",
      text: "English & hindi",
    },
  ],
  about: `The Basics of Gourmet Cooking is a beginning series of cooking classes perfect for 
cooks who are just starting out or would like to refresh their fundamentals.
The 8 week series of classes consists of lectures, demonstrations, and hands-on-classes
 exploring a wide variety of culinary concepts. We teach classic French cooking technique
 which is the standard of the world.
    Mardi has designed this series of classes to teach you good, basic cooking skills.
We will learn, create, and enjoy a new menu each week, including a dessert of a different
fresh fruit each week, paired with a different cheese each week.`,
};

export const cookingMessage: WhatsappProps = {
  nameOfPerson: "Mahesh",
  course: "Sushi masterclass",
  toStartIn: "2 hours (4:00pm - 4:45pm)",
  instructorName: "Rich",
  msgType: "reminder",
};

export const listingPagePropsV1: listingTemplateV1Props = {
  editing: false,
  heading: "4 Week Weightloss Yoga Program",
  headerVideo:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fyogalisting_h9wcbr.mp4?alt=media&token=72b06f99-4301-4f12-beb1-841e367b5b7b",
  media: [],
  id: "sample-page",
  ownerUID: "",
  live: false,
  cta: "Book",
  program: [],
  currency: "₹",
  price: 999,
  about: `Yoga Nidra, also known as yogic sleep, is a guided meditation technique, performed in savasana or resting position on your back. This guided meditation guides you through 5 stages to allow you to reboot and end the practice feeling completely rejuvenated. Therapeutic yoga classes are gentle and include yoga poses modified to individual’s needs, gentle movement sequences to help improve the body’s movement patterns, yogic breath techniques, and guided relaxation.  Each class is structured to address a region or system of the body that may need balancing for better health and well being. These classes are appropriate for individuals with musculoskeletal dis-ease or injury, neuromuscular issues, chronic pain, balance or movement deficits, anxiety or depression, respiratory issues, or other imbalances or dysfunctions that individuals may suffer.`,
  profileImg: {
    access_mode: "public",
    id: "",
    thumbnail_url:
      "https://res.cloudinary.com/htt-holidaying-travel-technologies/image/upload/c_thumb,w_200,g_face/v1632465937/pexels-yan-krukov-8436769_zj1vkg.jpg",
    asset_id: "",
    batchId: "",
    bytes: 24400,
    created_at: "Sep 24, 2021 12:15 pm",
    etag: "",
    format: "jpg",
    resource_type: "image",
    height: 4000,
    width: 4000,
    original_extension: "jpg",
    original_filename: "",
    placeholder: false,
    version: 1,
    version_id: "",
    signature: "",
    tags: [],
    type: "upload",
    path: "v1632465937/pexels-yan-krukov-8436769_zj1vkg",
    public_id: "v1632465937/pexels-yan-krukov-8436769_zj1vkg",
    url: "https://res.cloudinary.com/htt-holidaying-travel-technologies/image/upload/v1632465937/pexels-yan-krukov-8436769_zj1vkg.jpg",
    secure_url:
      "https://res.cloudinary.com/htt-holidaying-travel-technologies/image/upload/v1632465937/pexels-yan-krukov-8436769_zj1vkg.jpg",
  },
  profileName: "Megha",
  bio: "Megha is a creator educator who has been teaching yoga from the past 15 years. She has been awarded the Yogini award 6 times & has 200k followers on Instagram. She now teaches yoga to help people get fit. She says - Anyone can lead a healthy and fit life by taking out just 30 minutes from their life daily for fitness.",
  userKey: "megha-classes",
  socialMediaIcons: {
    facebook: "https://socialboat.live",
    linkedIn: "https://socialboat.live",
    instagram: "https://socialboat.live",
    youtube: "https://socialboat.live",
  },
  cohorts: [],
  viewStyle: "mobile",
  aboutCreator: "Yoga & Pilates expert",
};
