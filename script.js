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
// MODAL LOGIC — defined globally so onclick attributes works
// ============================================================
const modalData = {
    // EDUCATION DETAILS
    'duet': {
        title: 'Education Details: DUET',
        content: `
            <div class="modal-side-layout">
                <div class="modal-description">
                    <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1.5rem;">
                        As a student at Dawood University of Engineering and Technology, I've maintained a <strong>Ranked 1st in Batch</strong> position with a GPA of 3.93. My focus is on Artificial Intelligence and its applications in automation.
                    </p>
                    <ul style="color:var(--text-secondary); padding-left:1.2rem; margin-bottom:1.5rem;">
                        <li>Core focus: Machine Learning & Neural Networks</li>
                        <li>Batch Rank: 1st across 8 semesters</li>
                        <li>Specialized in RAG and Agentic systems development</li>
                    </ul>
                </div>
                <div class="modal-media">
                   <img src="assets/images/DUET/duet1.png" alt="Receiving Prime Minsiter's Laptop as ranked 1st student">
                </div>
            </div>
        `
    },
    'sapienza': {
        title: 'Education Details: Sapienza',
        content: `
            <div class="modal-side-layout">
                <div class="modal-description">
                    <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1.5rem;">
                        Participated in the Erasmus+ exchange program at Sapienza Università di Roma, focusing on Applied Computer Science and AI. This experience allowed me to collaborate with international researchers in Italy.
                    </p>
                    <ul style="color:var(--text-secondary); padding-left:1.2rem; margin-bottom:1.5rem;">
                        <li>Focus: Advanced Computer Vision & ML</li>
                        <li>Erasmus+ Scholar Grant</li>
                        <li>International Research Collaboration</li>
                    </ul>
                </div>
                <div class="modal-media">
                   <img src="assets/images/Sapienza Rome/sapienza1.jpeg" alt="Sapienza Rome 1">
                   <img src="assets/images/Sapienza Rome/sapienza2.jpeg" alt="Sapienza Rome 2">
                   <img src="assets/images/Sapienza Rome/sapienza8.jpg" alt="Sapienza Rome 8">
                   <img src="assets/images/Sapienza Rome/sapienza3.jpeg" alt="Sapienza Rome 3">
                   <img src="assets/images/Sapienza Rome/sapienza4.jpeg" alt="Sapienza Rome 4">
                   <img src="assets/images/Sapienza Rome/sapienza6.jpeg" alt="Sapienza Rome 6">
                   <img src="assets/images/Sapienza Rome/sapienza7.jpeg" alt="Sapienza Rome 7">
                </div>
            </div>
        `
    },

    // TRANSCRIPTS
    'duet_transcript': {
        title: 'Academic Transcript: DUET',
        content: `
            <div class="modal-side-layout">
                <div class="modal-description">
                    <p style="color:var(--text-secondary); margin-bottom:1rem;">Official academic record from Dawood University.</p>
                    <div style="padding:1rem; background:rgba(234,88,12,0.05); border-radius:8px;">
                        <strong>Current Status:</strong> Completed 5 Semesters<br>
                        <strong>Avg GPA:</strong> 3.93/4.00
                    </div>
                </div>
                <div class="modal-media">
                    <div style="padding: 2rem; text-align: center; background: #fff; border: 2px dashed #ddd; border-radius: 12px; height: 100%; display: flex; align-items: center; justify-content: center; color: #999;">
                        Transcript PDF Upload Pending
                    </div>
                </div>
            </div>
        `
    },

    // EXPERIENCE
    'onestop_details': {
        title: 'Experience Details: Onestop Vendors',
        content: `
            <div class="modal-side-layout">
                <div class="modal-description">
                    <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
                        At Onestop Vendors, I architected adaptive agentic AI systems using LangGraph. This involved complex customer workflows and real-time STT/TTS pipelines.
                    </p>
                    <ul style="color:var(--text-secondary); padding-left: 1.2rem; margin-top:1rem;">
                        <li>Built autonomous agents for complex scheduling.</li>
                        <li>Optimized vector database queries for low latency.</li>
                        <li>Collaborated on real-time STT systems.</li>
                    </ul>
                </div>
                <div class="modal-media">
                   <div style="background: #eee; height: 200px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #888;">Office & Project Photos Pending</div>
                </div>
            </div>
        `
    },
    'arcana_details': {
        title: 'Experience Details: Arcana Info',
        content: `
        <div class="modal-side-layout">
            <div class="modal-description">
                <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1.5rem;">
                    During my tenure at Arcana Info, I focused on enterprise-grade AI deployments using IBM Watson and Scikit-learn. I achieved 92% accuracy in intent analysis for corporate clients.
                </p>
                <ul style="color:var(--text-secondary); padding-left:1.2rem; margin-bottom:1.5rem;">
                    <li>Intent analysis for large-scale customer data.</li>
                    <li>Predictive models using IBM Watson.</li>
                    <li>Process automation using Python.</li>
                </ul>
            </div>
            <div class="modal-media">
                <img src="assets/images/Arcana/Arcana 2.jpeg" alt="Receiving Certificate">
                <img src="assets/images/Arcana/Arcana.png" alt="Arcana Performance Certificate">
                <p style="font-size:0.8rem; color:#666; text-align:center;">Receiving the Best Performance Award</p>
            </div>
        </div>
        `
    },

    // CERTIFICATES
    'cert_deep_learning': {
        title: 'Certificate: Deep Learning Specialization',
        content: `
            <div class="modal-side-layout">
                <div class="modal-description">
                    <p style="color:var(--text-secondary); line-height:1.7;">
                        Comprehensive 5-course specialization covering Neural Networks, Hyperparameter tuning, CNNs, and Sequence Models (RNNs/LSTMs). Issued by Stanford Online via Coursera.
                    </p>
                </div>
                <div class="modal-media">
                    <img src="assets/images/Certificates/SupervisedML.png" alt="Deep Learning Certificate">
                </div>
            </div>
        `
    },
    'cert_machine_learning': {
        title: 'Certificate: Machine Learning Specialization',
        content: `
            <div class="modal-side-layout">
                <div class="modal-description">
                    <p style="color:var(--text-secondary); line-height:1.7;">
                        Foundational concepts of Machine Learning, including Supervised Learning, Advanced Algorithms, and Recommender Systems. Taught by Andrew Ng.
                    </p>
                </div>
                <div class="modal-media">
                    <img src="assets/images/Certificates/Advanced Learning Algorithms.png" alt="Machine Learning Certificate">
                </div>
            </div>
        `
    },
    'cert_intro_python': {
        title: 'Certificate: Introduction to Python',
        content: `
            <div class="modal-side-layout">
                <div class="modal-description">
                    <p style="color:var(--text-secondary); line-height:1.7;">
                        Mastery of Python basics, including data types, Control structures, and data manipulation libraries like NumPy and Pandas.
                    </p>
                </div>
                <div class="modal-media">
                    <img src="assets/images/Certificates/intro To python.png" alt="Intro to Python Certificate">
                </div>
            </div>
        `
    },
    'cert_inter_python': {
        title: 'Certificate: Intermediate Python',
        content: `
            <div class="modal-side-layout">
                <div class="modal-description">
                    <p style="color:var(--text-secondary); line-height:1.7;">
                         Advanced Python features, object-oriented programming, and complex data analysis workflows for data science and AI applications.
                    </p>
                </div>
                <div class="modal-media">
                    <img src="assets/images/Certificates/Intermediate Python.png" alt="Intermediate Python Certificate">
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

window.addEventListener('click', (e) => {
    const modal = document.getElementById('detailsModal');
    if (modal && e.target === modal) {
        window.closeModal();
    }
});
