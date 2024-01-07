// var jwt = require("jsonwebtoken");
var jwt = require("jsonwebtoken");
import { v4 as uuidv4 } from "uuid";
import { getMSToken, saveMSToken } from "../../../models/MSToken/MSToken";

export const createManagementTokenFunc = async () => {
  const expireTL = Date.now() + 60 * 1000;

  let newToken: string = "";

  const previousToken = await getMSToken(expireTL);
  if (!previousToken) {
    newToken = jwt.sign(
      {
        access_key: process.env.MS_APP_ACCESS_KEY,
        type: "management",
        version: 2,
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000),
      },
      process.env.MS_APP_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "24h",
        jwtid: uuidv4(),
      },
    );

    await saveMSToken(newToken, Date.now() + 24 * 60 * 60 * 1000);
  } else {
    newToken = previousToken.token;
  }

  return newToken;
};
