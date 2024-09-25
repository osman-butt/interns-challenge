using HolidayApi.Interfaces;
using HolidayApi.Models;

namespace HolidayApi.Services
{
    public class HolidayService : IHolidayService
    {
        public async Task<bool> IsHoliday(string date)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Holiday>> GetHolidays(string startDate, string endDate)
        {
            throw new NotImplementedException();
        }
    }
}
