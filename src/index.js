import "./styles.css";

// Update the clock display
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Update the clock display every second
setInterval(updateClock, 1000);

// Handle form submission for setting an alarm
document
  .getElementById("alarm-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const hours = document.getElementById("alarm-hours").value;
    const minutes = document.getElementById("alarm-minutes").value;
    const seconds = document.getElementById("alarm-seconds").value;
    const amPm = document.getElementById("am-pm").value;
    setAlarm(hours, minutes, seconds, amPm);
  });

// Set an alarm
function setAlarm(hours, minutes, seconds, amPm) {
  // Convert hours to 24-hour time
  if (amPm === "pm" && hours != 12) {
    hours = parseInt(hours) + 12;
  }
  if (amPm === "am" && hours === 12) {
    hours = 0;
  }

  // Set the alarm time
  const alarmTime = new Date();
  alarmTime.setHours(hours);
  alarmTime.setMinutes(minutes);
  alarmTime.setSeconds(seconds);

  // Add the alarm to the list
  const alarmList = document.getElementById("alarm-list");
  const alarmItem = document.createElement("li");
  alarmItem.textContent = `${hours}:${minutes}:${seconds} ${amPm}`;
  alarmList.appendChild(alarmItem);

  // Create a delete button for the alarm
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    // Remove the alarm from the list
    alarmList.removeChild(alarmItem);
    // Clear the interval for this alarm
    clearInterval(interval);
  });
  alarmItem.appendChild(deleteButton);

  // Check the time every second
  const interval = setInterval(function () {
    // Get the current time
    const now = new Date();
    // If the current time is equal to the alarm time, trigger the alarm
    if (
      now.getHours() === alarmTime.getHours() &&
      now.getMinutes() === alarmTime.getMinutes() &&
      now.getSeconds() === alarmTime.getSeconds()
    ) {
      triggerAlarm();
      clearInterval(interval);
    }
  }, 1000);
}

function triggerAlarm() {
  // Use the JavaScript alert function to alert the user
  alert("ALARM!");
}
