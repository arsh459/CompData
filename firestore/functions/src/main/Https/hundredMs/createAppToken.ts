var jwt = require("jsonwebtoken");
import { v4 as uuidv4 } from "uuid";

export const createAppToken = (uid: string, roomId: string) => {
  const payload = {
    access_key: process.env.MS_APP_ACCESS_KEY,
    room_id: roomId,
    user_id: uid,
    role: "broadcaster",
    type: "app",
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    nbf: Math.floor(Date.now() / 1000),
  };

  return jwt.sign(payload, process.env.MS_APP_SECRET, {
    algorithm: "HS256",
    expiresIn: "24h",
    jwtid: uuidv4(),
  });
};
