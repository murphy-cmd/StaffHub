// ==========================================
// WorkSync Dashboard
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ WorkSync Dashboard Loaded");

    updateGreeting();

    startClock();

    initializeQuickActions();

    initializeAttendanceChart();

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
// ==========================================
// ATTENDANCE CHART
// ==========================================

function initializeAttendanceChart() {

    const canvas = document.getElementById("attendanceChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [

                "Present",

                "Late",

                "Absent",

                "Leave"

            ],

            datasets: [

                {

                    data: [

                        65,

                        10,

                        15,

                        10

                    ],

                    backgroundColor: [

                        "#22C55E",

                        "#F59E0B",

                        "#EF4444",

                        "#3B82F6"

                    ],

                    borderWidth: 0

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}
