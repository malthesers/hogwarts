"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  loadAnimateCrest();
  loadHTML();
  loadButtons();
  loadFamiliesJSON();
});

let isHacked = false;
let currentRotationExpand = 0;
let expulsionAttempts = 0;

let houseValue = "*";

const HTML = {};
const formerPureBloods = [];
const lastNameList = [];
let familyNameList = [];

//All students, expelled or not
const allStudents = [];

//Non-expelled students
const currentStudents = [];

//Expelled students
const expelledStudents = [];

//The constantly sorted, filtered and search array being displayed
let alteredStudents = [];

const Student = {
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  gender: "",
  house: "",
  photo: "",
  blood: "",
  prefect: false,
  inquisitor: false,
  captain: false,
  expelled: false,
  id: 1,
};

function loadAnimateCrest() {
  //Declare constant to easily change animation interval
  const interval = 10;

  //Animate the houses clockwise - Gryffindor
  setTimeout(() => {
    animateGryffindor();
  }, interval * 1);
  //Animate the houses clockwise - Slytherin
  setTimeout(() => {
    unanimateGryffindor();
    animateSlytherin();
  }, interval * 2);
  //Animate the houses clockwise - Ravenclaw
  setTimeout(() => {
    unanimateSlytherin();
    animateRavenclaw();
  }, interval * 3);
  //Animate the houses clockwise - Hufflepuff
  setTimeout(() => {
    unanimateRavenclaw();
    animateHufflepuff();
  }, interval * 4);
  //Animate the houses clockwise - Insignia
  setTimeout(() => {
    unanimateHufflepuff();
    animateInsignia();
  }, interval * 5);
  //Show the Hogwarts display of all students
  setTimeout(() => {
    unanimateInsignia();
    toggleHouseMenu();
  }, interval * 6);
}

function loadHTML() {
  HTML.container = document.querySelector(".student-list");
  HTML.student = document.querySelector("#student-template");
}

function loadButtons() {
  //Add searching eventListener
  document
    .querySelector(".search-header input")
    .addEventListener("input", searchStudent);

  //Add house fillter eventListeners and animations
  document.querySelectorAll('img[data-action="filter"').forEach((img) => {
    img.addEventListener("click", filterHouses);
  });
  animateCrest();

  //Add menu eventListener
  document
    .querySelector("#footer-crest")
    .addEventListener("click", toggleHouseMenu);

  //Add badge filter eventListeners
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", filterStudents);
  });

  //Add badge filter dropdown eventListener
  document
    .querySelector(".filter-dropdown-header")
    .addEventListener("click", toggleFilterDropdown);

  //Add sorting button eventListeners
  document.querySelectorAll(".sorting-button").forEach((button) => {
    button.addEventListener("click", sortStudents);
  });

  //Add sorting dropdown eventListener
  document
    .querySelector(".sorting-dropdown-header")
    .addEventListener("click", toggleSortingDropdown);

  //Add eventListener for commencing hacking
  document
    .querySelector("input")
    .addEventListener("keydown", hackingKeywordHandler);
}

function loadFamiliesJSON() {
  fetch("families.json")
    .then((res) => res.json())
    .then((familyData) => {
      familyNameList = familyData;
    })
    .then(loadStudentsJSON());
}

function loadStudentsJSON() {
  fetch("students.json")
    .then((res) => res.json())
    .then((studentData) => {
      getLastNameList(studentData);
      reformatJSON(studentData);
    });
}

function getLastNameList(studentData) {
  studentData.forEach((student) => {
    let lastName = student.fullname.trim().toLowerCase();
    lastName = lastName.substring(lastName.lastIndexOf(" ") + 1);

    if (lastName.includes("-")) {
      lastName = lastName.substring(lastName.lastIndexOf("-") + 1);
    }

    lastNameList.push(lastName);
  });
}

