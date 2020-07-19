/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navElement = document.querySelector("#navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function buildTheNav() {
  const fragmentContainer = document.createDocumentFragment();
  const sectionElements = document.querySelectorAll("section");
  for (sectionElement of sectionElements) {
    let navtext = sectionElement.getAttribute("data-nav");
    let navElement = document.createElement("li");
    let navId = sectionElement.getAttribute("id");
    navElement.textContent = navtext;
    navElement.setAttribute("data-id", navId);
    fragmentContainer.appendChild(navElement);
  }
  navElement.appendChild(fragmentContainer);
  navElement.addEventListener("click", scrollToTheTargetSection);
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
// Add class 'active' to section when near top of viewport
// Scroll to anchor ID using scrollTO event
buildTheNav();

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
// Scroll to section on link click
// Set sections as active
function scrollToTheTargetSection(e) {
  const sectionId = e.target.getAttribute("data-id");
  if (sectionId) {
    removeActiveSection();
    const targetSectionElement = document.getElementById(sectionId);
    targetSectionElement.classList.add("active");
    window.scrollTo({
      top: targetSectionElement.offsetTop,
      behavior: "smooth",
    });
  }
}

function removeActiveSection() {
  const activeSection = document.querySelector(".active");
  activeSection.classList.remove("active");
}
