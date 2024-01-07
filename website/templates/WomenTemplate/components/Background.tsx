import clsx from "clsx";

interface Props {
  opacity?: string;
  imgUrl?: string;
  clstr?: string;
}

export const Background: React.FC<Props> = ({ imgUrl }) => {
  return (
    <img
      src={
        imgUrl
          ? imgUrl
          : "https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/women_website_page_11_-oL852Z3V.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668088493835"
      }
      className="fixed -z-20 w-full h-full object-cover"
      alt="background image"
    />
  );
};

export const WomenImg: React.FC<Props> = ({ opacity, imgUrl, clstr }) => {
  return (
    <img
      src={
        imgUrl
          ? imgUrl
          : "https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Screenshot_2022-11-10_at_12.30_1_7IbE0vZOe.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668088484613"
      }
      alt="women workout"
      className={clsx(
        clstr ? clstr : "absolute right-0 -z-10 h-full",
        "object-cover",
        opacity
      )}
    />
  );
};
