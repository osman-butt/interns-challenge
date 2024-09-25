import { HolidayType } from "../types";
import { API_TOKEN, API_URL } from "../../Settings";

const HOLIDAY_ENDPOINT = "/holidays";
const TOKEN = API_TOKEN;

/**Fetch holidays from the API for a given date range
 * @param startDate - The start date of the range
 * @param endDate - The end date of the range
 * @returns An array of holidays
 * */
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

  return fetch(
    `${API_URL}${HOLIDAY_ENDPOINT}?startDate=${start}&endDate=${end}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  ).then(handleApiErrors);
};

async function handleApiErrors(res: Response) {
  if (!res.ok) {
    const errorResponse = await res.json();
    const msg = errorResponse.message
      ? errorResponse.message
      : "No error message provided";
    throw new Error(msg);
  }
  if (res.status === 204) {
    return;
  }
  return res.json();
}

export default getHolidays;
