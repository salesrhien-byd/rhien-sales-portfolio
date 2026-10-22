document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".slideshow-track");
    const slides = Array.from(document.querySelectorAll(".certificate-slide"));
    const previousButton = document.getElementById("slide-prev");
    const nextButton = document.getElementById("slide-next");
    const count = document.getElementById("slide-count");

    if (!track || slides.length === 0 || !previousButton || !nextButton || !count) {
        return;
    }

    let currentIndex = 0;

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
        count.textContent = (currentIndex + 1) + " / " + slides.length + " certificates";
    }

    previousButton.addEventListener("click", function () {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
        showSlide(currentIndex + 1);
    });

    track.addEventListener("scroll", function () {
        const trackRect = track.getBoundingClientRect();
        let nearestIndex = 0;
        let nearestDistance = Infinity;

        slides.forEach(function (slide, index) {
            const distance = Math.abs(slide.getBoundingClientRect().left - trackRect.left);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestIndex = index;
            }
        });

        currentIndex = nearestIndex;
        count.textContent = (currentIndex + 1) + " / " + slides.length + " certificates";
    }, { passive: true });

    showSlide(0);
});