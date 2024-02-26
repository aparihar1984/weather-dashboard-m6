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

// Generating Buttons Based On Search History
var contHistEl = $('.cityHistory');
function getHistory() {
	contHistEl.empty();

	for (let i = 0; i < cityHistory.length; i++) {

		var rowEl = $('<row>');
		var btnEl = $('<button>').text(`${cityHistory[i]}`)

		rowEl.addClass('row histBtnRow');
		btnEl.addClass('btn btn-outline-secondary histBtn');
		btnEl.attr('type', 'button');

		contHistEl.prepend(rowEl);
		rowEl.append(btnEl);
	} if (!city) {
		return;
	}
};

var cardTodayBody = $('.cardBodyToday')
// API Request for specific data and displays that data on a card
function getWeatherToday() {

    // var getUrlCurrent = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
	var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

	$(cardTodayBody).empty();

	$.ajax({
		url: getUrlCurrent,
		method: 'GET',
	}).then(function (response) {
		$('.cardTodayCityName').text(response.name);
		$('.cardTodayDate').text(date);
		//Icons
		$('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
		// Temperature
		var pEl = $('<p>').text(`Temperature: ${response.main.temp} °F`);
		cardTodayBody.append(pEl);
		//Humidity
		var pElHumid = $('<p>').text(`Humidity: ${response.main.humidity} %`);
		cardTodayBody.append(pElHumid);
		//Wind Speed
		var pElWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
		cardTodayBody.append(pElWind);
        getFiveDayForecast();
    });
    };
    var fiveDayForecastEl = $('.fiveDayForecast');