// import $ from 'jquery';

// import '../css/index.css';

// import Swiper from 'swiper';

const _dir = $("html").attr("dir");
const _isRtl = _dir === "rtl";

$(document).on('ready', function () {
  $(".burger-menu").on('click', function () {
    $(".header-list").addClass("open");
  });
  $(".close-menu").on('click', function () {
    $(".header-list").removeClass("open");
  });
  var heroSwiper = new Swiper(".hero-swiper", {
  });

  var bullets = window.stories;
  var storiesSwiper = new Swiper(".stories-swiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<img src="' + bullets[index] + '" class="' + className + '">';
      },
    },
  });
  var trustedSwiper = new Swiper(".trusted-swiper", {
    centeredSlides: false,
    loop: true,
    breakpoints: {
      330: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    }
  });
  var featuresSwiper = new Swiper(".features-swiper", {
    centeredSlides: false,
    loop: true,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      330: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      576: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 7,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 9,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 11,
        spaceBetween: 10,
      }
    },
    centeredSlides: false,
    loop: true,
    keyboard: {
      enabled: true,
    },
  });
  var indusstriesSwiper = new Swiper('.indusstries-swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 10
      }
    },
  });
  const firstSlide = $(".feature-slide").first();
  firstSlide.addClass("active");
  $(".feature-desc").text(firstSlide.data("desc"));
  $(".feature-img img").attr("src", firstSlide.data("img"));
  firstSlide.find(".feature-icon").addClass("active-icon");
  $(".feature-slide").on('click', function () {
    const imgSrc = $(this).data("img");
    const description = $(this).data("desc");
    $(".feature-icon").removeClass("active-icon");
    $(this).find(".feature-icon").addClass("active-icon");
    $(".feature-desc").text(description);
    $(".feature-img img").attr("src", imgSrc);
  });

  // popup
  $(".popup-link").magnificPopup({
    mainClass: "mfp-fade",
    type: 'iframe',
    iframe: {
      srcAction: 'iframe_src',
    }
  });

  $('.parent-container').magnificPopup({
    delegate: 'a',
    gallery: {
      enabled: true
    },
  });

  $('.benefit-img').magnificPopup({
  });


  $('.open-chats').magnificPopup({
    type: 'inline',
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  var chats = JSON.parse(localStorage.getItem("chats")) || { chat: [] };
  if (chats.chat.length > 0) {
    chats.chat.forEach(function (msg) {
      let messageHtml = "<div class='msg " + msg.Type + "'>" + msg.Content + "</div>";
      $(".data").append(messageHtml);
    });
  }
  $(".send, .receive").on('click', function () {
    var msg = $(".message").val().trim();
    if (msg !== "") {
      let msgType = $(this).hasClass("send") ? "send-msg" : "rec-msg";
      chats.chat.push({ Content: msg, Type: msgType });
      let messageHtml = "<div class='msg " + msgType + "'>" + msg + "</div>";
      $(".data").append(messageHtml);
      localStorage.setItem("chats", JSON.stringify(chats));
      $(".message").val("");
    }
  });

  $(".burger-menu").on('click', function () {
    const menu = $(".main-menu");
    const burger = $(this);

    if (!burger.hasClass("active")) {
      burger.addClass("active");
      menu.addClass("show-menu");
    } else {
      menu.addClass("hide-menu");
      burger.removeClass("active");
      menu.removeClass("show-menu");
      setTimeout(() => {
        menu.removeClass("show-menu hide-menu");
      }, 400);

    }
  });

});