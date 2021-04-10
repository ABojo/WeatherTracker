export default function (apiKey) {
  const getWeatherJSON = async function (location, units) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}&units=${units}`;
    const rawResponse = await fetch(url, { mode: 'cors' });
    const jsonData = await rawResponse.json();

    return jsonData;
  };

  return { getWeatherJSON };
}
