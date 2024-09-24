using System.Text.Json;

namespace HolidayCalendar
{
    public class ExternalHolidayApi : IExternalHolidayApi
    {
        private HttpClient _client;
        private readonly string _baseUrl;

        public ExternalHolidayApi()
        {
            
            _baseUrl = Environment.GetEnvironmentVariable("SALLING_GROUP_API_URL") ?? throw new Exception("SALLING_GROUP_API_BASE_URL is not set");
            string token = Environment.GetEnvironmentVariable("SALLING_GROUP_API_TOKEN") ?? throw new Exception("SALLING_GROUP_API_TOKEN is not set");

            _client = new HttpClient();
            _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
        }

        public bool IsHoliday(DateTime date)
        {
            var response = _client.GetAsync($"{_baseUrl}/is-holiday?date={date:yyyy-MM-dd}").Result;
            response.EnsureSuccessStatusCode();
            return bool.Parse(response.Content.ReadAsStringAsync().Result);
        }

        public ICollection<ApiResponse> GetHolidays(DateTime startDate, DateTime endDate)
        {
            var response = _client.GetAsync($"{_baseUrl}?startDate={startDate:yyyy-MM-dd}&endDate={endDate:yyyy-MM-dd}").Result;
            response.EnsureSuccessStatusCode();
            string jsonString = response.Content.ReadAsStringAsync().Result;
            var holidayResponse = JsonSerializer.Deserialize<List<ApiResponse>>(jsonString);
            return holidayResponse ?? new List<ApiResponse>();
        }
    }
}