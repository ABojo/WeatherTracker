export default (function () {
  const searchBar = document.querySelector('.searchBar');
  const cardGrid = document.querySelector('.results-grid');
  const statusMessage = document.querySelector('.update-status');

  const addSpinner = () => {
    document.body.insertAdjacentHTML(
      'beforeEnd',
      `<div class="lds-roller">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`
    );
  };

  const removeSpinner = () => {
    document.querySelector('.lds-roller').remove();
  };

  const newElement = function (obj) {
    const element = document.createElement(obj.type);

    Object.keys(obj).forEach((key) => {
      if (obj[key] instanceof Object) {
        Object.keys(obj[key]).forEach((subKey) => {
          element[key][subKey] = obj[key][subKey];
        });
      } else if (key !== 'type') {
        element[key] = obj[key];
      }
    });

    return element;
  };

  const toggleSearchButton = function () {
    const searchButton = document.querySelector('.searchButton');

    if (this.value) {
      searchButton.classList.add('active');
    } else {
      searchButton.classList.remove('active');
    }
  };

  const addSearchListeners = (callback) => {
    document.querySelector('.searchButton').addEventListener('click', callback);
    document
      .querySelector('.searchBar')
      .addEventListener('keypress', function (e) {
        if (e.key == 'Enter') {
          callback();
        }
      });
  };

  const getSearchValue = () => searchBar.value;
  const clearSearchBar = () => (searchBar.value = '');

  const buildCard = (obj, deleteCardCB) => {
    const cardBox = newElement({
      type: 'div',
      className: `results-box ${obj.background}`,
      dataset: { locationName: obj.locationName },
    });
    const cardLayer = newElement({ type: 'div', className: 'results-layer' });
    const deleteButton = newElement({
      type: 'h1',
      className: 'delete',
      innerHTML: '<i class="fas fa-times"></i>',
    });
    const cardHeading = newElement({
      type: 'h1',
      className: 'results-heading',
      innerHTML: `<i class="fas fa-map-marker-alt location-mark"></i>${obj.locationName}`,
    });
    const cardTemp = newElement({
      type: 'h1',
      className: 'results-temp',
      innerHTML: `${obj.currentTemp}&deg;`,
    });
    const cardTime = newElement({
      type: 'h1',
      className: 'results-time',
      textContent: obj.timestamp,
    });

    deleteButton.addEventListener('click', deleteCardCB);

    cardBox.append(cardLayer);
    cardLayer.append(deleteButton, cardHeading, cardTemp, cardTime);

    cardGrid.append(cardBox);
  };

  const buildPopUp = (obj, confirmCB) => {
    const popupOverlay = newElement({ type: 'div', className: 'popup' });
    const popupBox = newElement({
      type: 'div',
      className: 'popup-box',
      dataset: { locationName: obj.locationName },
    });
    const popupMessage = newElement({
      type: 'p',
      className: 'popup-message',
      textContent: obj.message,
    });

    const popupButtons = newElement({
      type: 'div',
      className: 'popup-buttons',
    });

    const popupConfirmButton = newElement({
      type: 'button',
      className: 'popup-button confirm',
      textContent: 'Yes',
    });

    const popupRejectButton = newElement({
      type: 'button',
      className: 'popup-button reject',
      textContent: 'No',
    });

    popupConfirmButton.addEventListener('click', confirmCB);
    popupRejectButton.addEventListener('click', function () {
      this.parentElement.parentElement.parentElement.remove();
    });

    popupButtons.append(popupConfirmButton, popupRejectButton);
    popupBox.append(popupMessage, popupButtons);
    popupOverlay.append(popupBox);
    document.body.append(popupOverlay);
  };

  const removeCard = (locationName) => {
    document.querySelector(`[data-location-name="${locationName}"]`).remove();
  };

  const showError = (location) => {
    const errorBox = newElement({ type: 'div', className: 'error-box' });
    const errorMessage = newElement({
      type: 'h1',
      className: 'error-message',
      textContent: `Sorry, we were unable to find weather data for "${location}"`,
    });

    errorBox.append(errorMessage);
    document.body.append(errorBox);
  };

  const removeError = () => {
    document.querySelector('.error-box').remove();
  };

  const setStatus = (status) => {
    statusMessage.textContent = status;
  };

  //Setup event listeners
  searchBar.addEventListener('input', toggleSearchButton);

  return {
    addSearchListeners,
    getSearchValue,
    clearSearchBar,
    buildCard,
    addSpinner,
    removeSpinner,
    buildPopUp,
    removeCard,
    showError,
    removeError,
    toggleSearchButton,
    setStatus,
  };
})();
