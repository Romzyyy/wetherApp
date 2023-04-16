const api_key = '4861b9d891d94da4aab181842231504'
const base_url = 'https://api.weatherapi.com/v1/current.json'

const searchbox = document.querySelector('.search-bar')
searchbox.addEventListener('keypress', setQuery)

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value)
    }
}

function getResults(query) {
    fetch(`${base_url}?key=${api_key}&q=${query}&aqi=no`)
        .then((weather) => {
            return weather.json()
        })
        .then(displayResults)
}

function displayResults(weather) {
    const city = document.querySelector('.city')
    city.innerText = `${weather.location.name}, ${weather.location.country}`

    const now = new Date()
    const date = document.querySelector('.date')
    date.innerText = dateBuilder(now)

    const temp = document.querySelector('.temp')
    temp.innerHTML = `${Math.round(weather.current.temp_c)}<span>°C</span>`

    const weather_el = document.querySelector('.weather')
    weather_el.innerText = weather.current.condition.text

    const hilow = document.querySelector('.hi-low')
    hilow.innerText = `${Math.round(
        weather.forecast.forecastday[0].day.maxtemp_c
    )}°C / ${Math.round(weather.forecast.forecastday[0].day.mintemp_c)}°C`
}

function dateBuilder(d) {
    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
}
