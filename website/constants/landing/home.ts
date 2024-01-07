import { LaunchCourseProps } from "@modules/Banner/LaunchCourse/LaunchCourse";
import { ProfileProps } from "@templates/profile";
import { ReviewsProps } from "@templates/profile/reviewSection/ReviewSection";

export const homeLaunchBanner: LaunchCourseProps = {
  textPrefix: "Play fitness games",
  textPrimary: "with your followers",
  textFlow: "flow",
  textCenter: false,
  textSuffix: "",
  buttonText: "Sign in - It's free",
  buttonLink: "/teams",
  buttonLabel: "Lifetime free for selected 1000 creators",
  textWeight: "medium",
  textSize: "xl",
  kpis: [
    "Transform 1000+ lives/month",
    "Get paid doing what you love",
    // "Hosted on your personal website",
  ],
  strings: [
    // "Fitness club",
    // "Yoga studio",
    // "Zumba classes",
    // "Passion",
    // "Beauty classes",
    // "Finance lives",
    // "Cooking tutorials",
    // "Passion community",
  ],
  // strings: ["Fitness", "Beauty", "Finance", "Cooking", "Paid Passion"],
};

const socialMediaIcons = [
  {
    name: "Instagram",
    icon: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Finstagram.png?alt=media&token=4420eb6e-2db4-4e3a-9141-cb244653159d",
  },
  {
    name: "Facebook",
    icon: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Ffacebook.png?alt=media&token=2f49172b-42e3-40df-94ec-6a9ca1b03517",
  },
  {
    name: "YouTube",
    icon: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fyoutube.png?alt=media&token=e88e3d04-3396-4f7c-9c18-600695f00f4d",
  },
  {
    name: "LinkedIn",
    icon: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Flinkedin.png?alt=media&token=8a227f5a-65a8-4213-9a7f-737a4ee21995",
  },
];

export const contactUsIcons = [
  {
    name: "Instagram",
    icon: "https://img.icons8.com/fluency/96/000000/instagram-new.png",
    link: "https://www.instagram.com/socialboat.live",
  },
  {
    name: "Facebook",
    icon: "https://img.icons8.com/color/48/000000/facebook.png",
    link: "https://www.facebook.com/socialboat.live",
  },
  {
    name: "WhatsApp",
    icon: "https://img.icons8.com/office/30/000000/whatsapp--v2.png",
    link: "https://api.whatsapp.com/send?phone=919958730020&text=Hi!",
  },
  {
    name: "Phone",
    icon: "https://img.icons8.com/ios-glyphs/30/000000/phone--v1.png",
    link: "tel:919958730020",
  },
  {
    name: "Email",
    icon: "https://img.icons8.com/ios/100/000000/email.png",
    link: "mailto:hello@socialboat.live",
  },
];

export const reviewsData: ReviewsProps = {
  reviews: [
    {
      name: "Rahul",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-italo-melo-2379005.jpg?alt=media&token=37a53650-9954-4860-8c36-448d7f192120",
      review:
        "The class was amazing. Megha explains everything in depth and is truly a master in the art",
      rating: 4.5,
      heading: "Masterclass experience",
    },
    {
      name: "David",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-spencer-selover-775358.jpg?alt=media&token=37917025-72a1-41a3-b318-b6295d517db5",
      review:
        "Megha gives great personal attention. The only issue for me is the timezone",
      rating: 5,
      heading: "Personal experience",
    },
  ],
  totalRating: 4.9,
  ratingSplit: [0.67, 0.14, 0.05, 0.03, 0.01],
  numRatings: 224,
};

export const cookingProfileData: ProfileProps = {
  editMobile: false,
  website: "richard.socialboat.live",
  profileImg:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-tirachard-kumtanom-887827.jpg?alt=media&token=a6be6822-b687-4e83-8e31-a3a1c242bd6d",
  profileName: "Chef Richard",
  socialMediaIcons: socialMediaIcons,
  liveURL:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fvideo_2_xf2bsk.mp4?alt=media&token=226085f8-a14e-4500-b0bb-34426a21f562",
  photoURL:
    "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_400/v1627111868/cloud_upload/video_2_xf2bsk.jpg",
  courseName: "Cooking Sushi",
  courseLive: true,

  courses: [
    {
      name: "Making bread",
      cost: 99,
      currency: "₹",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-malidate-van-784631.jpg?alt=media&token=3cf1dc8d-6aef-4a00-9a3c-3b3a490362dc",
    },
    {
      name: "Homemade macarons",
      cost: 49,
      currency: "₹",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-brigitte-tohm-239581.jpg?alt=media&token=9d5dfe45-91c8-4165-b9a1-41b468fde7ce",
    },
  ],

  campaign: {
    name: "Masterclass with Chef Bo",
    videoURL:
      "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fvideo_3_pattmi.mp4?alt=media&token=268d73f0-96fe-4c76-b627-357019562e07",
    url: "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_300,h_400,c_fill,g_auto/v1627111887/cloud_upload/video_3_pattmi.jpg",
    pledged: 3500,
    funded: 2700,
    currency: "₹",
  },

  communities: [
    {
      name: "Italian recipee",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-lisa-1279330.jpg?alt=media&token=3a18d55f-19bd-4853-abe4-8a51ab75b614",
      text: "Cook like an Italian",
      subtext: "15 online",
    },
    {
      name: "One on one",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-tirachard-kumtanom-887827.jpg?alt=media&token=a6be6822-b687-4e83-8e31-a3a1c242bd6d",
      text: "Book private session",
      subtext: "",
    },
  ],

  reviews: [
    {
      name: "Sumit",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-italo-melo-2379005.jpg?alt=media&token=37a53650-9954-4860-8c36-448d7f192120",
      review:
        "The class was amazing. Richard explains everything in depth and is truly a master in the art",
      rating: 4.5,
      heading: "Masterclass experience",
    },
    {
      name: "dhruv",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-spencer-selover-775358.jpg?alt=media&token=37917025-72a1-41a3-b318-b6295d517db5",
      review:
        "Richard gives great personal attention. The only issue for me is the timezone",
      rating: 5,
      heading: "Personal experience",
    },
  ],
  totalRating: 4.9,
  ratingSplit: [0.67, 0.14, 0.05, 0.03, 0.01],
  numRatings: 224,

  selectedColorNumber: 1,
};

