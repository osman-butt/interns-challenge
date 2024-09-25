using HolidayApi.Interfaces;
using HolidayApi.Models;
using System.Net.Http;

namespace HolidayApi.Services
{
    public class HolidayService : IHolidayService
    {
        private readonly HttpClient _httpClient;
        private readonly string url = "https://api.sallinggroup.com/v1/holidays";

        public HolidayService(HttpClient httpClient)
        {
            string token = Environment.GetEnvironmentVariable("SALLING_GROUP_API_TOKEN") ?? throw new ArgumentNullException("SALLING_GROUP_API_TOKEN is not set");
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
            _httpClient = httpClient;
        }

        public async Task<bool> IsHoliday(string date)
        {
            // Validation of startDate and endDate can be added here
            if (!IsDateValid(date))
            {
                throw new ArgumentException("Invalid date format");
            }

            var response = await _httpClient.GetAsync($"{url}/is-holiday?date={date}");
            if (!response.IsSuccessStatusCode)
            {
                // Handle error response here if needed (e.g., throw an exception or return false)
                return false;
            }
            var content = await response.Content.ReadAsStringAsync();

            return bool.Parse(content);
        }

        public async Task<ICollection<Holiday>> GetHolidays(string startDate, string endDate)
        {
            // Validation of startDate and endDate can be added here
            if (!IsDateValid(startDate) || !IsDateValid(endDate))
            {
                throw new ArgumentException("Invalid date format");
            }

            if (DateTime.Parse(startDate) > DateTime.Parse(endDate))
            {
                throw new ArgumentException("Start date cannot be greater than end date");
            }

            ICollection<Holiday>? response = await _httpClient.GetFromJsonAsync<ICollection<Holiday>>($"{url}?startDate={startDate}&endDate={endDate}");

            if (response == null)
            {
                return new List<Holiday>();
            }
            return response;
        }

        private bool IsDateValid(string date)
        {
            if (string.IsNullOrEmpty(date))
            {
                return false;
            }

            if (date.Length != 10)
            {
                return false;
            }

            return DateTime.TryParse(date, out _);
        }
    }
}
