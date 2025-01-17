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

function getRandomDictionaryWords(dictionary, count) {
  const randomWords = [];
  for (let i = 0; i < count; i++) {
    const randomWord =
      dictionary[Math.floor(Math.random() * dictionary.length)];
    randomWords.push(randomWord);
  }
  return randomWords;
}

export const fetchSavedWords = () => {
  const savedWords = localStorage.getItem("savedWords");

  if (savedWords) {
    const data = JSON.parse(savedWords);
    const savedDay = data.createdAt;
    const currentDay = getFormattedCurrentDateTime().split(",")[0];

    if (savedDay != currentDay) {
      localStorage.removeItem("savedWords");
      window.location.reload();
    }

    return data;
  }

  const words = {
    verbs: getRandomDictionaryWords(verbs, 5),
    pronouns: getRandomDictionaryWords(pronouns, 3),
    adjectives: getRandomDictionaryWords(adjectives, 5),
    connectives: getRandomDictionaryWords(connectives, 2),
    substantives: getRandomDictionaryWords(substantives, 10),
    createdAt: getFormattedCurrentDateTime().split(",")[0],
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
