import { useEffect, useState } from "react";
import { cn, formatDate, getWeekNumber } from "../utils/utils";
import getHolidays from "../services/api";
import { HolidayType } from "../types";

const MONTHS = [
  "Januar",
  "Februar",
  "Marts",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "December",
];

const WEEKDAY = ["S", "M", "T", "O", "T", "F", "L"];

export default function Calendar() {
  const [holidays, setHolidays] = useState<HolidayType[]>([]);

  const today = new Date();

  const monthOffset = getMonthOffset(today);

  const displayMonths = MONTHS.slice(monthOffset, monthOffset + 6);

  const dateSixMonths = generateSixMonthsDates(today);

  useEffect(() => {
    // Fetch holidays from API and set state
    getHolidays(today.getFullYear()).then(data => {
      console.log(data);
      setHolidays(data);
    });
  }, []);

  return (
    <div className="bg-[#21222f] text-[#acb3d6] w-full max-h-screen">
      {/* HEADER */}
      <div className="grid grid-cols-1 gap-10 p-1 md:grid-cols-3 lg:grid-cols-6 md:gap-x-0">
        {dateSixMonths.map((monthOfDates, monthIndex) => (
          <div key={monthIndex} className="text-center">
            <div>
              {displayMonths[monthIndex]} {monthOfDates[0].getFullYear()}
            </div>
            {monthOfDates.map((date, dateIndex) => (
              <div
                key={dateIndex}
                className={cn("flex items-center border border-zinc-50/10", {
                  "bg-[#313447]": date.getDay() === 0,
                  "bg-[#313446]": holidays.some(holiday => {
                    // TODO: ONE OFF ERROR - FIXED USING formatDate

                    return (
                      holiday.date === formatDate(date) &&
                      holiday.nationalHoliday
                    );
                  }),
                })}
              >
                <p
                  className={cn("w-10 text-sm", {
                    "bg-[#313447]": date.getDay() === 6, //Check if it is a Saturday
                  })}
                >
                  {WEEKDAY[date.getDay()]}
                </p>
                <div className="w-6 text-sm text-right">{date.getDate()}</div>
                <div className="w-full pl-3 text-xs ">
                  {
                    holidays.find(holiday => holiday.date === formatDate(date))
                      ?.name
                  }
                </div>
                <div className="pl-10 text-right ">
                  {date.getDay() === 1 && getWeekNumber(date)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// get which half of the year we are in
const getMonthOffset = (date: Date) => {
  return date.getMonth() < 6 ? 0 : 6;
};

// Generate dates for a month and store in Date[] without using date-fns
const generateMonthDates = (year: number, month: number): Date[] => {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);

  const dates: Date[] = [];
  for (let day = start.getDate(); day <= end.getDate(); day++) {
    dates.push(new Date(year, month, day));
  }

  return dates;
};

const generateSixMonthsDates = (today: Date): Date[][] => {
  const dates: Date[][] = [];

  // if dates are in the first half of the year
  if (today.getMonth() < 6) {
    for (let i = 0; i < 6; i++) {
      dates.push(generateMonthDates(today.getFullYear(), i));
    }
  } else {
    for (let i = 6; i < 12; i++) {
      dates.push(generateMonthDates(today.getFullYear(), i));
    }
  }

  return dates;
};
