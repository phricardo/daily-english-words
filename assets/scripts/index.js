import { fetchSavedWords } from "./dictionary.js";
import { getFormattedCurrentDateTime } from "./getFormattedDate.js";

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
