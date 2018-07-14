//API info
//https://openweathermap.org/current
//https://openweathermap.org/weather-conditions

$(document).ready(function() {

    const print = (toPrint) => console.log(toPrint);

    const getWeather = (w) => {
        const weather = {
            description: w.weather[0].description,
            icon: w.weather[0].icon,
            units: $("input[name='unit']:checked").val(),
            current: w.main.temp,
            high: w.main.temp_max,
            low: w.main.temp_min,
            humidity: w.main.humidity, //%
            windSpeed: w.wind.speed, //Metric: meter/sec, Imperial: miles/hour
            sunrise: w.sys.sunrise, //unix
            sunset: w.sys.sunset, //unix
            location: w.name + ', ' + w.sys.country
        }
        print(weather);
    }

    const tryAgain = () => {
        console.log('try again');
    }

    $('#getWeather').click(function() {
        event.preventDefault();

        const apiKey = '477f718056327f5bf85928a1a622d3b0';
        const city = $('#search').val();
        const units = $("input[name='unit']:checked").val();

        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q='
                +city+'&units='+units+'&APPID='+apiKey,
            type: "GET",
            datatype: "jsonp",
            success: data => getWeather(data),
            error: () => tryAgain() 
        })
    })

    
})