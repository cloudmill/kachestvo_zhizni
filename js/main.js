var animate_open_close,
  success_popup,
  mail_right,
  base_time_animation = 300;

$(document).ready(function () {
  additional_functions(base_time_animation);
  custom();
  forms();
  sliders();
})

var custom = function () {
  var help_blocks = function () {
    $('.help').click(function (e) {
      e.preventDefault();
      $(this).find('.help_text').toggleClass('open');
    })
    $(document).on('click', function (e) {
      if (!$('.help_text:hover').length > 0 &&
        !$('.help:hover').length > 0) {
        $(this).find('.help_text').removeClass('open')
      }
    })
  }
  var open_menu = function () {
    $('[data-target]').click(function (e) {
      e.preventDefault();
      var target = $(this).data('target');
      if (!$('#' + target).hasClass('open')) {
        $(this).toggleClass('active')
        animate_open_close($('#' + target))
        if (target == 'burger') {
          $('body').addClass('overflow')
        }
      }
    })
    $('[data-close]').click(function (e) {
      e.preventDefault();
      var close = $(this).data('close');
      if ($('#' + close).hasClass('open')) {
        $('[data-target=' + close + ']').toggleClass('active')
        if (close == 'burger') {
          $('body').removeClass('overflow')
        }
        animate_open_close($('#' + close), true)
      }
    })
    $(document).on('click', function (e) {
      if (!$('[data-target]:hover').length > 0 &&
        !$('[data-has_target]:hover').length > 0) {
        animate_open_close($('[data-has_target]'), true)
        $('body').removeClass('overflow')
        $('[data-target]').removeClass('active')
      }
    })
  }
  var show_more_in_menu = function () {
    var max_width = $('header').width();
    var menu = $('#header__bottom__menu');
    var first_init;
    var animate = false;

    hide_more_items = function () {
      max_width = $('header').width();
      for (i = 0; i < menu.length; i++) {
        var width = 36;
        var _item;
        var count = 0;
        var padding = 7;
        menu.eq(i).find('li').each(function () {
          if (width <= max_width) {
            width += parseFloat(this.offsetWidth + 1) + parseFloat(window.getComputedStyle(this).marginRight.replace('px', ''));
          } else {
            this.setAttribute('data-hide', 'y');
            if (!(width - parseFloat(window.getComputedStyle(_item).marginRight.replace('px', '')) <= max_width)) {
              _item.setAttribute('data-hide', 'y');
            }
            count++;
          }
          _item = this;
        })
        menu.eq(i).find('[data-hide]').hide();
        if (count > 0) {
          menu.eq(i).append('<li class="header__bottom__menu__more"><a class="header__bottom__menu__more__link" href="#" >...</a></li>')
        }
      }
    }
    var start = function () {
      var go = function () {
        clearInterval(first_init)
        $('#header__bottom__menu').find('#monitor_load_complete').remove()

        hide_more_items()
        $('#header__bottom__menu').css('opacity', 1)
        $('#header__bottom__menu').css('max-height', 'none')
      }
      $('#header__bottom__menu').append('<li id="monitor_load_complete" class="header__bottom__menu__item health"> <a class="header__bottom__menu__item__link" href="#"> Физическое здоровье</a> </li>')

      first_init = setInterval(function () {
        if (parseInt($('#header__bottom__menu').find('#monitor_load_complete').width()) == 158 ||
          parseInt($('#header__bottom__menu').find('#monitor_load_complete').width()) == 159) {
          go()
        }
      }, 1);
    }
    start();

    $(document).on('click', '.header__bottom__menu__more', function () {
      var list = $(this).parent().find('li[data-hide]')
      for (j = 0; j < list.length; j++) {
        list.eq(j).delay(base_time_animation / 6 * j).fadeIn(base_time_animation)
      }
      $(this).parent().find('.header__bottom__menu__more').remove()
      //$('.wrapper_main').css('margin-top','58px')
    })
    $(document).on('click', function (e) {
      if (!$('#header__bottom__menu:hover').length > 0) {
        hide_more_items()
        // $('.wrapper_main').css('margin-top','0px')
      }
    })
  }
  var swipe_in_menu = function () {
    var menu = $('#header__bottom__menu');
    var width = 0;
    var start = function () {
      var go = function () {
        clearInterval(first_init)
        $('#header__bottom__menu').find('#monitor_load_complete').remove()
        for (i = 0; i < menu.length; i++) {
          var _item;
          var count = 0;
          var padding = 7;
          menu.eq(i).find('li').each(function () {
            width += parseFloat(this.offsetWidth + 1) + parseFloat(window.getComputedStyle(this).marginRight.replace('px', ''));
          })
        }
        $('.header__bottom__menu').css('width', width)

      }
      $('#header__bottom__menu').append('<li id="monitor_load_complete" class="header__bottom__menu__item health"> <a class="header__bottom__menu__item__link" href="#"> Физическое здоровье</a> </li>')

      first_init = setInterval(function () {
        if (parseInt($('#header__bottom__menu').find('#monitor_load_complete').width()) == 158) {
          go()
        }
      }, 1);
    }
    start();
    var start_move = function () {
      var startpos = undefined
      var start_scroll = $('.header__bottom').scrollLeft()
      $(document).on('mousemove', function (e) {
        if (down) {
          if (startpos == undefined) {
            startpos = e.pageX
          }
          step = startpos - e.pageX + start_scroll
          $('.header__bottom').scrollLeft(step);
        }
      })
    }
    var time_fun;
    var down = false;
    var tolink = true;
    var setup = function () {
      $(document).on('mousedown', '.header__bottom__menu', function () {
        down = true
        tolink = true;
        setTimeout(function () {
          tolink = false;
        }, 300)
        start_move();
      })
      $(document).on('click', '.header__bottom__menu a', function (e) {
        if (!tolink) {
          e.preventDefault()
        }
      })
      $(document).on('mouseup', function () {
        down = false;
      })
    }
    setup();
  }
  var show_more_comments = function () {
    $(document).on('click', '.comments__show-all', function (e) {
      e.preventDefault();
      $('.comments__list-wrapper').addClass('active')
      $(this).hide()
    })
  }
  var resize_textarea = function () {
    var start_height = 91,
      add_height = 0;
    $(document).on('keypress', '.comments_form_input', function (e) {
      if (e.which == 13) {
        e.preventDefault();
      }
    })
    $(document).on('keyup', '.comments_form_input', function (e) {
      if (e.which == 13) {
        $(this).val($(this).val() + '\n')

      }
      if ($(this)[0].scrollHeight > start_height + add_height &&
        $(this)[0].rows < 7) {
        add_height = $(this)[0].scrollHeight - start_height;
        $(this)[0].rows++;
      }
    })
    check_text_area = setInterval(function () {
      if ($('.comments_form_input').is(':active') || $('.comments_form_input').is(':focus') || $('.comments_form_input').val().length > 0) {
        if ($('.comments_form_input')[0].rows < 5) {
          $('.comments_form_input')[0].rows = 5;
          start_height = 130;
        }
      } else {
        $('.comments_form_input')[0].rows = 3
        start_height = 91;
      }
    }, 50)
  }
  var burger__search_open = function () {
    $('#burger__search button').click(function (e) {

      if (!$('#burger__search').hasClass('active')) {
        e.preventDefault();
        $('#burger__search').toggleClass('active')
      }

    })
    $(document).on('click', function (e) {
      if (!$('#burger__search:hover').length > 0) {
        $('#burger__search').removeClass('active')
      }
    })
  }
  //minimized small list-items for mobile and tablet
  var optimized = false,
    opimized_position = function () {
      var lenght_list = 5
      var lists = $(document).find('.lenta_body');

      if ($(window).width() < 1024 && $(window).width() > 768 && !optimized) {
        var find_target = function (blocks, last_item_id) {
          var targets = blocks.find('.lenta_body_s-item');
          var finded = false;
          for (t = last_item_id + 1; t < targets.length; t++) {
            if (t > last_item_id) {
              targets.eq(t).attr('data-old-pos', targets.eq(t).parent().data('parent-pos'))
              var html_ = targets.eq(t)['0'].outerHTML;
              targets.eq(t).remove();
              finded = true;
              return html_;
            }
          }
          if (!finded)
            return false;
        }
        var optmz = function (num_free_place, block_id, blocks, last_item_id) {
          while (num_free_place > 0) {
            var find_id = find_target(blocks, last_item_id)
            if (last_item_id == blocks.find('.lenta_body_s-item').length)
              find_id = false;

            if (find_id) {
              blocks.eq(block_id).append(find_id);
              last_item_id++
              num_free_place--;
            } else return 'end';
          }
        }
        for (l = 0; l < lists.length; l++) {
          var it = lists.eq(l);
          if (it.find('.lenta_body_s-item_wrapper').length > 1) {
            var r = 0;
            it.find('.lenta_body_s-item_wrapper').each(function () {
              this.setAttribute('data-optimized', 'n')
              this.setAttribute('data-parent-pos', r)
              r++;
            })
            var blocks = it.find('.lenta_body_s-item_wrapper[data-optimized="n"]');

            var inf_block = [];
            var last_item_on_place_id = undefined;
            for (b = 0; b < blocks.length; b++) {
              var block = blocks.eq(b);
              inf_block.push(block.find('.lenta_body_s-item').length);
              if (block.find('.lenta_body_s-item').length < lenght_list && last_item_on_place_id == undefined) {
                last_item_on_place_id = block.find('.lenta_body_s-item').length - 1 + b * lenght_list;
              }
            }
            for (b = 0; b < blocks.length; b++) {
              var block = blocks.eq(b);
              if (inf_block[b] < lenght_list && block.find('.lenta_body_s-item').length > 0) {
                if (optmz(lenght_list - inf_block[b], b, blocks, last_item_on_place_id)) {
                  inf_block[b]++
                  last_item_on_place_id++
                }
                block.attr('data-optimized', 'y')
              }

            }
            for (b = 0; b < blocks.length; b++) {
              var block = blocks.eq(b);
              if (block.find('.lenta_body_s-item').length == 0) {
                block.hide();
              }
            }

          }
        }
        optimized = true;
      }

      if (($(window).width() >= 1024 || $(window).width() <= 768) && optimized) {
        for (l = 0; l < lists.length; l++) {
          var list = lists.eq(l);
          if (list.find('[data-old-pos]').length > 0) {
            var blocks = list.find('[data-parent-pos]');
            var j = 0;
            list.find('[data-old-pos]').each(function () {
              j++;
              var html_ = this.outerHTML.replace('data-old-pos', 'data-save')
              blocks.eq(this.getAttribute('data-old-pos')).append(html_)
            })
            list.find('[data-old-pos]').each(function () {
              $(this).remove()
              blocks.show();
            })
          }
        }
        optimized = false;
      }
    };
  var header_hide_scroll = function () {
    $('header').css('left', $('main').offset().left).addClass('fade')
    $('header').css('width', $('main').width())
    $(window).on('resize', function () {
      $('header').css('left', $('main').offset().left)
      $('header').css('width', $('main').width())
    })
    var old_scroll = 0;
    $(document).on('scroll', function () {
      if ($(document).scrollTop() > 200) {
        if (old_scroll > $(document).scrollTop()) {
          $('header').removeClass('hide')
        } else {
          $('header').addClass('hide')
        }
      }
      old_scroll = $(document).scrollTop();
    })
  }
  var popup_open = function () {
    success_popup = function () {
      var way = 2;
      if (!$('.popup__wrapper').hasClass('active'))
        way = 1
      setTimeout(function () {
        if (way == 1) {
          animate_open_close($('.popup__wrapper'))
          animate_open_close($('#success'))
        } else {
          animate_open_close($('.popup__item.active'), true, function () {
            animate_open_close($('#success'))
          })
        }
      }, 300)
    }
    $('.js-popup').click(function (e) {
      e.preventDefault();
      animate_open_close($('.popup__wrapper'))
      animate_open_close($('#' + $('.js-popup').attr('data-popup')))
    })
    $('.js-close').click(function (e) {
      e.preventDefault();
      animate_open_close($('.popup__wrapper'), true)
      animate_open_close($('.js-close').parent(), true)
    })
    $(document).on('click', function (e) {
      if (!$('.popup__item:hover').length > 0 && !$('.js-popup:hover').length > 0) {
        animate_open_close($('.popup__wrapper'), true)
        animate_open_close($('.popup__item'), true)
      }
    })
  }
  var calc_size = function () {
    setTimeout(function () {
      if ($(window).width() >= 1024) {
        $('.header__tags').width(parseInt($('.wrapper_main').width()) - 70);
        $('.header__tags').css('left', -$('.header').offset().left + 10)
      } else {
        $('.header__tags').attr('style', '')
      }
    }, 100)
    $(window).on('resize', function () {
      if ($(window).width() >= 1024) {
        $('.header__tags').width(parseInt($('.wrapper_main').width()) - 70);
        $('.header__tags').css('left', -$('.header').offset().left + 10)
      } else {
        $('.header__tags').attr('style', '')
      }

    })
  }
  var social_links_move = function () {
    var item = $('.article__social');
    var top__offset = $('.article__body').offset().top
    $(document).on('scroll', function () {
      if ($(window).width() >= 1024) {
        if (top__offset < $(document).scrollTop() + 50 + ($('.header').hasClass('hide') ? 0 : $('.header').height()) &&
          top__offset + $('.article__body').height() > $(document).scrollTop() + 50 + ($('.header').hasClass('hide') ? 0 : $('.header').height()) + item.height()) {
          item.css('position', 'fixed')
          item.css('top', '50px')
          item.css('left', 27);
          item.css('margin-top', ($('.header').hasClass('hide') ? 0 : $('.header').height()))
        } else if (top__offset + $('.article__body').height() <= $(document).scrollTop() + 50 + ($('.header').hasClass('hide') ? 0 : $('.header').height()) + item.height()) {
          item.attr('style', '');
          item.css('top', 'calc(100% - ' + item.height() + 'px)');

        } else {
          item.attr('style', '');
        }
      }
    })
  }
  var copy_link = function () {
    var copied = false;
    var copy = function () {
      var ta = document.getElementById('copy_target');
      var range = document.createRange();
      range.selectNode(ta);
      window.getSelection().addRange(range);

      try {
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        $(document).find('#copy_target').remove()
        return true;
      } catch (err) {
        return false;
      }

    }
    $('.article__social__item.copy').click(function (e) {
      e.preventDefault();

      if (!copied) {
        $(this).append('<span style="display:none;position: fixed" id="copy_target">' + document.location + '</span>')
        if (copy()) {
          $(this).append('<div class="info_copied"><img src="images/check_f.svg" /> <span>Ссылка скопирована</span></div>')
          setTimeout(function () {
            $(document).find('.info_copied').fadeOut(300);
            setTimeout(function () {
              $(document).find('.info_copied').remove();
              copied = false
            })
          }, 3000)
          copied = true;
        }

      }
    })
  }
  copy_link();
  popup_open();
  if ($('.article__social').length > 0)
    social_links_move();
  calc_size();
  header_hide_scroll();
  open_menu()
  help_blocks();
  show_more_comments();
  resize_textarea();
  burger__search_open();

  if ($(window).width() > 1024) {

    show_more_in_menu()
  } else {
    swipe_in_menu()
  }

  opimized_position();
  $(window).on('resize', function () {
    opimized_position();
  })
};
var forms = function () {
  var submits = function () {
    $(document).on('submit', '.footer .footer__form', function (e) {
      e.preventDefault();
      var error = 0
      var mail = $(this).find('[name="mail"]')
      $(this).find('*').removeClass("error");
      $(this).find('.error__text').remove();
      if (mail.val() == "" || !mail_right(mail.val())) {
        error++;
        mail.addClass("error");
        var text__error = 'Неверный Email';
        if (mail.val() == "")
          text__error = 'Введите Email';

        mail[0].outerHTML += "<span class='error__text'>" + text__error + "</span>"
      }
      if (error == 0) {
        $(this).find('*').val('')
        success_popup();
      }
    })
    $(document).on('submit', '.subscribe .subscribe__form', function (e) {
      e.preventDefault();
      var error = 0
      var mail = $(this).find('[name="mail"]')
      $(this).find('*').removeClass("error");
      $(this).find('.error__text').remove();
      if (mail.val() == "" || !mail_right(mail.val())) {
        error++;
        mail.addClass("error");
        var text__error = 'Неверный Email';
        if (mail.val() == "")
          text__error = 'Введите Email';

        mail[0].outerHTML += "<span class='error__text'>" + text__error + "</span>"
      }
      if (error == 0) {
        $(this).find('*').val('')
        success_popup();
      }
    })
    $(document).on('submit', '#subscribe .popup__form', function (e) {
      e.preventDefault();
      var error = 0
      var mail = $(this).find('[name="mail"]')
      $(this).find('*').removeClass("error");
      $(this).find('.error__text').remove();
      if (mail.val() == "" || !mail_right(mail.val())) {
        error++;
        mail.addClass("error");
        var text__error = 'Неверный Email';
        if (mail.val() == "")
          text__error = 'Введите Email';

        mail[0].outerHTML += "<span class='error__text'>" + text__error + "</span>"
      }
      if (error == 0) {
        $(this).find('*').val('')
        success_popup();
      }
    })
  }
  submits();
}
var sliders = function () {
  if ($('.lenta_body.tablet_slider').length > 0) {
    $('.lenta_body.tablet_slider').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      speed: 1000,
      infinite: false,
      dots: false,
      arrows: false,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        }
      },
      ]
    })
  }

}
var additional_functions = function (time_a) {
  animate_open_close = function (item, close, callback) {
    var time = time_a;
    if (close || item.hasClass('active')) {
      item.removeClass('open')
      setTimeout(function () {
        item.removeClass('active')
      }, time);
    } else {
      item.addClass('active')
      setTimeout(function () {
        item.addClass('open')
      }, 0);
    }


    if (callback) {
      setTimeout(function () {
        callback();
      }, time);
    }
  }
  mail_right = function (email) {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  }
}