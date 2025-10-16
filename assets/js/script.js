$(function () {
    var windowWidth = $(window).width();
    console.log("windowWidth:", windowWidth);
    if (windowWidth > 991) {
        $(".large_timeline_desc").addClass("remove-horizontal-line");
    }

    if (windowWidth < 992) {
        $(".large_timeline_desc").removeClass("remove-horizontal-line");
        $(".medium_timeline_desc").addClass("remove-horizontal-line");
    }

    if (windowWidth < 768) {
        $(".large_timeline_desc").removeClass("remove-horizontal-line");
        $(".medium_timeline_desc").removeClass("remove-horizontal-line");
        $(".small_timeline_desc").addClass("remove-horizontal-line");
    }
});