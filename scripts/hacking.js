"use strict";

function hackingKeywordHandler(event) {
  const input = document
    .querySelector(".search-header input")
    .value.toLowerCase();
  if (event.keyCode === 13 && input === "imperio") {
    document.querySelector(".search-header input").value = "";

    //Set current house to Hogwarts
    houseValue = "*";

    changeTheme(houseValue);

    //Cause hacking functions to commence during imperio animation
    setTimeout(hackTheSystem, 1500);

    //Open menu upon hacking
    toggleHouseMenu();

    //Show imperio mist
    showImperioMist();
  }
}

function showImperioMist() {
  const mist = document.querySelector(".imperio-mist");

  mist.classList.add("mist-appearance");
  mist.addEventListener("animationend", loadAnimateCrest);
}

function hackTheSystem() {
  if (isHacked === false) {
    //Set hacking bool to true
    isHacked = true;

    //Inject myself into the list of students
    injectSelf();

    //Randomise blood statuses of students
    randomiseBlood();

    //Show new student list with self insert
    alteredStudents = currentStudents.filter(isHouse);

    function isHouse(student) {
      if ("*" === houseValue || student.house === houseValue) {
        return true;
      } else {
        return false;
      }
    }

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
  currentStudents.unshift(student);
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
  //Reverse inquisitorialisation
  student.inquisitor = false;
  inquisitorBadge.classList = getBadgeOpacity(student.inquisitor, "inquisitor");
  addField.textContent = `+ Inquisitor +`;

  //Show error message
  showErrorMessage("inquisitorHack", student, addField);
}

function curseHogwarts() {
  //Add cursing eventListener to everything
  document.querySelector("*").addEventListener("click", () => {
    event.target.style.backgroundColor = "black";
    event.target.style.color = "white";
    event.target.style.opacity = "70%";
    event.target.style.transform = "rotate(180deg)";

    //Display cursed text
    event.target.textContent = "ḭ̷̺̖͎̬̇̋̑͌́͂͋̌͋̎̓̊̊̽͜͠ ̴̧͍̼̪̋͂̊̑͊̏̓̈́̃̊͂̚̚͝͠w̶̬̪̾̆͘ä̵̠͎̗́̊̓̕ŗ̴̡̡̗̭̝̲̤͍̤͕̋ń̴̫͉͖̯̣͔͈̻͚̠̯͂̐̅́̎́̒̽͊̾̓̓͝e̴̡̢̫̫̗̗͎͎̠̥̥̫͕̱̹͐̈́̂̅͌ḑ̸͇̤͓̫̬̼̻̫͎͙͕͈̒̊͊̿̽̂̐́́̃̀̐́͝ͅ ̷͖̝̦̇͒̎̈́̃͐͛́͊̓̕͜͜͝y̴̧̡͓͍̾͗̀̂͜o̶̤͕̩̟̹͛̓̎̄̓͊̎̈͘̚͜͜͝͠ů̴̗̦̭̐̒̕";
  });
}
