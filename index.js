const baseURL = "http://api.weatherapi.com/v1";
const apiMethod = "/current.json";

const APIKEY = "8c464bb088c44138809151352232810";

let requestURL = baseURL + apiMethod + "?key=" + APIKEY + "&q=kolkata";

fetch(requestURL)

    .then((response) => response.json())
    .then((responseBody) => console.log(responseBody.current.temp_c))

    .catch((error) => console.log(error));