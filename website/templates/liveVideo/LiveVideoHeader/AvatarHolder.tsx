import Avatar from "./Avatar";

interface Props {
  urls: string[];
}

const AvatarHolder: React.FC<Props> = ({ urls }) => {
  return (
    <div className="flex flex-col space-y-2">
      {urls.map((item, index) => {
        return (
          <div key={`avatar-${index}`}>
            <Avatar url={item} />
          </div>
        );
      })}
    </div>
  );
};

export default AvatarHolder;
