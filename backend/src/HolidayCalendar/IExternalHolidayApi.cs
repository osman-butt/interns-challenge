namespace HolidayCalendar;
public interface IExternalHolidayApi
{
    bool IsHoliday(DateTime date);
    ICollection<ApiResponse> GetHolidays(DateTime startDate, DateTime endDate);
}