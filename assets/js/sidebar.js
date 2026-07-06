// ==========================================
// SIDEBAR
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector(".main-content");
    const toggle = document.getElementById("menuToggle");

    if (!sidebar || !main || !toggle) return;

    toggle.addEventListener("click", () => {

        // Desktop
        if (window.innerWidth > 768) {

            sidebar.classList.toggle("collapsed");
            main.classList.toggle("expanded");

        }

        // Mobile
        else {

            sidebar.classList.toggle("show");

        }

    });

    // Close mobile sidebar
    document.addEventListener("click", (e) => {

        if (window.innerWidth <= 768) {

            if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {

                sidebar.classList.remove("show");

            }

        }

    });

});
