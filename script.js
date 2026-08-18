// ----------------------------------------------------------------------
  // TESTIMONIAL SLIDER LOGIC
  // ----------------------------------------------------------------------
  const $cards = $('.testimonial-card');
  const totalSlides = $cards.length;
  let currentIndex = 0;
  const $dotsContainer = $('#sliderDots');

  // Build pagination dots
  for (let i = 0; i < totalSlides; i++) {
    $dotsContainer.append(`<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`);
  }

  const $dots = $('.dot');

  function showSlide(index) {
    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    $cards.removeClass('active').eq(currentIndex).addClass('active');
    $dots.removeClass('active').eq(currentIndex).addClass('active');
  }

  $('#nextSlide').on('click', function () {
    showSlide(currentIndex + 1);
  });

  $('#prevSlide').on('click', function () {
    showSlide(currentIndex - 1);
  });

  $(document).on('click', '.dot', function () {
    const idx = parseInt($(this).attr('data-index'));
    showSlide(idx);
  });

  // Auto-play slider every 6 seconds
  let autoSlide = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 6000);

  // Pause on hover
  $('.testimonial-slider-wrapper').hover(
    function () { clearInterval(autoSlide); },
    function () {
      autoSlide = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 6000);
    }
  );
