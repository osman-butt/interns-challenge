import { HolidayType } from "../../types";
import { cn, formatDate, getWeekNumber } from "../../utils/utils";

interface CalendarSixMonthsProps extends React.HTMLAttributes<HTMLDivElement> {
  holidays: HolidayType[];
  dates: Date[][];
  displayMonths: string[];
}

/**A calendar component that displays six months of dates
 * @param holidays - An array of holidays
 * @param dates - An array of arrays of dates for the six months
 * @param displayMonths - An array of month names to display, eg. ["January", "February", ...]
 * */

export default function CalendarSixMonths({
  className,
  holidays,
  dates,
  displayMonths,
  ...props
}: CalendarSixMonthsProps) {
  return (
    <div className={cn(className, "bg-[#21222f] text-[#acb3d6]")} {...props}>
      {dates.map((monthOfDates, monthIndex) => (
        <CalendarMonth key={monthIndex}>
          {/* Calendar header */}
          <CalendarHeader>
            {displayMonths[monthIndex]} {monthOfDates[monthIndex].getFullYear()}
          </CalendarHeader>
          {/* Calender dates for month "monthIndex" */}
          {monthOfDates.map((date, dateIndex) => (
            <MonthContainer key={dateIndex} date={date}>
              <DayContainer date={date} holidays={holidays} />
            </MonthContainer>
          ))}
        </CalendarMonth>
      ))}
    </div>
  );
}

const CalendarMonth = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn(className)} {...props} />;
};

const CalendarHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn(className, "text-center")} {...props} />;
};

interface DateWithHolidaysProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  holidays: HolidayType[];
}

interface HolidayProps extends React.HTMLAttributes<HTMLDivElement> {
  holiday: HolidayType | undefined;
}

interface DayProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
}

const MonthContainer = ({ className, date, ...props }: DayProps) => {
  return (
    <div
      className={cn(className, {
        "bg-[#313447]": date.getDay() === 0,
      })}
      {...props}
    />
  );
};

const DayContainer = ({ className, date, holidays }: DateWithHolidaysProps) => {
  const holiday: HolidayType | undefined = holidays.find(
    holiday => holiday.date === formatDate(date)
  );

  return (
    <div
      className={cn(
        className,
        "grid grid-cols-[auto,auto,1fr,auto] items-center border h-6 border-zinc-50/10",
        {
          "bg-[#313446]": holiday?.nationalHoliday,
        }
      )}
    >
      <DayOfWeek date={date} />
      <DateDisplay date={date} />
      <HolidayDisplay holiday={holiday} />
      <WeekNumberDisplay date={date} />
    </div>
  );
};

const DayOfWeek = ({ className, date, ...props }: DayProps) => {
  const WEEKDAY = ["S", "M", "T", "O", "T", "F", "L"] as const;

  return (
    <p
      className={cn(className, "w-8 h-full text-sm text-center", {
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

const HolidayDisplay = ({ className, holiday, ...props }: HolidayProps) => {
  const holidayName = holiday?.name;
  return (
    <div className={cn(className, "w-full pl-3 text-xs")} {...props}>
      {holidayName}
    </div>
  );
};

const WeekNumberDisplay = ({ className, date, ...props }: DayProps) => {
  return (
    <div className={cn(className, "pr-2 text-right")} {...props}>
      {date.getDay() === 1 && getWeekNumber(date)}
    </div>
  );
};
