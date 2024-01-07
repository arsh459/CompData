import Header from "../Header/Header";

interface Props {
  noHeader?: boolean;
  headerItems: (string | null)[];
  profileName?: string;
  userKey?: string;
}

const HeaderWrapper: React.FC<Props> = ({
  headerItems,
  noHeader,
  profileName,
  userKey,
}) => {
  return (
    <div>
      {noHeader ? (
        <div className="h-1" />
      ) : (
        <div className="fixed max-w-6xl w-full top-0 bg-white z-40 pl-4 pr-4">
          <Header
            headerItems={headerItems}
            name={profileName}
            userKey={userKey}
          />
        </div>
      )}
    </div>
  );
};

export default HeaderWrapper;
