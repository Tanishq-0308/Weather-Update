const cityInput= document.querySelector(".cityInput");
const weatherForm= document.querySelector(".weatherForm");
const card= document.querySelector('.card');
const apiKey="0fefc8c8c840241a09550155613a450c";

weatherForm.addEventListener("submit", async event=>{
    event.preventDefault();
    const city= cityInput.value;
    if(city){
        try{
            const weatherData= await getWeatherData(city);
            getWeatherInfo(weatherData);
        }
        catch(error){
            console.error();
            displayError(error);
        }
    }
    else{
        displayError("Enter the city Name");
    }
})

async function getWeatherData(city){
    const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response= await fetch(apiUrl);
    
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
    console.log(response);

}

function getWeatherInfo(data){
    const {name: city,
            main:{temp,humidity},
            weather: [{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";

    const cityDisplay= document.createElement('h1');
    const tempDisplay= document.createElement('p');
    const humidityDisplay= document.createElement('p');
    const descDisplay= document.createElement('p');
    const weatherEmoji= document.createElement('p');
    
    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp - 273.15).toFixed(1)}°C`;
    // tempDisplay.textContent=temp;
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=displayEmoji(id);
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)
}

function displayEmoji(id){

    switch(true){
        case (id>=200 && id<300):
            return "⛈️";
        case (id >= 300 && id<400):
            return "🌧️";
        case (id>=500 && id<600):
            return "🌧️";
        case (id>=600 && id<700):
            return "❄️";
        case (id>=700 && id<800):
            return "🌫️";
        case (id=== 800):
            return "☀️";
        case (id>=801 && id<810):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay= document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display= "flex";
    card.appendChild(errorDisplay);
}