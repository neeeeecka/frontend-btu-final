import { fetchMovies } from "./fetches.js";
import Picker from "./components/picker.js";
import { getTimesForDay, WEEK_TIMES } from "./util.js";
import MoviesList from "./components/movies.js";
import BrowserStorage from "./BrowserStorage.js";

const state = {
  session: {
    id: "",

    _day: BrowserStorage.defaultGet("session.day", "string", "monday"),
    _time: BrowserStorage.defaultGet("session.time", "number", 10),

    get time() {
      return this._time;
    },
    set time(value) {
      this._time = value;
      BrowserStorage.setItem("session.time", value);
    },
    get day() {
      return this._day;
    },
    set day(value) {
      this._day = value;
      BrowserStorage.setItem("session.day", value);
    },
  },
  _selectedSessions: BrowserStorage.defaultGet("selectedSessions", "array", []),
  get selectedSessions() {
    return structuredClone(this._selectedSessions);
  },
  set selectedSessions(newData) {
    this._selectedSessions = newData;
    BrowserStorage.setItem("selectedSessions", newData);
  },
};

const moviesList = new MoviesList("#movies", [], state.selectedSessions);

updateMovies(state.session.day);

function updateMovies() {
  moviesList.movies = [];
  moviesList.render();

  const { time, day, id } = state.session;

  fetchMovies(day).then((movies) => {
    moviesList.movies = movies;
    moviesList.time = state.session.time;
    moviesList.selectedSessions = state.selectedSessions;

    moviesList.render();
  });
}

moviesList.onSessionSelected = (title, id) => {
  state.session.id = id;

  const newSession = structuredClone(state.session);
  const newSelectedSessions = state.selectedSessions;

  newSelectedSessions.push(newSession);

  state.selectedSessions = newSelectedSessions;

  moviesList.selectedSessions = state.selectedSessions;

  moviesList.render();
};

const dayPicker = new Picker(
  "#dayPicker",
  "Choose day",
  [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ],
  state.session.day
);

const timePicker = new Picker(
  "#timePicker",
  "Choose time",
  WEEK_TIMES,
  state.session.time
);

dayPicker.onChange = (day) => {
  const times = getTimesForDay(day);
  timePicker.items = times;
  timePicker.render();
  state.session.day = day;
  updateMovies();
};

timePicker.onChange = (time) => {
  state.session.time = time;
};

const hamburger = document.querySelector("#hamburger");

hamburger.addEventListener("click", () => {
  const nav = document.querySelector("#nav");
  nav.classList.toggle("visible");
  hamburger.classList.toggle("change");
});
