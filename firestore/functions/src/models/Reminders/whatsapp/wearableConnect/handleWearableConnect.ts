import { whatsappChannelId } from "../../../../main/Https/messagebird/constants/identifiers";
import { Param, sendHSM } from "../../../Conversations/sendHSM";
import { getUserById } from "../../../User/Methods";

export const handleWearableConnect = async (
  authorId: string,
  //   eventId: string,
) => {
  const author = await getUserById(authorId);

  if (author) {
    if (author.phone) {
      const params = generateWearableConnectParams(author.name);

      // to creator
      await sendHSM(
        author.phone,
        whatsappChannelId,
        "wearable_connect",
        params,
      );

      return true;
    }
  }

  return false;
};

const generateWearableConnectParams = (name?: string): Param[] => {
  return [
    { default: name ? `*${name.trim()}*` : "there" },
    {
      default:
        "https://www.youtube.com/watch?v=Imx1UGYjd_8&list=PLFkXhbX4PMHZgsbYsdQA3jRtvV1fhGntU&index=2",
    },
  ];
};
