export interface InterviewBit {
  heading: string;
  text: string;
  video: string;
  tags: string[];
}

const items: string[] = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
];

const tagsGlobal = [
  "HRX",
  "Tabata",
  "HIIT",
  "Cardio",
  "Strength training",
  "Running",
  "Cycling",
  "Gym",
];

const makeid = (length: number, start: string) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `${start}:${result}`;
};

const getRandomVideo = () => {
  return items[Math.floor(Math.random() * items.length)];
};

const getRandomTags = () => {
  return [
    tagsGlobal[Math.floor(Math.random() * tagsGlobal.length)],
    tagsGlobal[Math.floor(Math.random() * tagsGlobal.length)],
    tagsGlobal[Math.floor(Math.random() * tagsGlobal.length)],
  ];
};

export const generateData = (q: string, num: number) => {
  const results: InterviewBit[] = [];
  for (let i = 0; i < num; i++) {
    results.push({
      heading: makeid(6, q),
      text: makeid(120, "desc"),
      video: getRandomVideo(),
      tags: getRandomTags(),
    });
  }

  return results;
};
