import { HolidayType } from "../types";
import { API_TOKEN, API_URL } from "../../Settings";

const HOLIDAY_ENDPOINT = "/holidays";
const TOKEN = API_TOKEN;

const getHolidays = async (
  startDate: Date,
  endDate: Date
): Promise<HolidayType[]> => {
  const start = `${startDate.getFullYear()}-${String(
    startDate.getMonth() + 1
  ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
  const end = `${endDate.getFullYear()}-${String(
    endDate.getMonth() + 1
  ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;
  // Replace with actual API URL and parameters
  const response = await fetch(
    `${API_URL}${HOLIDAY_ENDPOINT}?startDate=${start}&endDate=${end}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  // ADD ERROR HANDLING HERE
  if (!response.ok) {
    throw new Error("Failed to fetch holidays");
  }
  const data = await response.json();
  return data;
};

export default getHolidays;
