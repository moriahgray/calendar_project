// Calendar object to store events
const calendar = {};

// Function to generate calendar for a given month and year
function generateCalendar(month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const calendarBody = document.getElementById("calendarBody");
  calendarBody.innerHTML = "";

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      if (i === 0 && j < firstDayOfMonth) {
        const emptyCell = document.createElement("span");
        emptyCell.textContent = "";
        cell.appendChild(emptyCell);
      } else if (date > daysInMonth) {
        break;
      } else {
        const dayCell = document.createElement("span");
        dayCell.textContent = date;
        dayCell.dataset.date = `${year}-${month + 1}-${date}`;
        dayCell.classList.add("calendar-day");
        cell.appendChild(dayCell);
        date++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
}

// Function to add event
function addEvent() {
  const event = document.getElementById("event").value;
  const time = document.getElementById("time").value;
  const location = document.getElementById("location").value;

  // Get the selected date
  const selectedDate = document.getElementById("selectedDate").textContent;

  // Create event object
  const newEvent = { time, location };

  // Check if the selected date already exists in the calendar
  if (calendar.hasOwnProperty(selectedDate)) {
    // Add event to existing date
    calendar[selectedDate][event] = newEvent;
  } else {
    // Create new date entry and add event
    calendar[selectedDate] = { [event]: newEvent };
  }

  // Clear input fields
  document.getElementById("event").value = "";
  document.getElementById("time").value = "";
  document.getElementById("location").value = "";

  // Update checklist
  updateChecklist(selectedDate);
}

// Function to update checklist for a given date
function updateChecklist(date) {
  const eventsList = document.getElementById("eventsList");
  eventsList.innerHTML = ""; // Clear previous entries

  if (calendar.hasOwnProperty(date)) {
    // Display events for the given date
    const events = calendar[date];
    for (const event in events) {
      if (events.hasOwnProperty(event)) {
        const { time, location } = events[event];
        const listItem = document.createElement("li");
        listItem.textContent = `${event} - Time: ${time}, Location: ${location}`;
        eventsList.appendChild(listItem);
      }
    }
  } else {
    // No events for the given date
    const listItem = document.createElement("li");
    listItem.textContent = "No events for today.";
    eventsList.appendChild(listItem);
  }
}

// Function to handle click on calendar days
function handleDayClick(event) {
  const selectedDate = event.target.dataset.date;
  updateChecklist(selectedDate);

  // Show event input section
  document.getElementById("eventInput").style.display = "block";
  // Set the selected date
  document.getElementById("selectedDate").textContent = selectedDate;
}

// Initial call to generate calendar for the current month
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
generateCalendar(currentMonth, currentYear);
document.getElementById("currentMonth").textContent = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);

// Add event listener to each day cell of the calendar
document.querySelectorAll(".calendar-day").forEach(dayCell => {
  dayCell.addEventListener("click", handleDayClick);
});

// Add event listener to Add Event button
document.getElementById("addEventBtn").addEventListener("click", addEvent);

// Hide event input section initially
document.getElementById("eventInput").style.display = "none";
