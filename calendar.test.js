const { generateCalendar, addEvent, updateChecklist } = require('./calendar');
require('@testing-library/jest-dom');

describe('generateCalendar', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="calendarBody"></div>
      <div id="eventsContainer">
        <ul id="eventsList"></ul>
      </div>
      <input type="text" id="event" />
      <input type="text" id="time" />
      <input type="text" id="location" />
      <button id="addEventBtn"></button>
    `;
  });

  test('generates correct number of days for March 2021', () => {
    generateCalendar(2, 2021);
    const calendarBody = document.getElementById("calendarBody");
    const days = calendarBody.querySelectorAll('td:not(.calendar-empty)');
    expect(days).toHaveLength(31);
  });

  test('handles leap year correctly, February 2020', () => {
    generateCalendar(1, 2020);
    const calendarBody = document.getElementById("calendarBody");
    const days = calendarBody.querySelectorAll('td:not(.calendar-empty)');
    expect(days).toHaveLength(29);
  });

  test('calendar UI elements are present after calendar generation', () => {
    generateCalendar(0, 2021);
    expect(document.getElementById("calendarBody")).not.toBeEmptyDOMElement();
  });
});

describe('addEvent', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <span id="selectedDate">2021-03-15</span>
      <input type="text" id="event" value="Meeting"/>
      <input type="text" id="time" value="10:00 AM"/>
      <input type="text" id="location" value="Conference Room"/>
      <ul id="eventsList"></ul>
    `;
  });

  test('adds an event and updates UI', () => {
    const eventText = document.getElementById("event");
    const time = document.getElementById("time");
    const location = document.getElementById("location");
    const eventsList = document.getElementById("eventsList");

    addEvent();

    expect(eventsList.children.length).toBe(1);
    expect(eventsList.firstChild).toHaveTextContent('Meeting at 10:00 AM in Conference Room');
  });
});

