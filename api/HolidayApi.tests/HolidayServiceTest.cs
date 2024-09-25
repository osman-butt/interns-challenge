using HolidayApi.Interfaces;
using HolidayApi.Services;
using System.Net.Http;

namespace HolidayApi.tests;

public class HolidayServiceTest
{

    private IHolidayService fixture;

    [SetUp]
    public void Setup()
    {
        HttpClient client = new HttpClient();
        fixture = new HolidayService(client);
    }

    [Test]
    public async Task GIVEN_XmasDay_WHEN_IsHoliday_THEN_return_true()
    {
        // Arrange
        var date = new DateTime(2023, 12, 25);

        // Act
        var result = await fixture.IsHoliday(date.ToString("yyyy-MM-dd"));

        Assert.IsTrue(result);
    }

    [Test]
    public async Task GIVEN_regular_weekday_WHEN_IsHoliday_THEN_return_false()
    {
        // Arrange
        var date = new DateTime(2023, 4, 21);

        // Act
        var result = await fixture.IsHoliday(date.ToString("yyyy-MM-dd"));

        // Assert
        Assert.IsFalse(result);
    }


    [Test]
    public async Task GIVEN_April2023_WHEN_GetHolidays_THEN_return_EasterDays()
    {
        // Arrange
        var startDate = new DateTime(2023, 4, 1);
        var endDate = new DateTime(2023, 4, 30);



        // Act
        var result = await fixture.GetHolidays(startDate.ToString("yyyy-MM-dd"), endDate.ToString("yyyy-MM-dd"));
        var resultDates = result.Select(x => x.Date).ToList();

        // Assert
        Assert.IsTrue(resultDates.Contains("2023-04-02"));
        Assert.IsTrue(resultDates.Contains("2023-04-06")); // Maundy Thursday
        Assert.IsTrue(resultDates.Contains("2023-04-07")); // Good Friday
        Assert.IsTrue(resultDates.Contains("2023-04-09")); // Easter Sunday
        Assert.IsTrue(resultDates.Contains("2023-04-10")); // Easter Monday
        Assert.AreEqual(5, resultDates.Count);
    }
}