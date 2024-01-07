import Link from "next/link";

const investors = [
  {
    name: "Abhijit Kane",
    designation: "Co-founder Postman",
    link: "https://www.linkedin.com/in/abhijitkane/",
    description: "I play the role of cto and cofounder",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-160,h-160,r-max,c-maintain_ratio/AbhijitKane_EWpTN8ci4f.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667027356849",
  },
  {
    name: "Bhuvan Gupta",
    designation: "Co-founder OfBusiness",
    link: "https://www.linkedin.com/in/bhuvangupta/",
    description: "I play the role of cto and cofounder",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-160,h-160,r-max,c-maintain_ratio/Bhuvan_Gupta_kzrMoSg-N.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667027367714",
  },
  {
    name: "Neeraj Gupta",
    designation: `CountryHead, Commscope`,
    description: "I play the role of cto and cofounder",
    link: "https://www.linkedin.com/in/neerajgupta30/",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-160,h-160,r-max,c-maintain_ratio/NeerajGupta_KaciMjpud.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667027385662",
  },
  {
    name: "Prateek Sharma",
    designation: "AheadVC",
    description: "I play the role of cto and cofounder",
    link: "https://www.linkedin.com/in/prateeksharmas/",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-160,h-160,r-max,c-maintain_ratio/Prateek_exwmmH_3R.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667027385957",
  },
  {
    name: "PlanB Capital",
    designation: "Micro VC Fund",
    link: "https://www.linkedin.com/in/silus/",
    description: "I play the role of cto and cofounder",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-160,h-160,r-max,c-maintain_ratio/cropped-cropped-1_3XzTa--NaG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667218216749",
    // "https://planbcapital.co/wp-content/uploads/2021/07/cropped-cropped-1.png",
  },
];
const BackedByV2 = () => {
  return (
    <div className="text-white  w-full max-w-4xl mx-auto ">
      <p className="text-center text-3xl sm:text-5xl lg:text-7xl text-[#EEE9FF] font-popSB">
        <span className="text-[#B2FC3A]">Backed </span>
        By The Best
      </p>
      <div className="h-11" />

      <div className="py-8   w-full  flex justify-center ">
        <div className="flex sm:w-4/5 lg:w-10/12 flex-wrap flex-row gap-7 lg:gap-8 justify-center  cursor-pointer  ">
          {investors.map((investor, index) => (
            <Link
              href={investor.link}
              passHref
              legacyBehavior
              key={`${investor.name}-${index}`}
            >
              <a target="_blank">
                <div className="flex items-center flex-col min-w-[220px] ">
                  <div className="w-full sm:w-4/5  flex-1  h-full ">
                    <img
                      src={investor.imgurl}
                      alt={`image of ${investor.name} member of socialboat investor`}
                      className="object-contain w-full  h-full "
                    />
                  </div>
                  <p className="text-center font-popSB pt-3.5 text-lg lg:text-xl">
                    {investor.name}
                  </p>
                  <p className="text-center text-white/80 font-popM  whitespace-pre-wrap break-words line-clamp-1 text-ellipsis  text-xs  lg:text-sm">
                    {investor.designation}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackedByV2;
