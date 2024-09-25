using HolidayApi.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HolidayApi.Controllers
{
    [ApiController]
    [Route("api/holidays")]
    public class HolidayController : ControllerBase
    {
        private readonly IHolidayService _holidayService;
        public HolidayController(IHolidayService holidayService)
        {
            _holidayService = holidayService;
        }

        [HttpGet("is-holiday")]
        public async Task<IActionResult> IsHoliday([FromQuery] string date)
        {
            try
            {
                var isHoliday = await _holidayService.IsHoliday(date);
                return Ok(isHoliday);
            }
            catch (Exception ex)
            {
                var errorResponse = new ErrorResponse
                {
                    Error = ex.Message, // You can customize this to be more user-friendly
                    Status = "BadRequest", // Customize based on the exception type
                    StatusCode = StatusCodes.Status400BadRequest // You can also use other status codes
                };
                return BadRequest(errorResponse);
            }
        }

        [HttpGet(Name = "GetHolidays")]
        public async Task<IActionResult> GetHolidays([FromQuery] string startDate, [FromQuery] string endDate)
        {
            try
            {
                var holidays = await _holidayService.GetHolidays(startDate, endDate);
                return Ok(holidays);
            }
            catch (ArgumentException ex)
            {
                var errorResponse = new ErrorResponse
                {
                    Error = ex.Message, // You can customize this to be more user-friendly
                    Status = "BadRequest", // Customize based on the exception type
                    StatusCode = StatusCodes.Status400BadRequest // You can also use other status codes
                };
                return BadRequest(errorResponse);
            }
        }
    }

    public class ErrorResponse
    {
        public string Error { get; set; }
        public string Status { get; set; }
        public int StatusCode { get; set; }
    }
}
