"use strict";

let dropdownIsExpanded = false;
let chevronRotation = 0;

function sortStudents() {
  //Get value and direction to sort by
  const sortValue = getSortValue(this);
  const sortDir = getSortDir(this);

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

  chevronRotation += 180;

  if (dropdownIsExpanded === false) {
    items.style.maxHeight = "150px";
  } else {
    items.style.maxHeight = "0px";
  }

  chevron.style.transform = `rotate(${chevronRotation}deg)`;

  dropdownIsExpanded = !dropdownIsExpanded;
}
