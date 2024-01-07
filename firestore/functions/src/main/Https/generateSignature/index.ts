import * as functions from "firebase-functions";
import * as cors from "cors";
import { CloudinarySignRequest } from "./interface";
import * as cloudinary from "cloudinary";

// console.log(functions.config());
const CLOUDINARY_SECRET_KEY = functions.config().cloudinary.key;

const cloudinaryV2 = cloudinary.v2;

const corsHandler = cors({ origin: true });
export const generateSignatureFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      console.log(request.body);
      try {
        const result: CloudinarySignRequest = request.body;

        // console.log('result', result, CLOUDINARY_SECRET_KEY);

        const signature = cloudinaryV2.utils.api_sign_request(
          result,
          CLOUDINARY_SECRET_KEY
        );

        // console.log('signature', signature);

        return response.status(200).send({ signature: signature });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
