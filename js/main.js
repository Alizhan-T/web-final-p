$(document).ready(function () {
  // 1. Dark Mode Toggle with persisted preference
  const $themeToggle = $('#theme-toggle');
  if ($themeToggle.length) {
    const applyTheme = (isDark) => {
      $('body').toggleClass('dark-mode', isDark);
      $themeToggle.text(isDark ? '☀️' : '🌙');
      $themeToggle.attr('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    };

    applyTheme(localStorage.getItem('theme') === 'dark');

    $themeToggle.on('click', function () {
      const nextIsDark = !$('body').hasClass('dark-mode');
      applyTheme(nextIsDark);
      localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
    });
  }

  // 2. Smooth scroll for valid in-page anchor links
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this).attr('href');
    if (!target || target === '#') return;
    const $el = $(target);
    if (!$el.length) return;

    e.preventDefault();
    $('html, body').animate({ scrollTop: $el.offset().top - 56 }, 500);
  });

  // 3. Destinations page: live search + sorting with preserved state
  initDestinations();

  function initDestinations() {
    const $container = $('#destinations-list');
    if (!$container.length || typeof countries === 'undefined') return;

    let currentQuery = '';
    let currentSort = null;

    function getFilteredAndSorted() {
      let list = countries.filter((c) =>
        c.name.toLowerCase().includes(currentQuery) ||
        c.description.toLowerCase().includes(currentQuery)
      );
      if (currentSort === 'name') {
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
      } else if (currentSort === 'rating') {
        list = [...list].sort((a, b) => b.rating - a.rating);
      }
      return list;
    }

    function render() {
      const list = getFilteredAndSorted();
      if (!list.length) {
        $container.html('<div class="col-12 text-center py-4 text-muted">No matching destinations found.</div>');
        return;
      }

      const htmlContent = list
        .map(
          (c) => `
          <div class="col-md-4" data-aos="fade-up">
            <div class="card h-100 shadow-sm">
              <img src="${c.image}" class="card-img-top" alt="${c.name}" loading="lazy">
              <div class="card-body">
                <h5 class="card-title">${c.name}</h5>
                <p class="card-text">${c.description}</p>
                <p class="mb-0 fw-semibold">Rating: ${'★'.repeat(c.rating)}${'☆'.repeat(5 - c.rating)} (${c.rating}/5)</p>
              </div>
            </div>
          </div>`
        )
        .join('');

      $container.html(htmlContent);
    }

    render();

    $('#search').on('input', function () {
      currentQuery = $(this).val().trim().toLowerCase();
      render();
    });

    $('#sort-name').on('click', function () {
      currentSort = 'name';
      render();
    });

    $('#sort-rating').on('click', function () {
      currentSort = 'rating';
      render();
    });
  }

  // 4. About page animated destination counter
  initAbout();

  function initAbout() {
    const $counter = $('#counter');
    if (!$counter.length || typeof countries === 'undefined') return;

    let count = 0;
    const total = countries.length;
    const intervalId = setInterval(() => {
      if (count < total) {
        count++;
        $counter.text(count);
      } else {
        clearInterval(intervalId);
      }
    }, 100);
  }

  // 5. Contact page form handling
  initContact();

  function initContact() {
    const $form = $('#contact-form');
    if (!$form.length) return;

    $form.on('submit', function (e) {
      e.preventDefault();
      let $status = $('#form-status');
      if (!$status.length) {
        $status = $('<div id="form-status" class="alert alert-success mt-3" role="alert"></div>');
        $form.after($status);
      }
      $status.text('Thanks! Your message has been sent.');
      this.reset();
    });
  }
});
