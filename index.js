/********* About Section *******/

const tablinks = document.getElementsByClassName("about-title-link");
const tabcontents = document.getElementsByClassName("about-content");

function opentab(tabname) {
  for (let tablink of tablinks) {
    tablink.classList.remove("active-title");
  }

  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-content");
  }

  event.currentTarget.classList.add("active-title");
  document.getElementById(tabname).classList.add("active-content");
}

/********* Contact Section - Submit a Form to Google Sheets ********/

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwEP7FTpTsqCgAfotzImkZuFTV-aeSFUNaKpGOHAZksAyn4kIYA0wTUgMHQQcRNJhi9/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Message sent successfully";
      setTimeout(function () {
        msg.innerHTML = " ";
      }, 8000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

/************** Footer Date **************/
const year = document.querySelector(".current-date");
const currentYear = new Date().getFullYear();
year.textContent = currentYear;

/********* Smooth Scrolling Animation *********/
const navLinks = document.querySelectorAll(".main-navbar a:link");
// console.log(navLinks);
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    // console.log(href);
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/*********** Mobile Navigation ***********************/
const btnNav = document.querySelector(".btn-mobile-navigation");
const parentEl = document.querySelector(".main-navbar");

btnNav.addEventListener("click", function () {
  parentEl.classList.toggle("nav-open");
});

/***************** Sticky Navigation *****************/

const sectionAbout = document.querySelector(".about-section");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === true) {
      document.querySelector("nav").classList.add("sticky");
    }
  },
  {
    //Inside the entire browser window (viewport)
    root: null,
    threshold: 0,
  }
);
obs.observe(sectionAbout);

/********* Fixing Felxbox gap property in Safari older versions *******/

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