function reformatJSON(studentData) {
  let studentID = 1;

  studentData.forEach((studentObject) => {
    //Create student from template
    const student = Object.create(Student);
    student.id = studentID;
    student.firstName = getFirstName(studentObject);
    student.middleName = getMiddleName(studentObject);
    student.nickName = getNickName(studentObject);
    student.lastName = getLastName(studentObject);
    student.gender = getGender(studentObject);
    student.house = getHouse(studentObject);
    student.photo = getPhoto(studentObject);
    student.blood = getBloodStatus(studentObject);
    student.captain = getCaptaincy(student.firstName);
    student.prefect = false;
    student.inquisitor = false;
    student.expelled = false;

    //Add to array of all and current students
    allStudents.push(student);
    currentStudents.push(student);

    studentID++;
  });

  alteredStudents = currentStudents;

  //Create list of current pure-blood
  getPureBloods(allStudents);

  //Display students
  showStudents(alteredStudents);
}

function showStudents(studentList) {
  //Randomise former pure-bloods if hacked
  if (isHacked === true) {
    randomiseFormerPureBloods();
  }

  //Show student count
  showStudentCount(alteredStudents);

  //Empty student-list
  HTML.container.innerHTML = "";

  //Display student-list
  studentList.forEach((student, index) => {
    const clone = HTML.student.cloneNode(true).content;

    clone.querySelector(".student-photo").src = student.photo;
    clone.querySelector(".student-first-name").textContent = student.firstName;
    clone.querySelector(".student-last-name").textContent = student.lastName;
    clone.querySelector(".student-house").textContent = student.house;
    clone.querySelector(".student-full-name").textContent =
      showStudentNameFull(student);
    clone.querySelector(".student-crest").style.backgroundImage =
      showStudentHouseCrest(student);
    clone.querySelector(".student-blood-status").textContent =
      showBloodStatus(student);
    clone.querySelector(".student-prefect").classList = getBadgeOpacity(
      student.prefect,
      "prefect"
    );
    clone.querySelector(".student-inquisitor").classList = getBadgeOpacity(
      student.inquisitor,
      "inquisitor"
    );
    clone.querySelector(".student-expelled").classList = getBadgeOpacity(
      student.expelled,
      "expelled"
    );
    clone.querySelector(".student-captain").classList = getBadgeOpacity(
      student.captain,
      "captain"
    );
    clone.querySelector(".student-captain").src = getHouseBadge(student);
    clone.querySelector(".student-button-prefect-icon").textContent =
      getPrefectStatus(student);
    clone.querySelector(".student-button-inquisitor-icon").textContent =
      getInquisitorStatus(student);
    clone.querySelector(".student-button-expelled-text").textContent =
      getExpelledStatus(student);
    clone
      .querySelector(".student-top")
      .addEventListener("click", expandStudent);
    if (student.expelled === false) {
      clone
        .querySelector(".student-button-prefect")
        .addEventListener("click", toggleStudentPrefect);
      clone
        .querySelector(".student-button-inquisitor")
        .addEventListener("click", toggleStudentInquisitor);
      clone
        .querySelector(".student-button-expelled")
        .addEventListener("click", expelStudent);
    } else {
      clone.querySelector(".student-button-prefect").style.opacity = "30%";
      clone.querySelector(".student-button-inquisitor").style.opacity = "30%";
      clone.querySelector(".student-button-expelled").style.opacity = "30%";
    }

    //Toggle whether student is prefect
    function toggleStudentPrefect() {
      //Declare constants
      const prefectBadge = getPrefectBadge(this);
      const prefectHouse = getPrefectHouse(student);
      const sameHousePrefects = getSameHousePrefects(
        getPrefects(),
        prefectHouse
      );
      const isSameGender = (otherStudent) =>
        otherStudent.gender === student.gender;

      if (student.prefect === false) {
        if (sameHousePrefects.length < 2) {
          if (sameHousePrefects.some(isSameGender) === false) {
            //Change object, status and button
            student.prefect = true;
            prefectBadge.classList = getBadgeOpacity(
              student.prefect,
              "prefect"
            );
            this.lastElementChild.textContent = "-";
          } else {
            showErrorMessage("gender", student, this);
          }
        } else {
          showErrorMessage("house", student, this);
        }
      } else {
        //Change object, status and button
        student.prefect = false;
        prefectBadge.classList = getBadgeOpacity(student.prefect, "prefect");
        this.lastElementChild.textContent = `+`;
      }
    }

    //Toggle whether student is part of inquisitorial squad
    function toggleStudentInquisitor() {
      //Declare constants
      const inquisitorBadge = getInquisitorBadge(this);
      const addField = this;

      if (student.house === "Slytherin" || student.blood === "Pure-blood") {
        if (student.inquisitor === false) {
          //Change object, status and button
          student.inquisitor = true;
          inquisitorBadge.classList = getBadgeOpacity(
            student.inquisitor,
            "inquisitor"
          );
          this.lastElementChild.textContent = "-";

          //Call preventInquisitorialisation if hacked
          if (isHacked === true) {
            setTimeout(function () {
              preventInquisitorialisation(student, inquisitorBadge, addField);
            }, 2000);
          }
        } else {
          //Change object, status and button
          student.inquisitor = false;
          inquisitorBadge.classList = getBadgeOpacity(
            student.inquisitor,
            "inquisitor"
          );
          this.lastElementChild.textContent = `+`;
        }
      } else {
        showErrorMessage("inquisitor", student, this);
      }
    }

    //Expel student
    function expelStudent() {
      //Check whether student is my injection
      if (student.id === 0) {
        showErrorMessage("expulsion", student, this);
      } else {
        if (student.expelled === false) {
          //Change object, status and button
          student.expelled = true;
        }

        //Remove student's privileges
        removeStudentPrivileges(student);

        //Add student to expelledStudents
        expelledStudents.push(student);

        //Remove from currentStudents and alteredStudents
        removeFromStudentLists(student, index);

        //Declare howler
        const howler = this.lastElementChild;

        //Add Howler animation
        howler.classList.add("howler-flying");
        howler.addEventListener("animationend", () => {
          showStudents(alteredStudents);
        });
      }
    }

    //Append student to list
    HTML.container.appendChild(clone);
  });
}

