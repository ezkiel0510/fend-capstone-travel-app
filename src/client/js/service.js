const getGeoNamesService = async (geoNamesURL, city, userName) => {
  const res = await fetch(geoNamesURL + city + userName);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const getWeatherBitService = async (weatherBitURL, lat, lon, key) => {
  const res = await fetch(weatherBitURL + lat + lon + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const getPixabayService = async (pixabayURL, key, des) => {
  const url = pixabayURL + key + des.split(" ").join("+");
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export { getGeoNamesService, getWeatherBitService, getPixabayService };
