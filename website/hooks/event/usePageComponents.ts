import { eventTypes } from "@models/Event/Event";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import { TestimonialInterface } from "@templates/listing/Testimonials/Testimonials";
import { useEffect, useState } from "react";

export const usePageComponents = (
  courseGoal?: string,
  whoIsItFor?: ListItem[],
  testimonials?: TestimonialInterface[],
  faq?: ListItem[],
  eventType?: eventTypes
) => {
  const [headerItems, setHeaderItems] = useState<(string | null)[]>([]);

  useEffect(() => {
    setHeaderItems(
      eventType === "challenge"
        ? [
            courseGoal ? "Prizes" : null,
            "Program",
            whoIsItFor && whoIsItFor.length > 0 ? "Who is it for?" : null,
            "Instructor",
            testimonials && testimonials.length > 0 ? "Testimonials" : null,
            faq && faq.length > 0 ? "FAQ" : null,
            "Join",
          ]
        : [
            courseGoal ? "Goal" : null,
            whoIsItFor && whoIsItFor.length > 0 ? "Who is it for?" : null,
            "Instructor",
            testimonials && testimonials.length > 0 ? "Testimonials" : null,
            faq && faq.length > 0 ? "FAQ" : null,
          ]
    );
  }, [courseGoal, whoIsItFor, testimonials, faq, eventType]);

  return headerItems;
};
