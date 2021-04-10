import processWeatherJSON from './processWeatherJSON';
import OpenWeather from './OpenWeather';
import uiController from './uiController';
import storage from './storage';
import delay from './delay';
import timeFormatter from './timeFormatter';

const brain = (function () {
  let trackedLocations = storage.load('trackedLocations') || [];

  const persistLocations = () => {
    storage.save('trackedLocations', trackedLocations);
  };

  const addLocation = (location) => {
    trackedLocations.push(location);
    persistLocations();
  };

  const deleteLocation = (location) => {
    const index = trackedLocations.findIndex((el) => el === location);
    trackedLocations.splice(index, 1);

    persistLocations();
  };

  const setStatusMessage = () => {
    if (trackedLocations.length === 0) {
      uiController.setStatus('You are not tracking any weather');
    } else {
      const dObj = new Date(Date.now());
      uiController.setStatus(
        `Weather updated at ${timeFormatter.makeStamp(dObj)}`
      );
    }
  };

  const getWeather = async function (location, units) {
    const weatherAPI = OpenWeather('728aeae965e9bd7a68b2c802b392a730');
    const jsonData = await weatherAPI.getWeatherJSON(location, units);

    const cleanedData = processWeatherJSON(jsonData);
    console.log(cleanedData);
    return cleanedData;
  };

  const getWeatherList = async (array) => {
    const promises = array.map((location) => getWeather(location, 'imperial'));

    return await Promise.all(promises);
  };

  const confirmDelete = function () {
    const location = this.parentElement.parentElement.dataset.locationName;
    deleteLocation(location);
    this.parentElement.parentElement.parentElement.remove();
    uiController.removeCard(location);
    uiController.setStatus(`${location} has been removed!`);
  };

  const buildPopUp = function (data) {
    uiController.buildPopUp(
      {
        message: `Are you sure you want to remove ${data.locationName}?`,
        locationName: data.locationName,
      },
      confirmDelete
    );
  };

  const addWeatherCard = async function () {
    const location = uiController.getSearchValue();

    if (location) {
      uiController.addSpinner();
      try {
        const data = await getWeather(location, 'imperial');
        uiController.removeSpinner();

        uiController.toggleSearchButton();
        uiController.clearSearchBar();
        uiController.buildCard(data, function () {
          buildPopUp(data);
        });

        addLocation(data.locationName);
        uiController.setStatus(`${data.locationName} has been added!`);
      } catch {
        uiController.removeSpinner();
        uiController.showError(location);
        await delay(3000);
        uiController.removeError();
      }
    }
  };

  const getTrackedWeather = async () => {
    uiController.addSpinner();
    const weatherData = await getWeatherList(trackedLocations);
    uiController.removeSpinner();

    return weatherData;
  };

  const renderStoredCards = async function () {
    const trackedWeather = await getTrackedWeather();

    trackedWeather.forEach((weatherData) =>
      uiController.buildCard(weatherData, function () {
        buildPopUp(weatherData);
      })
    );
  };

  const startApp = () => {
    setStatusMessage();
    renderStoredCards();
    uiController.addSearchListeners(addWeatherCard);
  };

  return { startApp };
})();

brain.startApp();
