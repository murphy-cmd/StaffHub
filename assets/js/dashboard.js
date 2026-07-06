// ==========================================
// WorkSync Dashboard
// ==========================================

// Dashboard Loaded
document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ WorkSync Dashboard Loaded");

    updateGreeting();

    startClock();

    initializeQuickActions();

});

// ==========================================
// GREETING
// ==========================================

function updateGreeting() {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour >= 5 && hour < 12) {

        greeting = "Good Morning";

    } else if (hour >= 12 && hour < 18) {

        greeting = "Good Afternoon";

    }

    console.log(greeting);

}

// ==========================================
// LIVE CLOCK
// ==========================================

function startClock() {

    setInterval(() => {

        const now = new Date();

        const time = now.toLocaleTimeString([], {

            hour: "2-digit",
            minute: "2-digit"

        });

        console.log(time);

    }, 1000);

}

// ==========================================
// QUICK ACTIONS
// ==========================================

function initializeQuickActions() {

    document.getElementById("addEmployeeBtn")?.addEventListener("click", () => {

        alert("Employee Module Coming Soon");

    });

    document.getElementById("newProjectBtn")?.addEventListener("click", () => {

        alert("Project Module Coming Soon");

    });

    document.getElementById("leaveBtn")?.addEventListener("click", () => {

        alert("Leave Module Coming Soon");

    });

    document.getElementById("reportBtn")?.addEventListener("click", () => {

        alert("Reports Module Coming Soon");

    });

}
