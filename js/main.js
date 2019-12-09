var animate_open_close,
  popup,
  mail_right,
  base_time_animation = 300;

$(document).ready(function () {
  ///инициализация всех функций
  custom();
  additional_functions(300);
  forms();
  sliders();
});

var custom = function () {
  var help_blocks = function () {
    //инициализация появления блока при клике на help-ссылку
    $(".help").click(function (e) {
      e.preventDefault();
      $(this)
        .find(".help_text")
        .toggleClass("open");
      if ($(this).find(".help_text").offset().left < 30) {
        $(this)
          .find(".help_text")
          .addClass("right_mode"); //сместить окно вправо
        if ($(window).width() - ($(this).find(".help_text").offset().left + $(this).find(".help_text").width()) < 30) {
          $(this)
            .find(".help_text")
            .removeClass("right_mode")
            .addClass("center_mode"); //сместить окно в центр
        }
      }
      if (!$(this).find(".help_text").hasClass("open")) {
        $(this)
          .find(".help_text")
          .removeClass("center_mode")
          .removeClass("right_mode");
      }
    });
    $(document).on("click", function (e) {
      if (!$(".help_text:hover").length > 0 && !$(".help:hover").length > 0) {
        $(this)
          .find(".help_text")
          .removeClass("open")
          .removeClass("center_mode")
          .removeClass("right_mode");
      }
    });
  };
  var open_menu = function () {
    ///Открытие и закрытие окон меню, сайтбара, тегов
    $("[data-target]").click(function (e) {
      e.preventDefault();
      let target = $(this).data("target");
      if (!$("#" + target).hasClass("open")) {
        ///Открытие окон
        $(this).toggleClass("active");
        animate_open_close($("#" + target));
        if (target == "burger") {
          $("body").addClass("overflow"); ///убираем скролл
          $(".burger .menu").show();
        }
        if (target == "burgerTags") {
          $("body").addClass("overflow"); ///убираем скролл
          $(".header").addClass("white_pole"); ///скрываем хедер
          $(".burger .menu").hide();
          $(".burger").scrollTop(0); ///скроллим вверх
        }
        if (target == "sitebar") {
          $(".wrapper").addClass("sitebar_show"); ///добавляем темный фон
          $("body").addClass("overflow");
        }
      } else {
        ///Закрытие окон
        $(".burger .menu").show();
        if (target == "burger") {
          $("[data-target=" + target + "]").toggleClass("active");
          animate_open_close($("#" + target), true, function () {
            if (!$(".burger,.burger .burTags,#sitebar,.popup").hasClass("active")) {
              $("body").removeClass("overflow");
            }
            if (!$(".burger .burTags").hasClass("active")) {
              $(".header").removeClass("white_pole");
            }
          });
        }
        if (!$(".burger,.burger .burTags,#sitebar,.popup").hasClass("active")) {
          $("body").removeClass("overflow");
        }
        if (target == "burgerTags") {
          $("body").addClass("overflow");
          $(".header").removeClass("white_pole");
        }
        if (target == "headerTags") {
          $(this).toggleClass("active");
          animate_open_close($("#" + target));
        }
      }
    });
    $("[data-close]").click(function (e) {
      e.preventDefault();
      let close = $(this).data("close");
      if (close == 'burger') return false;
      $(".burger .menu").show();
      if ($("#" + close).hasClass("open")) {
        $("[data-target=" + close + "]").toggleClass("active");
        animate_open_close($("#" + close), true, function () {
          if (!$(".burger,.burger .burTags,#sitebar,.popup").hasClass("active")) {
            $("body").removeClass("overflow");
          }
          if (!$(".burger .burTags").hasClass("active")) {
            $(".header").removeClass("white_pole");
          }
        });
        if (close == "sitebar") {
          $(".wrapper").removeClass("sitebar_show");
        }
      }
    });
    $(document).on("click", function (e) {
      if (!$("[data-target]:hover").length > 0 && !$("[data-has_target]:hover").length > 0) {
        animate_open_close($("[data-has_target]"), true);
        $(".burger .menu").show();
        $(".wrapper").removeClass("sitebar_show");
        $("[data-target]").removeClass("active");
        $(".header").removeClass("white_pole");

        if (!$(".popup_item:hover").length > 0 && !$(".popup_item:hover").length > 0 &&
          !$(".js-popup:hover").length > 0) {
          $("body").removeClass("overflow");
        }
      }
    });
  };
  var burger_search_open = function () {
    ///бургер меню открытие и заерытие
    $(".burger .burSearch_button").click(function (e) {
      if (!$(".burger .burSearch").hasClass("active")) {
        e.preventDefault();
        $(".burger .burSearch_input").focus();
        $(".burger .burSearch").toggleClass("active");
      }
    });
    $(document).on("click", function (e) {
      if (!$(".burger .burSearch:hover").length > 0) {
        $(".burger .burSearch").removeClass("active");
      }
    });
  };

  //логика комментариев
  var comments = {
    form_answer: "<form class='comments_form answer'>" +
      "<textarea type='text'class='inpt_basic comments_input'placeholder='Написать ответ'></textarea>" +
      "<button class='btn_basic comments_button'>Ответить</button>" +
      "<input type='hidden' name='comment_id' value='value_replace'/>" +
      "</form>",
    textArea: $(".comments_input"),
    list_wrapper: $(".comments_list"),
    list: $(".comments_list"),

    //форма ответа
    _answer: function () {
      var item = this;
      $(document).on('click', '.comments_answer', function (e) {
        e.preventDefault();
        item.list.find('.comments_form.answer').remove();
        let comment_for_answer = $(this).closest('.comments_itemBlock')
        let form = item.form_answer.replace('value_replace', 0 /* comment_for_answer.getAttribute('id') */);
        comment_for_answer.append(form);
      })
    },

    ///показ кнопки при первом фокусе поля коментария
    _firstFocusTextArea: function () {
      this.textArea.focus(function () {
        $(this)
          .parent()
          .parent()
          .find(".inpt_wrapper + .comments_button")
          .addClass("active");
      });
    },

    //раскрытие списка комментариев
    _showMore: function () {
      var item = this;
      $(document).on("click", ".comments_show-all", function (e) {
        e.preventDefault();
        item.list_wrapper.addClass("active");
        $(this).hide();
      });
      //// тут будет ajax подргузка комментариев
    },
    init: function () {
      this._firstFocusTextArea();
      this._showMore();
      this._answer();
    }
  }

  //Скрипты для хедера
  var headerMake = {
    header: $("header"),
    oldScroll: 0,
    deltaScroll: 8,

    //скрытие и логика раскрытия эллементов в header_bottom_menu
    _hideElementsBottomMenuLogic: function () {
      $('.header .rubrics_more').hide();
      if($(".header .rubrics").height()<$(".header .rubrics_list").height()){
        $('.header .rubrics_more').show();
      }
      $(document).on("click", ".header .rubrics_more", function (e) {
        e.preventDefault();
        $(".header .rubrics").addClass('active');
        $(".header .rubrics").height($(".header .rubrics_list").height())
      });

      //скрыть эллементы при клике вне блока
      $(document).on("click", function (e) {
        if (!$(".header .rubrics:hover").length > 0) {
          $(".header .rubrics").removeClass('active');
          $(".header .rubrics").height(48)
        }
      });

      //скрыть эллементы при скролле
      $(document).on("scroll", function (e) {
        if (!$(".header .rubrics:hover").length > 0) {
          $(".header .rubrics").removeClass('active');
          $(".header .rubrics").height(48)
        }
      });
    },
    _scrollOnMouseDown: {
      down: false, //если кнопка нажата
      tolink: true, //переходить по ссылке

      //инициализация PressOnMove
      _start_move: function () {
        let _this = this;
        let startpos = undefined;
        let start_scroll = $(".header .rubrics").scrollLeft();
        $(document).on("mousemove", function (e) {
          if (_this.down) {
            if (startpos == undefined) {
              startpos = e.pageX;
            }
            step = startpos - e.pageX + start_scroll;
            $(".header .rubrics").scrollLeft(step);
          }
        });
      },
      setup: function () {
        let _this = this;
        $(document).on("mousedown", ".header .rubrics_list", function () {
          _this.down = true;
          _this.tolink = true;
          setTimeout(function () {
            _this.tolink = false;
          }, 300);
          _this._start_move();
        });
        $(document).on("click", ".header .rubrics a", function (e) {
          if (!_this.tolink) {
            e.preventDefault();
          }
        });
        $(document).on("mouseup", function () {
          _this.down = false;
        });
      }
    },
    //реализация появления и скрывание хедера при скролле
    _headerMove: function (scrollTop) {
      if (this.deltaScroll < Math.abs(scrollTop - this.oldScroll)) {
        if (this.oldScroll < scrollTop) {
          if (scrollTop > this.header.height()) {
            this.header.addClass("hide");
          }
        } else {
          if (scrollTop > this.header.height()) {
            this.header.removeClass("hide");
            this.header.addClass("fixed");
            $(".wrapper_main").addClass("header_fixed");
          }
        }
        if (scrollTop == 0) {
          this.header.removeClass("fixed");
          $(".wrapper_main").removeClass("header_fixed");
        }
        this.oldScroll = scrollTop;
      }
      if (scrollTop == 0) {
        this.header.removeClass("fixed");
        $(".wrapper_main").removeClass("header_fixed");
      }
    },

    //фокус при клике кнопки поиска
    _search_but: function () {
      $(".header .search_button").click(function (e) {
        if (!$(".header .search_input:focus").length > 0 && !$(".header .search_input:hover").length > 0) {
          e.preventDefault();
          $(".header .search_input").focus();
        }
      });
    },
    _headerMove_init: function () {
      this._headerMove($(document).scrollTop());
      var item = this;
      $(document).on("scroll", function () {
        item._headerMove($(document).scrollTop());
      });
    },
    init: function () {
      this._headerMove_init();
      this._search_but();

      if ($(window).width() <= 950) {
        this._scrollOnMouseDown.setup();
      } else {
        this._hideElementsBottomMenuLogic();
      }
    }
  };

  ///обработка попапов
  popup = {
    wrapper: $(".popup"),
    popups: $(".popup_item"),
    triggers: {
      open: $(".js-popup"),
      close: $(".js-close"),
    },
    successWindow: $("#success"),

    //фунция создания сообщения success
    success: function () {
      var way = 2;
      var item = this;
      if (!this.wrapper.hasClass("active")) way = 1;
      setTimeout(function () {
        if (way == 1) {
          animate_open_close(item.wrapper);
          animate_open_close($("#success"));
        } else {
          animate_open_close($(".popup_item.active"), true, function () {
            animate_open_close(item.successWindow);
          });
        }
      }, 300);
    },
    init: function () {
      var item = this;
      this.triggers.open.click(function (e) {
        e.preventDefault();
        animate_open_close(item.wrapper);
        $("body").addClass("overflow");
        animate_open_close($("#" + $(this).attr("data-popup")));
      });
      this.triggers.close.click(function (e) {
        e.preventDefault();
        $("body").removeClass("overflow");
        animate_open_close(item.wrapper, true);
        animate_open_close($(this).parent(), true);
      });

      ///////клик не по попапу закрывает его
      $(document).on("click", function (e) {
        if (!$(".popup_item:hover").length > 0 && !$(".js-popup:hover").length > 0) {
          animate_open_close(item.wrapper, true);
          animate_open_close(item.popups, true);
        }
      });
    },

  }


  ///фикс. социальные иконки на странице статьи
  var social_links_move = function () {
    var item = $(".article .social");
    var top_offset = $(".article .body").offset().top;
    $(document).on("scroll", function () {
      if ($(window).width() >= 950) {
        if (top_offset < $(document).scrollTop() + 50 + ($(".header").hasClass("hide") ? 0 : $(".header").height())
          && top_offset + $(".article .body").height() > $(document).scrollTop() + 50 + ($(".header").hasClass("hide") ? 0 : $(".header").height()) + item.height()) {

          item.css("position", "fixed");
          item.css("top", "50px");

          item.css("left", $(".article .body").offset().left - 90);
          item.css(
            "margin-top",
            $(".header").hasClass("hide") ? 0 : $(".header").height()
          );
        } else if (top_offset + $(".article .body").height() <= $(document).scrollTop() + 50 + ($(".header").hasClass("hide") ? 0 : $(".header").height()) + item.height()) {

          item.attr("style", "");
          item.css("top", "calc(100% - " + item.height() + "px)");
        } else {
          item.attr("style", "");
        }
      }
    });
  };

  ///кнопка копировать на странице статьи
  var copy_link = function () {
    var copied = false;
    var ta = document.getElementById("copy_target");
    var range = document.createRange();
    var copy = function () {
      ta = document.getElementById("copy_target");
      if (document.selection && document.selection.empty) {
        document.selection.empty();
      } else if (window.getSelection) {
        let sel = window.getSelection();
        sel.removeAllRanges();
      }
      range.selectNode(ta);
      window.getSelection().addRange(range);
      try {
        document.execCommand("copy");
        $(document).find("#copy_target").remove();
        return true;
      } catch (err) {
        return false;
      }
    };
    $(".social_item.copy").click(function (e) {
      e.preventDefault();
      if (!copied) {
        $(this).append(
          '<div  style="left: -1000%;position: fixed" id="copy_target">' + document.location + '</div>'
        );
        if (copy()) {
          $(this).append(
            '<div class="info_copied"><img src="images/check_f.svg" /> <span>Ссылка скопирована</span></div>'
          );
          setTimeout(function () {
            $(document).find(".info_copied").fadeOut(300);
            setTimeout(function () {
              $(document).find(".info_copied").remove();
              copied = false;
            });
          }, 3000);
          copied = true;
        }
      }
    });
  };

  var scrollIphoneBurger = function(){
    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if(iOS){
      $('.burger .menu').css('padding-bottom','130px');
      $('.burger .bottom').css('bottom','85px')
    }
    
  }
  copy_link();
  if ($(".article .social").length > 0) social_links_move();
  open_menu();
  help_blocks();
  burger_search_open();
  scrollIphoneBurger();

  //////способ отображение категорий в меню

  comments.init();
  headerMake.init();
  popup.init();
};
///////обработка форм начало
var forms = function () {
  var submits = function () {
    $(document).on("submit", '[data-form]', function (e) {
      e.preventDefault();
      let mail = $(this).find('[name="mail"]').val() ? $(this).find('[name="mail"]'): false;
      let q = $(this).find('[name="q"]').val() ? $(this).find('[name="q"]') : false;
      if (q && validate([q], $(this))) {
        $(this)
          .find("*")
          .val("");
          ///поиск
      }
      if (mail && validate([mail], $(this))) {
        $(this)
          .find("*")
          .val("");
        popup.success()
      }
    });
  };
  var validate = function (fields, form) {
    var error = 0;
    form.find("*").removeClass("error");
    form.find(".error_text").remove();
    /////////////
    fields.forEach(function (item) {
      if (item.attr('name') == "mail") {
        if (item.val() == "" || !mail_right(item.val())) {
          error++;
          item.addClass("error");
          let text_error = "Неверный Email";
          let badWord = false;
          if (item.val() == "") text_error = "Введите Email";
          if (badWord) text_error = "Мы тоже за простоту выражений, но без крайностей. Перефразируйте, пожалуйста.";

          item[0].outerHTML +=
            "<span class='error_text'>" + text_error + "</span>";
        }
      }
      if(item.attr('name') == "q"){
        if (item.val() == "") {
          error++;
          item.addClass("error");
        }
      }
    })
    return error == 0;
  }
  submits();
};
///////обработка форм конец

//////Инициализация слайдера
var sliders = function () {
  if ($(".lenta_body.tablet_slider").length > 0) {
    for (let l = 0; l < $(".lenta_body.tablet_slider").length; l++) {
      $(".lenta_body.tablet_slider").eq(l).slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 600,
        infinite: false,
        dots: false,
        arrows: false,
        responsive: [{
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
  }
};

//////Обьявление фунций для анимации и проверки почты начало
var additional_functions = function (time_a) {
  animate_open_close = function (item, close, callback) {
    let time = time_a; //время анимации
    //----------------------
    if (close || item.hasClass("active")) {
      item.removeClass("open");
      setTimeout(function () {
        item.removeClass("active");
      }, time);
    } else {
      item.addClass("active");
      setTimeout(function () {
        item.addClass("open");
      }, 0);
    }
    //----------------------
    if (callback) {
      setTimeout(function () {
        callback();
      }, time);
    }
  };
  mail_right = function (email) {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  };
};
//////Обьявление фунций для анимации и проверки почты конец