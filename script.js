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
    // Nav background on scroll - Keep it solid dark
    // ============================================================
    const nav = document.querySelector(".glass-nav");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.style.background = "#111111";
            nav.style.boxShadow = "0 2px 12px rgba(0, 0, 0, 0.15)";
        } else {
            nav.style.background = "#111111";
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
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            let visibleCount = 0;

            projectCards.forEach(card => {
                const categories = card.dataset.category || "";
                const matches = filter === "all" || categories.includes(filter);
                if (matches) {
                    card.classList.remove("hidden");
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.classList.add("hidden");
                    card.style.display = 'none';
                }
            });

            if (noProjectsMsg) {
                noProjectsMsg.style.display = visibleCount === 0 ? "block" : "none";
            }
        });
    });

    // ============================================================
    // Download Resume button
    // ============================================================
    const resumeBtn = document.getElementById("downloadResumeBtn");
    if (resumeBtn) {
        resumeBtn.addEventListener("click", (e) => {
            fetch("assets/cv/Ashhad_A_Kamran_CV6.pdf", { method: "HEAD" }).catch(() => {
                e.preventDefault();
                alert("Resume will be available soon! Please contact me directly via email.");
            });
        });
    }

});

// ============================================================
// MODAL LOGIC — defined globally so onclick attributes work
// ============================================================
const modalData = {
    'duet': {
        title: 'Dawood University of Engineering & Technology',
        content: `
            <div style="display:flex; gap:1rem; align-items:center; margin-bottom:1.2rem;">
                <img src="https://test2.duet.edu.pk/wp-content/uploads/2020/11/duet_logo-300x227.png"
                     alt="DUET Logo"
                     style="width:60px; height:60px; border-radius:8px; object-fit:cover; background:#fff; padding:4px;"
                     onerror="this.style.display='none'">
                <div>
                    <strong style="display:block; font-size:1rem;">BS Artificial Intelligence</strong>
                    <span style="color:var(--accent-color); font-size:0.85rem;">Oct 2022 – Present · Karachi, Pakistan</span>
                </div>
            </div>
            <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
                My journey at Dawood University involves deep immersion into Artificial Intelligence, consistently ranked 1st in my batch. I have tackled challenging projects ranging from Neural Networks to Agentic Systems, fostering strong foundational and advanced knowledge in predictive analytics and computer vision.
            </p>
            <ul style="color:var(--text-secondary); padding-left:1.5rem; line-height:2;">
                <li>GPA: 3.93/4.0 — ranked 1st in batch throughout</li>
                <li>Led AI workshops and assisted peers in Machine Learning labs</li>
                <li>Developed multiple end-to-end ML pipelines as course projects</li>
                <li>Core coursework: Python, DSA, Neural Networks, Computer Vision, Data Science</li>
            </ul>
        `
    },
    'sapienza': {
        title: 'Sapienza Università di Roma',
        content: `
            <div style="display:flex; gap:1rem; align-items:center; margin-bottom:1.2rem;">
                <img src="https://www.standyou.com/uploads/20220403220048_file_Sapienza-University-of-Rome-Italy.jpg"
                     alt="Sapienza Logo"
                     style="width:60px; height:60px; border-radius:8px; object-fit:cover;"
                     onerror="this.style.display='none'">
                <div>
                    <strong style="display:block; font-size:1rem;">Exchange Semester: Applied CS & AI</strong>
                    <span style="color:var(--accent-color); font-size:0.85rem;">Mar 2025 – Jul 2025 · Rome, Italy</span>
                </div>
            </div>
            <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
                Studying at one of Europe's oldest and most prestigious universities through an Erasmus+ exchange allowed me to refine my AI skills in an international context, with a focus on applied computer science and cutting-edge agentic architectures.
            </p>
            <ul style="color:var(--text-secondary); padding-left:1.5rem; line-height:2;">
                <li>Erasmus+ Exchange Program Scholar</li>
                <li>Collaborated with international students on Advanced ML research</li>
                <li>Coursework: Advanced Machine Learning, Agentic AI, Computer Vision Lab</li>
                <li>Expanded expertise in large-scale system design and international collaboration</li>
            </ul>
        `
    }
};

window.openModal = function (id) {
    const modal = document.getElementById('detailsModal');
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');

    if (!modal) return;

    if (modalData[id]) {
        titleEl.textContent = modalData[id].title;
        bodyEl.innerHTML = modalData[id].content;
    } else {
        titleEl.textContent = '';
        bodyEl.innerHTML = '<p style="color:var(--text-secondary)">No details available yet.</p>';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeModal = function () {
    const modal = document.getElementById('detailsModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Close modal when clicking outside the content box
window.addEventListener('click', (e) => {
    const modal = document.getElementById('detailsModal');
    if (modal && e.target === modal) {
        window.closeModal();
    }
});
