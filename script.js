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

  $drawerOverlay.on('click', closeDrawer);

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
  // 3. Interactive Portfolio Filter with Smooth Transitions
  // ----------------------------------------------------------------------
  $('.filter-btn').on('click', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    const filter = $(this).attr('data-filter');

    if (filter === 'all') {
      $('.portfolio-item').stop().fadeIn(400);
    } else {
      $('.portfolio-item').stop().hide();
      $(`.portfolio-item[data-category="${filter}"]`).stop().fadeIn(400);
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
  checkScroll();

  // ----------------------------------------------------------------------
  // 5. Interactive Button Ripple Effect
  // ----------------------------------------------------------------------
  $('.btn').on('click', function (e) {
    const $btn = $(this);
    const x = e.pageX - $btn.offset().left;
    const y = e.pageY - $btn.offset().top;

    const $ripple = $('<span class="ripple"></span>').css({
      top: y + 'px',
      left: x + 'px'
    });

    $btn.append($ripple);

    setTimeout(() => {
      $ripple.remove();
    }, 600);
  });

  // ----------------------------------------------------------------------
  // 6. Contact Form Submission
  // ----------------------------------------------------------------------
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    alert('Thank you, gorgeous! ✨ Your message has been sent successfully.');
    this.reset();
  });

});
