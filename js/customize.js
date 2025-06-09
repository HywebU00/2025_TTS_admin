// 自行加入的JS請寫在這裡
$(function() {
     // dropdown
    $('.dropdown-content').hide();
    var dropdownStatus = false;
    $('.dropdown-btn').each(function(index, el) {
        $(this).click(function(e) {
            $('.dropdown-content').hide();
            $(this).siblings('.dropdown-content').stop(true, true).slideDown(400, 'easeOutCirc');
            dropdownStatus = true;
            console.log(dropdownStatus);
            e.preventDefault();
        });
    });
    $(document).mouseup(function(e) {
        var target = e.target,
            container = $('.dropdown-content');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });
    //
    //
    //
    //
      if ($('.ex_item').length > 0) {
        $('.ex_item').mouseout(function(event) {
            $(this).parent('li').siblings().find('.dropdown-content').stop().hide();
        });
    }
    // 版型選擇
    if($('.template_choose').length>0){
        $('.modal_overlay').hide();
        $('.template_content').css('right', -1*($('.template_content').width()) ).hide();
        $('.template_choose .btn-tpl').off().click(function(e) {
            $('.template_content').show().animate({ 'right': 0}, 400, 'easeOutQuint');
             e.preventDefault();
        });
        $('.template_content a.close').off().click(function(e) {
             $('.template_content').animate({ 'right': -400}, 400, 'easeOutQuint');
             e.preventDefault();
        });
    }

    // scrollbar
    // if ($('.gra_text').length > 0) {
    //     $('.gra_text').scrollbar();
    // }
    // 按鈕式btn_style radio
    $('.radio_grp.btn_style').find('label').each(function(index, el) {
        $(this).change(function(event) {
            $(this).toggleClass('active');
            $(this).siblings('.active').removeClass('active');
        });
    });
    // 按鈕式btn_style checkbox
    $('.check_grp.btn_style').find('label').each(function(index, el) {
        $(this).change(function(event) {
            $(this).toggleClass('active');
        });
    });
    // 表單移除error
    $('input').focus(function(event) {
        $(this).removeClass('error');
        $(this).siblings('[class^="notice"]').remove();
    });
    // 展覽選單showlist設定
    $('.menu_setting').find('ul').each(function(index, el) {
        $(this).find('li:last').addClass('last');
    });
    var _leftDis = $('aside').width(),
        _showlistW = $('.show_list').width(),
        _menuPos = $('.menu_setting').offset();
    $('.show_list').css('left', -1 * _showlistW);
    $('.show_choose').off().click(function(e) {
        _menuPos = $('.menu_setting').offset();
        $('.show_list').fadeIn().animate({ 'left': ($('menu').width()) }, 400, 'easeOutQuint');
        e.preventDefault();
    });
    $('.show_list').find('h3 .close_btn').off().click(function(e) {
        $('.show_list').fadeIn().animate({ 'left': -1 * $('.show_list').width() }, 400, 'easeOutQuint');
        e.preventDefault();
    });
    // menu設定
    var Menu_Status = false;
    var _Menu_Btn = $('aside').find('.toggle_btn a');
    _Menu_Btn.off().click(function(e) {
        if (!Menu_Status) {
            $('aside').addClass('closed');
            $('header').addClass('closed');
            $('.main_zone').addClass('closed');
            $(this).parent().addClass('closed');
            $('aside menu').find("ul li.open ul").attr("style","display:none;");
            Menu_Status = true;
        } else {
            $('aside').removeClass('closed');
            $('header').removeClass('closed');
            $('.main_zone').removeClass('closed');
            $(this).parent().removeClass('closed');
            Menu_Status = false;
        }
        $(this).blur();
        e.preventDefault();
    });
    // menu
    var _menu = $('aside menu'),
        _menuItem = $('aside menu>ul>li').has('ul');
    _menuItem_2 = $('aside menu>ul>li>ul>li').has('ul');
    _menuItem.each(function(index, el) {
        //$(this).children('ul').hide();
        $(this).children('a').append('<a href="javascript:;" class="toggle_btn"></a>');
        $(this).children('a').click(function(e) {
            $(this).parent('li').siblings().find('.toggle_btn').removeClass('open');
            $(this).parent('li').find('.toggle_btn').toggleClass('open');
            $(this).parent('li').siblings().find('ul').slideUp(600, 'easeOutQuint');
            $(this).next('ul').slideToggle(600, 'easeOutQuint');
            e.preventDefault();
        });
    });
    _menuItem_2.each(function(index, el) {
        $(this).hover(function() {
            $(this).children('ul').show();
        }, function() {
            $(this).children('ul').hide();
        });
    });
    // login forget
    $('.forget').click(function(event) {
        $('.login_block').animate({ 'left': '-100%' }, 400, 'easeOutQuint');
        $('.forget_block').animate({ 'left': '0' }, 400, 'easeOutQuint');
    });
    $('.back').click(function(event) {
        $('.login_block').animate({ 'left': '0%' }, 400, 'easeOutQuint');
        $('.forget_block').animate({ 'left': '100%' }, 400, 'easeOutQuint');
    });
    // dropdown $('.dropdown-content').hide();
     $('.dropdown-btn').each(function(index, el) {
         $(this).off().click(function(e) {
             $(this).siblings('.dropdown-content').stop(true, true).slideToggle(400, 'easeOutQuint');
             e.preventDefault();
         });
     });


    $('.col_control').prepend('<div class="col_name"></div>');
    $('.col_control .col_name').each(function(index, el) {
        var col_name = $(this).parent().parent().parent().attr('class');
        $(this).html(col_name);
    });
    // library
    $('.library ul ul').hide();
    $('.library ul li:first ul').show();
    $('.library>.hy_block>ul>li>a').addClass('open');
    $('.library>.hy_block>ul>li:nth-child(2)>a').removeClass('open');
    $('.library').find('.hy_block>ul>li').each(function(index, el) {
        $(this).find('a').click(function(e) {
            $(this).parent().siblings('div').children('a').removeClass('open');
            $(this).toggleClass('open');
            $(this).parent().siblings().find('ul').stop(true, true).slideUp();
            $(this).siblings('ul').stop(true, true).slideToggle(400, 'easeOutQuint');
            e.preventDefault();
        });
    });
    //控制版型拖拉模組定位
    if ($('.library').length > 0) {
        var libraryTop = $('.library').offset().top,
            libraryW = $('.library').width(),
            libraryLeft = $('.library').offset().left;
        $(window).on("load resize scroll", function(event) {
            var libraryLeft = $('.library').offset().left,
            finalLeft= $('aside').outerWidth()+$('.content').outerWidth()-$('.library').outerWidth()+15;

            //console.log(libraryLeft);
            var currentScroll = $(window).scrollTop();
            if (currentScroll >= libraryTop - 100) {
                $('.library').css({
                    position: 'fixed',
                    top: '6.2em',
                    left: finalLeft,
                    width: libraryW
                });
            } else {
                $('.library').css({
                    position: 'static',
                    right:'1em'
                });
            }
        });
    }
    //
    $(window).on("load resize", function(e) {
        var WindowWidth = $(window).outerWidth();
        var cellDiv1 = $(".template_setting").find('.form_grp');
        if (WindowWidth >= 768) {
            $(".template_setting .container .form_grp").each(function() {
                var highestBox = 0;
                $(cellDiv1, this).each(function() {
                    if ($(this).height() > highestBox) {
                        highestBox = $(this).height();
                    }
                });
                $(cellDiv1, this).height(highestBox);
            });
        }
    });
    // RWD table
    function rwdTable() {
        if ($('.table_list').length > 0) {
            $('.table_list').find('table').each(function() {
                var $row = $(this).find('tr');
                rowCount = $row.length;
                for (var n = 1; n <= rowCount; n++) {
                    $(this).find('th').each(function(index) {
                        var thText = $(this).text();
                        $row.eq(n).find('td').eq(index).attr('data-title', thText);
                    });
                }
            });
        }
    }
    rwdTable();
    // 目錄樹
    if ($('.treeview').length > 0) {
        $(".treeview_block ul").treeview();
        $('.content').removeClass('full');
    }
});
