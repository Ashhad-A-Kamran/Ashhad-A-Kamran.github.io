document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    // Mobile Navigation Toggle
    // ============================================================
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    mobileBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const spans = mobileBtn.querySelectorAll("span");
        if (navLinks.classList.contains("active")) {
            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
        } else {
            spans.forEach(span => {
                span.style.transform = "none";
                span.style.opacity = "1";
            });
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) mobileBtn.click();
        });
    });

    // ============================================================
    // Typewriter Effect
    // ============================================================
    const typeTarget = document.getElementById("typewriter");
    const phrases = [
        "AI Engineer",
        "Building Adaptive Agentic Systems",
        "RAG Architectures Expert",
        "Data Science Enthusiast",
        "Ranked #1 in BS AI"
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typingDelay = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typeTarget.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typeTarget.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingDelay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingDelay = 500;
        }
        setTimeout(typeEffect, typingDelay);
    }
    if (typeTarget) setTimeout(typeEffect, 1000);

    // ============================================================
    // Scroll Fade-In Observer
    // ============================================================
    const faders = document.querySelectorAll(".section-fade");
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    faders.forEach(fader => appearOnScroll.observe(fader));

    // Hero is visible immediately
    setTimeout(() => {
        const hero = document.querySelector("#hero");
        if (hero) hero.classList.add("visible");
    }, 100);

    // ============================================================
    // Nav background on scroll
    // ============================================================
    const nav = document.querySelector(".glass-nav");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.style.background = "rgba(5, 5, 10, 0.9)";
            nav.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.5)";
        } else {
            nav.style.background = "rgba(5, 5, 10, 0.7)";
            nav.style.boxShadow = "none";
        }
    });

    // ============================================================
    // PROJECT FILTERING
    // ============================================================
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card-new");
    const noProjectsMsg = document.getElementById("noProjectsMsg");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            let visibleCount = 0;

            projectCards.forEach(card => {
                const categories = card.dataset.category || "";
                const matches = filter === "all" || categories.includes(filter);
                if (matches) {
                    card.classList.remove("hidden");
                    // Reset animation
                    card.style.animation = "none";
                    card.offsetHeight; // Reflow
                    card.style.animation = "fadeInUp 0.4s ease forwards";
                    visibleCount++;
                } else {
                    card.classList.add("hidden");
                }
            });

            noProjectsMsg.style.display = visibleCount === 0 ? "block" : "none";
        });
    });

    // ============================================================
    // SKILL BAR ANIMATION
    // ============================================================
    const skillBars = document.querySelectorAll(".skill-bar-fill");

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.dataset.width + "%";
                // Slight delay for stagger effect
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 200);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach((bar, index) => {
        // Stagger the animation per bar
        bar.style.transitionDelay = `${index * 0.08}s`;
        skillObserver.observe(bar);
    });

    // ============================================================
    // PROJECT "Details" BUTTON - Toggle expanded view
    // ============================================================
    window.showProjectDetails = function (btn) {
        const card = btn.closest(".project-card-new");
        const details = card.querySelector(".project-hover-details");
        const isExpanded = card.classList.contains("details-expanded");

        if (isExpanded) {
            card.classList.remove("details-expanded");
            btn.textContent = "📋 Details";
            details.style.maxHeight = "";
            details.style.opacity = "";
            details.style.paddingTop = "";
            details.style.borderTopColor = "";
            details.style.marginBottom = "";
        } else {
            card.classList.add("details-expanded");
            btn.textContent = "✖ Close";
            details.style.maxHeight = "200px";
            details.style.opacity = "1";
            details.style.paddingTop = "1rem";
            details.style.borderTopColor = "rgba(255,255,255,0.06)";
            details.style.marginBottom = "1rem";
        }
    };

    // ============================================================
    // Download Resume button placeholder notification
    // ============================================================
    const resumeBtn = document.getElementById("downloadResumeBtn");
    if (resumeBtn) {
        resumeBtn.addEventListener("click", (e) => {
            // If the file doesn't exist yet, show a friendly notice
            fetch("resume.pdf", { method: "HEAD" }).catch(() => {
                e.preventDefault();
                alert("Resume will be available soon! Please check back later or contact me directly via email.");
            });
        });
    }

});

// CSS animation for filtered cards
const style = document.createElement("style");
style.textContent = `
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);
