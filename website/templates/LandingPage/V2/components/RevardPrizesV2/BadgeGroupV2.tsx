import ShieldBadge from "../ShieldBadge";

const prizes = [
  "https://ik.imagekit.io/socialboat/Group_649_1ycNZ_P6kf.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889562",
  "https://ik.imagekit.io/socialboat/Group_657_6GEEHdrs5w.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889346",
  "https://ik.imagekit.io/socialboat/Group_655_j_ZbTiMU5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889267",
  "https://ik.imagekit.io/socialboat/Group_639_9jM-nt3PQJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889489",
  "https://ik.imagekit.io/socialboat/Group_641_syX97Rp_6N.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889514",
  "https://ik.imagekit.io/socialboat/Group_646_AKgoBqWH45.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889481",
  "https://ik.imagekit.io/socialboat/Group_658_jFOdR3VLN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889337",
  "https://ik.imagekit.io/socialboat/Group_647_p8TvBMEJ19.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889454",
  "https://ik.imagekit.io/socialboat/Group_648_IeczVgnzfZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665733889446",
];

interface Props {
  badgewidth: number;
}

const BadgeGroupV2: React.FC<Props> = ({ badgewidth }) => {
  let scaleWidth: number = badgewidth;
  let translateWidth: number = 0;

  const Item = (index: number, scaleWidth: number, translateWidth: number) => (
    <div key={`item-${index}`}>
      <div
        style={{
          width: scaleWidth,
          translate: -(translateWidth - (badgewidth - scaleWidth)),
          zIndex: -(index + 2),
        }}
        className="absolute left-0 top-0 bottom-0"
      >
        <ShieldBadgeHelper brandImageURL={prizes[4 - index]} />
      </div>
      <div
        style={{
          width: scaleWidth,
          translate: translateWidth,
          zIndex: -(index + 2),
        }}
        className="absolute left-0 top-0 bottom-0"
      >
        <ShieldBadgeHelper brandImageURL={prizes[4 + index]} />
      </div>
    </div>
  );

  return (
    <div className="relative z-0 flex justify-center">
      <div style={{ width: badgewidth }} className="aspect-1">
        <ShieldBadgeHelper brandImageURL={prizes[4]} />
      </div>
      {Array.from(Array(4)).map((_, index) => {
        scaleWidth = scaleWidth * 0.8;
        translateWidth = translateWidth + scaleWidth;
        return Item(index + 1, scaleWidth, translateWidth);
      })}
    </div>
  );
};

export default BadgeGroupV2;

interface PropsShieldBadgeHelper {
  brandImageURL: string;
}

const ShieldBadgeHelper: React.FC<PropsShieldBadgeHelper> = ({
  brandImageURL,
}) => {
  return (
    <div className="w-full h-full relative z-0">
      <ShieldBadge badgeId="shield" />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-full aspect-[88/94] flex justify-center items-center">
          <div className="w-1/3 aspect-1 rounded-full bg-white/50 blur-3xl -translate-y-20" />
        </div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-full aspect-[88/94]">
          <div style={{ width: "100%", height: "56%" }}>
            <img
              src={brandImageURL}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
