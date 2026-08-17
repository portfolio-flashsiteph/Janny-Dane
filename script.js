$(document).ready(function () {
  
  // ----------------------------------------------------------------------
  // 1. Mobile Navigation Drawer & Hamburger Toggle
  // ----------------------------------------------------------------------
  const $hamburgerBtn = $('#hamburgerBtn');
  const $navDrawer = $('#navDrawer');
  const $drawerOverlay = $('#drawerOverlay');
  const $body = $('body');

  function openDrawer() {
    $hamburgerBtn.addClass('is-active');
    $navDrawer.addClass('is-open');
    $drawerOverlay.addClass('is-visible');
    $body.addClass('no-scroll');
  }

  function closeDrawer() {
    $hamburgerBtn.removeClass('is-active');
    $navDrawer.removeClass('is-open');
    $drawerOverlay.removeClass('is-visible');
    $body.removeClass('no-scroll');
  }

  $hamburgerBtn.on('click', function () {
    if ($navDrawer.hasClass('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close drawer when clicking backdrop overlay
  $drawerOverlay.on('click', closeDrawer);

  // Close drawer and highlight active link when clicking drawer links
  $('.drawer-link').on('click', function () {
    $('.drawer-link').removeClass('active');
    $(this).addClass('active');
    closeDrawer();
  });

  // ----------------------------------------------------------------------
  // 2. Dark/Light Mode Switcher
  // ----------------------------------------------------------------------
  const $themeToggle = $('#themeToggle');
  
  $themeToggle.on('click', function () {
    $body.toggleClass('dark-mode');
    const isDark = $body.hasClass('dark-mode');
    
    $(this).html(isDark 
      ? '<i class="fa-solid fa-sun"></i>' 
      : '<i class="fa-solid fa-moon"></i>'
    );
  });

  // ----------------------------------------------------------------------
  // 3. Interactive Portfolio Filter
  // ----------------------------------------------------------------------
  $('.filter-btn').on('click', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    const filter = $(this).attr('data-filter');

    if (filter === 'all') {
      $('.portfolio-item').fadeIn(300);
    } else {
      $('.portfolio-item').hide();
      $(`.portfolio-item[data-category="${filter}"]`).fadeIn(300);
    }
  });

  // ----------------------------------------------------------------------
  // 4. Animate Skill Progress Bars on Scroll
  // ----------------------------------------------------------------------
  let animated = false;

  function checkScroll() {
    const resumeSection = $('#resume');
    if (resumeSection.length) {
      const top = resumeSection.offset().top - window.innerHeight + 100;
      if (!animated && $(window).scrollTop() > top) {
        $('.progress-fill').each(function () {
          const targetWidth = $(this).attr('data-progress');
          $(this).css('width', targetWidth);
        });
        animated = true;
      }
    }
  }

  $(window).on('scroll', checkScroll);
  checkScroll(); // Trigger check on initial load

  // ----------------------------------------------------------------------
  // 5. Contact Form Submission
  // ----------------------------------------------------------------------
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    alert('Thank you! Your message has been sent successfully.');
    this.reset();
  });

});
