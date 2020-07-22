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
const sectionElements = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function buildTheNav() {
  const fragmentContainer = document.createDocumentFragment();
  for (sectionElement of sectionElements) {
    let navtext = sectionElement.getAttribute("data-nav");
    let navElement = document.createElement("li");
    let aNavElement = document.createElement("a");

    let navId = sectionElement.getAttribute("id");
    aNavElement.textContent = navtext;
    aNavElement.setAttribute("data-id", navId);
    navElement.appendChild(aNavElement);
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
function isSectionInViewport(el) {
  const SectionBox = el.getBoundingClientRect();
  return (
    SectionBox.top >= 0 &&
    SectionBox.left >= 0 &&
    SectionBox.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    SectionBox.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}
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
  e.preventDefault();
  const sectionId = e.target.getAttribute("data-id");
  if (sectionId) {
    const targetSectionElement = document.getElementById(sectionId);
    targetSectionElement.classList.add("active");
    e.target.parentNode.classList.add("active");
    removeActiveSection();
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

function handleScroll() {
  for (sectionElement of sectionElements) {
    if (isSectionInViewport(sectionElement)) {
      const activeNavElement = navElement.querySelector(".active");
      if (activeNavElement) {
        activeNavElement.classList.remove("active");
      }
      navElement
        .querySelector(`[data-id=${sectionElement.getAttribute("id")}]`)
        .parentNode.classList.add("active");
    }
  }
}
document.addEventListener("scroll", handleScroll);
