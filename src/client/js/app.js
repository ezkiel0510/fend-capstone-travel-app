/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=8daf109b273336acf3e7a25d67294521&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("generate")
    .addEventListener("click", generateWeather);
});

function generateWeather(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(baseURL, zip, apiKey).then(function (data) {
    postData("/addData", {
      date: newDate,
      temp: data.main.temp,
      feel: feelings,
    });
    // We can call here because of using async in getWeather function
    updateUI();
  });
}

const getWeather = async (weatherURL, zip, key) => {
  const res = await fetch(weatherURL + zip + key);
  try {
    const data = await res.json();
    data.message
      ? (document.getElementById("zip-wrong").innerHTML = data.message)
      : (document.getElementById("zip-wrong").innerHTML = "");
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

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
    document.getElementById("temp").innerHTML = data.temp + " degrees";
    document.getElementById("content").innerHTML = data.feel;
    document.getElementById("date").innerHTML = data.date;
  } catch (error) {
    console.log("error", error);
  }
};

export { generateWeather };
