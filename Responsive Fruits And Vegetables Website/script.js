var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick =()=> {
  menu.classList.toggle('bx-x');
 
  navbar.classList.toggle('active');
};

window.onscroll = function() {
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
};