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
    // EDUCATION DETAILS
    'duet': {
        title: 'Dawood University: BS Artificial Intelligence',
        content: `
            <div style="display:flex; gap:1rem; align-items:center; margin-bottom:1.2rem;">
                <img src="https://test2.duet.edu.pk/wp-content/uploads/2020/11/duet_logo-300x227.png"
                     alt="DUET Logo"
                     style="width:60px; height:60px; border-radius:8px; object-fit:cover; background:#fff; padding:4px;"
                     onerror="this.style.display='none'">
                <div>
                    <strong style="display:block; font-size:1rem;">Academic Excellence</strong>
                    <span style="color:var(--accent-color); font-size:0.85rem;">Karachi, Pakistan</span>
                </div>
            </div>
            <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
                Consistently ranked 1st in my batch throughout the program. My time here has been dedicated to mastering the mathematical foundations of AI and applying them to real-world datasets.
            </p>
            <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                <h4 style="margin-bottom: 0.8rem; font-size: 0.9rem; color: var(--text-primary);">Media & Pictures</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem;">
                    <div style="aspect-ratio: 16/9; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.75rem;">Image Placeholder</div>
                    <div style="aspect-ratio: 16/9; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.75rem;">Image Placeholder</div>
                </div>
            </div>
        `
    },
    'sapienza': {
        title: 'Sapienza University: Applied CS & AI',
        content: `
            <div style="display:flex; gap:1rem; align-items:center; margin-bottom:1.2rem;">
                <img src="https://www.standyou.com/uploads/20220403220048_file_Sapienza-University-of-Rome-Italy.jpg"
                     alt="Sapienza Logo"
                     style="width:60px; height:60px; border-radius:8px; object-fit:cover;"
                     onerror="this.style.display='none'">
                <div>
                    <strong style="display:block; font-size:1rem;">Erasmus+ Scholars Program</strong>
                    <span style="color:var(--accent-color); font-size:0.85rem;">Rome, Italy</span>
                </div>
            </div>
            <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
                As an Erasmus+ scholar, I participated in deep research and collaboration on advanced machine learning architectures and computer vision labs.
            </p>
            <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                <h4 style="margin-bottom: 0.8rem; font-size: 0.9rem; color: var(--text-primary);">Media & Pictures</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem;">
                    <div style="aspect-ratio: 16/9; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.75rem;">Rome Campus Placeholder</div>
                    <div style="aspect-ratio: 16/9; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.75rem;">Research Lab Placeholder</div>
                </div>
            </div>
        `
    },

    // EDUCATION TRANSCRIPTS
    'duet_transcript': {
        title: 'Academic Transcript: DUET',
        content: `
            <div style="padding: 2rem; text-align: center; background: #f9f9f9; border-radius: 12px; border: 2px dashed #ddd;">
                <p style="color: #666; margin-bottom: 1.5rem;">The official transcript document is pending upload.</p>
                <div style="max-width: 300px; margin: 0 auto; padding: 1rem; background: #fff; border: 1px solid #eee; border-radius: 8px;">
                     <strong style="display:block; font-size: 1.1rem; margin-bottom: 0.5rem;">Current GPA: 3.93</strong>
                     <p style="font-size: 0.85rem; color: var(--text-secondary);">Ranked 1st in the Artificial Intelligence batch since admission.</p>
                </div>
            </div>
        `
    },
    'sapienza_transcript': {
        title: 'Academic Transcript: Sapienza',
        content: `
            <div style="padding: 2rem; text-align: center; background: #f9f9f9; border-radius: 12px; border: 2px dashed #ddd;">
                <p style="color: #666; margin-bottom: 1.5rem;">Exchange semester transcript will be available soon.</p>
                <div style="max-width: 300px; margin: 0 auto; padding: 1rem; background: #fff; border: 1px solid #eee; border-radius: 8px;">
                     <strong style="display:block; font-size: 1.1rem; margin-bottom: 0.5rem;">Program: Erasmus+</strong>
                     <p style="font-size: 0.85rem; color: var(--text-secondary);">Applied CS & AI Semester, Rome.</p>
                </div>
            </div>
        `
    },

    // EXPERIENCE DETAILS & DOCUMENTS
    'onestop_details': {
        title: 'AI Engineer: Onestop Vendors',
        content: `
            <h4 style="color: var(--text-primary); margin-bottom: 0.8rem;">Key Achievements & Pictures</h4>
            <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
                Spearheaded the development of agentic AI systems that automated complex customer discovery workflows. I worked extensively with LangGraph and programmatic feedback loops to ensure system reliability.
            </p>
            <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem;">
                    <div style="aspect-ratio: 16/9; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.75rem;">Office Environment</div>
                    <div style="aspect-ratio: 16/9; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.75rem;">Workstation Setup</div>
                </div>
            </div>
        `
    },
    'onestop_docs': {
        title: 'Documents: Onestop Vendors',
        content: `
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="padding: 1rem; background: rgba(234, 88, 12, 0.05); border: 1px solid rgba(234, 88, 12, 0.1); border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="display:block; font-size: 0.9rem;">Experience Letter</strong>
                        <span style="font-size: 0.75rem; color: #666;">Verified by HR</span>
                    </div>
                    <span style="color: var(--accent-color); font-weight: 600; font-size: 0.8rem;">Pending Upload</span>
                </div>
                <div style="padding: 1rem; background: rgba(234, 88, 12, 0.05); border: 1px solid rgba(234, 88, 12, 0.1); border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="display:block; font-size: 0.9rem;">Recognition Award</strong>
                        <span style="font-size: 0.75rem; color: #666;">Quarterly Performance</span>
                    </div>
                    <span style="color: var(--accent-color); font-weight: 600; font-size: 0.8rem;">Available Soon</span>
                </div>
            </div>
        `
    },
    'arcana_details': {
        title: 'AI Intern: Arcana Info',
        content: `
            <h4 style="color: var(--text-primary); margin-bottom: 0.8rem;">Internship Highlights & Pictures</h4>
            <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
                Focused on IBM Watson ecosystems, deploying predictive models for enterprise intent analysis. Gained massive exposure to enterprise-grade AI deployment pipelines.
            </p>
            <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem;">
                    <div style="aspect-ratio: 16/9; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.75rem;">Arcana Team Picture</div>
                    <div style="aspect-ratio: 16/9; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.75rem;">Certification Ceremony</div>
                </div>
            </div>
        `
    },
    'arcana_docs': {
        title: 'Documents: Arcana Info',
        content: `
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="padding: 1rem; background: rgba(234, 88, 12, 0.05); border: 1px solid rgba(234, 88, 12, 0.1); border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="display:block; font-size: 0.9rem;">Internship Completion Certificate</strong>
                        <span style="font-size: 0.75rem; color: #666;">Arcana Info (Pvt.) Ltd</span>
                    </div>
                    <span style="color: var(--accent-color); font-weight: 600; font-size: 0.8rem;">Ready Soon</span>
                </div>
            </div>
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
        titleEl.textContent = 'Information';
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
