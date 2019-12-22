/*
document.addEventListener("DOMContentLoaded", function (event) {
  const modal = document.querySelector('.modal');
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  const closeBtn = document.querySelector('.modal__close');
  const switchModal = () => {
    modal.classList.toggle('modal--visible');
  }
  modalBtn.forEach(element => {
    element.addEventListener('click', switchModal);
  });
  closeBtn.addEventListener('click', switchModal);
});
*/

$(document).ready(function () {
  var modal = $('.modal'),
    modalBtn = $('[data-toggle=modal]'),
    closeBtn = $('.modal__close');

  modalBtn.on('click', function () {
    modal.toggleClass('modal_visible');
  });

  closeBtn.on('click', function () {
    modal.toggleClass('modal_visible');
  });
  /*===== Закрытие модального окна нажатием на кнопку Esc =====*/
  $(document).keydown(function (e) {
    if (e.code == 'Escape') {
      modal.removeClass('modal_visible');
    };
  });
  /*===== Закрытие модального окна при нажатие на любое место вне модального блока =====*/
  $(document).on('click', function (e) {
    if (modal.is(e.target)) {
      modal.removeClass('modal_visible');
    };
  });

  /*===== Кнопка наверх =====*/
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1400) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });
  /*===== Плавная прокрутка =====*/
  $('#up').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, '300');
  });


 /*===== Слайдер для секции Завершенные проекты =====*/
  var projectSwiper = new Swiper('.projects__swiper-container', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.projects__swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.projects__swiper-button-next',
      prevEl: '.projects__swiper-button-prev',
    },
  });

  var next = $('.projects__swiper-button-next');
  var prev = $('.projects__swiper-button-prev');
  var bullets = $('.projects__swiper-pagination');

  next.css('left', prev.width() + bullets.width() + 40)
  bullets.css('left', prev.width() + 20)

  new WOW().init();

  // валидация форм
  function validateForm(form){
  $(form).validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 17
      },
      userQuestion: "required",
      // правило-обьект (блок)
      userEmail: {
        required: true,
        email: true
      }
    },
    messages: { //сообщение
      userName: {
        required: "Заполните поле",
        minlength: "Слишком короткое имя",
        maxlength: "Имя не должно превышать 15 символов"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Некорректно введен номер"
      },
      userQuestion: "Заполните поле",
      userEmail: {
        required: "Заполните поле",
        email: "Введите Ваш email в формате name@gmail.com"
      }
    }
  });
}
validateForm('.modal__form');
validateForm('.control__form');
validateForm('.footer__form');

// маска для телефона
  $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});

// карта Yandex
  
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [47.244734, 39.723227],
            zoom: 18            
        }, {
            searchControlProvider: 'yandex#search'
        }),        
        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Торговый центр; ул. Нансена, 239, Ростов-на-Дону, Россия',
            balloonContent: 'Прямой телефон +7 (999) 768 32 99'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '../img/map-icon.png',
            // Размеры метки.
            iconImageSize: [32, 32],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        }),

        myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'А эта — новогодняя',
            iconContent: '12'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'images/ball.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [15, 15],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });
    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemarkWithContent);
    
  });
  
});