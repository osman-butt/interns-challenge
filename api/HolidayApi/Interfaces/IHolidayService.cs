using HolidayApi.Models;

namespace HolidayApi.Interfaces
{
    public interface IHolidayService
    {
        Task<bool> IsHoliday(string date);
        Task<ICollection<Holiday>> GetHolidays(string startDate, string endDate);
    }
}
