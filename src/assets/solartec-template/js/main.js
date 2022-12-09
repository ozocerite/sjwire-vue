(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Nav Bar Active
    var navActive = function () {
        var name = this.name;
        $(this).parents().find('a.nav-link.dropdown-toggle').each(function(){
            $(this).removeClass('active');
            if(this.name == name) {
                $(this).addClass('active');
            }
        });
    };

    $(document).ready(function(){
        $(document).on('click', '.dropdown-item,.nav-link', navActive);
        changeDropdownAttr();
        /*$(".d-lg-block").on('click', function(){
            window.scrollTo(0, document.body.scrollHeight-1350);
        });*/
    });

    $(window).resize(function(){
        changeDropdownAttr();
    });

    var changeDropdownAttr = function(){
        $(document).find('a.nav-link.dropdown-toggle').each(function(){
            /*When Mobile*/
            if(window.matchMedia("(max-width: 767px)").matches){
                $(this).attr('data-bs-toggle','dropdown');
                $(this).attr('aria-expanded','true');
            }else{
                $(this).removeAttr('data-bs-toggle');
                $(this).removeAttr('aria-expanded');
            }
        });
    }

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

})(jQuery);

