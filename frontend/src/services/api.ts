import { HolidayType } from "../types";

const BASE_URL = "https://api.sallinggroup.com";
const HOLIDAY_ENDPOINT = "/v1/holidays";
const TOKEN = ""; // SET IN ENVIRONMENT VARIABLE

const getHolidays = async (year: number): Promise<HolidayType[]> => {
  // Replace with actual API URL and parameters
  const response = await fetch(
    `${BASE_URL}${HOLIDAY_ENDPOINT}?startDate=${year}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch holidays");
  }
  const data = await response.json();
  return data;
};

export default getHolidays;
