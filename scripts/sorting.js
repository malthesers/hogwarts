"use strict";

let dropdownIsExpanded = false;
let currentRotationSort = 0;
let currentRotationFirstname = 180;
let currentRotationLastname = 180;
let currentRotationHouse = 180;

function sortStudents() {
  //Get value and direction to sort by
  const sortValue = getSortValue(this);
  const sortDir = getSortDir(this);
  const sortChevron = getSortChevron(this);

  //Increment chevron rotation for given sorting method
  incrementRotation(sortChevron, sortValue);

  //Initiate sorting
  alteredStudents.sort(compareName);

  function compareName(a, b) {
    if (a[sortValue] < b[sortValue]) {
      return -1 * sortDir;
    } else {
      return 1 * sortDir;
    }
  }

  //Change sorting direction
  changeSortDir(this);

  //Display new list of students
  showStudents(alteredStudents);
}

function getSortValue(button) {
  return button.dataset.sort;
}

function getSortDir(button) {
  if (button.dataset.sortDirection === "asc") {
    return 1;
  } else {
    return -1;
  }
}

function getSortChevron(button) {
  return button.lastElementChild;
}

function incrementRotation(chevron, method) {
  if (method === "firstName") {
    currentRotationFirstname += 180;
    chevron.style.transform = `rotate(${currentRotationFirstname}deg)`;
  } else if (method === "lastName") {
    currentRotationLastname += 180;
    chevron.style.transform = `rotate(${currentRotationLastname}deg)`;
  } else if (method === "house") {
    currentRotationHouse += 180;
    chevron.style.transform = `rotate(${currentRotationHouse}deg)`;
  }
}

function changeSortDir(button) {
  if (button.dataset.sortDirection === "asc") {
    button.dataset.sortDirection = "desc";
  } else {
    button.dataset.sortDirection = "asc";
  }
}

function openSortingDropdown() {
  const items = document.querySelector(".sorting-dropdown-items");
  const chevron = document.querySelector(".sorting-dropdown-icon");

  //Increment chevron rotation
  currentRotationSort += 180;
  chevron.style.transform = `rotate(${currentRotationSort}deg)`;

  if (dropdownIsExpanded === false) {
    items.style.maxHeight = "150px";
  } else {
    items.style.maxHeight = "0px";
  }

  dropdownIsExpanded = !dropdownIsExpanded;
}
