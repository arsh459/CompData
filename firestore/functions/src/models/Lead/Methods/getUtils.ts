import {BookingRequestISO} from '../../BookingRequestISO/BookingRequestISO';
import {Lead} from '../interface';
import * as admin from 'firebase-admin';

export function isLeadOverBooking(
  input: Lead | BookingRequestISO | undefined,
): input is Lead {
  return (input as Lead).leadId !== undefined;
}

export const getUserLeads = async (
  creatorId: string,
  min: number,
  max: number,
): Promise<Lead[]> => {
  const leads = await admin
    .firestore()
    .collection('leadsV2')
    .where('creatorId', '==', creatorId)
    // .where('createdOn', '>=', min)
    // .where('visitedOn', '<=', max)
    .get();

  const allLeads: Lead[] = [];
  return leads.docs.reduce((acc, item) => {
    // filteration
    if (item.exists) {
      const newLead = item.data() as Lead;
      if (newLead.createdOn >= min && newLead.createdOn <= max) {
        acc.push(item.data() as Lead);
      }
    }

    return acc;
  }, allLeads);
};
