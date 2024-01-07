export const downloadContent = (name: string, isChallenge?: boolean) =>
  isChallenge
    ? {
        heading: `Congratulations ${name}, You have successfully joined the challenge`,
        cards: [
          {
            text: "Finish Daily Tasks",
            img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Group%201000001253%201_yol4F-T-Ez.png?updatedAt=1697031718709",
          },
          {
            text: "View Leaderboard",
            img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Group%201000001252%201_a2I-A2aDT.png?updatedAt=1697031722821",
          },
          {
            text: "Build great Habits",
            img: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Swapnil_clear_and_sharp_photo_of_a_beautiful_indian_woman_smili_da147d0e-7a8d-401b-8870-33d7f83a6ef3%201_0aXJtTa9H.png?updatedAt=1697032854759",
          },
        ],
      }
    : {
        heading: `Congratulations ${name}, Your Free Plan is Ready! Download the app to claim`,
        cards: [
          {
            text: "Demo workout with Greesha",
            img: "https://ik.imagekit.io/socialboat/Frame%201000001101_TBUZGe5en.png?updatedAt=1694078069979",
          },
          {
            text: "1000+ Healthy diet Recipes",
            img: "https://ik.imagekit.io/socialboat/Frame%201906_Ss4GM_fgV.png?updatedAt=1692693308929",
          },
          {
            text: "Free Health Consultation call",
            img: "https://ik.imagekit.io/socialboat/Frame%201905_C9W7ZpUeB8.png?updatedAt=1692693308920",
          },
        ],
      };
