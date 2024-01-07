import {
  askForRefreshToken,
  removeGoogleFitScope,
  updateGoogleFitAccessToken,
} from "../../../models/User/Methods";
import {
  fitnessScope,
  GoogleFitOAuth,
  UserInterface,
} from "../../../models/User/User";
import { generateAccessToken, refreshAccessToken } from "./tokens";

export const fitCheck = (user?: UserInterface) => {
  if (
    user?.googleFit &&
    user.googleFit.scopes &&
    user.googleFit.scopes.includes(fitnessScope) &&
    user.googleFit.serverAuthCode
  ) {
    return { canProceed: true, googleFit: user.googleFit };
  }

  return { canProcced: false };
};

export const handleAccessToken = async (
  uid: string,
  googleFit: GoogleFitOAuth,
) => {
  try {
    return await getAccessToken(uid, googleFit);
  } catch (error) {
    console.log("errored");
    await removeGoogleFitScope(uid);
    return "";
  }
};

export const getAccessToken = async (
  uid: string,
  googleFit: GoogleFitOAuth,
) => {
  const now = Date.now();
  const expiresTh = 10 * 60 * 1000;
  const expiringIn = googleFit.expiresOnUnix ? googleFit.expiresOnUnix : -1;

  // now
  // expiresWhen
  // expiresWhen - th > now
  // console.log("now", now);
  // console.log("expiresTh", expiresTh);
  // console.log("expiringIn", expiringIn);
  // console.log("a", googleFit.accessToken);
  // // console.log("here");
  // console.log("now <= expiringIn - expiresTh", now <= expiringIn - expiresTh);
  // console.log("now > expiringIn - expiresTh", now > expiringIn - expiresTh);

  if (!googleFit.accessToken) {
    console.log("no access token");
    return await handleAccessResponse(uid, googleFit);
  } else if (googleFit.accessToken && now <= expiringIn - expiresTh) {
    console.log("access token present");
    return googleFit.accessToken;
  } else if (now > expiringIn - expiresTh && googleFit.refreshToken) {
    console.log("access token expired");
    // refresh token
    return await handleRefreshResponse(uid, googleFit);
  } else if (now > expiringIn - expiresTh && !googleFit.refreshToken) {
    console.log("ask for refresh token");
    await askForRefreshToken(uid);
    return undefined;
  } else {
    await removeGoogleFitScope(uid);
    return undefined;
  }
};

export const handleAccessResponse = async (
  uid: string,
  googleFit: GoogleFitOAuth,
) => {
  if (googleFit.serverAuthCode) {
    const accessResponse = await generateAccessToken(googleFit.serverAuthCode);
    if (accessResponse?.access_token) {
      await updateGoogleFitAccessToken(
        uid,
        accessResponse.access_token,
        accessResponse.expires_in,
        accessResponse.refresh_token,
      );
    }

    return accessResponse?.access_token;
  }

  return undefined;
};

export const handleRefreshResponse = async (
  uid: string,
  googleFit: GoogleFitOAuth,
) => {
  if (googleFit.refreshToken) {
    const refreshResponse = await refreshAccessToken(googleFit.refreshToken);

    if (refreshResponse?.access_token) {
      await updateGoogleFitAccessToken(
        uid,
        refreshResponse.access_token,
        refreshResponse.expires_in,
        refreshResponse.refresh_token,
      );
    }

    return refreshResponse?.access_token;
  }

  return undefined;
};
