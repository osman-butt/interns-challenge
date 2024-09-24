using System;
using System.Collections;

namespace HolidayCalendar;
public class HolidayCalendar : IHolidayCalendar
{
  private IExternalHolidayApi _externalHolidayApi;

  public HolidayCalendar()
  {
    _externalHolidayApi = new ExternalHolidayApi();
  }

  public bool IsHoliday(DateTime date)
  { 
    return _externalHolidayApi.IsHoliday(date);
  }

  public ICollection<DateTime> GetHolidays(DateTime startDate, DateTime endDate)
  {
    var holidays = _externalHolidayApi.GetHolidays(startDate, endDate);
    var holidayDates = new List<DateTime>();
    foreach (var holiday in holidays)
    {
      if (holiday.nationalHoliday) holidayDates.Add(DateTime.Parse(holiday.date));
    }
    return holidayDates;
  }
}
