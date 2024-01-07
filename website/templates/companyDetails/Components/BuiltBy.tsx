import Link from "next/link";
import React from "react";
const staffMembers = [
  {
    name: "Greesha Dhingra",
    designation: "Yoga Expert | 366K Followers",
    link: "https://instagram.com/gree_yogabhyasi?igshid=MzRlODBiNWFlZA==",
    description:
      "Greesha is an expert in pre/post natal yoga and has lead over 1000's of transformations.",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/SBT_Greesha19_2_LpJVzMNXN.png?updatedAt=1689821034053",
  },
  {
    name: "Aarja Bedi",
    designation: "ACE Certified Coach",
    link: "https://instagram.com/fitwithaabi?igshid=MzRlODBiNWFlZA==",
    description:
      "Transformed 400+ women with strength training. Empowering women to feel confident & live without restrictions",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/DSC00198_1_IfsWVZ6p5p.png?updatedAt=1689821034049",
  },
  {
    name: "Dr. Maitreyee Athavale",
    designation: "Obstetrician-Gynaecologist",
    link: "https://instagram.com/gyn_opinion?igshid=MzRlODBiNWFlZA==",
    description:
      "MS OBGYN, MRCOG (UK). Runs the page gyn_opinion with 13.2k followers",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/unnamed_2_JKgHfnMCR.png?updatedAt=1689821033763",
  },
  {
    name: "Dr. Mona Vats",
    designation: "Gynaecology and Obstetrics",
    link: "https://www.linkedin.com/in/rahul-jain2992/",
    description:
      "10 years experience of working & GMC Jammu, Narayana Hospital and Kasturba Medical College.",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/Group_1000001058_KFO0urFpP.png?updatedAt=1689821034130",
  },
  {
    name: "Jayti Shah",
    designation: "Nutrition Consultant and Content Writer",
    link: "https://www.linkedin.com/in/jayti-shah-225318118/",
    description:
      "9+ years of experience in Nutrition consulting. Authored 1000+ articles on nutrition, PCOS and fertility",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/1626236013632_WC4VwU0mT.jpeg?updatedAt=1689840024955",
  },
  {
    name: "Nidhi Khandelwal",
    designation: "Social Media Manager",
    link: "https://instagram.com/fitnesswithnidhi__?igshid=MzRlODBiNWFlZA==",
    description:
      "Fitness enthusiast & social media manager, sculpting body & crafting inspiring digital narratives for a healthier lifestyle.",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/IMG_1686_1_MQdqecvyeN.png?updatedAt=1689821034014",
  },

  {
    name: "Nisha Yadav",
    designation: "Social Media Manager",

    link: "https://www.linkedin.com/in/nisha-yadav-a92897209",
    description:
      "Someone who loves watching anime and lives for food who also into helping the voiceless and taking stand for them.",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/B612_20220122_175156_798_1ZYg0oV-l.jpg?updatedAt=1689840025024",
  },

  {
    name: "Amitabh Sahu",
    designation: "Software Developer",
    description: 'I want to explore world, when not printing "Hello World".',
    link: "https://www.linkedin.com/in/amitabh-sahu",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/ami_YtV65qr2b.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667030217192",
  },
  {
    name: "Kuldeep Rathore",
    designation: "Software Developer",

    link: "https://www.linkedin.com/in/kuldeep--singh/",
    description:
      "full-time developer who enjoys watching anime and reading manga.",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/1689839563854_nL6kOCLnk.jpg?updatedAt=1689840025167",
  },
  {
    name: "Puneet Mahey",
    designation: "Product Designer",
    link: "https://www.linkedin.com/in/puneet-singh-mahey-095097189/",
    description:
      "Design is a strategic answer to a complex question and I always aspire the most pragmatic ones! Apart from designing solutions, I like trekking, camping and capture moments in my camera!",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/puneet_E2D7g0gt0N.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667030217322",
  },
  {
    name: "Rahul Jain",
    designation: "Co Founder",
    link: "https://www.linkedin.com/in/rahul-jain2992/",
    description:
      "Techie who can brew 15 different kinds of coffee. From sour berry to charred smoky",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/rahul_uLudrgOjw.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667030217989",
  },
  {
    name: "Swapnil Vats",
    designation: "Co Founder",

    link: "https://www.linkedin.com/in/swapnilvats",
    description:
      "History and a mythology nerd. Loves playing badminton and tries to occasionally showoff his parkour skills",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/Swapnil_rxfWrN8xsO.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667027386283",
  },
  // {
  //   name: "Aditya Rawat",
  //   designation: "Video Editor",

  //   link: "https://www.linkedin.com/in/adirawat22/",
  //   description: "Passionate video editor and an aspiring Director.",
  //   imgurl:
  //     "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/adit_Zl2uOslwd.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667032761836",
  // },

  {
    name: "Saurav Thapliyal",
    designation: "Operations Manager",

    link: "https://www.linkedin.com/in/saurav-thapliyal-4b0a25185/",
    description:
      "A strong, positive self-image is the best possible preparation for success.",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-512,c-maintain_ratio/saurav_kKhKVzyhN?ik-sdk-version=javascript-1.4.3&updatedAt=1667033740751",
  },
];
const BuiltBy = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto px-6">
      <p className="text-center text-3xl sm:text-5xl lg:text-7xl text-[#EEE9FF] font-popSB">
        <span className="text-[#B2FC3A]">Built </span>
        By The Best
      </p>
      <div className="h-8 lg:h-11" />
      <div className="mx-auto  grid   grid-cols-2 sm:grid-cols-3 gap-7 lg:grid-cols-4 ">
        {staffMembers.map((staff) => (
          <div
            key={staff.name}
            className=" cursor-pointer flex justify-start flex-col items-center w-full h-full "
          >
            <Link href={staff.link} passHref legacyBehavior>
              <a target="_blank">
                <div className="w-full flex-1  aspect-1">
                  <img
                    src={staff.imgurl}
                    alt={`image of ${staff.name} member of socialboat team`}
                    className="object-center w-full h-full rounded-xl"
                  />
                </div>
                <div className="w-full">
                  <p className="text-white py-2.5 text-lg font-popSB">
                    <span className="">{staff.name}</span>
                    <br />
                    <span className="text-white/80 text-sm font-popM">
                      {staff.designation}
                    </span>
                  </p>
                  <p className="w-full text-xs font-popM text-white/50">
                    {staff.description}
                  </p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuiltBy;
