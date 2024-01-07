const expectation = [
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_87_bWhGtY0Ot.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676889686684",
    text: "Treat Hair loss",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Group_1204_E5IkHlL1kv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676099951000",
    text: "Weight loss for PCOS",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Group_1185_gy2qdCzu8O.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676099951123",
    text: "Regularise your Cycle",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_87__1__DQ-slIzjFy.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676889686685",
    text: "Improvement in acne",
  },
];

const YouExpect = () => {
  return (
    <div className="w-screen py-20 max-w-screen-lg mx-auto flex flex-col justify-center items-center">
      <h2 className="w-full  sm:text-center text-white text-3xl sm:text-4xl lg:text-5xl px-5 font-qsSB">
        What you can expect
      </h2>
      <div className="w-12 aspect-1" />
      <div className="w-full flex flex-col sm:flex-row justify-center gap-5 px-5">
        {expectation.map((each, index) => (
          <div
            key={`${each.text}-${index}`}
            className="sm:w-36 flex sm:flex-col items-center gap-4 sm:gap-2"
          >
            <img
              src={each.icon}
              alt={each.text}
              className="w-20 sm:w-full aspect-1 object-contain"
            />
            <p className="text-center text-base text-white/80 font-popR">
              {each.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouExpect;
