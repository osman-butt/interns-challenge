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

export default function Calendar() {
  const [holidays, setHolidays] = useState<HolidayType[]>([]);

  const today = new Date();

  const monthOffset = getMonthOffset(today);

  const displayMonths = MONTHS.slice(monthOffset, monthOffset + 6);

  const dateSixMonths = generateSixMonthsDates(today);

  useEffect(() => {
    // Fetch holidays from API and set state
    getHolidays(today.getFullYear()).then(data => {
      setHolidays(data);
    });
  }, []);

  return (
    <div className="bg-[#21222f] text-[#acb3d6] w-full max-h-screen">
      <div className="grid grid-cols-1 gap-10 p-1 md:grid-cols-3 lg:grid-cols-6 md:gap-x-0">
        {dateSixMonths.map((monthOfDates, monthIndex) => (
          <div key={monthIndex}>
            <MonthHeader>
              {displayMonths[monthIndex]} {monthOfDates[0].getFullYear()}
              {monthOfDates.map((date, dateIndex) => (
                <MonthContainer key={dateIndex} date={date} holidays={holidays}>
                  <DayContainer date={date} holidays={holidays} />
                </MonthContainer>
              ))}
            </MonthHeader>
          </div>
        ))}
      </div>
    </div>
  );
}

const MonthHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn(className, "text-center")} {...props} />;
};

interface DateWithHolidaysProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  holidays: HolidayType[];
}

const MonthContainer = ({
  className,
  date,
  holidays,
  ...props
}: DateWithHolidaysProps) => {
  return (
    <div
      className={cn(className, {
        "bg-[#313447]": date.getDay() === 0,
        "bg-[#313446]": holidays.some(holiday => {
          return holiday.date === formatDate(date) && holiday.nationalHoliday;
        }),
      })}
      {...props}
    />
  );
};

const DayContainer = ({ className, date, holidays }: DateWithHolidaysProps) => {
  return (
    <div
      className={cn(className, "flex items-center border border-zinc-50/10")}
    >
      <DayOfWeek date={date} />
      <DateDisplay date={date} />
      <HolidayDisplay date={date} holidays={holidays} />
      <WeekNumberDisplay date={date} />
    </div>
  );
};

const DayOfWeek = ({ className, date, ...props }: DayProps) => {
  const WEEKDAY = ["S", "M", "T", "O", "T", "F", "L"] as const;

  return (
    <p
      className={cn(className, "w-10 text-sm", {
        "bg-[#313447]": date.getDay() === 6, // Check if it is a Saturday
      })}
      {...props}
    >
      {WEEKDAY[date.getDay()]}
    </p>
  );
};

const DateDisplay = ({ className, date, ...props }: DayProps) => {
  return (
    <div className={cn(className, "w-6 text-sm text-right")} {...props}>
      {date.getDate()}
    </div>
  );
};

const HolidayDisplay = ({
  className,
  date,
  holidays,
  ...props
}: DateWithHolidaysProps) => {
  const holidayName = holidays.find(
    holiday => holiday.date === formatDate(date)
  )?.name;

  return (
    <div className={cn(className, "w-full pl-3 text-xs")} {...props}>
      {holidayName || ""}
    </div>
  );
};

interface DayProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
}

const WeekNumberDisplay = ({ className, date, ...props }: DayProps) => {
  return (
    <div className={cn(className, "pl-10 text-right")} {...props}>
      {date.getDay() === 1 && getWeekNumber(date)}
    </div>
  );
};

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
