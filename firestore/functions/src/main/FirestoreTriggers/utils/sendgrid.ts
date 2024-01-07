import * as sgMail from "@sendgrid/mail";
import * as functions from "firebase-functions";
import {
  newDiscoveryTemplate,
  replyToEmail,
  bookingRequestTemplateId2,
  toAbhiteg,
  toSendEmail,
  // helloEmail,
  toSwapnil,
  newStoreVisitorTemplateId,
  newStoreVisitorAdminTemplate,
  influencerPurchaseTemplate,
  influencerPurchaseAdminTemplate,
  influencerAdminPurchaseConfirmedTemplate,
  influencerPurchaseConfirmedTemplate,
  influencerCreateRequest,
  influencerCreateRequestSuccess,
  newInfluencerCollectionTemplateId,
  newInfluencerCollectionToInfluencerTemplateId,
  googlePlaceAddTemplateId,
  customerListingVisitTemplateId,
  leadTemplateId,
  influencerLeadTemplateId,
  errorEmailTemplateId,
  toRahul,
  newRegistrationTemplateId,
  helloSocialBoat,
  replyToSocialBoatEmail,
  newRegistrationCreatorId,
  newSocialBoatTemplateId,
  newSignUpEmail,
  newSignUpD2Email,
  newSignUpD3Email,
  newBoatSignup,
  newBoatSignup_creator,
  newPostTemplate,
  postReplyTemplate,
} from "../../../constants/email/contacts";
import { BookingRequestISO } from "../../../models/BookingRequestISO/BookingRequestISO";
import { UGCListing } from "../../../models/UGCListing/UGCListing";
import * as moment from "moment";
import { Lead } from "../../../models/Lead/interface";
import { ErrorMessage } from "../../../models/ErrorMessage/interface";

const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);

export const discoveryCreateEmail = async (
  discovery: UGCListing,
  action: "create" | "update" | "deleted",
) => {
  await sgMail.send({
    to: toAbhiteg,
    // cc: toSwapnil,
    from: toSendEmail,
    templateId: newDiscoveryTemplate,
    replyTo: toSendEmail,
    dynamicTemplateData: {
      listing_name: discovery.listingName,
      listing_id: discovery.listingId ? discovery.listingId : "",
      status: discovery.status,
      uid: discovery.uid,
      name: discovery.name ? discovery.name : "influencer name absent",
      tagline: discovery.tagline
        ? discovery.tagline
        : "influencer tagline absent",
      allFollowers: discovery.allFollowers
        ? discovery.allFollowers
        : "influencer followers absent",
      description: discovery.description,
      images: discovery.images
        ? discovery.images.length.toString()
        : "No images",
      action: action,
    },
  });
};

export const onErrorEmail = async (error: ErrorMessage) => {
  await sgMail.send({
    to: toRahul,
    from: toSendEmail,
    templateId: errorEmailTemplateId,
    replyTo: replyToEmail,
    cc: toSendEmail,
    dynamicTemplateData: {
      uid: error.uid,
      message: error.message,
      time: moment.unix(error.time / 1000).format("h:mma DD MM YYYY"),
      component_name: error.componentName,
      screen_name: error.screenName,
    },
  });
};

export const onBookingRequestEmail = async (
  bookingRequest: BookingRequestISO,
) => {
  await sgMail.send({
    to: bookingRequest.email,
    from: toSendEmail,
    templateId: bookingRequestTemplateId2,
    replyTo: replyToEmail,
    cc: toSendEmail,
    dynamicTemplateData: {
      activity_name: bookingRequest.listingName,
      listingType: bookingRequest.listingType,
      first_name: bookingRequest.name,
      phone: bookingRequest.phone,
      request_id: bookingRequest.requestId,
      subcategory: bookingRequest.subcategory,
      amount: `₹${bookingRequest.amount.toString()}`,
      startDate: moment
        .parseZone(bookingRequest.startDate)
        .format("MMM Do YYYY h:mma"),
      endDate: moment
        .parseZone(bookingRequest.endDate)
        .format("MMM Do YYYY h:mma"),
      pax: bookingRequest.qty.toString(),
    },
  });
};

