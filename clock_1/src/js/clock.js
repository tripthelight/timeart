export default function clock() {
  function updateClock(hours, minutes, seconds) {
    let hourDegrees = hours * 30;
    let minuteDegrees = minutes * 6;
    let secondDegrees = seconds * 6;

    const HOUR = document.querySelector('.hour');
    const MINUTE = document.querySelector('.minute');
    const SECOND = document.querySelector('.second');

    HOUR.style.transform = `rotate(${hourDegrees}deg)`;
    MINUTE.style.transform = `rotate(${minuteDegrees}deg)`;
    SECOND.style.transform = `rotate(${secondDegrees}deg)`;
  }
  setClockWithCurrentTime();
  function setClockWithCurrentTime() {
    let date = new Date();
    let hours = ((date.getHours() + 11) % 12 + 1);
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    updateClock(hours, minutes, seconds);
  }
  setInterval(setClockWithCurrentTime, 1000);
}
