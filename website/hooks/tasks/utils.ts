import axios from "axios";

export const internalWhatsappVoidMessage = async (
  taskId: string,
  streamId: string
) => {
  try {
    await axios({
      url: "/api/whatsappReminder/voidWhatsAppReminder",
      // url:
      method: "POST",
      params: {
        taskId,
        streamId,
      },
    });

    return true;
  } catch (error) {
    console.log("error", error);
  }
};
