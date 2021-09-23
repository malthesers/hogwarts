"use strict";

let filterDropdownIsExpanded = false;
let currentRotationFilter = 0;

function toggleFilterDropdown() {
  const items = document.querySelector(".filter-dropdown-items");
  const chevron = document.querySelector(".filter-dropdown-icon");

  //Increment chevron rotation
  currentRotationFilter += 180;
  chevron.style.transform = `rotate(${currentRotationFilter}deg)`;

  if (filterDropdownIsExpanded === false) {
    items.style.maxHeight = "360px";
  } else {
    items.style.maxHeight = "0px";
  }

  filterDropdownIsExpanded = !filterDropdownIsExpanded;
}

function filterStudents() {
  const filterValue = getFilterValue(this);
  const filterText = getFilterText(this);
  const filterInput = document.querySelector(".filter-dropdown-input");

  //Get only students from the chosen house
  alteredStudents = allStudents.filter(isHouse);

  function isHouse(student) {
    if ("*" === houseValue || student.house === houseValue) {
      return true;
    } else {
      return false;
    }
  }

  //Only filter by value if a bool
  if (
    filterValue === "captain" ||
    filterValue === "prefect" ||
    filterValue === "inquisitor" ||
    filterValue === "expelled"
  ) {
    alteredStudents = alteredStudents.filter(hasBadge);
  } else if (filterValue === "current") {
    alteredStudents = currentStudents.filter(isHouse);
  } else if (filterValue === "*") {
    alteredStudents = allStudents.filter(isHouse);
  }

  function hasBadge(student) {
    if (student[filterValue] === true) {
      return true;
    } else {
      return false;
    }
  }

  //Change filter input
  filterInput.textContent = filterText;

  //Close dropdown
  toggleFilterDropdown();

  showStudents(alteredStudents);
}

function getFilterValue(button) {
  return button.dataset.filter;
}

function getFilterText(button) {
  return button.firstElementChild.textContent;
}
