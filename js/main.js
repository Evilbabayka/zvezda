jQuery(function ($) {

    // ===================================================== Fix fixed bg's jump

    /MSIE [6-8]|Mac/i.test(navigator.userAgent) || $("header, article, footer").each(function () {
        if ("fixed" == $(this).css("backgroundAttachment")) {
            var i = $(this), a = /WebKit/i.test(navigator.userAgent) ? 9 : 8;
            i.addClass("froid-fixed-bg").data({
                bgX: i.css("backgroundPosition").slice(0, i.css("backgroundPosition").indexOf(" ")),
                bgY: i.css("backgroundPosition").slice(i.css("backgroundPosition").indexOf(" ")),
                margin: a
            })
        }
    }), $(window).bind("SIModals.modalsOpen", function () {
        $(".froid-fixed-bg").each(function () {
            var i = $(this);
            i.css("backgroundPosition", "calc(" + i.data("bgX") + " - " + i.data("margin") + "px) " + i.data("bgY"))
        })
    }), $(window).bind("SIModals.modalsClose", function () {
        $(".froid-fixed-bg").each(function () {
            var i = $(this);
            i.css("backgroundPosition", i.data("bgX") + " " + i.data("bgY"))
        })
    });

    // ===================================================== Mobile full-width && disable animation

    if (is_mobile()) {

        // Fix mobile fixed bg's
        $("header, section, article, footer, .section-bg-block::before").each(function () {
            if ("fixed" == $(this).css("backgroundAttachment")) $(this).css('backgroundAttachment', 'scroll');
        });

        // Remove animation
        function removeAnimation(block, className) {
            block.css({
                'transform': 'none',
                '-webkit-transform': 'none',
                '-moz-transform': 'none',
                '-ms-transform': 'none',
                '-o-transform': 'none',
                'transition': 'none',
                '-webkit-transition': 'none',
                'opacity': 1
            }).removeClass(className);
        }

        function removeTransform(block, className) {
            block.css({
                'transform': 'none',
                '-webkit-transform': 'none',
                '-moz-transform': 'none',
                '-ms-transform': 'none',
                '-o-transform': 'none'
            }).removeClass(className);
        }

        removeAnimation($('.cre-animate'), 'cre-animate');
        removeTransform($('.si-floating'), 'si-floating');
        removeTransform($('.si-floating2'), 'si-floating2');
        removeTransform($('.si-floating3'), 'si-floating3');
        removeTransform($('.si-floating4'), 'si-floating4');

        // Mobile stretch
        // $('html, body').css('min-width', '1280px').addClass('mobile');
        // $('html').css('width', window.innerWidth + 'px');

        $('html').css('width', window.innerWidth + 'px');
        $(window).resize(function () {
           $('html').css('width', window.innerWidth + 'px');
        });
        $(window).bind('scroll', function () {
           $('html').css('width', window.innerWidth + 'px');
        });

        

        // ===================================================== smooth scrolling
        if (!navigator.userAgent.match(/Trident\/7\./)) { // if not IE
            SmoothScroll({stepSize: 100});
        } else {
            document.body.addEventListener("mousewheel", function () {
                event.preventDefault();
                var wd = event.wheelDelta;
                var csp = window.pageYOffset;
                window.scrollTo(0, csp - wd);
            });
        }

        // ===================================================== parallax
        $('.element-parallax').scrollingParallax({
            staticSpeed: 1.4,
            staticScrollLimit: false
        });

        // ===================================================== video bg
        //$('#video-bg').css({'visibility': 'visible'});
        //$('#video-bg')[0].play();
    }

    if (is_OSX()) {
        $('html, body').addClass('osx');
    }


    // ===================================================== Init all plugins and scripts
    $.fn.SIInit = function () {

        //Modal photos
        $("[data-fancybox]").fancybox({
            loop: true,
            thumbs: {
                autoStart: true
            },
            youtube: {},
            vimeo: {}
        });

        //Forms
        $('.send-form').SIForms({
            'validateFields': {
                // 'client_name': 'Укажите ваше имя',
                // 'client_fio': 'Укажите вашу фамилию',
                // 'client_phone': 'Укажите ваш телефон',
                // 'client_mail': 'Укажите ваш e-mail'
            },
            // 'checkExtra': function (form) {
            //     if (!$(form).find('.form-agree-check').hasClass('checked')) {
            //         SIPageMessages.show('Для отправки формы вы должны согласиться на обработку персональных данных.');
            //         return false;
            //     }
            // },
            'sendSuccess': function (res) {
                //grecaptcha.reset(recaptcha);
                //yaCounter.reachGoal('target' + res.id);
                //ga('send', 'event', res.gcode, res.gcode);
            }
        });

        //Jump links
        $('.si-jump').SIJump();

        //Page messages
        SIPageMessages.init();
    };

    $.fn.SIInit();


    // ===================================================== Modals
    $.fn.SIModalInit = function () {
        SIModals.init();

        // Init modals
        SIModals.attachModal('.open-phone-modal', '.phone-modal', {'.send-extra': 'extra'});
        SIModals.attachModal('.open-meeting-modal', '.meeting-modal', {'.send-extra': 'extra'});
        SIModals.attachModal('.open-price-modal', '.price-modal', {'.send-extra': 'extra'});
        SIModals.attachModal('.open-work-modal', '.work-modal', {'.send-extra': 'extra'});
        SIModals.attachModal('.open-collector-modal', '.collector-modal', {'.send-extra': 'extra'});
        SIModals.attachModal('.open-text-modal', '.text-modal', false, function () {
            return '.text-modal-' + $(this).data('id');
        });

        // Modal controls
        SIModals.attachClose('.si-close');
    };

    $.fn.SIModalInit();

    //SIModals.afterOpen = function () {
    //grecaptcha.reset(recaptcha);
    //};

    // ===================================================== Styler
    $('input[type=file], input[type=radio], input[type=checkbox], select').styler();
    $('input[type=radio]').change(function () {
        var label = $(this).closest('label'),
            name = $(this).attr('name');
        $('input[name=' + name + ']').closest('label').removeClass('checked');
        if ($(this).is(':checked'))
            label.addClass('checked');
    });
    $('input[type=checkbox]').change(function () {
        var label = $(this).closest('label');
        if ($(this).is(':checked'))
            label.addClass('checked');
        else
            label.removeClass('checked');
    });

    // ===================================================== Counter
    var tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    $('.counter').countdown({
        until: tomorrow,
        layout: '<div class="counter-item"><b>{dnn}</b>{dl}</div><div class="counter-separator">:</div>' +
        '<div class="counter-item"><b>{hnn}</b>{hl}</div><div class="counter-separator">:</div>' +
        '<div class="counter-item"><b>{mnn}</b>{ml}</div><div class="counter-separator">:</div>' +
        '<div class="counter-item"><b>{snn}</b>{sl}</div>'
    });

    // ===================================================== spoiler
    $(".spoiler").spoiler();

    // ===================================================== swiper
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
             type: 'fraction',
            effect: 'fade'
        },
        autoHeight: 'true',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // let slideText = {
    //     0 : '01',
    //     1 : '01',
    //     2 : '02',
    //     3 : '03',
    //     4 : '04',
    //     5 : '05',
    //     6 : '06',
    //     7 : '07',
    //     8 : '08',
    //     9 : '09'
    // }
    // let outNext = $('.out-next-slide');
    //
    // if($('html').find('.swiper-wrapper')){
    //     var stepSlider = new Swiper('.payment-container', {
    //         slidesPerView: 1,
    //         spaceBetween: 20,
    //         autoHeight: 'true',
    //          lazy: {
    //              loadPrevNext: true,
    //          },
    //         pagination: {
    //             el: '.payment-pagination',
    //             clickable: true,
    //             renderBullet: function (index, className) {
    //                 return '<span class="' + className + '">' + (index + 1) + '</span>';
    //             },
    //         },
    //         navigation: {
    //             nextEl: '.swiper-button-next',
    //             prevEl: '.swiper-button-prev',
    //         },
    //         loop: true,
    //         on: {
    //             slideChange: function() {
    //                 $.ionSound.play('wuf-1');
    //                 var realIndex = (this.activeIndex - 1) % (this.slides.length - 2); //номер слайдера
    //
    //                 switch(realIndex) {
    //                     case 0:
    //                         outNext.text(slideText[1]);
    //                         break;
    //                     case 1:
    //                         outNext.text(slideText[2]);
    //                         break;
    //                     case 2:
    //                         outNext.text(slideText[3]);
    //                         break;
    //                     case 3:
    //                         outNext.text(slideText[4]);
    //                         break;
    //                     case 4:
    //                         outNext.text(slideText[5]);
    //                         break;
    //                     case 5:
    //                         outNext.text(slideText[6]);
    //                         break;
    //                     case 6:
    //                         outNext.text(slideText[7]);
    //                         break;
    //                     case 7:
    //
    //                         outNext.text(slideText[8]);
    //                         break;
    //                     case 8:
    //                         outNext.text(slideText[9]);
    //                         break;
    //                      case -1:
    //                          outPrev.text(slideText[5]);
    //                          outNext.text(slideText[0]);
    //                          break;
    //                 }
    //
    //             }
    //         }
    //     });
    // }


    // =====================================================dotdotdot
    $('.ellipsis').dotdotdot();
    $(window).resize(function () {
        $('.ellipsis').dotdotdot();
    });

    // ===================================================== custom scripts

    //label
    $('.ani-label').click(function () {
        var label = $(this),
            holder = label.parent(),
            input = holder.find('.ani-input');

        holder.toggleClass('active');
        input.focus();
    });


    var CurrentScroll = 0;
    $(window).scroll(function(){

        var NextScroll = $(this).scrollTop();

        if (NextScroll > CurrentScroll){

            $('.layout-header').removeClass('active');
            $('.show-menu').removeClass('active');
        }
        else {

            $('.layout-header').addClass('active');
            $('.show-menu').addClass('active');
        }

        if ($(window).scrollTop() === 0){
            $('.layout-header').removeClass('active');
            $('.show-menu').removeClass('active');
        }

        CurrentScroll = NextScroll;
    });

    //menu
    // function headerBehaviour() {
    //     if ($(window).scrollTop() > 0) {
    //         $('.layout-header').addClass('active');
    //         // $('.layout-header').removeClass('active');
    //     }
    //
    //     if ($(window).scrollTop)
    //     else {
    //         $('.layout-header').removeClass('active');
    //     }
    // }

    // function menuBehaviour() {
    //     if ($(window).scrollTop() > 0) {
    //         $('.show-menu').addClass('active');
    //     }
    //     else {
    //         $('.show-menu').removeClass('active');
    //     }
    // }

    // headerBehaviour();
    // $(window).resize(function () {
    //     headerBehaviour();
    // });
    // $(window).bind('scroll', function () {
    //     headerBehaviour();
    // });

    // menuBehaviour();
    // $(window).resize(function () {
    //     menuBehaviour();
    // });
    // $(window).bind('scroll', function () {
    //     menuBehaviour();
    // });

    //accordion
    $('.question-item:first').addClass('active').find('.answer').css('display', 'block');
    $('.question-item').each(function () {
        var item = $(this),
            question = item.find('.question'),
            answer = item.find('.answer');
        answer.slideUp();
        if (item.hasClass('active')) {
            $(this).find('.answer').slideDown();
        }
        question.click(function () {
            if (question.parents('.question-item').hasClass('active')) {
                answer.slideUp();
                item.removeClass('active');
            }
            else {
                item.parents('.questions-block').find('.question-item').find('.answer').slideUp();
                answer.slideDown();
                item.parents('.questions-block').find('.question-item').removeClass('active');
                item.addClass('active');
            }
        });
    });

    //equal height
    function setEqualHeight(block) {
        var maxHeight = 0;

        block.each(function () {
            var height = $(this).innerHeight();

            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        return block.css('height', maxHeight);
    }

    setEqualHeight($('.block'));

    //===================================================== mobile menu
    var showMenu = $('.show-menu');

    function closeGlobalNav(timeout) {
        var globalNavigation = $('.global-nav'),
            showMenu = $('.show-menu');

        $('html').removeClass('si-lock2');
        showMenu.removeClass('opened');
        globalNavigation.removeClass('active');
        setTimeout(function () {
            globalNavigation.removeClass('visible');
        }, timeout);
    }

    //show menu button
    showMenu.click(function () {
        var globalNavigation = $('.global-nav');

        if ($(this).hasClass('opened')) {
            closeGlobalNav(600);
        } else {
            $('html').addClass('si-lock2');
            $(this).addClass('opened');
            globalNavigation.addClass('visible').addClass('active');
        }
    });

    //navigation overlay click
    $('.nav-overlay').click(function () {
        closeGlobalNav(600);
    });

    //close button click
    $('.nav-close').click(function () {
        closeGlobalNav(600);
    });

    //global link click
    $(".global-nav-link").click(function (e) {
        closeGlobalNav(1200);
    });


    // ===================================================== maps
    // var myMap,
    //     centerCoord = [55.753246613373825,37.6062839576721];
    //
    // function mapInit(mapBlock, mapID) {
    //     ymaps.ready(function () {
    //         mapBlock = new ymaps.Map(mapID, {
    //             center: centerCoord,
    //             zoom: 18
    //         }, {
    //             searchControlProvider: 'yandex#search'
    //         });
    //         mapBlock.behaviors.disable('scrollZoom', 'multiTouch', 'drag');
    //
    //         pointByPlacemark(mapBlock);
    //     });
    // }
    //
    // function pointByPlacemark(mapBlock) {
    //     var myPlacemark = new ymaps.Placemark(
    //         centerCoord, {
    //             iconCaption: 'Улица Воздвиженка, д. 10, 3-й этаж,\n' +
    //                 'Москва, 125009'
    //         }, {
    //             preset: 'islands#blueCircleDotIconWithCaption',
    //             iconCaptionMaxWidth: '300'
    //         }
    //     );
    //     mapBlock.geoObjects.add(myPlacemark);
    // }
    //
    // function pointWithCustomIcon(mapBlock) {
    //     var myPlacemark = new ymaps.Placemark(
    //         centerCoord, {
    //             hintContent: 'Текст подсказки'
    //         }, {
    //             iconLayout: 'default#image',
    //             iconImageHref: template_url + "images/location.png",
    //             iconImageSize: [55, 82],
    //             iconImageOffset: [-27, -82]
    //         }
    //     );
    //     mapBlock.geoObjects.add(myPlacemark);
    // }
    //
    // mapInit(myMap, 'map');




});