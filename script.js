//ScrollIt JS File

(function ($) {
  "use strict";

  var pluginName = "ScrollIt",
    pluginVersion = "1.0.3";

  /*
   * OPTIONS
   */
  var defaults = {
    upKey: 38,
    downKey: 40,
    easing: "linear",
    scrollTime: 600,
    activeClass: "active",
    onPageChange: null,
    topOffset: 0,
  };

  $.scrollIt = function (options) {
    /*
     * DECLARATIONS
     */
    var settings = $.extend(defaults, options),
      active = 0,
      lastIndex = $("[data-scroll-index]:last").attr("data-scroll-index");

    /*
     * METHODS
     */

    /**
     * navigate
     *
     * sets up navigation animation
     */
    var navigate = function (ndx) {
      if (ndx < 0 || ndx > lastIndex) return;

      var targetTop =
        $("[data-scroll-index=" + ndx + "]").offset().top +
        settings.topOffset +
        1;
      $("html,body").animate(
        {
          scrollTop: targetTop,
          easing: settings.easing,
        },
        settings.scrollTime
      );
    };

    /**
     * doScroll
     *
     * runs navigation() when criteria are met
     */
    var doScroll = function (e) {
      var target =
        $(e.target).closest("[data-scroll-nav]").attr("data-scroll-nav") ||
        $(e.target).closest("[data-scroll-goto]").attr("data-scroll-goto");
      navigate(parseInt(target));
    };

    /**
     * keyNavigation
     *
     * sets up keyboard navigation behavior
     */
    var keyNavigation = function (e) {
      var key = e.which;
      if (
        $("html,body").is(":animated") &&
        (key == settings.upKey || key == settings.downKey)
      ) {
        return false;
      }
      if (key == settings.upKey && active > 0) {
        navigate(parseInt(active) - 1);
        return false;
      } else if (key == settings.downKey && active < lastIndex) {
        navigate(parseInt(active) + 1);
        return false;
      }
      return true;
    };

    /**
     * updateActive
     *
     * sets the currently active item
     */
    var updateActive = function (ndx) {
      if (settings.onPageChange && ndx && active != ndx)
        settings.onPageChange(ndx);

      active = ndx;
      $("[data-scroll-nav]").removeClass(settings.activeClass);
      $("[data-scroll-nav=" + ndx + "]").addClass(settings.activeClass);
    };

    /**
     * watchActive
     *
     * watches currently active item and updates accordingly
     */
    var watchActive = function () {
      var winTop = $(window).scrollTop();

      var visible = $("[data-scroll-index]").filter(function (ndx, div) {
        return (
          winTop >= $(div).offset().top + settings.topOffset &&
          winTop <
            $(div).offset().top + settings.topOffset + $(div).outerHeight()
        );
      });
      var newActive = visible.first().attr("data-scroll-index");
      updateActive(newActive);
    };

    /*
     * runs methods
     */
    $(window).on("scroll", watchActive).scroll();

    $(window).on("keydown", keyNavigation);

    $("body").on(
      "click",
      "[data-scroll-nav], [data-scroll-goto]",
      function (e) {
        e.preventDefault();
        doScroll(e);
      }
    );
  };
})(jQuery);

// Javascript main.js functions

