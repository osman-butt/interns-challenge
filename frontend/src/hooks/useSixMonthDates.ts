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
] as const;

/**Generate an array of dates for a given month
 * @param year - The year of the month
 * @param month - The month to generate dates for
 * @returns An array of dates for the month
 * */
const generateMonthDates = (year: number, month: number): Date[] => {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);

  const dates: Date[] = [];
  for (let day = start.getDate(); day <= end.getDate(); day++) {
    dates.push(new Date(year, month, day));
  }

  return dates;
};

/**Generate an array of dates for a given month and six months ahead
 * @param startDate - The start date of the six months
 * @returns An array of arrays of dates for the six months
 * */
const useSixMonthsDates = (
  startDate: Date = new Date()
): { dates: Date[][]; displayMonths: string[] } => {
  const dates: Date[][] = [];
  const indexStart = startDate.getMonth();

  // Generate dates for the six months
  for (let i = 0; i < 6; i++) {
    const month = (indexStart + i) % 12;
    // IF January is contained later than index 0, then we need to add 1 to the year
    if (month === 0 && i > 0) {
      startDate.setFullYear(startDate.getFullYear() + 1);
    }
    dates.push(generateMonthDates(startDate.getFullYear(), month));
  }

  // Get display month names for the six months
  const displayMonths = MONTHS.slice(indexStart, indexStart + 6)
    .concat(MONTHS)
    .slice(0, 6);
  console.log(displayMonths);

  return { dates, displayMonths };
};

export default useSixMonthsDates;

// TODO: REMOVE THIS OLD IMPLEMENTATION
// const getMonthOffset = (date: Date) => {
//   return date.getMonth() < 6 ? 0 : 6;
// };

// TODO: REMOVE THIS OLD IMPLEMENTATION
// const useSixMonthsDates = (
//   initialDate: Date = new Date()
// ): { dates: Date[][]; displayMonths: string[] } => {
//   const today = initialDate;
//   const dates: Date[][] = [];

//   // determine which half of the year we are in
//   if (today.getMonth() < 6) {
//     for (let i = 0; i < 6; i++) {
//       dates.push(generateMonthDates(today.getFullYear(), i));
//     }
//   } else {
//     for (let i = 6; i < 12; i++) {
//       dates.push(generateMonthDates(today.getFullYear(), i));
//     }
//   }
//   const monthOffset = getMonthOffset(initialDate);
//   // Get display month names for the six months
//   const displayMonths = MONTHS.slice(monthOffset, monthOffset + 6).concat(
//     MONTHS.slice(0, monthOffset)
//   );
//   return { dates, displayMonths };
// };
