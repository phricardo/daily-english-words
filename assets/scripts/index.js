import {
  pronouns,
  connectives,
  substantives,
  verbs,
  adjectives,
} from "./data.js";

function getFormattedCurrentDateTime() {
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return formatter.format(new Date());
}

function getSeedForDay() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dateStr = `${year}${month < 10 ? "0" : ""}${month}${
    day < 10 ? "0" : ""
  }${day}`;
  return parseInt(dateStr, 10);
}

function getDeterministicDictionaryWords(dictionary, count, seed, offset = 0) {
  const words = [];
  const startIndex = (seed + offset) % dictionary.length;
  for (let i = 0; i < count; i++) {
    const index = (startIndex + i) % dictionary.length;
    words.push(dictionary[index]);
  }
  return words;
}

export const fetchSavedWords = () => {
  const savedWords = localStorage.getItem("savedWords");
  const currentDay = getFormattedCurrentDateTime().split(",")[0];

  if (savedWords) {
    const data = JSON.parse(savedWords);
    const savedDay = data.createdAt;
    if (savedDay !== currentDay) {
      localStorage.removeItem("savedWords");
      window.location.reload();
    }
    return data;
  }

  const seed = getSeedForDay();

  const words = {
    verbs: getDeterministicDictionaryWords(verbs, 5, seed, 1),
    pronouns: getDeterministicDictionaryWords(pronouns, 3, seed, 2),
    adjectives: getDeterministicDictionaryWords(adjectives, 5, seed, 3),
    connectives: getDeterministicDictionaryWords(connectives, 2, seed, 4),
    substantives: getDeterministicDictionaryWords(substantives, 10, seed, 5),
    createdAt: currentDay,
  };

  localStorage.setItem("savedWords", JSON.stringify(words));
  return words;
};

function displayWords(list, id) {
  const ul = document.getElementById(id);
  list.forEach((word) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${word.english}</strong> - ${word.portuguese}`;
    ul.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const words = fetchSavedWords();

  displayWords(words.pronouns, "pronouns-list");
  displayWords(words.verbs, "verbs-list");
  displayWords(words.substantives, "substantives-list");
  displayWords(words.adjectives, "adjectives-list");
  displayWords(words.connectives, "connectives-list");

  document.querySelector(".clock").textContent = getFormattedCurrentDateTime();

  setInterval(() => {
    document.querySelector(".clock").textContent =
      getFormattedCurrentDateTime();
  }, 1000);
});
