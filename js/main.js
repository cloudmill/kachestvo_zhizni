var animate_open_close,
  success_popup,
  mail_right,
  fs,
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
      if (!$('.help_text:hover').length > 0
        && !$('.help:hover').length > 0) {
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
      if (!$('[data-target]:hover').length > 0
        && !$('[data-has_target]:hover').length > 0) {
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
        if ($('#header__bottom__menu').find('#monitor_load_complete').width() == 158.703) {
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
    })
    $(document).on('click', function (e) {
      if (!$('#header__bottom__menu:hover').length > 0) {
        hide_more_items()
      }
    })
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
    $(document).on('keypress', '.comments__form__input', function (e) {
      if (e.which == 13) {
        e.preventDefault();
      }
    })
    $(document).on('keyup', '.comments__form__input', function (e) {
      if (e.which == 13) {
        $(this).val($(this).val() + '\n')
        
      }
      console.log($(this)[0].scrollHeight ,start_height + add_height,$(this)[0].rows)
      if ($(this)[0].scrollHeight > start_height + add_height
        && $(this)[0].rows < 5) {
          add_height = $(this)[0].scrollHeight - start_height;
        $(this)[0].rows++;
      }
    })
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
              /* console.log('target_id = '+t,'last-item_id= ',last_item_id)
              console.log('item = '+html_) */
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
              //console.log('items_count = '+blocks.eq(block_id).find('.lenta_body_s-item').length,'block_id= '+block_id )
              last_item_id++
              num_free_place--;
            }
            else return 'end';
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
            console.log('lost: ' + l);
            var j = 0;
            list.find('[data-old-pos]').each(function () {
              console.log('item: ' + j);
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
      if (!$('.popup__wrapper').hasClass('active'))
        animate_open_close($('.popup__wrapper'))

      animate_open_close($('.popup__item.active'), true, function () {
        animate_open_close($('#success'))
      })
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

  popup_open();
  header_hide_scroll();
  open_menu()
  help_blocks();
  show_more_comments();
  resize_textarea();
  burger__search_open();

  if ($(window).width() > 1024) {
    show_more_in_menu()
  }

  opimized_position();
  $(window).on('resize', function () {
    opimized_position();
  })
};
var forms = function () {
  var submits = function () {
    $(document).on('submit', '[data-form="subscribe"]', function (e) {
      e.preventDefault();
      var error = 0
      var mail = $(this).find('[name="mail"]')
      $(this).find('*').removeClass("error");
      if (mail.val() == "" || !mail_right(mail.val())) {
        error++;
        mail.addClass("error");
      }
      if (error == 0) {
        success_popup();
      }
    })
  }
  submits();
}
var sliders = function(){
  if($('.lenta_body.tablet_slider').length>0){
    $('.lenta_body.tablet_slider').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      speed: 1000,
      infinite: false,
      dots: false,
      arrows: false,
      responsive: [
        {
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
      setTimeout(() => {
        item.removeClass('active')
      }, time);
    } else {
      item.addClass('active')
      setTimeout(() => {
        item.addClass('open')
      }, 0);
    }


    if (callback) {
      setTimeout(() => {
        callback();
      }, time);
    }
  }
  mail_right = function(email) {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  }
}