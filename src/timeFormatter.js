export default (function () {
  const convertHours = (hours) => {
    if (hours === 0) return 12;
    if (hours > 12) return hours - 12;

    return hours;
  };

  const convertMinutes = (minutes) => {
    if (minutes.toString().length === 1) return `0${minutes}`;

    return minutes;
  };

  const makeStamp = (dateObj, options) => {
    let hours;

    if (options && options.useUTCHours) {
      hours = dateObj.getUTCHours();
    } else {
      hours = dateObj.getHours();
    }

    const convertedHours = convertHours(hours);
    const convertedMinutes = convertMinutes(dateObj.getMinutes());
    const timeOfDay = hours > 11 ? 'PM' : 'AM';

    return `${convertedHours}:${convertedMinutes} ${timeOfDay}`;
  };

  return {
    makeStamp,
  };
})();
