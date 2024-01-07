import * as admin from "firebase-admin";
import { LeaderBoard } from "../../../models/LeaderBoard/interface";

export const handleManualRank = async () => {
  const ranksToUpdate = [
    {
      Rank: 1,
      Name: "Dr. J. Susan Roy",
      UID: "W0sgg0cSAmOTQqhp4eCVNXncWsu2",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 2,
      Name: "Gaurav Sood",
      UID: "WrVSC5mMr5X5lt7jKTxqA7DtqC22",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 3,
      Name: "Parthiban",
      UID: "YmRSpX0eB0bOEx24xjVcm3easYK2",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 4,
      Name: "Gineel",
      UID: "jRA7ab7CSgYczv8oSM95nlxj3Zw2",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 5,
      Name: "Aarja Bedi",
      UID: "1Xgo2Pr8zrOF7y7e565gB4SwQQl1",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "I have been a part of the SocialBoat community quite actively over the past month and it's been an absolute delight. The concept of creating a community, fun challenges with rewards to incentivise people to exercise and improve their own health is amazing! As a coach I've thoroughly enjoyed getting to know like-minded people through the pwer of sharing workouts and motivating the others to get in some movement. Looking forward to growing my online community, meeting more sweaty heads and getting as many of you to move your ass,enjoy the endorphins and show us you worked out! Oh and the best part - its all free! So why wouldnt you take part when you have the chance to win some cool freebies!!",
    },
    {
      Rank: 6,
      Name: "Sasmita",
      UID: "HYNHKAcwb5TkTA5vavLB9yewJNu1",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "I am glad that i came across Social Boat platform . Participated in few games and thoroughly enjoyed.Though i was regular with my workouts , the gamification idea is unique and it motivates me to do my workouts regularly.Since there are various kind of coaches one can choose a particular type which suits there lifestyle. Looking forward to the games ahead.",
    },
    {
      Rank: 7,
      Name: "Ashok Vishnoi",
      UID: "zxEOIpN3zjbhExXCybBB4UWxdci1",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 8,
      Name: "Balraj Kaushik",
      UID: "7wbH5PiGmhf2EzKiuSl3F0YBEO02",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 9,
      Name: "Seema Jain",
      UID: "4azHs8BIe9aStzPI4AGF8EOmcM33",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 10,
      Name: "Ashly Alemao",
      UID: "B8uNQQB91LapOLQAQvIQ92qwhKs1",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 31,
      Name: "Sunder Bishnoi",
      UID: "CEaCmCWdqrUC52Effiw2ZsPHT4j2",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 11,
      Name: "Sagar Kaushik",
      UID: "lCAPgIm0QiMkrYOBMSsICjCU0Dj2",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 12,
      Name: "Bharath PS",
      UID: "NFoIbbtOIVTwdOj8S6FOCx5Wfz92",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 13,
      Name: "Sourabh",
      UID: "AP602py2HXZpoQxI12yaip9zEf22",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 14,
      Name: "Rohit Tiwari",
      UID: "CoC5FUkJPWSquosmppQ4WZxA1uB3",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "Social Boat has created a great community platform to encourage fitness and healthy lifestyle. The process felt extremely simple to join the community and even create a community. Very engaging and transparent.",
    },
    {
      Rank: 15,
      Name: "Gagan",
      UID: "cOT8jJkbpqTtYGIyV5fq4749pYt2",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "Corona and lockdown got the life to astand still sitting idle at home i had hained a lot of weight which i never did iny 30 years of my life. Social boat challenge gave me the push that i needed i always wanted to get paid for the calories i burn. And that thats what Socialboat did in kind. I find myself working out on my Spinning bike in the middle of the night which i would never do if this competition was not there it has been a great motivator for me and a lot more people.",
    },
    {
      Rank: 16,
      Name: "Sumit Takhar",
      UID: "R9MydU8LXlbnmvGtAE0Cqs7UrYq1",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "Being a fitness coach and a creative person as iam am artist too , I love doing things which excites me or something different from others that's where I came across social boat . A platform where u do fitness challenges to stay motivated and get rewards too for completing challenges .wow isn't it. I love the platform , I joined as a coach and lemme tell you guys thsi is amazing . Im glad to see how every coach push their students here to complete the challenges and not only this you will get live classes and more and bare min cost and in rewwards and challenges you can participate free of cost . Free me kuch bhi nai milta waise but you getting fitness and rewards . Glad to be a part of the community .iam loving it",
    },
    {
      Rank: 17,
      Name: "Paramvir Sandhu",
      UID: "HA2DCAPmT6Vfq7dyBvR6Pm9SeIB3",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 18,
      Name: "Decathlon Atria Mall",
      UID: "fc7abbcd-0b54-41c1-807a-59337691935c",
      IsTeam: "Yes",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 19,
      Name: "Dheeraj Grover",
      UID: "4ZTQ4XA1JjOGPbCBNPq5qduDwL02",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 20,
      Name: "Imti Jamir",
      UID: "U0G7RfhLRDPtzGVroAA1jzGrTdA3",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 21,
      Name: "Ashish Arya",
      UID: "8poTG4d7qPccrMrvrdrcTU6M3YD2",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "It's a platform where you can earn while training only by losing calories.",
    },
    {
      Rank: 22,
      Name: "Anchal",
      UID: "WzamUrr5oOhzl3bZNISOFZY9Hgt1",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "Experience have been great, it've made me exercise & burn my calories more by helding the competition",
    },
    {
      Rank: 23,
      Name: "Gururaj Gj",
      UID: "Y6JCFQ91LWRuLXZvme8YRCF2qVx1",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "Gives Competitive Spirit, Helps to Motivate Myself in Being the Better Me every day .. The Competition is the real Inspiration.. Additionally Having people to compete with is really awesome and Helps me to push myself to that extra 5% everyday ☺️... The rewards are Boosters for Getting Motivated.. You get Rewarded for Keeping yourself Fitter and Better ..💪🔥❤️.. Socialbot Team is my Inspiration which is helping me to stick on to my track ...",
    },
    {
      Rank: 24,
      Name: "Eshan Jain",
      UID: "n7jH9ltBlhO1DIEgYJS5GE02SXB3",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 25,
      Name: "Aju Baji",
      UID: "Bg0DA926AwXLxxI3cTVHP5asEZ93",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "It's a much needed thing for all the online trainers out there! social board literally gives me a personal virtual fitness studio where I can share my courses,live sessions & written programs to my students. Plus coach - clinet interaction is very easy in this platform. And I want to say a big Thank you! to all of social boat team for the quick assistance whenever it was required.",
    },
    {
      Rank: 26,
      Name: "Bhavneet Kumar",
      UID: "mqcUpsipRgcDTxrCuOLPHCtq9TD2",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "I never knew that fitness can be rewarding too. I saw many like minded people here it is very motivating. Coaches are friendly and hard working.",
    },
    {
      Rank: 27,
      Name: "SportsFitBy MS Dhoni",
      UID: "fc7abbcd-0b54-41c1-807a-59337691935c",
      IsTeam: "Yes",
      "Profile Image": "Yes",
      Testimonial: "",
    },
    {
      Rank: 28,
      Name: "Sandy",
      UID: "76OYCzRcxngRy6ISz10Hs0UPw8R2",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "SocialBoat is one of the leading and growing fitness company. It changes one's life through the adaptation of good habits. They are masters at the craft and websites which helps us to post your daily workout calories on their community. I simply like the concept which actually motivated me to exercise more without skipping the training. You guys are doing an amazing job. Let's all stay motivated!",
    },
    {
      Rank: 29,
      Name: "Abhishek Jindal",
      UID: "JTixRtwvmQXtukDWPscLzHajni72",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "Socialboat is an amazing platform for all the people who are looking to embark on their fitness journey and move towards a healthier lifestyle. Not only can one connect with professional coaches and trainers to chart out their workouts, diets etc. but they can also keep themselves engaged in various interesting challenges organised by social boat every now and then. I would strongly recommend Social boat to everyone irrespective of their age and/or any physical limitations 😊",
    },
    {
      Rank: 30,
      Name: "Your Coach Abhi",
      UID: "h5ZdZhdjeDYiLCDJGT1hB3gCEUI3",
      IsTeam: "No",
      "Profile Image": "Yes",
      Testimonial:
        "This was a nice challenge and it helped to keep my clients motivated.",
    },
  ];

  const manualLeaders = await admin
    .firestore()
    .collection("leaderBoard")
    .where("manualRank", ">", 0)
    .get();

  for (const manualLeader of manualLeaders.docs) {
    const mLeader = manualLeader.data() as LeaderBoard;
    await admin
      .firestore()
      .collection("leaderBoard")
      .doc(`leader-${mLeader.uid}`)
      .update({
        manualRank: admin.firestore.FieldValue.delete(),
      });
  }

  for (const rank of ranksToUpdate) {
    try {
      if (rank.IsTeam === "No") {
        if (typeof rank.Testimonial === "string") {
          await admin
            .firestore()
            .collection("users")
            .doc(rank.UID.trim())
            .update({
              testimonial: rank.Testimonial.trim(),
            });
        }

        await admin
          .firestore()
          .collection("leaderBoard")
          .doc(`leader-${rank.UID.trim()}`)
          .update({
            manualRank: rank.Rank,
          });
      } else if (rank.IsTeam === "Yes") {
        await admin
          .firestore()
          .collection("sbEvents")
          .doc(`${rank.UID.trim()}`)
          .update({
            manualRank: rank.Rank,
          });
      } else {
        console.log("skipping", rank.Name);
      }
    } catch (error) {
      console.log("skipping", rank.Name);
    }
  }
};
