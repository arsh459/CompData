import { useRouter } from "next/router";

const nowDate = new Date();
const now = new Date(
  nowDate.getFullYear(),
  nowDate.getMonth(),
  nowDate.getDate(),
  0,
  0,
  0,
  0
).getTime();
const now_7 = now + 7 * 24 * 60 * 60 * 1000;

export const useCalendar = (defStart?: number, defEnd?: number) => {
  const router = useRouter();
  const q = router.query as { dS?: string; dE?: string };

  const st = q?.dS ? parseInt(q.dS) : defStart ? defStart : now;
  const en = q?.dE ? parseInt(q.dE) : defEnd ? defEnd : now_7;

  return {
    st,
    en,
    q,
  };
};
