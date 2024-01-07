import * as crypto from "crypto";
import * as functions from "firebase-functions";
// @ts-ignore incorrect typescript typings
import * as Mailchimp from "mailchimp-api-v3";
import { UserInterface } from "../models/User/User";
import { MembershipRequestInterface } from "../membership/interface";

const MAILCHIMP_API_KEY = functions.config().mailchimp.key;

let mailchimp: Mailchimp;
try {
  mailchimp = new Mailchimp(MAILCHIMP_API_KEY);
} catch (err) {}

export const addUserToList = async (
  user: UserInterface,
  mailchimpAudienceId: string,
  status: string
) => {
  if (!mailchimp) {
    return;
  }

  if (!user.email) {
    return;
  }

  try {
    await mailchimp.post(`/lists/${mailchimpAudienceId}/members`, {
      email_address: user.email,
      status: status,
      merge_fields: {
        FNAME: user.name ? user.name : "",
        PHONE: user.phone ? user.phone : "",
        PLATFORM: user.os ? user.os : "UNKNOWN",
        HASPLANNED: "FALSE",
        HASBOOKED: "FALSE",
        TRIPSAVED: "FALSE",
        USER_TYPE: "USER",
        // ACC_CODE: user.access_code ? user.access_code : "",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeUserFromList = async (
  mailchimpAudienceId: string,
  email?: string
) => {
  if (!mailchimp) {
    return;
  }

  if (!email) {
    return;
  }

  try {
    const hashed = crypto.createHash("md5").update(email).digest("hex");

    await mailchimp.delete(`/lists/${mailchimpAudienceId}/members/${hashed}`);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserStatus = async (
  user: UserInterface,
  mailchimpAudienceId: string
) => {
  // unsaved trip
  if (!mailchimp) {
    return;
  }

  if (!user.email) {
    return;
  }

  try {
    const hashed = crypto.createHash("md5").update(user.email).digest("hex");

    await mailchimp.patch(`/lists/${mailchimpAudienceId}/members/${hashed}`, {
      merge_fields: {
        HASPLANNED: user.hasPlanned ? "TRUE" : "FALSE",
        HASBOOKED: user.hasBooked ? "TRUE" : "FALSE",
        TRIPSAVED: user.hasTripSaved ? "TRUE" : "FALSE",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const addMemberRequest = async (
  membershipRequest: MembershipRequestInterface,
  mailchimpAudienceId: string,
  status: string
) => {
  if (!mailchimp) {
    return;
  }

  if (!membershipRequest.email) {
    return;
  }

  try {
    await mailchimp.post(`/lists/${mailchimpAudienceId}/members`, {
      email_address: membershipRequest.email,
      status: status,
      merge_fields: {
        FNAME: "",
        PHONE: membershipRequest.phone ? membershipRequest.phone : "",
        PLATFORM: "UNKNOWN",
        HASPLANNED: "FALSE",
        HASBOOKED: "FALSE",
        TRIPSAVED: "FALSE",
        USER_TYPE: membershipRequest.type
          ? membershipRequest.type
          : "REQUESTED",
        ACC_CODE: "",
      },
    });
  } catch (err) {
    console.log(err);
  }
};
