import {setOne, fetchOne} from '../../utils/firestore/fetchOne';
import {firestore} from 'firebase-admin';
import {LeaderBoard} from './interface';

export const addStoreVisit = async (uid: string) => {
  await setOne(
    'leaderBoard',
    `leader-${uid}`,
    {
      uid: uid,
      totalStoreVisits: firestore.FieldValue.increment(1),
      activeCustomers: firestore.FieldValue.increment(1),
    },
    true,
  );
};

export const addVisitor = async (uid: string) => {
  await setOne(
    'leaderBoard',
    `leader-${uid}`,
    {
      uid: uid,
      visitors: firestore.FieldValue.increment(1),
    },
    true,
  );
};

export const reduceActiveCustomers = async (uid: string) => {
  await setOne(
    'leaderBoard',
    `leader-${uid}`,
    {
      uid: uid,
      activeCustomers: firestore.FieldValue.increment(-1),
    },
    true,
  );
};

export const updateActiveCustomers = async (
  uid: string,
  activeCustomers: number,
) => {
  await setOne(
    'leaderBoard',
    `leader-${uid}`,
    {
      uid: uid,
      activeCustomers: activeCustomers,
    },
    true,
  );
};

export const getLeaderboardEntry = async (
  uid: string,
): Promise<LeaderBoard | undefined> => {
  const leaderObj = await fetchOne('leaderBoard', `leader-${uid}`);
  if (leaderObj.data()) {
    return leaderObj.data() as LeaderBoard;
  }

  return undefined;
};
