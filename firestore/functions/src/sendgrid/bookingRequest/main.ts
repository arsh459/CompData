import { TripObjInterface } from "../../models/TripObj/Trip";
import {
  //  toSendEmail,
  bookingRequestTemplateId,
  toSendEmail,
  replyToEmail,
} from "../../constants/email/contacts";
import { getBookingDetails } from "./utils";
import * as moment from "moment";
import * as sgMail from "@sendgrid/mail";
// import * as sgHelpers from '@sendgrid/helpers';
import * as functions from "firebase-functions";

const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

import { BookingRequestInterface } from "./interface";
import { ListingDetailInterface } from "../../models/ListingDetail/interface";
//import {fetchOne} from '../utils/firestore/fetchOne';

const bookingRequestMessage = (
  tripObj: TripObjInterface,
  listingDetail: ListingDetailInterface,
  bookingRequest: BookingRequestInterface,
) => {
  const selectedTask = getBookingDetails(
    tripObj,
    bookingRequest.taskId,
    listingDetail.listingType,
    listingDetail.listingId,
  );
  // console.log("selectedTask", selectedTask.timeStart);
  // console.log("selectedTask", selectedTask.timeEnd);

  if (selectedTask !== undefined) {
    return {
      to: bookingRequest.email,
      from: toSendEmail,
      reply_to: replyToEmail,
      cc: toSendEmail,

      templateId: bookingRequestTemplateId,

      dynamic_template_data: {
        activity_name: listingDetail.listingName,
        first_name: bookingRequest.name,
        phone: bookingRequest.phone,
        request_id: bookingRequest.requestId,
        listingType: bookingRequest.listingType,
        date: moment.parseZone(selectedTask.timeStart).format("MMM Do YYYY"),
        timeEnd: moment.parseZone(selectedTask.timeEnd).format("MMM Do YYYY"),
        pax_count: selectedTask.qty.toString(),
        time_slot: `${moment
          .parseZone(selectedTask.timeStart)
          .format("h:mma")} - ${moment
          .parseZone(selectedTask.timeEnd)
          .format("h:mma")}`,
        amount: `₹${bookingRequest.amount.toString()}`,
      },
    };
  }

  return undefined;
};

export const bookingRequestEmailMessage = async (
  tripObj: TripObjInterface,
  listingDetail: ListingDetailInterface,
  bookingRequest: BookingRequestInterface,
) => {
  const message = bookingRequestMessage(tripObj, listingDetail, bookingRequest);

  if (message) {
    // console.log('message', message);

    // const mail = sgHelpers.classes.Mail.create(message)
    // const body = mail.toJSON();

    // console.log('body', body);

    return sgMail.send(message);
  }

  // console.log('bookingRequest', bookingRequest);
  throw new Error("Parsing booking request failed!");
};