export const beautyProfileData: ProfileProps = {
  editMobile: false,
  profileImg:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-cottonbro-4153629.jpg?alt=media&token=1dc1d92f-9e86-4cd2-a747-12b37f059670",
  profileName: "Nikita (Beautician)",
  website: "nikita-beauty.com",
  socialMediaIcons: socialMediaIcons,
  liveURL:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fproduction_ID_3698759_azboeg.mp4?alt=media&token=b08addf0-088c-4079-9831-35b648d352eb",
  photoURL:
    "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_300/v1627110289/cloud_upload/production_ID_3698759_azboeg.jpg",
  courseName: "Bridal makeup",
  courseLive: true,

  courses: [
    {
      name: "Foundation patterns",
      cost: 49,
      currency: "₹",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-cottonbro-4620843.jpg?alt=media&token=75b44d02-d27c-437d-b4af-e0c66bfc4a51",
    },
    {
      name: "Eye maskara",
      cost: 99,
      currency: "₹",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-%F0%9D%90%95%F0%9D%90%9E%F0%9D%90%A7%F0%9D%90%AE%F0%9D%90%AC-%F0%9D%90%87%F0%9D%90%83-%F0%9D%90%8C%F0%9D%90%9A%F0%9D%90%A4%F0%9D%90%9E-%F0%9D%90%AE%F0%9D%90%A9-%26-%F0%9D%90%8F%F0%9D%90%9E%F0%9D%90%AB%F0%9D%90%9F%F0%9D%90%AE%F0%9D%90%A6%F0%9D%90%9E-1722868.jpg?alt=media&token=c53f594c-e5de-43a3-8270-df1a67387500",
    },
  ],

  campaign: {
    name: "Skincare with Mac",
    videoURL:
      "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fproduction_ID_4008670_b0u2ts.mp4?alt=media&token=0747cbbe-79c5-4c27-8a2b-69b4f0b1ceab",
    url: "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_300,h_300,c_fill,g_auto/v1627110828/cloud_upload/production_ID_4008670_b0u2ts.jpg",
    pledged: 3500,
    funded: 2700,
    currency: "₹",
  },

  communities: [
    {
      name: "Makeup group",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-emma-bauso-2253832.jpg?alt=media&token=961e7a5e-0da1-4c0e-b106-28d74eddbec7",
      text: "Be an artist",
      subtext: "15 online",
    },
    {
      name: "One on one",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-cottonbro-4153629.jpg?alt=media&token=1dc1d92f-9e86-4cd2-a747-12b37f059670",
      text: "Book private session",
      subtext: "",
    },
  ],
  reviews: [
    {
      name: "Sneha",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-italo-melo-2379005.jpg?alt=media&token=37a53650-9954-4860-8c36-448d7f192120",
      review:
        "The class was amazing. Nikita explains everything in depth and is truly a master in the art",
      rating: 4.5,
      heading: "Masterclass experience",
    },
    {
      name: "Smriti",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-spencer-selover-775358.jpg?alt=media&token=37917025-72a1-41a3-b318-b6295d517db5",
      review:
        "Nikita gives great personal attention. The only issue for me is the timezone",
      rating: 5,
      heading: "Personal experience",
    },
  ],
  totalRating: 4.9,
  ratingSplit: [0.67, 0.14, 0.05, 0.03, 0.01],
  numRatings: 224,

  selectedColorNumber: 2,
};

