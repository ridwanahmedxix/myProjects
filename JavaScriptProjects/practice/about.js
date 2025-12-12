function runningTime() {
  const now = new Date();
  let hours = now.getHours().toString().padStart();
  let minutes = now.getMinutes().toString().padStart();
  let seconds = now.getSeconds().toString().padStart();

  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("clock").innerText = timeString;
}
setInterval(runningTime, 1000);
