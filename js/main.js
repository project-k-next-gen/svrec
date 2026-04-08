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
    spinner(0);


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 900, 'easeInOutExpo');
        return false;
    });

})(jQuery);

// Custom Pagination for News/Updates
function setupPagination(contentId, paginationId, itemsPerPage) {

    const content = document.getElementById(contentId);
    const items = content.querySelectorAll(".news-item");

    const pagination = document.getElementById(paginationId);

    let currentPage = 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    function showPage(page) {

        currentPage = page;

        items.forEach((item, index) => {
            item.style.display =
                index >= (page - 1) * itemsPerPage &&
                index < page * itemsPerPage
                    ? "block"
                    : "none";
        });

        renderPagination();
    }

    function renderPagination() {

        pagination.innerHTML = "";

        /* LEFT ARROW */
        const prevBtn = document.createElement("button");
        prevBtn.innerHTML = "&#8592;";
        prevBtn.classList.add("pagination-arrow");

        prevBtn.disabled = currentPage === 1;

        prevBtn.onclick = () => showPage(currentPage - 1);

        pagination.appendChild(prevBtn);

        /* PAGE NUMBERS */

        for (let i = 1; i <= totalPages; i++) {

            const btn = document.createElement("button");
            btn.innerText = i;

            if (i === currentPage) {
                btn.classList.add("active");
            }

            btn.onclick = () => showPage(i);

            pagination.appendChild(btn);
        }

        /* RIGHT ARROW */

        const nextBtn = document.createElement("button");
        nextBtn.innerHTML = "&#8594;";
        nextBtn.classList.add("pagination-arrow");

        nextBtn.disabled = currentPage === totalPages;

        nextBtn.onclick = () => showPage(currentPage + 1);

        pagination.appendChild(nextBtn);
    }

    showPage(1);
}

// Consolidated Carousel and Video Initialization
document.addEventListener('DOMContentLoaded', function () {
    const $ = jQuery;

    // International Tour carousel
    $(".InternationalTour-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: false,
        navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1200: { items: 3 }
        }
    });

    // packages carousel
    $(".packages-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1200: { items: 3 }
        }
    });

    // Initialize News Pagination
    setupPagination("circular-content", "circular-pagination", 3);
    setupPagination("exam-content", "exam-pagination", 3);
    setupPagination("placement-content", "placement-pagination", 3);
});

    // Testimonial carousel
    let testimonialInitDone = false;
    function initTestimonialCarousel() {
        if (testimonialInitDone) return;
        if ($(".testimonial-carousel").length) {
            if (typeof $.fn.owlCarousel === 'undefined') {
                console.log("Owl Carousel script not loaded yet, retrying...");
                setTimeout(initTestimonialCarousel, 100);
                return;
            }
            testimonialInitDone = true;
            $(".testimonial-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1000,
                center: true,
                dots: true,
                loop: true,
                margin: 25,
                nav: true,
                navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    992: { items: 3 }
                }
            });
            console.log("Testimonial carousel initialized ✅");
        } else {
            console.log("Testimonial carousel NOT found, looking for it...");
            // Use a short delay to check again (useful if the section is loaded via JS or slow DOM)
            // But here it is in index.html, so it should be there.
        }
    }

    // Run on DOM load and also on Window load for safety
    initTestimonialCarousel();
    $(window).on("load", initTestimonialCarousel);

    // Hero Video Optimization
    const video = document.getElementById('heroVideo');
    if (video) {
        video.load();
        video.pause();
        let isPlaying = false;
        video.addEventListener('mouseenter', () => {
            if (!isPlaying) {
                video.currentTime = 0;
                video.play().catch(() => { });
                isPlaying = true;
            }
        });
        video.addEventListener('ended', () => {
            video.pause();
            video.currentTime = 0;
            isPlaying = false;
        });
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && !video.paused) {
                video.pause();
                isPlaying = false;
            }
        });
    }



// Interactive Elements
document.addEventListener('DOMContentLoaded', function () {
    // News item click ripple
    document.querySelectorAll('.news-item').forEach(item => {
        item.addEventListener('click', function () {
            this.style.background = '#e0eaff';
            setTimeout(() => this.style.background = '', 300);
        });
    });

    // Download button effect
    document.querySelectorAll('.btn-outline-secondary').forEach(btn => {
        btn.addEventListener('click', function () {
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-check';
                setTimeout(() => icon.className = 'fas fa-download', 1500);
            }
        });
    });
});
if (typeof $ !== "undefined" && $.fn.owlCarousel) {
  console.log("OwlCarousel loaded");
}
