using System.Text.Json.Serialization;

namespace HolidayApi.Models
{
    public class Holiday
    {
        [JsonPropertyName("date")]
        public string Date { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("nationalHoliday")]
        public bool NationalHoliday { get; set; }
    }
}
