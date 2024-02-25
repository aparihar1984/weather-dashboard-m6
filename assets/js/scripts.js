// Setting Variables for my generated API Key and the City
var key = '33304151a3b71e75b3669711447a8267';
var city = "Phoenix"

// Setting Variables for the current Date and Time
var date = moment().format('dddd, MMMM Do YYYY');
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS')

console.log(date);
console.log(dateTime);

var cityHistory = [];
// Saving the value entered into the search into an Array
$('.search').on("click", function (event) {
	event.preventDefault();
	city = $(this).parent('.btnPar').siblings('.textValue').val().trim();
	if (city === "") {
		return;
	};
	cityHistory.push(city);

	localStorage.setItem('city', JSON.stringify(cityHistory));
	fiveDayForecastEl.empty();
	getHistory();
	getWeatherToday();
});