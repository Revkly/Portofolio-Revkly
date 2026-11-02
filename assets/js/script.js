'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// custom select variables & filter functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  const normSelected = (selectedValue || "").trim().toLowerCase();
  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = (filterItems[i].dataset.category || "").toLowerCase();
    if (normSelected === "all" || itemCategory.includes(normSelected)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      const selectedValue = this.innerText.trim();
      if (selectValue) selectValue.innerText = selectedValue;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// add event in all filter button items for large screen
if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      const selectedValue = this.innerText.trim();
      if (selectValue) selectValue.innerText = selectedValue;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link safely
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.trim().toLowerCase();

    // Toggle active state on pages
    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
      }
    }

    // Toggle active state on nav links
    for (let k = 0; k < navigationLinks.length; k++) {
      if (navigationLinks[k].innerHTML.trim().toLowerCase() === targetPage) {
        navigationLinks[k].classList.add("active");
      } else {
        navigationLinks[k].classList.remove("active");
      }
    }
  });
}
