import { getGeoNamesService } from "./service";

/* Global Variables */
const GEO_URL = "http://api.geonames.org/searchJSON?q=";
const GEO_USER_NAME = "&username=thiendc1";
const WEATHER_BIT_KEY = "c4e638b86afb4c0bbd061b48ac33506d";

// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("generate").addEventListener("click", getGeoNames);
});

function getGeoNames(e) {
  const city = document.getElementById("city").value;
  getGeoNamesService(GEO_URL, city, GEO_USER_NAME).then(function (data) {
    if (data.geonames[0]) {
      postData("/addData", {
        lat: data.geonames[0].lat,
        lon: data.geonames[0].lng,
        countryName: data.geonames[0].countryName,
      });
    }
    // We can call here because of using async in getGeoNamesService function
    updateUI();
  });
}

// Async POST
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const res = await fetch("/all");
  try {
    const data = await res.json();
    document.getElementById("lat").innerHTML = data.lat;
    document.getElementById("lon").innerHTML = data.lon;
    document.getElementById("country").innerHTML = data.countryName;
  } catch (error) {
    console.log("error", error);
  }
};

export { getGeoNames };
