"use strict";

let menuIsOpen = true;

function toggleHouseMenu() {
  //Declare constants
  const footer = document.querySelector("footer");
  const crest = document.querySelector("#footer-crest");
  const info = document.querySelector("#footer-top h2");

  //Open or close
  if (menuIsOpen === false) {
    footer.style.height = "100vh";
    crest.style.top = "50%";
    crest.style.width = "80vw";
    crest.style.transform = "translate(-50%, -50%)";

    //Change font
    info.style.fontSize = "2rem";
    info.style.opacity = "100%";

    //Add filter eventListeners for mascots
    document.querySelectorAll('img[data-action="filter"').forEach((img) => {
      img.addEventListener("click", filterHouses);
    });

    //Add eventListeners for animated crest
    animateCrest();
  } else {
    footer.style.height = "5rem";
    crest.style.top = "-40%";
    crest.style.width = "6rem";
    crest.style.transform = "translate(-50%, 0%)";

    //Change font
    info.style.fontSize = "1rem";
    info.style.opacity = "0%";

    //Remove filter eventListeners for mascots
    document.querySelectorAll('img[data-action="filter"').forEach((img) => {
      img.removeEventListener("click", filterHouses);
    });

    //Add eventListeners for animated crest
    unanimateCrest();
  }

  menuIsOpen = !menuIsOpen;
}

function filterHouses() {
  //Get chosen house
  houseValue = getHouseValue(this);

  //Create new array with filtering by house
  alteredStudents = allStudents.filter(isHouse);

  function isHouse(student) {
    if ("*" === houseValue || student.house === houseValue) {
      return true;
    } else {
      return false;
    }
  }

  //Reset filter
  document.querySelector(".filter-dropdown-input").textContent = "All Students";

  //Change theme based on house
  changeTheme(houseValue);

  //Show new student list
  showStudents(alteredStudents);
}

function getHouseValue(button) {
  return button.dataset.filter;
}

function changeTheme(house) {
  //Declare css declarations as a constant for the stylesheet
  const text = `h1, h2, h3, p, input`;
  const border = `.student-button-expelled, .filter-dropdown-header, .filter-button, .sorting-dropdown-header, .sorting-button, .search-header input, .error-message`;
  const icon = `.icon`;
  const lightBackground = `body, ::-webkit-scrollbar-track`;
  const darkBackground = `footer, .filter-dropdown-header, .filter-button, .sorting-dropdown-header, .sorting-button, .search-header input, .error-message, ::-webkit-scrollbar-thumb`;

  //Get new theme based on house
  const theme = getHouseTheme(house);

  //Remove current stylesheet
  document.querySelector("style").remove();

  //Insert new stylesheet
  const stylesheet = document.createElement("style");
  stylesheet.innerHTML = `
    ${text} {color: ${theme.text}} 
    ${border} {border-color: ${theme.text}} 
    ${icon} {filter: ${theme.icon}}
    ${lightBackground} {background-color: ${theme.lightBackground}}
    ${darkBackground} {background-color: ${theme.darkBackground}}
    @media (min-width:650px) {
      .sorting-button {
        background-color: transparent;
      }
    }
    `;
  document.querySelector("body").appendChild(stylesheet);
}

function getHouseTheme(house) {
  let theme = { text: "", icon: "", lightBackground: "", darkBackground: "" };

  if (house === "*") {
    theme.text = "#FAECBF";
    theme.lightBackground = "#392A48";
    theme.darkBackground = "#2F223A";
    showHogwartsDisplay();
  }

  if (house === "Gryffindor") {
    theme.text = "#FAECBF";
    theme.lightBackground = "#A62025";
    theme.darkBackground = "#5D070A";
    showGryffindorDisplay();
  }

  if (house === "Slytherin") {
    theme.text = "#FAECBF";
    theme.lightBackground = "#214926";
    theme.darkBackground = "#112D14";
    showSlytherinDisplay();
  }

  if (house === "Hufflepuff") {
    theme.text = "black";
    theme.icon = "brightness(0%)";
    theme.lightBackground = "#D9AB0D";
    theme.darkBackground = "#A17F0B";
    showHufflepuffDisplay();
  }

  if (house === "Ravenclaw") {
    theme.text = "#FAECBF";
    theme.lightBackground = "#02223B";
    theme.darkBackground = "#01121E";
    showRavenclawDisplay();
  }

  return theme;
}

