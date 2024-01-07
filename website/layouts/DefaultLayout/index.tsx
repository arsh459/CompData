import GeneralSEOTemplate from "@layouts/SEO/GeneralSEO";

interface Props {
  title: string;
  description: string;
  link: string;
  img: string;
  rectImg?: string;
  noIndex: boolean;
  siteName?: string;
  favIcon?: string;
  width?: number;
  height?: number;
  canonical: string;

  ogType?: "basic" | "video" | "article" | "book" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  firstName?: string;
  lastName?: string;
  gender?: "female";
}

const DefaultLayout: React.FC<Props> = ({
  children,
  title,
  description,
  link,
  img,
  noIndex,
  siteName,
  favIcon,
  width,
  height,
  canonical,
  rectImg,
  ogType,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  firstName,
  lastName,
  gender,
}) => {
  return (
    <div>
      <div>
        <GeneralSEOTemplate
          title={title}
          description={description}
          link={link}
          canonical={canonical}
          img={img}
          noIndex={noIndex}
          siteName={siteName}
          favIcon={favIcon}
          width={width}
          height={height}
          rectImg={rectImg}
          ogType={ogType ? ogType : "basic"}
          publishedTime={publishedTime}
          modifiedTime={modifiedTime}
          authors={authors}
          tags={tags}
          firstName={firstName}
          lastName={lastName}
          gender={gender}
        />
      </div>
      {children}
    </div>
  );
};

export default DefaultLayout;
