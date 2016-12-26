$(function () {

    // $('#side-menu').metisMenu();

    /* $(document).on('click', '.navbar-collapse collapse.in', function (e) {
     console.log("Click");
     if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
     $(this).collapse('hide');
     }
     }); */

    // alert("HERE WE GO");
});



// Loads the correct sidebar on window load,
// collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function () {
    $(window).bind("load resize", function () {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;

        // Automatically expand or collapse menu
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            // topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        // Add space at the top of the body container for the fixed navbar
        if ($(".navbar").height()) {
            $("body").css("padding-top", $(".navbar").height() + "px");
        } else {
            $("body").css("padding-top", "50px")
        }

        // Set height of page container (?)
        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1)
            height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    $(document).ready(function () {
        window.setTimeout(function () {
            // Add space at the top of the body container for the fixed navbar
            if ($(".navbar").height()) {
                $("body").css("padding-top", $(".navbar").height() + "px");
            } else {
                $("body").css("padding-top", "50px")
            }
        }, 500);
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function () {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});
