//API info
//https://openweathermap.org/current
//https://openweathermap.org/weather-conditions

$(document).ready(function() {

    const convertUNIX = (unixTime) => {
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unixTime*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return formattedTime;
    }

    const getWeather = (w, units) => {
        const weather = {
            description: w.weather[0].description,
            icon: w.weather[0].icon,
            current: (w.main.temp).toFixed(0),
            humidity: w.main.humidity, //%
            windSpeed: w.wind.speed, //Metric: meter/sec, Imperial: miles/hour
            sunrise: w.sys.sunrise, //unix
            sunset: w.sys.sunset, //unix
            location: w.name + ', ' + w.sys.country
        }

        $('#location').text(weather.location);

        if (units === 'metric') {
            $('#current').text(weather.current + 'ºC');
        } else {
            $('#current').text(weather.current + 'ºF');
        }
        
        $('#description').text(weather.description);
        $('#humidity').text(weather.humidity+'%');

        if (units === 'metric') {
            $('#windSpeed').text(weather.windSpeed + ' m/s');
        } else {
            $('#windSpeed').text(weather.windSpeed + ' mph');
        }

        $('#sunrise').text(convertUNIX(weather.sunrise));
        $('#sunset').text(convertUNIX(weather.sunset));

    }

    const tryAgain = () => {
        console.log('try again');
    }

    $('#getWeather').click(function(e) {
        e.preventDefault();
        queryOpenWeatherAPI($('#search').val());
    })

    $('#search').keypress(function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            queryOpenWeatherAPI($('#search').val());
            $('#search').val('');
        }
    })
    

    const queryOpenWeatherAPI = (location) => {
        const apiKey = '477f718056327f5bf85928a1a622d3b0';
        let units = '';
        if ($('#metric').hasClass('active')) {
            units = 'metric';
        } else {
            units = 'imperial';
        }

        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q='
                +location+'&units='+units+'&APPID='+apiKey,
            type: "GET",
            datatype: "jsonp",
            success: data => getWeather(data, units),
            error: () => tryAgain() 
        })
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    function showPosition(position) {
        console.log( "lat=" + position.coords.latitude.toFixed(0) + "&long=" + position.coords.longitude.toFixed(0) ); 
    }


    $('#getLocation').click(function(e) {
        e.preventDefault();
        console.log(getLocation());
    })
    







    queryOpenWeatherAPI('Toronto, CA');




})