import { format, parse, startOfWeek, getDay } from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useCallback, useEffect, useRef } from "react";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Props {
  months: Date[];
  reverse?: boolean;
  onEndReached?: () => void;
  headerColors?: string[];
  headerTextClassStr?: string;
  monthTextClassStr?: string;
  intialScrollIndex?: number;
  dateComp?: (date: Date) => JSX.Element;
}

const CalenderMounthWithInfiniteScroll: React.FC<Props> = ({
  months,
  reverse,
  onEndReached,
  headerColors,
  headerTextClassStr,
  monthTextClassStr,
  intialScrollIndex,
  dateComp,
}) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const intialScrollRef = useRef<HTMLDivElement | null>(null);

  const targetRef = useCallback(
    (node) => {
      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((element) => {
            if (element.isIntersecting && onEndReached) {
              onEndReached();
            }
          });
        },
        { root: parentRef.current }
      );

      if (node) observer?.current.observe(node);
    },
    [onEndReached]
  );

  useEffect(() => {
    if (reverse && parentRef.current) {
      parentRef.current.scrollTo({
        left: 0,
        top: parentRef.current.scrollHeight,
      });
    }
  }, [reverse, parentRef]);

  useEffect(() => {
    setTimeout(() => {
      if (intialScrollIndex && intialScrollRef.current) {
        intialScrollRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [intialScrollIndex, intialScrollRef]);

  const comp = (date: Date) =>
    dateComp ? (
      dateComp(date)
    ) : (
      <div className="w-full aspect-[90/80] sm:aspect-[90/60] max-h-[100px] flex justify-center items-center text-white font-nunitoR text-xs sm:text-sm">
        {format(date, "d")}
      </div>
    );

  return (
    <div className="w-full h-full">
      <div
        className="flex flex-row justify-around rounded-lg py-2"
        style={{
          background: headerColors
            ? `linear-gradient(to right, ${headerColors.join(", ")})`
            : undefined,
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((item) => (
          <p
            key={item}
            className={headerTextClassStr || "text-white text-xs"}
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {item}
          </p>
        ))}
      </div>
      <div
        ref={parentRef}
        className="w-full h-full flex overflow-y-scroll overflow-x-hidden scrollbar-hide relative z-0"
        style={{ flexDirection: reverse ? "column-reverse" : "column" }}
      >
        {months.map((month, index) => (
          <div
            key={format(month, "yyyy-MM-dd")}
            ref={
              intialScrollIndex && index === intialScrollIndex
                ? intialScrollRef
                : undefined
            }
          >
            <Calendar
              className="CalenderMounth"
              localizer={localizer}
              views={{ month: true }}
              defaultDate={month}
              components={{
                toolbar: () => (
                  <p
                    className={
                      monthTextClassStr ||
                      "py-4 text-xl text-white font-nunitoB"
                    }
                  >
                    {format(month, "MMM yy")}
                  </p>
                ),
                month: {
                  header: () => null,
                  dateHeader: (props) =>
                    month.getMonth() === props.date.getMonth()
                      ? comp(props.date)
                      : null,
                },
              }}
            />
          </div>
        ))}

        <div ref={targetRef} className="border border-transparent" />
      </div>
    </div>
  );
};

export default CalenderMounthWithInfiniteScroll;