function showStudentCount(studentList) {
  //Show current student count
  document.querySelector(".house-text-current").textContent =
    getCurrentStudentCount();

  //Show expelled student count
  document.querySelector(".house-text-expelled").textContent =
    getExpelledStudentCount();

  //Show house student counts
  showHouseStudentCount();

  //Show displayed student count
  document.querySelector(".house-text-displayed").textContent =
    getDisplayedStudentCount(studentList);
}

function getCurrentStudentCount() {
  return currentStudents.length;
}

function getExpelledStudentCount() {
  return expelledStudents.length;
}

function showHouseStudentCount() {
  //Declare constant of houses to iterate through
  const houses = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];

  //Iterate through each house
  houses.forEach((house) => {
    //Get array of students from given house
    const houseStudents = currentStudents.filter(isHouse);

    function isHouse(student) {
      if (student.house === house) {
        return true;
      }
    }

    //Insert array length into given house's counter
    document.querySelector(`.house-text-${house.toLowerCase()}`).textContent =
      houseStudents.length;
  });
}

function getDisplayedStudentCount(studentList) {
  return `Currently Displayed: ${studentList.length}`;
}

function getPureBloods(studentList) {
  studentList.forEach((student) => {
    if (student.blood === "Pure-blood") {
      formerPureBloods.push(student);
    }
  });
}

function removeFromStudentLists(studentObject, index) {
  //Declare expelled student's ID
  const studentID = studentObject.id;

  currentStudents.forEach((student, index) => {
    //Find matching studentID in allStudents
    if (studentID === student.id) {
      currentStudents.splice(index, 1);
    }
  });

  alteredStudents.forEach((student, index) => {
    //Find matching studentID in alteredStudents
    if (studentID === student.id) {
      alteredStudents.splice(index, 1);
    }
  });
}