$(document).ready(function () {
  // Initialize smooth scrolling
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    var target = $(this.hash);
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 70,
        },
        800,
        "swing"
      );
      return false;
    }
  });

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 90) {
      $(".navbar").addClass("navbar-shrink");
    } else {
      $(".navbar").removeClass("navbar-shrink");
    }
  });

  function parallaxMouse() {
    if ($("#parallax").length) {
      var scene = document.getElementById("parallax");
      var parallax = new Parallax(scene);
    }
  }

  parallaxMouse();

  //skills meter

  $(window).scroll(function () {
    var hT = $("#skill-bar-wrapper").offset().top;
    var hH = $("#skill-bar-wrapper").outerHeight();
    var wH = $(window).height();
    var wS = $(this).scrollTop();

    if (wS > hT + hH - 1.4 * wH) {
      jQuery(".skillbar-container").each(function () {
        jQuery(this)
          .find(".skills")
          .animate(
            {
              width: jQuery(this).attr("data-percent"),
            },
            5000
          );
      });
    }
  });

  //filter
  ///enabling active button
  let $btns = $(".img-gallery .sortBtn .filter-btn");
  $btns.click(function (e) {
    $(".img-gallery .sortBtn .filter-btn").removeClass("active");
    e.target.classList.add("active");

    ///enabling filter selection according to the active button
    let selector = $(e.target).attr("data-filter");
    $(".img-gallery .grid").isotope({
      filter: selector,
    });
    return false;
  });

  ///enabling gallery mode with magnific popup.js and maginif popup.css
  $(".image-popup").magnificPopup({
    type: "image",
    gallery: { enabled: true },
  });

  // owl carousel
  $(".testimonial-slider").owlCarousel({
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    nav: false,
    dots: true,
    dotsEach: false,
    items: 3,
    smartSpeed: 700,
    slideBy: 3,
    responsive: {
      0: {
        items: 1,
        slideBy: 1,
      },
      600: {
        items: 2,
        slideBy: 2,
      },
      1000: {
        items: 3,
        slideBy: 3,
      },
    },
  });

  //scrollit
  $.scrollIt({
    topOffset: -50,
  });

  //Hiding Mobile Navbar when a nav link is clicked
  $(".nav-link").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Text animation with typewriter effect
  const roles = ["UI/UX Designer", "Web Developer", "Web Designer"];
  let currentIndex = 0;
  let currentIndex2 = 0;
  let isDeleting = false;
  let isDeleting2 = false;
  let text = "";
  let text2 = "";
  let charIndex = 0;
  let charIndex2 = 0;
  let typingSpeed = 100;
  let erasingSpeed = 50;
  let newTextDelay = 1000;

  function typeEffect() {
    const currentRole = roles[currentIndex];
    const textElement = $("#changing-text");

    if (isDeleting) {
      text = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = erasingSpeed;
    } else {
      text = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    textElement.text(text);

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = newTextDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  function typeEffect2() {
    const currentRole = roles[currentIndex2];
    const textElement = $("#changing-text-2");

    if (isDeleting2) {
      text2 = currentRole.substring(0, charIndex2 - 1);
      charIndex2--;
      typingSpeed = erasingSpeed;
    } else {
      text2 = currentRole.substring(0, charIndex2 + 1);
      charIndex2++;
      typingSpeed = 100;
    }

    textElement.text(text2);

    if (!isDeleting2 && charIndex2 === currentRole.length) {
      typingSpeed = newTextDelay;
      isDeleting2 = true;
    } else if (isDeleting2 && charIndex2 === 0) {
      isDeleting2 = false;
      currentIndex2 = (currentIndex2 + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect2, typingSpeed);
  }

  // Start both typewriter effects
  typeEffect();
  setTimeout(() => {
    typeEffect2();
  }, 1500); // Start the second effect with a delay to make them out of sync

  // Contact Form Submission Handler
  $(document).ready(function () {
    $("#contactForm").on("submit", function (e) {
      e.preventDefault();

      // Get the form message div
      const formMessage = $("#formMessage");

      // Show loading message
      formMessage
        .html('<div class="alert alert-info">Sending message...</div>')
        .show();

      // Get form data
      const formData = {
        name: $('input[name="name"]').val(),
        email: $('input[name="email"]').val(),
        phone: $('input[name="phone"]').val(),
        subject: $('input[name="subject"]').val(),
        message: $('textarea[name="message"]').val(),
      };

      // Send the form data
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/send-email",
        data: formData,
        success: function (response) {
          // Show success message
          formMessage.html(
            '<div class="alert alert-success">' + response.message + "</div>"
          );

          // Clear the form
          $("#contactForm")[0].reset();

          // Hide the message after 5 seconds
          setTimeout(function () {
            formMessage.fadeOut();
          }, 5000);
        },
        error: function (xhr, status, error) {
          // Show error message
          let errorMessage =
            "Sorry, something went wrong. Please try again later.";
          if (xhr.responseJSON && xhr.responseJSON.message) {
            errorMessage = xhr.responseJSON.message;
          }
          formMessage.html(
            '<div class="alert alert-danger">' + errorMessage + "</div>"
          );

          // Hide the message after 5 seconds
          setTimeout(function () {
            formMessage.fadeOut();
          }, 5000);
        },
      });
    });
  });
});
