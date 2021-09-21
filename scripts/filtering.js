"use strict";

let menuIsOpen = false;

function openHouseMenu() {
  //Declare constants
  const footer = document.querySelector("footer");
  const crest = document.querySelector("#footer-crest");
  const info = document.querySelector("#footer-top h2");

  //Expand the footer menu
  if (menuIsOpen === false) {
    footer.style.height = "100vh";
    crest.style.top = "50%";
    crest.style.width = "80vw";
    crest.style.transform = "translate(-50%, -50%)";

    //Change font
    info.style.fontSize = "2rem";
    info.style.opacity = "100%";

    //Add eventListeners for animated crest
    animateCrest();
  } else {
    footer.style.height = "10vh";
    crest.style.top = "-40%";
    crest.style.width = "6rem";
    crest.style.transform = "translate(-50%, 0%)";

    //Change font
    info.style.fontSize = "1rem";
    info.style.opacity = "0%";

    //Add eventListeners for animated crest
    unanimateCrest();
  }

  menuIsOpen = !menuIsOpen;
}

function filterHouses() {
  const houseValue = getHouseValue(this);

  alteredStudents = allStudents.filter(isHouse);

  function isHouse(student) {
    if ("*" === houseValue || student.house === houseValue) {
      return true;
    } else {
      return false;
    }
  }

  showStudents(alteredStudents);
}

function getHouseValue(button) {
  return button.dataset.filter;
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