function showHogwartsDisplay() {
  document.querySelector(".house-text-house").textContent = "Hogwarts";
  document.querySelector(".house-text-desc").textContent =
    "Draco Dormiens Nunquam Titillandus";
  document.querySelector(".house-img").src = "images/crests/hogwarts-crest.svg";
}

function showGryffindorDisplay() {
  document.querySelector(".house-text-house").textContent = "Gryffindor";
  document.querySelector(
    ".house-text-desc"
  ).innerHTML = `"Their daring, nerve and chivalry set Gryffindors apart."`;
  document.querySelector(".house-img").src =
    "images/crests/gryffindor-crest.svg";
}

function showSlytherinDisplay() {
  document.querySelector(".house-text-house").textContent = "Slytherin";
  document.querySelector(
    ".house-text-desc"
  ).innerHTML = `"Those cunning folk use any means to achieve their ends."`;
  document.querySelector(".house-img").src =
    "images/crests/slytherin-crest.svg";
}

function showHufflepuffDisplay() {
  document.querySelector(".house-text-house").textContent = "Hufflepuff";
  document.querySelector(
    ".house-text-desc"
  ).innerHTML = `"Those patient Hufflepuffs are true<br>And unafraid of toil."`;
  document.querySelector(".house-img").src =
    "images/crests/hufflepuff-crest.svg";
}
function showRavenclawDisplay() {
  document.querySelector(".house-text-house").textContent = "Ravenclaw";
  document.querySelector(
    ".house-text-desc"
  ).innerHTML = `"Where those of wit and learning,<br>Will always find their kind."`;
  document.querySelector(".house-img").src =
    "images/crests/ravenclaw-crest.svg";
}

function animateCrest() {
  //Add animateInsignia
  document
    .querySelector(".hogwarts-crest-insignia")
    .addEventListener("mouseenter", animateInsignia);
  //Add animateGryffindor
  document
    .querySelector(".hogwarts-crest-gryffindor")
    .addEventListener("mouseenter", animateGryffindor);
  //Add animateSlytherin
  document
    .querySelector(".hogwarts-crest-slytherin")
    .addEventListener("mouseenter", animateSlytherin);
  //Add animateHufflepuff
  document
    .querySelector(".hogwarts-crest-hufflepuff-body")
    .addEventListener("mouseenter", animateHufflepuff);
  document
    .querySelector(".hogwarts-crest-hufflepuff-head")
    .addEventListener("mouseenter", animateHufflepuff);
  //Add animateRavenclaw
  document
    .querySelector(".hogwarts-crest-ravenclaw")
    .addEventListener("mouseenter", animateRavenclaw);
}

function unanimateCrest() {
  //Remove animateInsignia
  document
    .querySelector(".hogwarts-crest-insignia")
    .removeEventListener("mouseenter", animateInsignia);
  //Remove animateGryffindor
  document
    .querySelector(".hogwarts-crest-gryffindor")
    .removeEventListener("mouseenter", animateGryffindor);
  //Remove animateSlytherin
  document
    .querySelector(".hogwarts-crest-slytherin")
    .removeEventListener("mouseenter", animateSlytherin);
  //Remove animateHufflepuff
  document
    .querySelector(".hogwarts-crest-hufflepuff-body")
    .removeEventListener("mouseenter", animateHufflepuff);
  document
    .querySelector(".hogwarts-crest-hufflepuff-head")
    .removeEventListener("mouseenter", animateHufflepuff);
  //Remove animateRavenclaw
  document
    .querySelector(".hogwarts-crest-ravenclaw")
    .removeEventListener("mouseenter", animateRavenclaw);
}

