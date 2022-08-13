
jQuery(document).ready(function($) {

  $('.simple-slider-wrapper').each(function() {
      const this_slider = $(this);
      
      const slides = this_slider.find('ul li');
      const control_prev = this_slider.find('.control_prev');
      const control_next = this_slider.find('.control_next');

      function slider_init() {
          if (slides.length > 1) {
              control_prev.css('display', 'block');
              control_next.css("display", "block");
          }
      }
      slider_init();

      function moveRight() {
          // move last child to beginning of list and set list position to -100%
          this_slider.find('ul li:last-child').prependTo(this_slider.find('ul'));
          slides.css('left', '-100%');
          // move all list elements to right
          slides.stop().animate({ left: 0 }, 500);
      };

      function moveLeft() {
          // move all list elements to left
          const arr = [ slides.stop().animate({ left: '-100%' }, 500).promise() ]
          // after animation end move first child to end of list and set list position to 0
          $.when.apply($, arr).then(function() {
              this_slider.find('ul li:first-child').appendTo(this_slider.find('ul'));
              slides.css('left', 0);
          });
      };

      control_prev.on("click", function () {
          if (slides.length > 1) {
              moveRight();
          }
      });

      control_next.on("click", function () {
          if (slides.length > 1) {
              moveLeft();
          }
      });

      // autoplay
      function setAutoplay() {
          let is_slider_on = true;
          let autoplay = setInterval(function () {
              if (slides.length > 1) {
                  moveLeft();
              }
          }, 3000);

          this_slider.on('mouseenter', function() {
              clearInterval(autoplay);
              is_slider_on = false;
          });

          this_slider.on('mouseleave', function() {
              if (!is_slider_on) {
                  autoplay = setInterval(function () {
                      moveLeft();
                  }, 3000);
                is_slider_on = true;
              }
          });
      }
      setAutoplay();
  });

});

// const navigationSwitcher= document.querySelector('.navigation__switcher--js');

// navigationSwitcher.addEventListener('click', (e)=> {
//     const navigationList=document.querySelector('.menu__mobile--js')
//     navigationList.classList.toggle('menu__mobile--visible') 
//     const hamburgerIcon=document.querySelector('.fa-bars')
//     hamburgerIcon.classList.toggle('fa-times')
// });

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".menu__link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}
