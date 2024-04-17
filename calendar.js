// Calendar object to store events
const calendarEvents = {};

// Function to generate calendar for a given month and year
function generateCalendar(month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const calendarBody = document.getElementById("calendarBody");
  calendarBody.innerHTML = "";
  
  let date = 1;
  for (let i = 0; i < 6; i++) { // 6 rows to cover all possibilities
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) { // 7 days a week
      const cell = document.createElement("td");
      if (i === 0 && j < firstDayOfMonth) {
        // Before the first day of the month
        cell.classList.add("calendar-empty");
      } else if (date > daysInMonth) {
        // After the last day of the month
        cell.classList.add("calendar-empty");
      } else {
        // Current month's days
        const dayCell = document.createElement("span");
        dayCell.textContent = date;
        dayCell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
        dayCell.classList.add("calendar-day");
        cell.appendChild(dayCell);
        date++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
    // If we've reached the end of the month, stop adding new rows
    if (date > daysInMonth) {
      break;
    }
  }
}

// Function to add event
function addEvent() {
  const selectedDate = document.getElementById("selectedDate").textContent;
  if (selectedDate) {
    const eventText = document.getElementById("event").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value;
    const eventDetails = { eventText, time, location };
    
    if (!calendarEvents[selectedDate]) {
      calendarEvents[selectedDate] = [];
    }
    
    calendarEvents[selectedDate].push(eventDetails);
    updateChecklist(selectedDate);
  }
  
  // Clear input fields
  document.getElementById("event").value = '';
  document.getElementById("time").value = '';
  document.getElementById("location").value = '';
}

// Function to update checklist for a given date
function updateChecklist(date) {
  const eventsList = document.getElementById("eventsList");
  eventsList.innerHTML = ''; // Clear previous entries
  const events = calendarEvents[date] || [];
  events.forEach(event => {
    const listItem = document.createElement("li");
    listItem.textContent = `${event.eventText} at ${event.time} in ${event.location}`;
    eventsList.appendChild(listItem);
  });
}

// Function to handle click on calendar days
function handleDayClick(event) {
  if (event.target.classList.contains('calendar-day')) {
    const selectedDate = event.target.dataset.date;
    document.getElementById("selectedDate").textContent = selectedDate;
    updateChecklist(selectedDate);
    document.getElementById("eventInput").style.display = 'block';
  }
}

// Event listeners for calendar days and the Add Event button
document.addEventListener('DOMContentLoaded', () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  generateCalendar(currentMonth, currentYear);
  
  document.getElementById("currentMonth").textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  document.getElementById("calendarBody").addEventListener('click', handleDayClick);
  
  document.getElementById("addEventBtn").addEventListener('click', addEvent);
  
  // Hide event input section initially
  document.getElementById("eventInput").style.display = 'none';
});