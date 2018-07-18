//API info
//https://openweathermap.org/current
//https://openweathermap.org/weather-conditions

$(document).ready(function() {

    const print = (toPrint) => console.log(toPrint);

    const createElem = (elem, content, elemClass) => {
        const newElem = document.createElement(elem);
        const newContent = document.createTextNode(content);
        newElem.appendChild(newContent);
        if (elemClass) {
            newElem.className = elemClass;
        }
        return newElem;
    }

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

        const $output = $('#output');

        $output.empty();

        $output.append(createElem('h1', weather.location));
        $output.append(createElem('p', weather.current, 'current'));
        $output.append(createElem('span', weather.description, 'description'));
        //svg
        $output.append(createElem('p', weather.humidity));
        $output.append(createElem('p', weather.windSpeed));
        $output.append(createElem('p', convertUNIX(weather.sunrise));
        $output.append(createElem('p', convertUNIX(weather.sunset));

    }

    const tryAgain = () => {
        console.log('try again');
    }

    $('#getWeather').click(function() {
        event.preventDefault();

        const apiKey = '477f718056327f5bf85928a1a622d3b0';
        const city = $('#search').val();
        const units = 'celsius';

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