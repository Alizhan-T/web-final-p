$(document).ready(function() {
  // Обертываем весь код в $(document).ready() — это эквивалент document.addEventListener('DOMContentLoaded')

  // 1. Переключение темы (Dark Mode)
  const $themeToggle = $('#theme-toggle');
  if ($themeToggle.length) { // Проверяем существование элемента в jQuery
    $themeToggle.on('click', function() {
      $('body').toggleClass('dark-mode');
      const theme = $('body').hasClass('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });

    if (localStorage.getItem('theme') === 'dark') {
      $('body').addClass('dark-mode');
    }
  }

  // 2. Плавный скролл для якорных ссылок
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = $(this).attr('href');

    // Используем jQuery .animate() для плавного скролла
    $('html, body').animate({
      // .offset().top возвращает положение элемента относительно документа
      scrollTop: $(target).offset().top - 56 // Вычитаем 56px на высоту фиксированного навбара
    }, 500); // 500ms продолжительность анимации
  });

  // 3. Функционал страницы Destinations
  initDestinations();

  function initDestinations() {
    const $container = $('#destinations-list');
    if (!$container.length) return;

    function render(list) {
      let htmlContent = '';
      // Сначала собираем всю HTML-строку
      list.forEach(c => {
        htmlContent += `
        <div class="col-md-4" data-aos="fade-up">
          <div class="card h-100">
            <img src="${c.image}" class="card-img-top" alt="${c.name}">
            <div class="card-body">
              <h5>${c.name}</h5>
              <p>${c.description}</p>
              <p>Rating: ${c.rating}/5</p>
            </div>
          </div>
        </div>`;
      });
      // Обновляем DOM один раз с помощью .html()
      $container.html(htmlContent);
    }

    render(countries);

    // Поиск
    $('#search').on('input', function() {
      const q = $(this).val().toLowerCase(); // .val() для получения значения из input
      render(countries.filter(c => c.name.toLowerCase().includes(q)));
    });

    // Сортировка по имени (A-Z)
    $('#sort-name').on('click', function() {
      render([...countries].sort((a, b) => a.name.localeCompare(b.name)));
    });

    // Сортировка по рейтингу
    $('#sort-rating').on('click', function() {
      render([...countries].sort((a, b) => b.rating - a.rating));
    });
  }

  // 4. Функционал страницы About (счетчик)
  initAbout();

  function initAbout() {
    const $counter = $('#counter');
    if (!$counter.length) return;

    let n = 0;
    const total = countries.length;

    const intervalId = setInterval(() => {
      if (n < total) {
        n++;
        $counter.text(n); // .text() для обновления текстового содержимого
      } else {
        clearInterval(intervalId);
      }
    }, 100);
  }

  // 5. Функционал страницы Contact (обработка формы)
  initContact();

  function initContact() {
    const $form = $('#contact-form');
    if (!$form.length) return;

    $form.on('submit', function(e) { // Используем .on('submit', ...)
      e.preventDefault();
      alert('Message sent!');
      this.reset(); // Используем нативный метод reset() для DOM-элемента формы
    });
  }
});