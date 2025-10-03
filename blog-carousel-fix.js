// Initialize the blog carousel when the document is ready
$(document).ready(function() {
    // Initialize the blog carousel
    $('.blog-carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        dots: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Navigation handlers
    $('#servicesPrev').on('click', function(e) {
        e.preventDefault();
        $('.blog-carousel').slick('slickPrev');
    });

    $('#servicesNext').on('click', function(e) {
        e.preventDefault();
        $('.blog-carousel').slick('slickNext');
    });

    // Keyboard navigation
    $(document).on('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            $('.blog-carousel').slick('slickPrev');
        } else if (e.key === 'ArrowRight') {
            $('.blog-carousel').slick('slickNext');
        }
    });
});
