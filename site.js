(() => {
    const carousel = document.querySelector(".carousel");
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    if (slides.length < 2) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const controls = document.createElement("div");
    controls.className = "carousel-controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Hero image controls");

    const makeButton = (label, icon) => {
        const button = document.createElement("button");
        button.className = "carousel-control";
        button.type = "button";
        button.setAttribute("aria-label", label);
        button.textContent = icon;
        controls.append(button);
        return button;
    };

    const previousButton = makeButton("Previous image", "\u2039");
    const playButton = makeButton("Play slideshow", "\u25b6");
    const nextButton = makeButton("Next image", "\u203a");
    const status = document.createElement("span");
    status.className = "carousel-status";
    status.setAttribute("aria-live", "polite");
    controls.append(status);
    carousel.append(controls);

    let activeIndex = 0;
    let timerId;
    let paused = prefersReducedMotion.matches;

    const showSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });
        status.textContent = `Image ${activeIndex + 1} of ${slides.length}`;
    };

    const stopTimer = () => {
        window.clearInterval(timerId);
        timerId = undefined;
    };

    const startTimer = () => {
        stopTimer();
        if (!paused && !document.hidden) {
            timerId = window.setInterval(() => showSlide(activeIndex + 1), 6500);
        }
    };

    const updatePlaybackControl = () => {
        playButton.textContent = paused ? "\u25b6" : "\u275a\u275a";
        playButton.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
    };

    previousButton.addEventListener("click", () => {
        showSlide(activeIndex - 1);
        startTimer();
    });
    nextButton.addEventListener("click", () => {
        showSlide(activeIndex + 1);
        startTimer();
    });
    playButton.addEventListener("click", () => {
        paused = !paused;
        updatePlaybackControl();
        startTimer();
    });
    document.addEventListener("visibilitychange", startTimer);
    prefersReducedMotion.addEventListener("change", (event) => {
        if (event.matches) {
            paused = true;
        }
        updatePlaybackControl();
        startTimer();
    });

    showSlide(0);
    updatePlaybackControl();
    startTimer();
})();
