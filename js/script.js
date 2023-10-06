'use strict';



const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

navbarToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.remove("active");
    navbarToggler.classList.remove("active");
  });
}



/**
 * search toggle
 */

const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const searchBox = document.querySelector("[data-search-box]");

for (let i = 0; i < searchTogglers.length; i++) {
  searchTogglers[i].addEventListener("click", function () {
    searchBox.classList.toggle("active");
  });
}



/**
 * header
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});


/**
 * sliders
 */

const carousel = document.querySelector('.has-scrollbar');
const slides = document.querySelectorAll('.scrollbar-item');
let currentIndex = 0;
const intervalTime = 3000; // Intervalo en milisegundos (3 segundos en este caso)

function nextSlide() {
    currentIndex++;
    if (currentIndex === slides.length) {
        currentIndex = 0;
    }
    updateCarousel();
}

function updateCarousel() {
    const translateX = -currentIndex * 310; // Ancho de cada tarjeta más el margen
    carousel.style.transform = `translateX(${translateX}px)`;
}

setInterval(nextSlide, intervalTime);