import clsx from "clsx";

const partners: string[] = [
  "https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,fo-auto/Component_25_mpOH3_Ksp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668869988988",
  "https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,fo-auto/Component_26_VYMzMk8_u.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668869986915",
  "https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,fo-auto/Component_28_USq-Upzh0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668869986853",
  "https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,fo-auto/Component_29_aC3MzbnLt.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668869987719",
  "https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,fo-auto/Component_30_Gf8J8LSQl.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668869987276",
  "https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,fo-auto/Component_27_Ib7f0gDXPt.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668869987043",
];
interface Props {
  customStyles?: string;
  textStyle?: string;
  isLeader?: boolean;
  mainStyle?: string;
}
const Partners: React.FC<Props> = ({
  customStyles,
  textStyle,
  isLeader,
  mainStyle,
}) => {
  return (
    <div
      className={clsx(
        "w-screen  flex flex-col justify-center items-center p-4",
        mainStyle ? mainStyle : "min-h-screen"
      )}
    >
      <>
        {isLeader ? (
          <h2
            className={clsx(
              textStyle
                ? textStyle
                : "text-white text-4xl md:text-6xl font-popR font-extralight text-center py-8 md:py-16"
            )}
          >
            Our Partners
          </h2>
        ) : null}
        <div className="w-full max-w-screen-xl mx-auto bg-white/10 border border-white/20 rounded-[50px] sm:rounded-[75px] lg:rounded-[100px] flex flex-col justify-center items-center">
          {!isLeader ? (
            <h2
              className={clsx(
                textStyle
                  ? textStyle
                  : "text-white text-4xl md:text-6xl font-popR font-extralight text-center py-8 md:py-16"
              )}
            >
              Our Partners
            </h2>
          ) : null}
          <div
            className={clsx(
              customStyles
                ? customStyles
                : "mx-auto grid grid-cols-2 md:grid-cols-3 auto-cols-max justify-center items-center p-4 gap-4"
            )}
          >
            {partners.map((partner, index) => (
              <img
                key={partner}
                src={partner}
                className="object-contain mx-auto"
                loading="lazy"
                alt={`Our partners ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default Partners;
