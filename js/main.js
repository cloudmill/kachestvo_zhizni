var animate_open_close,
  success_popup,
  mail_right,
  base_time_animation = 300;

$(document).ready(function() {
  ///инициализация всех функций
  custom();
  additional_functions(300);
  forms();
  sliders();
});

var custom = function() {
  var help_blocks = function() {
    //инициализация появления блока при клике на help-ссылку
    $(".help").click(function(e) {
      e.preventDefault();
      $(this)
        .find(".help_text")
        .toggleClass("open");
      if (
        $(this)
          .find(".help_text")
          .offset().left < 30
      ) {
        $(this)
          .find(".help_text")
          .addClass("right_mode"); //сместить окно вправо
        if (
          $(window).width() -
            ($(this)
              .find(".help_text")
              .offset().left +
              $(this)
                .find(".help_text")
                .width()) <
          30
        ) {
          $(this)
            .find(".help_text")
            .removeClass("right_mode")
            .addClass("center_mode"); //сместить окно в центр
        }
      }
      if (
        !$(this)
          .find(".help_text")
          .hasClass("open")
      ) {
        $(this)
          .find(".help_text")
          .removeClass("center_mode")
          .removeClass("right_mode");
      }
    });
    $(document).on("click", function(e) {
      if (!$(".help_text:hover").length > 0 && !$(".help:hover").length > 0) {
        $(this)
          .find(".help_text")
          .removeClass("open")
          .removeClass("center_mode")
          .removeClass("right_mode");
      }
    });
  };
  var open_menu = function() {
    ///Открытие и закрытие окон меню, сайтбара, тегов
    $("[data-target]").click(function(e) {
      e.preventDefault();
      var target = $(this).data("target");
      if (!$("#" + target).hasClass("open")) {
        ///Открытие окон
        $(this).toggleClass("active");
        animate_open_close($("#" + target));
        if (target == "burger") {
          $("body").addClass("overflow"); ///убираем скролл
        }
        if (target == "burger__tags") {
          $("body").addClass("overflow"); ///убираем скролл
          $(".header").addClass("white_pole"); ///скрываем хедер
          $(".burger__wrapper").scrollTop(0); ///скроллим вверх
        }
        if (target == "sitebar") {
          $(".wrapper").addClass("sitebar_show"); ///добавляем темный фон
          $("body").addClass("overflow");
        }
      } else if (target == "header__tags") {
        $(this).toggleClass("active");
        animate_open_close($("#" + target));
      }
      if ($("#" + target).hasClass("open")) {
        ///Закрытие окон
        if (
          !$("#burger,#burger_tags,#sitebar,.popup__wrapper").hasClass("active")
        ) {
          $("body").removeClass("overflow");
        }
        if (target == "burger__tags") {
          $("body").addClass("overflow");
          $(".header").removeClass("white_pole");
        }
      }
    });
    $("[data-close]").click(function(e) {
      e.preventDefault();
      var close = $(this).data("close");
      if ($("#" + close).hasClass("open")) {
        $("[data-target=" + close + "]").toggleClass("active");
        animate_open_close($("#" + close), true, function() {
          if (
            !$("#burger,#burger_tags,#sitebar,.popup__wrapper").hasClass(
              "active"
            )
          ) {
            $("body").removeClass("overflow");
          }
          if (!$("#burger_tags").hasClass("active")) {
            $(".header").removeClass("white_pole");
          }
        });
        if (close == "sitebar") {
          $(".wrapper").removeClass("sitebar_show");
        }
      }
    });
    $(document).on("click", function(e) {
      if (
        !$("[data-target]:hover").length > 0 &&
        !$("[data-has_target]:hover").length > 0
      ) {
        animate_open_close($("[data-has_target]"), true);
        $("body").removeClass("overflow");
        $(".wrapper").removeClass("sitebar_show");
        $("[data-target]").removeClass("active");
        $(".header").removeClass("white_pole");
      }
    });
  };
  var show_more_in_menu = function() {
    var max_width = $("header").width();
    var menu = $("#header__bottom__menu");
    var first_init;
    var animate = false;

    //скрываем все эллементы кроме первый строки
    hide_more_items = function() {
      max_width = $("header").width();
      for (i = 0; i < menu.length; i++) {
        var width = 36;
        var _item;
        var count = 0;
        var padding = 7;
        //считаем кто попадет в 1ю строку
        menu
          .eq(i)
          .find("li")
          .each(function() {
            if (width <= max_width) {
              width +=
                parseFloat(this.offsetWidth + 1) +
                parseFloat(
                  window.getComputedStyle(this).marginRight.replace("px", "")
                );
              //добавляем эллементы в строку пока они помещаются
            } else {
              this.setAttribute("data-hide", "y");
              if (
                !(
                  width -
                    parseFloat(
                      window
                        .getComputedStyle(_item)
                        .marginRight.replace("px", "")
                    ) <=
                  max_width
                )
              ) {
                _item.setAttribute("data-hide", "y");
                //добавляем метку на скрытие
              }
              count++;
            }
            _item = this;
          });

        // скрываем не поместившееся
        menu
          .eq(i)
          .find("[data-hide]")
          .hide();
        if (count > 0) {
          // добавляем кнопку раскрытия если есть скрытые
          menu
            .eq(i)
            .append(
              '<li class="header__bottom__menu__more"><a class="header__bottom__menu__more__link" href="#" >...</a></li>'
            );
        }
      }
    };

    //инизиализация
    var start = function() {
      var go = function() {
        //начало отбора для скрытия в меню
        clearInterval(first_init);
        $("#header__bottom__menu")
          .find("#monitor_load_complete")
          .remove();

        hide_more_items();
        $("#header__bottom__menu").css("opacity", 1);
        $("#header__bottom__menu").css("max-height", "none");
      };
      // добавляем эллемент триггера отрисовки
      $("#header__bottom__menu").append(
        '<li id="monitor_load_complete" class="header__bottom__menu__item health"> <a class="header__bottom__menu__item__link" href="#"> Физическое здоровье</a> </li>'
      );

      //триггер отрисовки
      first_init = setInterval(function() {
        if (
          parseInt(
            $("#header__bottom__menu")
              .find("#monitor_load_complete")
              .width()
          ) == 158 ||
          parseInt(
            $("#header__bottom__menu")
              .find("#monitor_load_complete")
              .width()
          ) == 159
        ) {
          go();
        }
      }, 1);
    };
    start();
    $(window).resize(start);

    // показать больше в меню, клик на кнопку больше
    $(document).on("click", ".header__bottom__menu__more", function() {
      var list = $(this)
        .parent()
        .find("li[data-hide]");
      for (j = 0; j < list.length; j++) {
        list
          .eq(j)
          .delay((base_time_animation / 6) * j)
          .fadeIn(base_time_animation);
      }
      $(this)
        .parent()
        .find(".header__bottom__menu__more")
        .remove();
      setTimeout(function() {
        $(".wrapper_main").css(
          "margin-top",
          parseInt($(".header__bottom__menu").height()) - 58 + "px"
        );
      }, 50);
    });

    //скрыть эллементы при клике вне блока
    $(document).on("click", function(e) {
      if (!$("#header__bottom__menu:hover").length > 0) {
        hide_more_items();
        $(".wrapper_main").css("margin-top", "0px");
      }
    });

    //скрыть эллементы при скролле
    $(document).on("scroll", function(e) {
      if (!$("#header__bottom__menu:hover").length > 0) {
        hide_more_items();
        $(".wrapper_main").css("margin-top", "0px");
      }
    });
  };
  var swipe_in_menu = function() {
    ////реализация свайпа меню на мобиках
    var menu = $("#header__bottom__menu");
    var width = 0;

    ////инициализация и расчет ширини блока с эллементами
    var start = function() {
      var go = function() {
        clearInterval(first_init);
        $("#header__bottom__menu")
          .find("#monitor_load_complete")
          .remove();
        for (i = 0; i < menu.length; i++) {
          var _item;
          var count = 0;
          var padding = 7;
          menu
            .eq(i)
            .find("li")
            .each(function() {
              width +=
                parseFloat(this.offsetWidth + 1) +
                parseFloat(
                  window.getComputedStyle(this).marginRight.replace("px", "")
                );
            });
        }
        $(".header__bottom__menu").css("width", width);
      };
      ///создаем эллемент для тригера отрисовки меню
      $("#header__bottom__menu").append(
        '<li id="monitor_load_complete" class="header__bottom__menu__item health"> <a class="header__bottom__menu__item__link" href="#"> Физическое здоровье</a> </li>'
      );

      ///триггер полной отрисовки эллментов меню
      first_init = setInterval(function() {
        if (
          parseInt(
            $("#header__bottom__menu")
              .find("#monitor_load_complete")
              .width()
          ) == 158
        ) {
          //высчитываем ширину и очищаем setinterval
          go();
        }
      }, 1);
    };
    start();

    //инициализация кастомного свайпа
    var start_move = function() {
      var startpos = undefined;
      var start_scroll = $(".header__bottom").scrollLeft();
      $(document).on("mousemove", function(e) {
        if (down) {
          if (startpos == undefined) {
            startpos = e.pageX;
          }
          step = startpos - e.pageX + start_scroll;
          $(".header__bottom").scrollLeft(step);
        }
      });
    };
    var down = false; //если кнопка нажата
    var tolink = true; //переходить по ссылке
    var setup = function() {
      $(document).on("mousedown", ".header__bottom__menu", function() {
        down = true;
        tolink = true;
        setTimeout(function() {
          tolink = false;
        }, 300);
        start_move();
      });
      $(document).on("click", ".header__bottom__menu a", function(e) {
        if (!tolink) {
          e.preventDefault();
        }
      });
      $(document).on("mouseup", function() {
        down = false;
      });
    };
    setup();
  };
  var show_more_comments = function() {
    $(document).on("click", ".comments__show-all", function(e) {
      e.preventDefault();
      $(".comments__list-wrapper").addClass("active");
      $(this).hide();
    });
    //// тут будет ajax подргузка комментариев
  };
  var but_comment = function() {
    ///показ кнопки при первом фокусе поля коментария
    $(".comments_form_input").focus(function() {
      $(this)
        .parent()
        .parent()
        .find(".inpt__wrapper + .comments_form_button")
        .addClass("active");
    });
  };
  var burger__search_open = function() {
    ///бургер меню открытие и заерытие
    $("#burger__search button").click(function(e) {
      if (!$("#burger__search").hasClass("active")) {
        e.preventDefault();
        $(".burger__search__input").focus();
        $("#burger__search").toggleClass("active");
      }
    });
    $(document).on("click", function(e) {
      if (!$("#burger__search:hover").length > 0) {
        $("#burger__search").removeClass("active");
      }
    });
  };


  //фикс хедер
  var headerHiding = {
    header: $("header"),
    oldScroll: 0,

    //расчет положения и размера хедера
    _currentPosSize: function() {
      this.header.css("left", $("main").offset().left);
      this.header.css("width", $("main").width());
      this.header.addClass("fade");
    },

    //реализация появления и скрывание хедера при скролле
    _headerMove: function(scrollTop) {
      if (this.old_scroll < scrollTop) {
        this.header.addClass("hide");
        if (scrollTop <= 200) {
        } else {
          this.header.removeClass("shadow");
          this.header.removeClass("fixed");
          $(".wrapper_main").removeClass("header__fixed");
        }
      } else {
        if (scrollTop > 200) {
          this.header.removeClass("hide");
          this.header.addClass("shadow");
          this.header.addClass("fixed");
          $(".wrapper_main").addClass("header__fixed");
        } else {
        }
      }
      if (scrollTop == 0) {
        this.header.removeClass("shadow");
        this.header.removeClass("fixed");
        $(".wrapper_main").removeClass("header__fixed");
      }
      this.old_scroll = scrollTop;
    },
    currentPosSize: function() {
      this._currentPosSize();
      var item = this;
      $(window).on("resize", function() {
        item._currentPosSize();
      });
    },
    headerMove: function() {
      this._headerMove($(document).scrollTop());
      var item = this;
      $(document).on("scroll", function() {
        item._headerMove($(document).scrollTop());
      });
    }
  };

  ///обработка попапов
  var popup_open = function() {
    //фунция создания сообщения success
    success_popup = function() {
      var way = 2;
      if (!$(".popup__wrapper").hasClass("active")) way = 1;
      setTimeout(function() {
        if (way == 1) {
          animate_open_close($(".popup__wrapper"));
          animate_open_close($("#success"));
        } else {
          animate_open_close($(".popup__item.active"), true, function() {
            animate_open_close($("#success"));
          });
        }
      }, 300);
    };
    //////

    $(".js-popup").click(function(e) {
      e.preventDefault();
      animate_open_close($(".popup__wrapper"));
      animate_open_close($("#" + $(".js-popup").attr("data-popup")));
    });
    $(".js-close").click(function(e) {
      e.preventDefault();
      animate_open_close($(".popup__wrapper"), true);
      animate_open_close($(".js-close").parent(), true);
    });

    ///////клик не по попапу закрывает его
    $(document).on("click", function(e) {
      if (
        !$(".popup__item:hover").length > 0 &&
        !$(".js-popup:hover").length > 0
      ) {
        animate_open_close($(".popup__wrapper"), true);
        animate_open_close($(".popup__item"), true);
      }
    });
  };

  //расчет размера и положения окна с тегами
  var calc_size = function() {
    setTimeout(function() {
      if ($(window).width() >= 1024) {
        $(".header__tags").width(parseInt($(".wrapper_main").width()) - 70);
        $(".header__tags").css("left", -$(".header").offset().left + 10);
      } else {
        $(".header__tags").attr("style", "");
      }
    }, 100);
    $(window).on("resize", function() {
      if ($(window).width() >= 1024) {
        $(".header__tags").width(parseInt($(".wrapper_main").width()) - 70);
        $(".header__tags").css("left", -$(".header").offset().left + 10);
      } else {
        $(".header__tags").attr("style", "");
      }
    });
  };

  ///фикс. социальные иконки на странице статьи
  var social_links_move = function() {
    var item = $(".article__social");
    var top__offset = $(".article__body").offset().top;
    $(document).on("scroll", function() {
      if ($(window).width() >= 950) {
        if (
          top__offset <
            $(document).scrollTop() +
              50 +
              ($(".header").hasClass("hide") ? 0 : $(".header").height()) &&
          top__offset + $(".article__body").height() >
            $(document).scrollTop() +
              50 +
              ($(".header").hasClass("hide") ? 0 : $(".header").height()) +
              item.height()
        ) {
          item.css("position", "fixed");
          item.css("top", "50px");

          item.css("left", $(".article__body").offset().left - 90);
          item.css(
            "margin-top",
            $(".header").hasClass("hide") ? 0 : $(".header").height()
          );
        } else if (
          top__offset + $(".article__body").height() <=
          $(document).scrollTop() +
            50 +
            ($(".header").hasClass("hide") ? 0 : $(".header").height()) +
            item.height()
        ) {
          item.attr("style", "");
          item.css("top", "calc(100% - " + item.height() + "px)");
        } else {
          item.attr("style", "");
        }
      }
    });
  };

  ///кнопка копировать на странице статьи
  var copy_link = function() {
    var copied = false;
    var copy = function() {
      var ta = document.getElementById("copy_target");
      var range = document.createRange();
      range.selectNode(ta);
      window.getSelection().addRange(range);

      try {
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        $(document)
          .find("#copy_target")
          .remove();
        return true;
      } catch (err) {
        return false;
      }
    };
    $(".article__social__item.copy").click(function(e) {
      e.preventDefault();

      if (!copied) {
        $(this).append(
          '<span style="display:none;position: fixed" id="copy_target">' +
            document.location +
            "</span>"
        );
        if (copy()) {
          $(this).append(
            '<div class="info_copied"><img src="images/check_f.svg" /> <span>Ссылка скопирована</span></div>'
          );
          setTimeout(function() {
            $(document)
              .find(".info_copied")
              .fadeOut(300);
            setTimeout(function() {
              $(document)
                .find(".info_copied")
                .remove();
              copied = false;
            });
          }, 3000);
          copied = true;
        }
      }
    });
  };
  copy_link();
  popup_open();
  if ($(".article__social").length > 0) social_links_move();
  calc_size();
  open_menu();
  help_blocks();
  show_more_comments();
  but_comment();
  burger__search_open();

  //////способ отображение категорий в меню
  if ($(window).width() > 950) {
    show_more_in_menu();
  } else {
    swipe_in_menu();
  }

  headerHiding.currentPosSize();
  headerHiding.headerMove();
};
///////обработка форм начало
var forms = function() {
  var submits = function() {
    $(document).on("submit", ".footer .footer__form", function(e) {
      e.preventDefault();
      var error = 0;
      var mail = $(this).find('[name="mail"]');
      $(this)
        .find("*")
        .removeClass("error");
      $(this)
        .find(".error__text")
        .remove();
      if (mail.val() == "" || !mail_right(mail.val())) {
        error++;
        mail.addClass("error");
        var text__error = "Неверный Email";
        if (mail.val() == "") text__error = "Введите Email";

        mail[0].outerHTML +=
          "<span class='error__text'>" + text__error + "</span>";
      }
      if (error == 0) {
        $(this)
          .find("*")
          .val("");
        success_popup();
      }
    });
    $(document).on("submit", ".subscribe .subscribe__form", function(e) {
      e.preventDefault();
      var error = 0;
      var mail = $(this).find('[name="mail"]');
      $(this)
        .find("*")
        .removeClass("error");
      $(this)
        .find(".error__text")
        .remove();
      if (mail.val() == "" || !mail_right(mail.val())) {
        error++;
        mail.addClass("error");
        var text__error = "Неверный Email";
        if (mail.val() == "") text__error = "Введите Email";

        mail[0].outerHTML +=
          "<span class='error__text'>" + text__error + "</span>";
      }
      if (error == 0) {
        $(this)
          .find("*")
          .val("");
        success_popup();
      }
    });
    $(document).on("submit", "#subscribe .popup__form", function(e) {
      e.preventDefault();
      var error = 0;
      var mail = $(this).find('[name="mail"]');
      $(this)
        .find("*")
        .removeClass("error");
      $(this)
        .find(".error__text")
        .remove();
      if (mail.val() == "" || !mail_right(mail.val())) {
        error++;
        mail.addClass("error");
        var text__error = "Неверный Email";
        if (mail.val() == "") text__error = "Введите Email";

        mail[0].outerHTML +=
          "<span class='error__text'>" + text__error + "</span>";
      }
      if (error == 0) {
        $(this)
          .find("*")
          .val("");
        success_popup();
      }
    });
  };
  submits();
};
///////обработка форм конец

//////Инициализация слайдера начало
var sliders = function() {
  if ($(".lenta_body.tablet_slider").length > 0) {
    $(".lenta_body.tablet_slider").slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      speed: 1000,
      infinite: false,
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 950,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }
};
//////Инициализация слайдера конец

//////Обьявление фунций для анимации и проверки почты начало
var additional_functions = function(time_a) {
  animate_open_close = function(item, close, callback) {
    var time = time_a; //время анимации
    //----------------------
    if (close || item.hasClass("active")) {
      item.removeClass("open");
      setTimeout(function() {
        item.removeClass("active");
      }, time);
    } else {
      item.addClass("active");
      setTimeout(function() {
        item.addClass("open");
      }, 0);
    }
    //----------------------
    if (callback) {
      setTimeout(function() {
        callback();
      }, time);
    }
  };
  mail_right = function(email) {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  };
};
//////Обьявление фунций для анимации и проверки почты конец
