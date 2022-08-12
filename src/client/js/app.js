import {
  getGeoNamesService,
  getWeatherBitService,
  getPixabayService,
} from "./service";
import { removeAllChildNodes, getDays } from "./helper";

/* Global Variables */
const GEO_URL = "http://api.geonames.org/searchJSON?q=";
const GEO_USER_NAME = "&username=thiendc1";
const WEATHER_BIT_URL = "https://api.weatherbit.io/v2.0/current?";
const WEATHER_BIT_KEY = "&key=c4e638b86afb4c0bbd061b48ac33506d";
const PIXABAY_URL = "https://pixabay.com/api/";
const PIXABAY_KEY =
  "?key=29199933-5e5f5d1128036c52c7c42f083&image_type=photo&pretty=true&";

// Create a new date instance dynamically with JS
let d1 = new Date();

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("generate").addEventListener("click", getGeoNames);
});

function getGeoNames(e) {
  const pixabayImage = document.getElementById("pixabay-image");
  const city = document.getElementById("city").value;
  let d2 = new Date();
  const endDate = document.getElementById("end").value;
  if (endDate) d2 = new Date(endDate);
  const days = getDays(d1, d2);

  removeAllChildNodes(pixabayImage);
  getGeoNamesService(GEO_URL, city, GEO_USER_NAME).then(function (data) {
    if (data.geonames[0]) {
      postData("/addData", {
        lat: data.geonames[0].lat,
        lon: data.geonames[0].lng,
        countryName: data.geonames[0].countryName,
        tripLength: days,
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
    document.getElementById("lat").innerHTML = `${data.lat} degrees`;
    document.getElementById("lon").innerHTML = `${data.lon} degrees`;
    document.getElementById("country").innerHTML = data.countryName;
    document.getElementById(
      "conclusion"
    ).innerHTML = `Your trip will last for ${data.tripLength} day${
      data.tripLength > 1 ? "s" : ""
    }`;
    getWeatherBitService(
      WEATHER_BIT_URL,
      `lat=${data.lat}`,
      `&lon=${data.lon}`,
      WEATHER_BIT_KEY
    )
      .then(function ({ data }) {
        document.getElementById("temp").innerHTML = `${data[0].temp} celsius`;
        document.getElementById("clouds").innerHTML = `${data[0].clouds} %`;
        document.getElementById("city-name").innerHTML = data[0].city_name;
        return data[0].weather;
      })
      .then(function ({ description }) {
        const des = `q=weather ${description}`;
        getPixabayService(PIXABAY_URL, PIXABAY_KEY, des).then(function ({
          hits,
        }) {
          if (hits[0]) {
            const image = new Image(300);
            // image.src = hits[0].previewURL;
            image.src = hits[0].largeImageURL;
            document.getElementById("pixabay-image").appendChild(image);
          }
        });
      });
  } catch (error) {
    console.log("error", error);
  }
};

export { getGeoNames };
