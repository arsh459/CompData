import { EventInterface } from "@models/Event/Event";
import { useEffect, useState } from "react";

export const useEventKPIs = (userEvents: EventInterface[]) => {
  const [earnings, setEarnings] = useState<number>(0);
  const [views, setViews] = useState<number>(0);
  const [students, setStudents] = useState<number>(0);

  useEffect(() => {
    let earn = 0;
    let view = 0;
    let student = 0;
    for (const userEvent of userEvents) {
      earn += userEvent.earnings;
      view += userEvent.views;
      student += userEvent.students;
    }

    setEarnings(earn);
    setViews(view);
    setStudents(student);
  }, [userEvents]);

  return {
    earnings,
    views,
    students,
  };
};
