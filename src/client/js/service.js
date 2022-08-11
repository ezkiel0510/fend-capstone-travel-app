const getGeoNamesService = async (geoNamesURL, city, userName) => {
  const res = await fetch(geoNamesURL + city + userName);
  try {
    const data = await res.json();
    data.message
      ? (document.getElementById("city-wrong").innerHTML = data.message)
      : (document.getElementById("city-wrong").innerHTML = "");
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export { getGeoNamesService };
