"use strict";

function hackingKeywordHandler(event) {
  const input = document
    .querySelector(".search-header input")
    .value.toLowerCase();
  if (event.keyCode === 13 && input === "imperio") {
    document.querySelector(".search-header input").value = "";

    //!!!
    ///Insert yellow mist imperio animation

    setTimeout(hackTheSystem, 2500);
  }
}

function hackTheSystem() {
  if (isHacked === false) {
    //Set hacking bool to true
    isHacked = true;

    //Inject myself into the list of students
    injectSelf();

    //Randomise blood statuses of students
    randomiseBlood();

    //Prevent the addition of students to the inquisitorial squad
    //preventInquisitorialisation();

    showStudents(alteredStudents);
  }
}

function injectSelf() {
  //Creating object
  const student = Object.create(Student);

  //Modifying object of self
  student.id = 0;
  student.firstName = "Malthe";
  student.middleName = "Kusk";
  student.nickName = undefined;
  student.lastName = "Lauritsen";
  student.gender = "Male";
  student.house = getRandomHouse();
  student.photo = `images/students/0_default.png`;
  student.blood = "Half-breed";
  student.captain = false;
  student.prefect = false;
  student.expelled = false;
  student.inquisitor = false;

  //Inserting self into allStudents array
  allStudents.unshift(student);
}

function getRandomHouse() {
  //Declaring array of houses and generating random number
  const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  const RNG = Math.floor(Math.random() * 4);

  //Returning random house
  return houses[RNG];
}

function randomiseBlood() {
  allStudents.forEach((student) => {
    if (student.blood === "Pure-blood") {
      //Declaring array of non-pure blood statuses and generating random number
      const nonPureBloodStatus = ["Muggle-born", "Half-blood", "Squib"];
      const RNG = Math.floor(Math.random() * 3);

      //Setting pure-bloods to random non-pure blood status
      student.blood = nonPureBloodStatus[RNG];
    } else {
      //Setting non-pure-bloods to pure-blood
      student.blood = "Pure-blood";
    }
  });
}

function randomiseFormerPureBloods() {
  formerPureBloods.forEach((student) => {
    //Declaring array of non-pure blood statuses and generating random number
    const nonPureBloodStatus = ["Muggle-born", "Half-blood", "Squib"];
    const RNG = Math.floor(Math.random() * 3);

    //Setting pure-bloods to random non-pure blood status
    student.blood = nonPureBloodStatus[RNG];
  });
}

function preventInquisitorialisation(student, inquisitorBadge, addField) {
  console.log("Addition to insquisitorial squad not possible");
  //Reverse inquisitorialisation
  student.inquisitor = false;
  inquisitorBadge.style.opacity = getBadgeOpacity(student.inquisitor);
  addField.textContent = `Add to Inquisitorial Squad`;
}
