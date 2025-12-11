function runningTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("clock").innerText = timeString;
}
setInterval(runningTime, 1000);
