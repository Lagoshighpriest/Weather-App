let weather = {
    "apiKey" : "3da95d5ad1cc3625d905f6631d2c00df",
    fetchWeather :async function(city){
        let response =fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        )
        let data =  (await response).json()
        data.then(data => this.displayWeather(data))

    },
    displayWeather : (data)=>{
        const { name } = data;
        const { icon , description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind speed: " + speed + " km/hr";
        document.querySelector(".weather").classList.remove("loading")
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"


    },
    search:function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search-button").addEventListener("click", ()=>{
    weather.search();

})

document.querySelector(".search-bar").addEventListener("keyup", (event)=>{
    if(event.key == "Enter"){
        weather.search();
    }
})

weather.fetchWeather()