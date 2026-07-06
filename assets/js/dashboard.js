// ==========================================
// WorkSync Dashboard
// ==========================================

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

    const greeting = document.getElementById("greetingText");

    if (!greeting) return;

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {

        greeting.textContent = "Good Morning 👋";

    } else if (hour >= 12 && hour < 18) {

        greeting.textContent = "Good Afternoon ☀️";

    } else {

        greeting.textContent = "Good Evening 🌙";

    }

}

// ==========================================
// LIVE CLOCK
// ==========================================

function startClock() {

    const clock = document.getElementById("liveClock");

    if (!clock) return;

    function updateClock() {

        const now = new Date();

        clock.textContent = now.toLocaleTimeString("en-US", {

            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true

        });

    }

    updateClock();

    setInterval(updateClock, 1000);

}

// ==========================================
// QUICK ACTIONS
// ==========================================

function initializeQuickActions() {

    const actions = {

        addEmployeeBtn: "Employee Module Coming Soon",
        newProjectBtn: "Project Module Coming Soon",
        leaveBtn: "Leave Module Coming Soon",
        reportBtn: "Reports Module Coming Soon"

    };

    Object.keys(actions).forEach(id => {

        const button = document.getElementById(id);

        if (button) {

            button.addEventListener("click", () => {

                alert(actions[id]);

            });

        }

    });

}
