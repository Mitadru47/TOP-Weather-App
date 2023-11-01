initializeApp();

let goButton = document.querySelector("button");
goButton.addEventListener("click", () => {

    let input = document.querySelector("input");
    let city = input.value;

    // console.log(city);

    if(city !== ""){

        let primaryContainer = document.querySelector(".primary-container");
        primaryContainer.style.display = "none";

        let loader = document.querySelector("#loading-component div");

        loader.innerText = "Loading...";
        loader.style.display = "block";

        const baseURL = "https://api.weatherapi.com/v1";
        const apiMethod = "/current.json";

        const APIKEY = "8c464bb088c44138809151352232810";

        let statusCode = "";
        let requestURL = baseURL + apiMethod + "?key=" + APIKEY + "&q=" + city;

        city = "";
        
        fetch(requestURL, { mode: "cors" })

            .then((response) => {

                // console.log(response);
                
                statusCode = response.status;
                return response.json();
            })

            .then((jsonResponse) => { 

                if(statusCode == "200"){

                    buildApp(jsonResponse);

                    let loader = document.querySelector("#loading-component div");
                    loader.style.display = "none";

                } else {

                    let loader = document.querySelector("#loading-component div");
                    loader.innerText = "Try Again!";
                }
            })

            .catch((error) => console.log(error));   
   
    } else {

        let loader = document.querySelector("#loading-component div");
        loader.style.display = "none";
    }

}, true);

function buildApp(responseBody){

    let primaryContainer = document.querySelector(".primary-container");
    primaryContainer.style.display = "flex";

    let name = document.querySelector("#name");
    name.innerText = responseBody.location.name;

    let region = document.querySelector("#region");
    region.innerText = responseBody.location.region + ", " + responseBody.location.country;

    let coordinates = document.querySelector("#coordinates");
    coordinates.innerText = responseBody.location.lat + "°N, " + responseBody.location.lon + "°E"

    let icon = document.querySelector("#icon img");
    icon.setAttribute("src", responseBody.current.condition.icon);

    let temp = document.querySelector("#temp");
    temp.innerText = responseBody.current.temp_c + "°C";

    let text = document.querySelector("#text");
    text.innerText = responseBody.current.condition.text;

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerText = "Feels like " + responseBody.current.feelslike_c + "°C";

    let windSpeed = document.querySelector("#windSpeed");
    windSpeed.innerText = responseBody.current.wind_kph + " kph";

    let windDirection = document.querySelector("#windDirection");
    windDirection.innerText = responseBody.current.wind_dir;

    let humidity = document.querySelector("#humidity");
    humidity.innerText = responseBody.current.humidity + "%";

    let uv = document.querySelector("#uv");
    uv.innerText = responseBody.current.uv;

    let lastUpdated = document.querySelector("#last_updated");
    lastUpdated.innerText = responseBody.current.last_updated;
}

function initializeApp(){

    let loader = document.querySelector("#loading-component div");
    loader.style.display = "block";

    const baseURL = "https://api.weatherapi.com/v1";
    const apiMethod = "/current.json";

    const APIKEY = "8c464bb088c44138809151352232810";

    let city = "Mykonos";
    let requestURL = baseURL + apiMethod + "?key=" + APIKEY + "&q=" + city;

    let statusCode = "";

    fetch(requestURL, { mode: "cors" })

        .then((response) => {

            statusCode = response.status;
            return response.json();
        })

        .then((jsonResponse) => { 

            if(statusCode == "200"){

                buildApp(jsonResponse);

                let loader = document.querySelector("#loading-component div");
                loader.style.display = "none";

            } else {

                let loader = document.querySelector("#loading-component div");
                loader.innerText = "Try Again!";
            }
        })

        .catch((error) => console.log(error));   
}