import timeFormatter from './timeFormatter';

export default function (obj) {
  const getBackground = (hour) => {
    if (hour > 6 && hour < 20) return 'day';

    return 'night';
  };

  const dateObject = new Date(Date.now() + obj.timezone * 1000);
  const timestamp = timeFormatter.makeStamp(dateObject, { useUTCHours: true });
  const background = getBackground(dateObject.getUTCHours());

  return {
    locationName: obj.name,
    currentTemp: Math.round(obj.main.temp),
    highTemp: obj.main.temp_max,
    lowTemp: obj.main.temp_min,
    humidity: obj.main.humidity,
    timestamp: timestamp,
    background: background,
  };
}