export const onStoreVisitEmail = async (email: string, first_name?: string) => {
  await sgMail.send({
    to: email,
    from: toSendEmail,
    templateId: newStoreVisitorTemplateId,
    replyTo: replyToEmail,
    // cc: toSwapnil,
    dynamicTemplateData: {
      first_name: first_name ? first_name : "Influencer name not available",
    },
  });
};

export const onStoreVisitAdminEmail = async (
  uid: string,
  guestUID: string,
  name?: string,
  phone?: string,
  email?: string,
  guest_name?: string,
  guest_phone?: string,
  guest_email?: string,
) => {
  await sgMail.send({
    to: toSwapnil,
    from: toSendEmail,
    templateId: newStoreVisitorAdminTemplate,
    replyTo: replyToEmail,
    dynamicTemplateData: {
      name: name ? name : "Influencer name not available",
      phone: phone ? phone : "Influencer phone not available",
      email: email ? email : "Influencer email not available",
      uid: uid,
      guest_name: guest_name ? guest_name : "Guest name not available",
      guest_phone: guest_phone ? guest_phone : "Guest phone not available",
      guest_email: guest_email ? guest_email : "Guest email not available",
      guest_uid: guestUID,
    },
  });
};

export const onInfluencerPurchase = async (
  email: string,
  amount: number,
  bookingName: string,
  first_name: string | undefined,
  commissionRate: number,
) => {
  try {
    await sgMail.send({
      to: email,
      from: toSendEmail,
      templateId: influencerPurchaseTemplate,
      replyTo: replyToEmail,
      // cc: toSwapnil,
      dynamicTemplateData: {
        first_name: first_name ? first_name : "Influencer name not available",
        amount: amount.toString(),
        booking_name: bookingName,
        earning_rate: commissionRate.toString(),
      },
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const onInfluencerPurchaseAdmin = async (
  amount: number,
  bookingName: string,
  transactionId: string,
  guestUID: string,
  guestName: string,
  guestPhone: string,
  uid: string,
  name: string | undefined,
  phone: string | undefined,
  email: string | undefined,
  storeVisit: boolean,
  referrerVisit: boolean,
) => {
  try {
    await sgMail.send({
      to: toSwapnil,
      from: toSendEmail,
      templateId: influencerPurchaseAdminTemplate,
      replyTo: replyToEmail,
      dynamicTemplateData: {
        name: name ? name : "Influencer name not available",
        phone: phone ? phone : "Influencer phone not available",
        email: email ? email : "Influencer email not available",
        uid: uid,
        booking_name: bookingName,
        amount: amount.toString(),
        transaction_id: transactionId,
        guest_uid: guestUID,
        guest_name: guestName,
        guest_phone: guestPhone,
        store_visit: storeVisit.toString(),
        referrer_visit: referrerVisit.toString(),
      },
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const onInfluencerPurchaseAdminCompleted = async (
  amount: number,
  bookingName: string,
  transactionId: string,
  guestUID: string,
  guestName: string,
  guestPhone: string,
  uid: string,
  name: string | undefined,
  phone: string | undefined,
  email: string | undefined,
  storeVisit: boolean,
  referrerVisit: boolean,
) => {
  await sgMail.send({
    to: toSwapnil,
    from: toSendEmail,
    templateId: influencerAdminPurchaseConfirmedTemplate,
    replyTo: replyToEmail,
    dynamicTemplateData: {
      name: name ? name : "Influencer name not available",
      phone: phone ? phone : "Influencer phone not available",
      email: email ? email : "Influencer email not available",
      uid: uid,
      booking_name: bookingName,
      amount: amount.toString(),
      transaction_id: transactionId,
      guest_uid: guestUID,
      guest_name: guestName,
      guest_phone: guestPhone,
      store_visit: storeVisit.toString(),
      referrer_visit: referrerVisit.toString(),
    },
  });
};

export const onInfluencerPurchaseCompleted = async (
  email: string,
  amount: number,
  bookingName: string,
  first_name: string | undefined,
  commissionRate: number,
) => {
  await sgMail.send({
    to: email,
    from: toSendEmail,
    templateId: influencerPurchaseConfirmedTemplate,
    replyTo: replyToEmail,
    // cc: toSwapnil,
    dynamicTemplateData: {
      first_name: first_name ? first_name : "Influencer name not available",
      amount: amount.toString(),
      booking_name: bookingName,
      earning_rate: commissionRate.toString(),
      earning: (amount * commissionRate).toString(),
    },
  });
};

export const onInfluencerCreationRequest = async (
  email: string,
  instagramURL: string | undefined,
  facebookURL: string | undefined,
  youtubeURL: string | undefined,
  externalLink: string | undefined,
  bio: string | undefined,
  knownFor: string | undefined,
  expertIn: string | undefined,
  tagline: string | undefined,
  name: string | undefined,
  phone: string | undefined,
  influencer_email: string | undefined,
) => {
  await sgMail.send({
    to: email,
    from: helloSocialBoat,
    templateId: influencerCreateRequest,
    replyTo: replyToEmail,
    // cc: toSwapnil,
    dynamicTemplateData: {
      instagram_url: instagramURL ? instagramURL : "",
      facebook_url: facebookURL ? facebookURL : "",
      youtube_url: youtubeURL ? youtubeURL : "",
      external_url: externalLink ? externalLink : "",
      bio: bio ? bio : "",
      known_for: knownFor ? knownFor : "",
      expert_in: expertIn ? expertIn : "",
      tagline: tagline ? tagline : "",
      name: name ? name : "",
      phone: phone ? phone : "",
      influencer_email: influencer_email ? influencer_email : "",
    },
  });
};

export const onInfluencerCreationSuccess = async (
  email: string,
  instagramURL: string | undefined,
  facebookURL: string | undefined,
  youtubeURL: string | undefined,
  externalLink: string | undefined,
  bio: string | undefined,
  knownFor: string | undefined,
  expertIn: string | undefined,
  tagline: string | undefined,
  name: string | undefined,
  phone: string | undefined,
  influencer_email: string | undefined,
) => {
  await sgMail.send({
    to: email,
    from: helloSocialBoat,
    templateId: influencerCreateRequestSuccess,
    replyTo: replyToEmail,
    // cc: toSwapnil,
    dynamicTemplateData: {
      instagram_url: instagramURL ? instagramURL : "",
      facebook_url: facebookURL ? facebookURL : "",
      youtube_url: youtubeURL ? youtubeURL : "",
      external_url: externalLink ? externalLink : "",
      bio: bio ? bio : "",
      known_for: knownFor ? knownFor : "",
      expert_in: expertIn ? expertIn : "",
      tagline: tagline ? tagline : "",
      name: name ? name : "",
      phone: phone ? phone : "",
      influencer_email: influencer_email ? influencer_email : "",
    },
  });
};

export const onNewInfluencerCollection = async (
  email: string,
  name: string | undefined,
  phone: string | undefined,
  influencer_email: string | undefined,
  collection_name: string | undefined,
  collection_tagline: string | undefined,
  num_listings: number,
  collection_id: string,
) => {
  await sgMail.send({
    to: email,
    from: helloSocialBoat,
    templateId: newInfluencerCollectionTemplateId,
    replyTo: replyToEmail,
    // cc: toSwapnil,
    dynamicTemplateData: {
      collection_name: collection_name ? collection_name.replace(",", " ") : "",
      collection_tagline: collection_tagline
        ? collection_tagline.replace(",", " ")
        : "",
      num_listings:
        typeof num_listings === "number" ? num_listings.toString() : "-1",
      collection_id: collection_id ? collection_id : "",
      name: name ? name.replace(",", " ") : "",
      phone: phone ? phone : "",
      influencer_email: influencer_email ? influencer_email : "",
    },
  });
};

export const onNewInfluencerCollectionToInfluencer = async (
  email: string,
  name: string | undefined,
  // phone: string | undefined,
  // influencer_email: string | undefined,
  collection_name: string | undefined,
  collection_tagline: string | undefined,
  num_listings: number,
  // collection_id: string,
) => {
  await sgMail.send({
    to: email,
    from: helloSocialBoat,
    templateId: newInfluencerCollectionToInfluencerTemplateId,
    replyTo: replyToEmail,
    // cc: toSwapnil,
    dynamicTemplateData: {
      collection_name: collection_name ? collection_name.replace(",", " ") : "",
      collection_tagline: collection_tagline
        ? collection_tagline.replace(",", " ")
        : "",
      num_listings:
        typeof num_listings === "number" ? num_listings.toString() : "-1",
      // collection_id: collection_id ? collection_id : '',
      name: name ? name.replace(",", " ") : "",
      // phone: phone ? phone : '',
      // influencer_email: influencer_email ? influencer_email : '',
    },
  });
};

export const onNewGooglePlaceEmail = async (
  place_name: string | undefined,
  place_id: string,
  address: string | undefined,
  email: string,
  name: string | undefined,
  phone: string | undefined,
  influencer_email: string | undefined,
  collection_name: string | undefined,
  collection_tagline: string | undefined,
  num_listings: number,
  collection_id: string,
) => {
  await sgMail.send({
    to: email,
    from: helloSocialBoat,
    templateId: googlePlaceAddTemplateId,
    replyTo: replyToEmail,
    // cc: toSwapnil,
    dynamicTemplateData: {
      place_name: place_name ? place_name : "",
      place_id: place_id,
      address: address ? address : "",
      collection_name: collection_name ? collection_name : "",
      collection_tagline: collection_tagline ? collection_tagline : "",
      num_listings:
        typeof num_listings === "number" ? num_listings.toString() : "-1",
      collection_id: collection_id ? collection_id : "",
      name: name ? name : "",
      phone: phone ? phone : "",
      influencer_email: influencer_email ? influencer_email : "",
    },
  });
};

export const onNewCustomerVisit = async (
  email: string,
  name: string | undefined,
  phone: string | undefined,
  customer_email: string | undefined,
  listing_names: string | undefined,
  times: string | undefined,
) => {
  await sgMail.send({
    to: email,
    from: helloSocialBoat,
    templateId: customerListingVisitTemplateId,
    replyTo: replyToEmail,
    dynamicTemplateData: {
      name: name ? name : "",
      phone: phone ? phone : "",
      customer_email: customer_email ? customer_email : "",
      listing_names: listing_names ? listing_names : "",
      times: times ? times : "",
    },
  });
};

export const onLeadRequestEmail = async (
  lead: Lead,
  toEmail: string,
  creatorName: string | undefined,
  creatorPhone: string | undefined,
  creatorEmail: string | undefined,
  creatorHandle: string | undefined,
) => {
  await sgMail.send({
    to: toEmail,
    from: toSendEmail,
    templateId: leadTemplateId,
    replyTo: replyToEmail,
    dynamicTemplateData: {
      created_on: new Date(lead.createdOn * 1000).toLocaleString(),
      name: creatorName ? creatorName : "",
      phone: creatorPhone ? creatorPhone : "",
      trip_id: lead.tripId ? lead.tripId : "",
      trip_name: lead.tripName ? lead.tripName : "",
      listing_id: lead.listingId ? lead.listingId : "",
      listing_name: lead.listingName ? lead.listingName : "",
      influencer_email: creatorEmail ? creatorEmail : "",
      insta_handle: creatorHandle ? creatorHandle : "",
      contact_name: lead.name ? lead.name : "",
      contact_phone: lead.phone ? lead.phone : "",
      contact_email: lead.email ? lead.email : "",
      circuitName: lead.circuitName ? lead.circuitName : "",
      circuitId: lead.circuitId ? lead.circuitId : "",
      travel_theme: lead.travelTheme ? lead.travelTheme : "",
      start_date: lead.startDate ? lead.startDate : "",
      end_date: lead.endDate ? lead.endDate : "",
      tentative_duration: lead.tentativeDuration ? lead.tentativeDuration : "",
      tentative_months: lead.tentativeMonths
        ? lead.tentativeMonths.join(", ")
        : "",
      offbeat:
        typeof lead.offbeat === "boolean" && lead.offbeat
          ? "offbeat"
          : typeof lead.offbeat === "boolean"
          ? "classic"
          : "",
      range: lead.rangeClassification ? lead.rangeClassification : "",
      adults:
        lead.guests && lead.guests.adults ? lead.guests.adults.toString() : "",
      children:
        lead.guests && lead.guests.children
          ? lead.guests.children.toString()
          : "",
      infants:
        lead.guests && lead.guests.infants
          ? lead.guests.infants.toString()
          : "",
    },
  });
};

export const onInfluencerLeadRequestEmail = async (
  lead: Lead,
  toEmail: string,
  creatorName: string | undefined,
  creatorHandle: string | undefined,
) => {
  await sgMail.send({
    to: toEmail,
    from: toSendEmail,
    templateId: influencerLeadTemplateId,
    replyTo: replyToEmail,
    dynamicTemplateData: {
      created_on: new Date(lead.createdOn * 1000).toLocaleString(),
      name: creatorName ? creatorName : creatorHandle ? creatorHandle : "",
      contact_name: lead.name ? lead.name : "",
      circuitName: lead.circuitName ? lead.circuitName : "",
      travel_theme: lead.travelTheme ? lead.travelTheme : "",
      start_date: lead.startDate ? lead.startDate : "",
      end_date: lead.endDate ? lead.endDate : "",
      tentative_duration: lead.tentativeDuration ? lead.tentativeDuration : "",
      tentative_months: lead.tentativeMonths
        ? lead.tentativeMonths.join(", ")
        : "",
      offbeat:
        typeof lead.offbeat === "boolean" && lead.offbeat
          ? "Yes"
          : typeof lead.offbeat === "boolean"
          ? "No"
          : "",
      range: lead.rangeClassification ? lead.rangeClassification : "",
      adults:
        lead.guests && lead.guests.adults ? lead.guests.adults.toString() : "",
      children:
        lead.guests && lead.guests.children
          ? lead.guests.children.toString()
          : "",
      infants:
        lead.guests && lead.guests.infants
          ? lead.guests.infants.toString()
          : "",
    },
  });
};

export const onNewRegistration = async (
  email: string | null,
  first_name: string | undefined,
  activity_name: string | undefined,
  amount: string,
  currency: string | undefined,
  join_url: string | undefined,
  phone: string | null,
) => {
  if (email) {
    await sgMail.send({
      to: email,
      from: helloSocialBoat,
      templateId: newRegistrationTemplateId,
      replyTo: replyToSocialBoatEmail,
      dynamicTemplateData: {
        first_name: first_name ? first_name : "there",
        activity_name: activity_name ? activity_name : "Social boat event",
        payment: `${currency ? currency : "Rs."} ${amount}`,
        join_url: join_url ? join_url : "",
        phone: phone ? phone : "",
      },
    });
  }
};

export const onNewRegistrationForCreator = async (
  creator_email: string | undefined,
  first_name: string | undefined,
  activity_name: string | undefined,
  amount: string,
  currency: string | undefined,
  join_url: string | undefined,
  client_email: string | null,
  client_phone: string | null,
) => {
  if (creator_email) {
    await sgMail.send({
      to: creator_email,
      from: helloSocialBoat,
      templateId: newRegistrationCreatorId,
      replyTo: replyToSocialBoatEmail,
      dynamicTemplateData: {
        first_name: first_name ? first_name : "there",
        activity_name: activity_name ? activity_name : "Social boat event",
        payment: `${currency ? currency : "Rs."} ${amount}`,
        join_url: join_url ? join_url : "",
        client_phone: client_phone ? client_phone : "",
        client_email: client_email ? client_email : "",
      },
    });
  }
};

export const onNewSocialBoat = async (
  toEmail: string,
  name: string | undefined,
  phone: string | undefined,
  email: string | undefined,
) => {
  await sgMail.send({
    to: toEmail,
    from: helloSocialBoat,
    templateId: newSocialBoatTemplateId,
    replyTo: replyToSocialBoatEmail,
    dynamicTemplateData: {
      name: name ? `${name}` : "Unknwon",
      phone: phone ? `${phone}` : "Unknown",
      email: email ? `${email}` : "Unknown",
    },
  });
};

export const onNewSignUpEmail = async (
  toEmail: string,
  first_name: string | undefined,
) => {
  await sgMail.send({
    to: toEmail,
    from: helloSocialBoat,
    templateId: newSignUpEmail,
    replyTo: replyToSocialBoatEmail,
    dynamicTemplateData: {
      first_name: first_name ? first_name : "",
    },
  });
};

export const onSignUpD2Email = async (
  toEmail: string,
  first_name: string | undefined,
) => {
  await sgMail.send({
    to: toEmail,
    from: helloSocialBoat,
    templateId: newSignUpD2Email,
    replyTo: replyToSocialBoatEmail,
    dynamicTemplateData: {
      first_name: first_name ? first_name : "",
    },
  });
};

export const onSignUpD3Email = async (
  toEmail: string,
  first_name: string | undefined,
) => {
  await sgMail.send({
    to: toEmail,
    from: helloSocialBoat,
    templateId: newSignUpD3Email,
    replyTo: replyToSocialBoatEmail,
    dynamicTemplateData: {
      first_name: first_name ? first_name : "",
    },
  });
};

export const onNewEventSignup = async (
  toEmail: string,
  first_name: string | undefined,
  community_name: string | undefined,
  event_name: string | undefined,
  weblink: string | undefined,
) => {
  await sgMail.send({
    to: toEmail,
    from: helloSocialBoat,
    templateId: newBoatSignup,
    replyTo: replyToSocialBoatEmail,
    dynamicTemplateData: {
      first_name: first_name ? first_name : "",
      community_name: community_name ? community_name : "",
      event_name: event_name ? event_name : "",
      weblink: weblink ? weblink : "",
    },
  });
};

export const onCoachInviteEmail = async (
  toEmail: string,
  first_name: string | undefined,
  coach_name: string | undefined,
  event_name: string | undefined,
  weblink: string | undefined,
) => {
  await sgMail.send({
    to: toEmail,
    from: helloSocialBoat,
    templateId: newBoatSignup,
    replyTo: replyToSocialBoatEmail,
    dynamicTemplateData: {
      first_name: first_name ? first_name : "",
      coach_name: coach_name ? coach_name : "",
      event_name: event_name ? event_name : "",
      weblink: weblink ? weblink : "",
    },
  });
};

export const onNewEventSignup_creator = async (
  toEmail: string,
  first_name: string | undefined,
  customer_name: string | undefined,
  event_name: string | undefined,
  weblink: string | undefined,
) => {
  await sgMail.send({
    to: toEmail,
    from: helloSocialBoat,
    templateId: newBoatSignup_creator,
    replyTo: replyToSocialBoatEmail,
    dynamicTemplateData: {
      first_name: first_name ? first_name : "",
      customer_name: customer_name ? customer_name : "",
      event_name: event_name ? event_name : "",
      weblink: weblink ? weblink : "",
    },
  });
};

export const onNewPost_email = async (
  toEmail: string,
  first_name: string | undefined,
  author_name: string | undefined,
  community_name: string | undefined,
  event_name: string | undefined,
  weblink: string | undefined,
) => {
  await sgMail.send({
    to: toEmail,
    from: helloSocialBoat,
    templateId: newPostTemplate,
    replyTo: replyToSocialBoatEmail,
    dynamicTemplateData: {
      first_name: first_name ? first_name : "",
      author_name: author_name ? author_name : "",
      community_name: community_name ? community_name : "",
      event_name: event_name ? event_name : "",
      weblink: weblink ? weblink : "",
    },
  });
};

export const onReplyPost_email = async (
  toEmail: string,
  first_name: string | undefined,
  author_name: string | undefined,
  community_name: string | undefined,
  event_name: string | undefined,
  weblink: string | undefined,
) => {
  await sgMail.send({
    to: toEmail,
    from: helloSocialBoat,
    templateId: postReplyTemplate,
    replyTo: replyToSocialBoatEmail,
    dynamicTemplateData: {
      first_name: first_name ? first_name : "",
      author_name: author_name ? author_name : "",
      community_name: community_name ? community_name : "",
      event_name: event_name ? event_name : "",
      weblink: weblink ? weblink : "",
    },
  });
};