function getPrefectStatus(student) {
  let prefectStatus;

  if (student.prefect === false) {
    prefectStatus = `+`;
  } else if (student.prefect === true) {
    prefectStatus = `-`;
  }

  return prefectStatus;
}

function getInquisitorStatus(student) {
  let inquisitorStatus;

  if (student.inquisitor === false) {
    inquisitorStatus = `+`;
  } else {
    inquisitorStatus = `-`;
  }

  return inquisitorStatus;
}

function getExpelledStatus(student) {
  let expelledStatus;

  if (student.expelled === false) {
    expelledStatus = `Expel Student`;
  } else {
    expelledStatus = `Student Expelled`;
  }

  return expelledStatus;
}

function getPrefectBadge(button) {
  return button.parentElement.parentElement.querySelector(".student-prefect");
}

function getInquisitorBadge(button) {
  return button.parentElement.parentElement.querySelector(
    ".student-inquisitor"
  );
}

function getPrefects() {
  return allStudents.filter(isPrefect);
}

function isPrefect(student) {
  if (student.prefect === true) {
    return true;
  } else {
    return false;
  }
}

function getPrefectHouse(student) {
  return student.house;
}

function getSameHousePrefects(prefects, prefectHouse) {
  const sameHousePrefects = [];
  prefects.forEach((prefect) => {
    if (prefect.house === prefectHouse) {
      sameHousePrefects.push(prefect);
    }
  });
  return sameHousePrefects;
}

function removeStudentPrivileges(student) {
  student.prefect = false;
  student.inquisitor = false;
}

function showStudentNameFull(student) {
  if (student.middleName === undefined && student.lastName === undefined) {
    return `Full name: ${student.firstName}`;
  } else if (
    student.middleName === undefined &&
    student.nickName === undefined
  ) {
    return `Full name: ${student.lastName}, ${student.firstName}`;
  } else if (student.nickName === undefined) {
    return `Full name: ${student.lastName}, ${student.firstName} ${student.middleName}`;
  } else {
    return `Full name: ${student.lastName}, ${student.firstName} ${student.nickName}`;
  }
}

function showStudentHouseCrest(student) {
  return `url(images/crests/${student.house.toLowerCase()}-crest.svg)`;
}

function showBloodStatus(student) {
  return `Blood status: ${student.blood}`;
}

function getBadgeOpacity(badge, honour) {
  if (badge === false) {
    return `student-${honour}`;
  } else {
    return `student-${honour} student-badge-active`;
  }
}

function getHouseBadge(student) {
  return `images/badges/cap-${student.house.toLowerCase()}.svg`;
}

function setDefaultPhoto(photo) {
  photo.src = `images/students/0_default.png`;
}

function expandStudent() {
  const expansion = this.nextElementSibling;
  const crest = this.parentElement.firstElementChild;

  if (expansion.style.maxHeight === "400px") {
    expansion.style.maxHeight = "0";
    crest.style.backgroundPositionY = "0%";
  } else {
    document.querySelectorAll(".student-bottom").forEach((expanded) => {
      expanded.style.maxHeight = "0";
      expanded.parentElement.firstElementChild.style.backgroundPositionY = "0%";
    });

    expansion.style.maxHeight = "400px";
    crest.style.backgroundPositionY = "50%";
  }
}

