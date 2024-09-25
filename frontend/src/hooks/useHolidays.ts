import { useEffect, useState } from "react";
import { HolidayType } from "../types";
import getHolidays from "../services/api";

/**Fetch holidays from the API for a given date range
 * @param startDate - The start date of the range
 * @param endDate - The end date of the range
 * @returns An array of holidays
 * */
const useHolidays = (startDate: Date, endDate: Date): HolidayType[] => {
  const [holidays, setHolidays] = useState<HolidayType[]>([]);

  useEffect(() => {
    // Fetch holidays from API and set state
    getHolidays(startDate, endDate).then(data => {
      setHolidays(data);
    });
  }, []);

  return holidays;
};

export default useHolidays;
