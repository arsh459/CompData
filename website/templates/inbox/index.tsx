import Header from "@templates/dashboard/Header/Header";
import ChatHolder from "@templates/inbox/ChatHolder/ChatHolder";

interface Props {}

const InboxTemplate: React.FC<Props> = ({}) => {
  return (
    <div className="rounded-xl">
      <div>
        <Header label="Inbox" />
      </div>

      <div>
        <ChatHolder />
      </div>
    </div>
  );
};

export default InboxTemplate;
