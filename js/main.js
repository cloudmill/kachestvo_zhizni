var animate_open_close,
  success_popup,
  mail_right,
  base_time_animation = 300;

$(document).ready(function () {
  custom();
  additional_functions(300);
  forms();
  sliders();
});

var custom = function () {
  var help_blocks = function () {
    $(".help").click(function (e) {
      e.preventDefault();
      $(this)
        .find(".help_text")
        .toggleClass("open");
      if ($(this).find(".help_text").offset().left < 30) {
        $(this).find(".help_text").addClass('right_mode');
        console.log($(this).find(".help_text").offset().left + $(this).find(".help_text").width())
        if (
          $(window).width()
          - ($(this).find(".help_text").offset().left + $(this).find(".help_text").width())
          < 30) {
          $(this).find(".help_text").removeClass('right_mode').addClass('center_mode')
        }
      }
      if (!$(this).find(".help_text").hasClass('open')) {
        $(this).find(".help_text").removeClass("center_mode").removeClass("right_mode");
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
    $("[data-target]").click(function (e) {
      e.preventDefault();
      var target = $(this).data("target");
      if (!$("#" + target).hasClass("open")) {
        $(this).toggleClass("active");
        animate_open_close($("#" + target));
        if (target == "burger") {
          $("body").addClass("overflow");
        }
        if (target == "burger__tags") {
          $("body").addClass("overflow");
          $(".header").addClass("white_pole");
        }
        if (target == "sitebar") {
          $(".wrapper").addClass('sitebar_show')
          $("body").addClass("overflow");
        }
      } else if (target == 'header__tags') {
        $(this).toggleClass("active");
        animate_open_close($("#" + target));
      }
      if($("#" + target).hasClass("open")){
        if(!$('#burger,#burger_tags,#sitebar,.popup__wrapper').hasClass('active')){
          $("body").removeClass("overflow");
        }
        if (target == "burger__tags") {
          $("body").addClass("overflow");
          $(".header").removeClass("white_pole");
        }
        
      }
    });
    $("[data-close]").click(function (e) {
      e.preventDefault();
      var close = $(this).data("close");
      if ($("#" + close).hasClass("open")) {
        $("[data-target=" + close + "]").toggleClass("active");
        animate_open_close($("#" + close), true , function(){
          if(!$('#burger,#burger_tags,#sitebar,.popup__wrapper').hasClass('active')){
            $("body").removeClass("overflow");
          }
          if(!$('#burger_tags').hasClass('active')){
            $(".header").removeClass("white_pole");
          }
        });
        if (close == "sitebar") {
          $(".wrapper").removeClass('sitebar_show')
        }

      }
    });
    $(document).on("click", function (e) {
      if (
        !$("[data-target]:hover").length > 0 &&
        !$("[data-has_target]:hover").length > 0
      ) {
        animate_open_close($("[data-has_target]"), true);
        $("body").removeClass("overflow");
        $(".wrapper").removeClass('sitebar_show')
        $("[data-target]").removeClass("active");
        $(".header").removeClass("white_pole");
      }
    });
  };
  var show_more_in_menu = function () {
    var max_width = $("header").width();
    var menu = $("#header__bottom__menu");
    var first_init;
    var animate = false;

    hide_more_items = function () {
      max_width = $("header").width();
      for (i = 0; i < menu.length; i++) {
        var width = 36;
        var _item;
        var count = 0;
        var padding = 7;
        menu
          .eq(i)
          .find("li")
          .each(function () {
            if (width <= max_width) {
              width +=
                parseFloat(this.offsetWidth + 1) +
                parseFloat(
                  window.getComputedStyle(this).marginRight.replace("px", "")
                );
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
              }
              count++;
            }
            _item = this;
          });
        menu
          .eq(i)
          .find("[data-hide]")
          .hide();
        if (count > 0) {
          menu
            .eq(i)
            .append(
              '<li class="header__bottom__menu__more"><a class="header__bottom__menu__more__link" href="#" >...</a></li>'
            );
        }
      }
    };
    var start = function () {
      var go = function () {
        clearInterval(first_init);
        $("#header__bottom__menu")
          .find("#monitor_load_complete")
          .remove();

        hide_more_items();
        $("#header__bottom__menu").css("opacity", 1);
        $("#header__bottom__menu").css("max-height", "none");
      };
      $("#header__bottom__menu").append(
        '<li id="monitor_load_complete" class="header__bottom__menu__item health"> <a class="header__bottom__menu__item__link" href="#"> Физическое здоровье</a> </li>'
      );

      first_init = setInterval(function () {
        console.log(
          parseInt(
            $("#header__bottom__menu")
              .find("#monitor_load_complete")
              .width()
          )
        );
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

    $(document).on("click", ".header__bottom__menu__more", function () {
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
      setTimeout(function () {
        $('.wrapper_main').css('margin-top', parseInt($('.header__bottom__menu').height()) - 58 + "px")
      }, 50)

    });
    $(document).on("click", function (e) {
      if (!$("#header__bottom__menu:hover").length > 0) {
        hide_more_items();
        $('.wrapper_main').css('margin-top', '0px')
      }
    });
    $(document).on("scroll", function (e) {
      if (!$("#header__bottom__menu:hover").length > 0) {
        hide_more_items();
        $('.wrapper_main').css('margin-top', '0px')
      }
    });
  };
  var swipe_in_menu = function () {
    var menu = $("#header__bottom__menu");
    var width = 0;
    var start = function () {
      var go = function () {
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
            .each(function () {
              width +=
                parseFloat(this.offsetWidth + 1) +
                parseFloat(
                  window.getComputedStyle(this).marginRight.replace("px", "")
                );
            });
        }
        $(".header__bottom__menu").css("width", width);
      };
      $("#header__bottom__menu").append(
        '<li id="monitor_load_complete" class="header__bottom__menu__item health"> <a class="header__bottom__menu__item__link" href="#"> Физическое здоровье</a> </li>'
      );

      first_init = setInterval(function () {
        if (
          parseInt(
            $("#header__bottom__menu")
              .find("#monitor_load_complete")
              .width()
          ) == 158
        ) {
          go();
        }
      }, 1);
    };
    start();
    var start_move = function () {
      var startpos = undefined;
      var start_scroll = $(".header__bottom").scrollLeft();
      $(document).on("mousemove", function (e) {
        if (down) {
          if (startpos == undefined) {
            startpos = e.pageX;
          }
          step = startpos - e.pageX + start_scroll;
          $(".header__bottom").scrollLeft(step);
        }
      });
    };
    var time_fun;
    var down = false;
    var tolink = true;
    var setup = function () {
      $(document).on("mousedown", ".header__bottom__menu", function () {
        down = true;
        tolink = true;
        setTimeout(function () {
          tolink = false;
        }, 300);
        start_move();
      });
      $(document).on("click", ".header__bottom__menu a", function (e) {
        if (!tolink) {
          e.preventDefault();
        }
      });
      $(document).on("mouseup", function () {
        down = false;
      });
    };
    setup();
  };
  var show_more_comments = function () {
    $(document).on("click", ".comments__show-all", function (e) {
      e.preventDefault();
      $(".comments__list-wrapper").addClass("active");
      $(this).hide();
    });
  };
  var resize_textarea = function () {
    var start_height = 91,
      add_height = 0;
    $(document).on("keypress", ".comments_form_input", function (e) {
      if (e.which == 13) {
        e.preventDefault();
      }
    });
    $(document).on("keyup", ".comments_form_input", function (e) {
      if (e.which == 13) {
        $(this).val($(this).val() + "\n");
      }
      if (
        $(this)[0].scrollHeight > start_height + add_height &&
        $(this)[0].rows < 7
      ) {
        add_height = $(this)[0].scrollHeight - start_height;
        $(this)[0].rows++;
      }
    });
    for (var i = 0; i < $(".comments_form_input").length; i++) {
      check_text_area = setInterval(function () {
        if (
          $(".comments_form_input").eq(i).is(":active") ||
          $(".comments_form_input").eq(i).is(":focus") ||
          $(".comments_form_input").eq(i).val().length > 0
        ) {
          if ($(".comments_form_input").eq(i)[0].rows < 5) {
            $(".comments_form_input").eq(i)[0].rows = 5;
            start_height = 90;
          }
        } else {
          $(".comments_form_input").eq(i)[0].rows = 3;
          start_height = 91;
        }
      }, 50);
    }
  };
  var but_comment = function () {
    $(".comments_form_input").focus(function () {
      $(this).parent().parent().find('.inpt__wrapper + .comments_form_button').addClass('active')
    });

  }
  var burger__search_open = function () {
    $("#burger__search button").click(function (e) {
      if (!$("#burger__search").hasClass("active")) {
        e.preventDefault();
        $("#burger__search").toggleClass("active");
      }
    });
    $(document).on("click", function (e) {
      if (!$("#burger__search:hover").length > 0) {
        $("#burger__search").removeClass("active");
      }
    });
  };
  var header_hide_scroll = function () {
    $("header")
      .css("left", $("main").offset().left)
      .addClass("fade");
    $("header").css("width", $("main").width());
    $(window).on("resize", function () {
      $("header").css("left", $("main").offset().left);
      $("header").css("width", $("main").width());
    });
    var old_scroll = 0;
    $(document).on("scroll", function () {
      if (old_scroll > $(document).scrollTop()) {
        $("header").removeClass("hide");
        $("header").addClass("shadow");
        $("header").css('margin-top', 0)
      } else {
        if ($(document).scrollTop() <= 200) {
          $("header").css('transition', "top 0s")
          $("header").removeClass("shadow");
        }
        $("header").addClass("hide");
        $("header").css('margin-top', 200 - $(document).scrollTop() + "px")
        if ($(document).scrollTop() > 200) {
          $("header").css('transition', "top 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)")
          $("header").css('margin-top', 0)
          $("header").addClass("shadow");
        }
      }
      if ($(document).scrollTop() == 0) {
        $("header").removeClass("shadow");
      }
      old_scroll = $(document).scrollTop();
    });
  };
  var popup_open = function () {
    success_popup = function () {
      var way = 2;
      if (!$(".popup__wrapper").hasClass("active")) way = 1;
      setTimeout(function () {
        if (way == 1) {
          animate_open_close($(".popup__wrapper"));
          animate_open_close($("#success"));
        } else {
          animate_open_close($(".popup__item.active"), true, function () {
            animate_open_close($("#success"));
          });
        }
      }, 300);
    };
    $(".js-popup").click(function (e) {
      e.preventDefault();
      animate_open_close($(".popup__wrapper"));
      animate_open_close($("#" + $(".js-popup").attr("data-popup")));
    });
    $(".js-close").click(function (e) {
      e.preventDefault();
      animate_open_close($(".popup__wrapper"), true);
      animate_open_close($(".js-close").parent(), true);
    });
    $(document).on("click", function (e) {
      if (
        !$(".popup__item:hover").length > 0 &&
        !$(".js-popup:hover").length > 0
      ) {
        animate_open_close($(".popup__wrapper"), true);
        animate_open_close($(".popup__item"), true);
      }
    });
  };
  var calc_size = function () {
    setTimeout(function () {
      if ($(window).width() >= 1024) {
        $(".header__tags").width(parseInt($(".wrapper_main").width()) - 70);
        $(".header__tags").css("left", -$(".header").offset().left + 10);
      } else {
        $(".header__tags").attr("style", "");
      }
    }, 100);
    $(window).on("resize", function () {
      if ($(window).width() >= 1024) {
        $(".header__tags").width(parseInt($(".wrapper_main").width()) - 70);
        $(".header__tags").css("left", -$(".header").offset().left + 10);
      } else {
        $(".header__tags").attr("style", "");
      }
    });
  };
  var social_links_move = function () {
    var item = $(".article__social");
    var top__offset = $(".article__body").offset().top;
    $(document).on("scroll", function () {
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
  var copy_link = function () {
    var copied = false;
    var copy = function () {
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
    $(".article__social__item.copy").click(function (e) {
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
          setTimeout(function () {
            $(document)
              .find(".info_copied")
              .fadeOut(300);
            setTimeout(function () {
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
  header_hide_scroll();
  open_menu();
  help_blocks();
  show_more_comments();
  but_comment();
  if ($(".comments_form_input").length > 0) {
    //resize_textarea();
  }

  burger__search_open();

  if ($(window).width() > 950) {
    show_more_in_menu();
  } else {
    swipe_in_menu();
  }
};
var forms = function () {
  var submits = function () {
    $(document).on("submit", ".footer .footer__form", function (e) {
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
    $(document).on("submit", ".subscribe .subscribe__form", function (e) {
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
    $(document).on("submit", "#subscribe .popup__form", function (e) {
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
var sliders = function () {
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
var additional_functions = function (time_a) {
  animate_open_close = function (item, close, callback) {
    var time = time_a;
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

    if (callback) {
      setTimeout(function () {
        callback();
      }, time);
    }
  };
  mail_right = function (email) {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  };
};