export const financeProfileData: ProfileProps = {
  editMobile: false,
  profileImg:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-mentatdgt-937481.jpg?alt=media&token=8b81bd99-86b2-4ed4-8526-b9796376f3c5",
  profileName: "Vaibhav (CA)",
  website: "vaibhav.socialboat.live",
  socialMediaIcons: socialMediaIcons,
  liveURL:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-tima-miroshnichenko-7578614_yodgk5.mp4?alt=media&token=7758094f-468e-4c67-873e-a67217f23a98",
  photoURL:
    "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_250,h_250,c_fill,g_auto/v1627048111/cloud_upload/pexels-tima-miroshnichenko-7578614_yodgk5.jpg",
  courseName: "Personal Finance",
  courseLive: true,

  courses: [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-anna-nekrashevich-6801874.jpg?alt=media&token=ca549e87-e90c-4a05-b1c1-34c1e027bb45",
      name: "Investing in stocks",
      cost: 399,
      currency: "₹",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-pixabay-50987.jpg?alt=media&token=48a1fd5e-3758-4478-9470-f6eb91aaeb82",
      name: "Best credit card",
      cost: 99,
      currency: "₹",
    },
  ],

  campaign: {
    name: "Masterclass with David",
    videoURL:
      "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-rodnae-productions-5762286_jat5ja.mp4?alt=media&token=76f3d6ab-af7e-46d1-b020-8aa162903cbb",
    url: "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/v1627108772/cloud_upload/pexels-rodnae-productions-5762286_jat5ja.jpg",
    pledged: 5000,
    funded: 4300,
    currency: "₹",
  },

  communities: [
    {
      name: "Top stocks",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-alexander-mils-2068975.jpg?alt=media&token=3215dca9-3825-45ba-a21f-b8d48fc90607",
      text: "What is trensing?",
      subtext: "15 online",
    },
    {
      name: "One on one",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fpexels-mentatdgt-937481.jpg?alt=media&token=8b81bd99-86b2-4ed4-8526-b9796376f3c5",
      text: "Book private session",
      subtext: "",
    },
  ],
  reviews: [
    {
      name: "Rahul",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-italo-melo-2379005.jpg?alt=media&token=37a53650-9954-4860-8c36-448d7f192120",
      review:
        "The class was amazing. Vaibhav explains everything in depth and is truly a master in the art",
      rating: 4.5,
      heading: "Masterclass experience",
    },
    {
      name: "David",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-spencer-selover-775358.jpg?alt=media&token=37917025-72a1-41a3-b318-b6295d517db5",
      review:
        "Vaibhav gives great personal attention. The only issue for me is the timezone",
      rating: 5,
      heading: "Personal experience",
    },
  ],
  totalRating: 4.9,
  ratingSplit: [0.67, 0.14, 0.05, 0.03, 0.01],
  numRatings: 224,

  selectedColorNumber: 3,
};

export const homeYogaProfileData: ProfileProps = {
  editMobile: false,
  profileImg:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2FUntitled%20design%20(4).png?alt=media&token=5164cda7-e6a0-439a-9d7e-9e7760538031",
  profileName: "Megha (Yoga teacher)",
  website: "megha-classes.com",
  socialMediaIcons: socialMediaIcons,
  liveURL:
    "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Flivevideo_tvhofo.mp4?alt=media&token=c99ae100-c7a2-49fe-a5cb-14508262c6cc",
  photoURL:
    "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_300/v1627025394/cloud_upload/livevideo_tvhofo.jpg",
  courseName: "Morning Yoga - I",
  courseLive: true,

  courses: [
    {
      url: "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_300/v1627025638/cloud_upload/pexels-pavel-danilyuk-7521693_1_rzu9ci.jpg",
      name: "Meditation",
      cost: 99,
      currency: "₹",
    },
    {
      url: "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_300/v1627025718/cloud_upload/pexels-polina-tankilevitch-6739110_1_ctcfyv.jpg",
      name: "Sit in Padma",
      cost: 49,
      currency: "₹",
    },
  ],

  campaign: {
    name: "Zumba with Chicago celeb",
    url: "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_300/v1627032993/cloud_upload/fund_olwdkv.jpg",
    videoURL:
      "https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/w_300/v1627032993/cloud_upload/fund_olwdkv.mp4",
    pledged: 9999,
    funded: 7500,
    currency: "₹",
  },

  communities: [
    {
      name: "Food tips",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-jane-d-1099680.jpg?alt=media&token=163525a4-f165-4059-b7d6-95730469c1e5",
      text: "What to eat | 12 people",
      subtext: "5 online",
    },
    {
      name: "One on one",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2FUntitled%20design%20(4).png?alt=media&token=5164cda7-e6a0-439a-9d7e-9e7760538031",
      text: "Book private session",
      subtext: "",
    },
  ],

  reviews: [
    {
      name: "Rahul",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-italo-melo-2379005.jpg?alt=media&token=37a53650-9954-4860-8c36-448d7f192120",
      review:
        "The class was amazing. Megha explains everything in depth and is truly a master in the art",
      rating: 4.5,
      heading: "Masterclass experience",
    },
    {
      name: "David",
      url: "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/concierge%2Fpexels-spencer-selover-775358.jpg?alt=media&token=37917025-72a1-41a3-b318-b6295d517db5",
      review:
        "Megha gives great personal attention. The only issue for me is the timezone",
      rating: 5,
      heading: "Personal experience",
    },
  ],
  totalRating: 4.9,
  ratingSplit: [0.67, 0.14, 0.05, 0.03, 0.01],
  numRatings: 224,

  selectedColorNumber: 0,
};
