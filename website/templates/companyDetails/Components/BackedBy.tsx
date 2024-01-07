const investors = [
  {
    name: "Abhijit Kane",
    designation: "Co-founder Postman",
    description: "I play the role of cto and cofounder",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-126,h-175,c-maintain_ratio/AbhijitKane_EWpTN8ci4f.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667027356849",
  },
  {
    name: "Bhuvan Gupta",
    designation: "Co-founder OfBusiness",
    description: "I play the role of cto and cofounder",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-126,h-175,c-maintain_ratio/Bhuvan_Gupta_kzrMoSg-N.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667027367714",
  },
  {
    name: "Neeraj Gupta",
    designation: "CountryHead, Commscope",
    description: "I play the role of cto and cofounder",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-126,h-175,c-maintain_ratio/NeerajGupta_KaciMjpud.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667027385662",
  },
  {
    name: "Prateek Sharma",
    designation: "AheadVC",
    description: "I play the role of cto and cofounder",
    imgurl:
      "https://ik.imagekit.io/socialboat/tr:w-126,h-175,c-maintain_ratio/Prateek_exwmmH_3R.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667027385957",
  },
  {
    name: "PlanB Capital",
    designation: "Micro VC Fund",
    description: "I play the role of cto and cofounder",
    imgurl:
      "https://planbcapital.co/wp-content/uploads/2021/07/cropped-cropped-1.png",
  },
];
const BackedBy = () => {
  return (
    <div className="text-white  w-full max-w-screen-xl mx-auto ">
      <p className="text-4xl sm:text-5xl lg:text-6xl text-center font-baib">
        Backed By the Best
      </p>
      <div className="h-16" />
      <div className=" py-8 flex justify-center ">
        {investors.map((investor, index) => {
          return (
            index < 3 && (
              <div className="px-[5%] " key={`${investor.name}-${index}`}>
                <div className=" flex items-center flex-col ">
                  <img
                    src={investor.imgurl}
                    alt={`image of ${investor.name}`}
                    className="w-full  max-w-[126px] h-full rounded-full aspect-[126/175] "
                  />

                  <p className="text-center font-baib text-lg md:text-xl">
                    {investor.name}
                  </p>
                  <p className="text-center font-baiSb text-sm md:text-base">
                    {investor.designation}
                  </p>
                </div>
              </div>
            )
          );
        })}
      </div>

      <div className="flex   justify-center ">
        {investors.map((investor, index) => {
          return (
            index > 2 && (
              <div
                className="px-[5%]   flex flex-col items-center"
                key={`${investor.name}-${index}`}
              >
                <div className="w-3/4 md:w-full  ">
                  <img
                    src={investor.imgurl}
                    alt={`image of ${investor.name} member of socialboat investor`}
                    className="w-full max-w-[126px] h-full rounded-full aspect-[126/175] "
                  />
                </div>
                <p className="text-left font-baib md:text-lg text-xl">
                  {investor.name}
                </p>
                <p className="text-center font-baiSb text-sm md:text-base">
                  {investor.designation}
                </p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default BackedBy;
