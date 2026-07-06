// ==========================================
// SIDEBAR
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");
    const menuToggle = document.getElementById("menuToggle");

    if (menuToggle && sidebar) {

        menuToggle.addEventListener("click", () => {

            sidebar.classList.toggle("show");

        });

    }

    document.addEventListener("click", (e) => {

        if (window.innerWidth <= 768) {

            if (
                !sidebar.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                sidebar.classList.remove("show");
            }

        }

    });

});
