interface Props {}

const PHBanner: React.FC<Props> = ({}) => {
  return (
    <div>
      <a
        rel="noreferrer"
        href="https://www.producthunt.com/posts/socialboat?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-socialboat"
        target="_blank"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=318006&theme=light&period=daily"
          alt="SocialBoat - Welcome to the future of fitness | Product Hunt"
          //   style="width: 250px; height: 54px;"
          width="250"
          height="54"
          className="w-[200px] sm:w-[250px]"
        />
      </a>
    </div>
  );
};

export default PHBanner;
