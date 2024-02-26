// Setting the Variables for my Generated API Key and the City
var key = '33304151a3b71e75b3669711447a8267';
var city = "Phoenix"

// Setting the Variables for the Current Date and Time
var date = moment().format('dddd, MMMM Do YYYY');
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS')

console.log(date);
console.log(dateTime);

var cityHistory = [];
// Saving the value (city) entered into the search into an Array
$('.search').on("click", function (event) {
	event.preventDefault();
	city = $(this).parent('.btnPar').siblings('.textValue').val().trim();
	if (city === "") {
		return;
	};
	cityHistory.push(city);

    // Storing the entered value
	localStorage.setItem('city', JSON.stringify(cityHistory));
	getHistory();
	getWeatherToday();
});

// Generating the previous cities Search History Buttons
var searchHistEl = $('.cityHistory');
function getHistory() {
	searchHistEl.empty();

	for (let i = 0; i < cityHistory.length; i++) {

		var rowEl = $('<row>');
		var btnEl = $('<button>').text(`${cityHistory[i]}`)

        // Coding that allows the user to click on the previous cities entered
		rowEl.addClass('row histBtnRow');
		btnEl.addClass('btn btn-outline-secondary histBtn');
		btnEl.attr('type', 'button');

		searchHistEl.prepend(rowEl);
		rowEl.append(btnEl);
	} if (!city) {
		return;
	}

	// Coding so the previous cities buttons can search for the weather data.
	$('.histBtn').on("click", function (event) {
		event.preventDefault();
		city = $(this).text();
		getWeatherToday();
	});

};

var cardToday = $('.cardBody')
// API Request for specific data and displays that data on a card
function getWeatherToday() {

    // API Base URL given for the assignment - didn't work!
    // var getUrlCurrent = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
	var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

	$(cardToday).empty();

	$.ajax({
		url: getUrlCurrent,
		method: 'GET',
	}).then(function (response) {
        // Generating the temperature data card
		$('.cardTodayCity').text(response.name);
		$('.cardTodayDate').text(date);
		$('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
		// Temperature element
		var pEl = $('<p>').text(`Temperature: ${response.main.temp} °F`);
		cardToday.append(pEl);
        // Wind Speed element
		var pElWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
		cardToday.append(pElWind);
		// Humidity element
		var pElHumid = $('<p>').text(`Humidity: ${response.main.humidity} %`);
		cardToday.append(pElHumid);
    });
    };

// Data will appear inside the weather card for the previous cities entered.
function initLoad() {

	var cityHistoryStore = JSON.parse(localStorage.getItem('city'));

	if (cityHistoryStore !== null) {
		cityHist = cityHistoryStore
	}
	getHistory();
	getWeatherToday();
};

initLoad();