import useHolidays from "../hooks/useHolidays";
import useSixMonthsDates from "../hooks/useSixMonthDates";
import CalendarSixMonths from "./ui/CalendarSixMonths";

export default function Calendar() {
  const startDate = new Date("2024-01-01");

  // Show half year calendar, eg. Jan-Jun or Jul-Dec
  if (startDate.getMonth() < 6) {
    startDate.setMonth(0);
  } else {
    startDate.setMonth(6);
  }

  const { dates, displayMonths } = useSixMonthsDates(startDate);
  const holidays = useHolidays(dates[0][0], dates[5][dates[5].length - 1]);

  return (
    <CalendarSixMonths
      className="grid grid-cols-1 gap-10 p-1 md:grid-cols-3 lg:grid-cols-6 md:gap-x-0"
      holidays={holidays}
      dates={dates}
      displayMonths={displayMonths}
    />
  );
}
