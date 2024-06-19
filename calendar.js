let calendarEvents = JSON.parse(localStorage.getItem('calendarEvents')) || {};

function generateCalendar(month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const calendarBody = document.getElementById("calendarBody");
  calendarBody.innerHTML = "";

  const today = new Date();
  const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      if (i === 0 && j < firstDayOfMonth) {
        cell.classList.add("calendar-empty");
      } else if (date > daysInMonth) {
        cell.classList.add("calendar-empty");
      } else {
        const dayCell = document.createElement("span");
        dayCell.textContent = date;
        dayCell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
        dayCell.classList.add("calendar-day");

        cell.appendChild(dayCell);

        if (isCurrentMonth && date === today.getDate()) {
          cell.classList.add("calendar-today");
        }

        date++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
    if (date > daysInMonth) {
      break;
    }
  }

  updateChecklist("");
}

function addEvent() {
  const selectedDate = document.getElementById("selectedDate").textContent;
  const eventText = document.getElementById("event").value;
  const time = document.getElementById("time").value;
  const location = document.getElementById("location").value;
  if (eventText && time && location) {
    const eventDetails = { eventText, time, location };

    if (!calendarEvents[selectedDate]) {
      calendarEvents[selectedDate] = [];
    }
    calendarEvents[selectedDate].push(eventDetails);

    localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));

    updateChecklist(selectedDate);
  }

  document.getElementById("event").value = '';
  document.getElementById("time").value = '';
  document.getElementById("location").value = '';
}

function updateChecklist(date) {
  const eventsList = document.getElementById("eventsList");
  eventsList.innerHTML = '';

  if (calendarEvents[date] && calendarEvents[date].length > 0) {
    calendarEvents[date].forEach(event => {
      const listItem = document.createElement("li");
      listItem.textContent = `${event.eventText} at ${event.time} in ${event.location}`;
      eventsList.appendChild(listItem);
    });
  } else {
    const noEventsItem = document.createElement("li");
    noEventsItem.textContent = "Click any day to add events!";
    noEventsItem.classList.add("no-events");
    eventsList.appendChild(noEventsItem);
  }
}

function handleDayDoubleClick(event) {
  if (event.target.classList.contains('calendar-day')) {
    const selectedDate = event.target.dataset.date;
    document.getElementById("selectedDate").textContent = selectedDate;
    document.getElementById("eventInput").style.display = 'block';
    updateChecklist(selectedDate);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  generateCalendar(currentMonth, currentYear);

  document.getElementById("currentMonth").textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  document.getElementById("calendarBody").addEventListener('dblclick', handleDayDoubleClick);

  document.getElementById("addEventBtn").addEventListener('click', addEvent);

  document.getElementById("eventInput").style.display = 'none';

  updateChecklist(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`);
});