function searchStudent() {
  const searchInput = getSearchInput().toLowerCase();

  const searchedStudents = alteredStudents.filter(containsSearchInput);

  function containsSearchInput(student) {
    //Allow first name and last name to search a student with middle name
    const studentNamesLong =
      `${student.firstName} ${student.middleName} ${student.nickName} ${student.lastName}`.replaceAll(
        " undefined",
        ""
      );
    const studentNamesShort =
      `${student.firstName} ${student.lastName}`.replaceAll(" undefined", "");

    if (
      studentNamesLong.toLowerCase().includes(searchInput.toLowerCase()) ||
      studentNamesShort.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  }

  showStudents(searchedStudents);
}

function getSearchInput() {
  return document.querySelector(".search-header input").value;
}

function showErrorMessage(type, student, button) {
  const container = document.querySelector("#section-messages");
  const message = document
    .querySelector("#message-template")
    .cloneNode(true).content;

  //Add button shake animation and removal eventListener
  button.classList.add("button-shake");
  button.addEventListener("animationend", () => {
    button.classList.remove("button-shake");
  });

  //Remove message after sliding out
  message
    .querySelector(".error-message")
    .addEventListener("animationend", () => {
      document.querySelector(".error-message").remove();
    });

  //Handle prefect error messages
  if (type === "gender") {
    message.querySelector(".error-message-text1").textContent =
      "Student was not made prefect!";
    message.querySelector(
      ".error-message-text2"
    ).textContent = `${student.house} already has a prefect of that gender.`;
  } else if (type === "house") {
    message.querySelector(".error-message-text1").textContent =
      "Student was not made prefect!";
    message.querySelector(
      ".error-message-text2"
    ).textContent = `${student.house} already has both of their prefects`;
  }

  //Handle inquisitorial squad error messages
  if (type === "inquisitor") {
    message.querySelector(".error-message-text1").textContent =
      "Student was not made an inquisitor!";
    message.querySelector(
      ".error-message-text2"
    ).textContent = `${student.firstName} is neither a Slytherin nor pure of blood.`;
  } else if (type === "inquisitorHack") {
    message.querySelector(".error-message-text1").textContent =
      "Student is no longer an inquisitor!";
    message.querySelector(
      ".error-message-text2"
    ).textContent = `${student.firstName} has been removed as an inquisitor.`;
  }

  //Handle expulsion error messages
  if (type === "expulsion") {
    if (expulsionAttempts === 0) {
      message.querySelector(".error-message-text1").textContent =
        "Student could not be expelled!";
      message.querySelector(
        ".error-message-text2"
      ).textContent = `Do not try to expel this student again.`;
    } else if (expulsionAttempts === 1) {
      message.querySelector(".error-message-text1").textContent =
        "Student could not be expelled!";
      message.querySelector(
        ".error-message-text2"
      ).textContent = `I said do NOT try to expel this student again!`;
    } else if (expulsionAttempts === 2) {
      message.querySelector(".error-message-text1").textContent =
        "Student could not be expelled!";
      message.querySelector(
        ".error-message-text2"
      ).textContent = `This is the last warning. Do NOT expel this student!`;
    } else if (expulsionAttempts === 3) {
      message.querySelector(".error-message-text1").textContent =
        "ḭ̷̺̖͎̬̇̋̑͌́͂͋̌͋̎̓̊̊̽͜͠ ̴̧͍̼̪̋͂̊̑͊̏̓̈́̃̊͂̚̚͝͠w̶̬̪̾̆͘ä̵̠͎̗́̊̓̕ŗ̴̡̡̗̭̝̲̤͍̤͕̋ń̴̫͉͖̯̣͔͈̻͚̠̯͂̐̅́̎́̒̽͊̾̓̓͝e̴̡̢̫̫̗̗͎͎̠̥̥̫͕̱̹͐̈́̂̅͌ḑ̸͇̤͓̫̬̼̻̫͎͙͕͈̒̊͊̿̽̂̐́́̃̀̐́͝ͅ ̷͖̝̦̇͒̎̈́̃͐͛́͊̓̕͜͜͝y̴̧̡͓͍̾͗̀̂͜o̶̤͕̩̟̹͛̓̎̄̓͊̎̈͘̚͜͜͝͠ů̴̗̦̭̐̒̕";
      setTimeout(curseHogwarts, 1500);
    }

    //Incremenet expulsionAttempts
    expulsionAttempts++;
  }

  container.appendChild(message);
}