function animateInsignia() {
  //Add animate class
  document
    .querySelector(".hogwarts-crest-insignia")
    .classList.add("hogwarts-crest-insignia-animate");

  //Add highlight
  addHouseHighlight("any");

  //Add eventListener for mouseleave
  document
    .querySelector(".hogwarts-crest-insignia")
    .addEventListener("mouseleave", unanimateInsignia);
}

function unanimateInsignia() {
  //Remove animate class
  document
    .querySelector(".hogwarts-crest-insignia")
    .classList.remove("hogwarts-crest-insignia-animate");

  //Remove highlight
  removeHouseHighlight("any");
}

function animateGryffindor() {
  //Add animate class
  document
    .querySelector(".hogwarts-crest-gryffindor")
    .classList.add("hogwarts-crest-gryffindor-animate");

  //Highlight house colours
  addHouseHighlight("red");

  //Add eventListener for mouseleave
  document
    .querySelector(".hogwarts-crest-gryffindor")
    .addEventListener("mouseleave", unanimateGryffindor);
}

function unanimateGryffindor() {
  //Remove animate class
  document
    .querySelector(".hogwarts-crest-gryffindor")
    .classList.remove("hogwarts-crest-gryffindor-animate");

  //Remove highlight
  removeHouseHighlight("red");
}

function animateSlytherin() {
  //Add animate class
  document
    .querySelector(".hogwarts-crest-slytherin")
    .classList.add("hogwarts-crest-slytherin-animate");

  //Highlight house colours
  addHouseHighlight("green");

  //Add eventListener for mouseleave
  document
    .querySelector(".hogwarts-crest-slytherin")
    .addEventListener("mouseleave", unanimateSlytherin);
}

function unanimateSlytherin() {
  //Remove animate class
  document
    .querySelector(".hogwarts-crest-slytherin")
    .classList.remove("hogwarts-crest-slytherin-animate");

  //Remove highlight
  removeHouseHighlight("green");
}

function animateHufflepuff() {
  //Add animate class
  document
    .querySelector(".hogwarts-crest-hufflepuff-head")
    .classList.add("hogwarts-crest-hufflepuff-animate");

  //Highlight house colours
  addHouseHighlight("yellow");

  //Add eventListener for mouseleave
  document
    .querySelector(".hogwarts-crest-hufflepuff-body")
    .addEventListener("mouseleave", unanimateHufflepuff);
  document
    .querySelector(".hogwarts-crest-hufflepuff-head")
    .addEventListener("mouseleave", unanimateHufflepuff);
}

function unanimateHufflepuff() {
  //Remove animate class
  document
    .querySelector(".hogwarts-crest-hufflepuff-head")
    .classList.remove("hogwarts-crest-hufflepuff-animate");

  //Remove highlight
  removeHouseHighlight("yellow");
}

function animateRavenclaw() {
  //Add animate class
  document
    .querySelector(".hogwarts-crest-ravenclaw")
    .classList.add("hogwarts-crest-ravenclaw-animate");

  //Highlight house colours
  addHouseHighlight("blue");

  //Add eventListener for mouseleave
  document
    .querySelector(".hogwarts-crest-ravenclaw")
    .addEventListener("mouseleave", unanimateRavenclaw);
}

function unanimateRavenclaw() {
  //Remove animate class
  document
    .querySelector(".hogwarts-crest-ravenclaw")
    .classList.remove("hogwarts-crest-ravenclaw-animate");

  //Remove highlight
  removeHouseHighlight("blue");
}

function addHouseHighlight(colour) {
  //Declare all coloured backgrounds in an array
  const crestColours = ["red", "green", "yellow", "blue"];

  crestColours.forEach((crestColour) => {
    if (colour !== crestColour) {
      document.querySelector(`.hogwarts-crest-${crestColour}`).style.filter =
        "opacity(50%)";
    }
  });
}

function removeHouseHighlight(colour) {
  //Declare all coloured backgrounds in an array
  const crestColours = ["red", "green", "yellow", "blue"];

  crestColours.forEach((crestColour) => {
    if (colour !== crestColour) {
      document.querySelector(`.hogwarts-crest-${crestColour}`).style.filter =
        "opacity(100%)";
    }
  });
}
