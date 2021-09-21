"use strict";

function getFirstName(studentObject) {
  return capitalise(studentObject.fullname).split(" ")[0];
}

function getMiddleName(studentObject) {
  let fullName = capitalise(studentObject.fullname).split(" ");
  let middleName = fullName.join(" ");

  if (fullName.length > 2 && middleName.includes('"') === false) {
    middleName = middleName.substring(
      middleName.indexOf(" ") + 1,
      middleName.lastIndexOf(" ")
    );
  } else {
    middleName = undefined;
  }

  return middleName;
}

function getNickName(studentObject) {
  let fullName = capitalise(studentObject.fullname).split(" ");
  let nickName = fullName.join(" ");

  if (fullName.length > 2 && nickName.includes('"') === true) {
    nickName = nickName.substring(
      nickName.indexOf(" ") + 1,
      nickName.lastIndexOf(" ")
    );
  } else {
    nickName = undefined;
  }

  return nickName;
}

function getLastName(studentObject) {
  let fullName = capitalise(studentObject.fullname).split(" ");
  let lastName;

  if (fullName.length > 1) {
    lastName = fullName[fullName.length - 1];
  } else {
    lastName = undefined;
  }

  return lastName;
}

function getGender(studentObject) {
  return capitalise(studentObject.gender);
}

function getHouse(studentObject) {
  return capitalise(studentObject.house);
}

function getPhoto(studentObject) {
  //Extract fullName
  let fullName = studentObject.fullname.trim().toLowerCase();

  //Extract lastName from fullName
  let lastName = fullName.substring(fullName.lastIndexOf(" ") + 1);

  //Handle hyphenated lastName scenarios
  if (lastName.includes("-")) {
    lastName = lastName.substring(lastName.lastIndexOf("-") + 1);
  }

  //Extract firstName from fullName
  let firstName = fullName.substring(0, fullName.indexOf(" "));

  //Handle duplicate lastName scenarios
  let lastNameCount = 0;

  lastNameList.forEach((studentLastName) => {
    if (lastName === studentLastName) {
      lastNameCount++;
    }
  });

  if (lastNameCount > 1) {
    firstName = firstName;
  } else {
    firstName = firstName[0];
  }

  let photoSrc = `images/students/${lastName}_${firstName}.png`;

  return photoSrc;
}

function getBloodStatus(studentObject) {
  //Get student last name
  const lastName = getLastName(studentObject);
  let bloodtype;

  //Check pure blood names first
  familyNameList.pure.forEach((familyName) => {
    if (lastName === familyName) {
      bloodtype = `Pure-blood`;
    }
  });

  //Check half blood names last to overwrite pure-blood
  familyNameList.half.forEach((familyName) => {
    if (lastName === familyName) {
      bloodtype = `Half-blood`;
    }
  });

  if (bloodtype === undefined) {
    bloodtype = `Muggle-born`;
  }

  return bloodtype;
}

function getCaptaincy(name) {
  if (
    name === "Harry" ||
    name === "Zacharias" ||
    name === "Pansy" ||
    name === "Anthony"
  ) {
    return true;
  } else {
    return false;
  }
}

function capitalise(textToCapitalise) {
  //Make everything lower case
  textToCapitalise = textToCapitalise.toLowerCase().trim();

  //Array of filters to capitalise following letters
  const filters = [" ", "-", '"'];

  //Loop through each filter
  filters.forEach((filter) => {
    textToCapitalise = textToCapitalise
      .split(`${filter}`)
      .map((filteredString) => {
        return filteredString[0].toUpperCase() + filteredString.substring(1);
      })
      .join(`${filter}`);
  });

  return textToCapitalise;
}
