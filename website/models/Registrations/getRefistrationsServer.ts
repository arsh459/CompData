import { Registration } from "./Registrations";

export const getUserRegistrations = async (
  db: FirebaseFirestore.Firestore,
  uid: string
) => {
  const userRegistrations = await db
    .collection("users")
    .doc(uid)
    .collection("registrations")
    .get();

  const regis: Registration[] = [];
  for (const reg of userRegistrations.docs) {
    regis.push(reg.data() as Registration);
  }

  return regis;
};
