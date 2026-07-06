// ==========================================
// WorkSync Sidebar
// ==========================================

const sidebar = document.querySelector(".sidebar");
const menuToggle = document.getElementById("menuToggle");

// Toggle Sidebar
menuToggle.addEventListener("click", () => {

    // Desktop
    if (window.innerWidth > 900) {

        sidebar.classList.toggle("collapsed");

    }

    // Mobile
    else {

        sidebar.classList.toggle("show");

    }

});

// Remove Mobile Sidebar kapag lumaki ulit ang screen
window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {

        sidebar.classList.remove("show");

    }

});
