/**
* Template Name: Personal - v2.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Nav Menu - smooth scroll to section
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
        } else {
          var headerHeight = $('#header').hasClass('header-top') ? 80 : 0;
          $('html, body').animate({
            scrollTop: target.offset().top - headerHeight
          }, 600, 'swing');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  });

  // Scroll-based header shrink
  $(window).on('scroll', function() {
    var scrollPos = $(this).scrollTop();
    var headerHeight = $('#header').outerHeight();

    if (scrollPos > headerHeight * 0.6) {
      if (!$('#header').hasClass('header-top')) {
        $('#header').addClass('header-top');
        $('#header-spacer').addClass('active');
      }
    } else {
      if ($('#header').hasClass('header-top')) {
        $('#header').removeClass('header-top');
        $('#header-spacer').removeClass('active');
      }
    }

    // Update active nav link based on scroll position
    var navSections = ['#contacts', '#skills', '#portfolio', '#experience', '#education', '#about'];
    var activeSet = false;

    for (var i = 0; i < navSections.length; i++) {
      var $sec = $(navSections[i]);
      if ($sec.length && scrollPos >= $sec.offset().top - 200) {
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $('.nav-menu, .mobile-nav').find('a[href="' + navSections[i] + '"]').parent('li').addClass('active');
        activeSet = true;
        break;
      }
    }

    if (!activeSet) {
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="#header"]').parent('li').addClass('active');
    }

    // Reveal sections as they scroll into view
    $('section').each(function() {
      var sectionTop = $(this).offset().top;
      var windowBottom = scrollPos + $(window).height();
      if (windowBottom > sectionTop + 100) {
        $(this).addClass('section-visible');
      }
    });
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      setTimeout(function() {
        var headerHeight = 80;
        $('html, body').animate({
          scrollTop: $(initial_nav).offset().top - headerHeight
        }, 600);
      }, 500);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();

    // Trigger initial scroll check to reveal visible sections
    $(window).trigger('scroll');
  });

})(jQuery);