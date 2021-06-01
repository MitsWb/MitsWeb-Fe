// new Date(year, month, day, hours, minutes, seconds, milliseconds);
const now = new Date();

export default [
  {
    id: 0,
    title: "Meet with the guide",
    start: new Date(2021, 5, 2, 14, 30),
    end: new Date(2021, 5, 2, 16, 50),
  },
  {
    id: 1,
    title: "write the unit tests for backend",
    start: new Date(2021, 5, 2),
    end: new Date(2021, 5, 2),
  },
  {
    id: 2,
    allDay: true,
    title: "Refacor the code",
    start: new Date(2021, 5, 2),
    end: new Date(2021, 5, 2),
  },
  {
    id: 3,
    title: "MitsWeb",
    start: now,
    end: now,
  },
];
