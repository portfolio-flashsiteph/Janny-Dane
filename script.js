$(document).ready(function () {

  // ----------------------------------------------------------------------
  // 1. THEME TOGGLE (DARK / LIGHT)
  // ----------------------------------------------------------------------
  const $themeToggleBtn = $('#themeToggle');
  const $themeIcon = $themeToggleBtn.find('i');

  const savedTheme = localStorage.getItem('janny_theme') || 'dark';
  if (savedTheme === 'light') {
    $('body').attr('data-theme', 'light');
    $themeIcon.removeClass('fa-moon').addClass('fa-sun');
  }

  $themeToggleBtn.on('click', function () {
    const currentTheme = $('body').attr('data-theme');
    if (currentTheme === 'light') {
      $('body').removeAttr('data-theme');
      $themeIcon.removeClass('fa-sun').addClass('fa-moon');
      localStorage.setItem('janny_theme', 'dark');
    } else {
      $('body').attr('data-theme', 'light');
      $themeIcon.removeClass('fa-moon').addClass('fa-sun');
      localStorage.setItem('janny_theme', 'light');
    }
  });

  // ----------------------------------------------------------------------
  // 2. MOBILE DRAWER NAVIGATION
  // ----------------------------------------------------------------------
  const $hamburgerBtn = $('#hamburgerBtn');
  const $navDrawer = $('#navDrawer');
  const $drawerOverlay = $('#drawerOverlay');

  function openDrawer() {
    $hamburgerBtn.addClass('active');
    $navDrawer.addClass('active');
    $drawerOverlay.addClass('active');
    $('body').css('overflow', 'hidden');
  }

  function closeDrawer() {
    $hamburgerBtn.removeClass('active');
    $navDrawer.removeClass('active');
    $drawerOverlay.removeClass('active');
    $('body').css('overflow', '');
  }

  $hamburgerBtn.on('click', function () {
    if ($navDrawer.hasClass('active')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  $drawerOverlay.on('click', closeDrawer);

  $('.drawer-link').on('click', function () {
    closeDrawer();
  });

  // ----------------------------------------------------------------------
  // 3. HEADER STICKY & ACTIVE LINK HIGHLIGHT ON SCROLL
  // ----------------------------------------------------------------------
  const $header = $('.header');
  const $sections = $('section');
  const $navLinks = $('.nav-link, .drawer-link');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $header.addClass('scrolled');
    } else {
      $header.removeClass('scrolled');
    }

    // ScrollSpy logic
    let scrollPos = $(document).scrollTop() + 200;
    $sections.each(function () {
      const top = $(this).offset().top;
      const height = $(this).outerHeight();
      const id = $(this).attr('id');

      if (scrollPos >= top && scrollPos < top + height) {
        $navLinks.removeClass('active');
        $(`.nav-link[href="#${id}"], .drawer-link[href="#${id}"]`).addClass('active');
      }
    });
  });

  // ----------------------------------------------------------------------
  // 4. PORTFOLIO FILTERING
  // ----------------------------------------------------------------------
  $('.filter-btn').on('click', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    const filter = $(this).attr('data-filter');
    const $items = $('.portfolio-item');

    if (filter === 'all') {
      $items.fadeIn(400);
    } else {
      $items.each(function () {
        if ($(this).attr('data-category') === filter) {
          $(this).fadeIn(400);
        } else {
          $(this).fadeOut(200);
        }
      });
    }
  });

  // ----------------------------------------------------------------------
  // 5. ANIMATE SKILL BARS ON SCROLL
  // ----------------------------------------------------------------------
  let skillsAnimated = false;
  $(window).on('scroll', function () {
    const resumeTop = $('#resume').offset().top - $(window).height() + 100;
    if (!skillsAnimated && $(window).scrollTop() > resumeTop) {
      $('.progress-fill').each(function () {
        const targetWidth = $(this).attr('data-progress');
        $(this).css('width', targetWidth);
      });
      skillsAnimated = true;
    }
  });

  // Initial check if page loads directly at resume
  if ($('#resume').length && $(window).scrollTop() > $('#resume').offset().top - $(window).height() + 100) {
    $('.progress-fill').each(function () {
      const targetWidth = $(this).attr('data-progress');
      $(this).css('width', targetWidth);
    });
    skillsAnimated = true;
  }

  // ----------------------------------------------------------------------
  // 6. TESTIMONIAL SLIDER LOGIC
  // ----------------------------------------------------------------------
  const $cards = $('.testimonial-card');
  const totalSlides = $cards.length;
  let currentIndex = 0;
  const $dotsContainer = $('#sliderDots');

  // Clear existing dots first to prevent duplication
  $dotsContainer.empty();

  // Dynamically create pagination dots
  for (let i = 0; i < totalSlides; i++) {
    $dotsContainer.append(`<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`);
  }

  function showSlide(index) {
    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    $cards.removeClass('active').eq(currentIndex).addClass('active');
    $('.dot').removeClass('active').eq(currentIndex).addClass('active');
  }

  $('#nextSlide').off('click').on('click', function () {
    showSlide(currentIndex + 1);
  });

  $('#prevSlide').off('click').on('click', function () {
    showSlide(currentIndex - 1);
  });

  $(document).on('click', '.dot', function () {
    const idx = parseInt($(this).attr('data-index'));
    showSlide(idx);
  });

  // Auto-slide every 6 seconds
  let autoSlide = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 6000);

  // Pause auto-sliding on hover
  $('.testimonial-slider-wrapper').hover(
    function () { clearInterval(autoSlide); },
    function () {
      autoSlide = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 6000);
    }
  );

  // ----------------------------------------------------------------------
  // 7. FORM SUBMISSION HANDLER
  // ----------------------------------------------------------------------
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    alert('Thank you for reaching out! Janny will get back to you shortly.');
    this.reset();
  });

});
