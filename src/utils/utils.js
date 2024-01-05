export function formatTime(minutes) {
  if (isNaN(minutes) || minutes < 0) {
    return "Некорректное значение";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = hours > 0 ? `${hours}ч` : "";
  const minutesText = remainingMinutes > 0 ? `${remainingMinutes}м` : "";

  return `${hoursText} ${minutesText}`;
}

export const regEmail =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
