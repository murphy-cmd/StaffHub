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

    const greeting = document.getElementById("greetingText");

    const hour = new Date().getHours();

    if(hour < 12){

        greeting.textContent = "Good Morning 👋";

    }

    else if(hour < 18){

        greeting.textContent = "Good Afternoon ☀️";

    }

    else{

        greeting.textContent = "Good Evening 🌙";

    }

}

// ==========================================
// LIVE CLOCK
// ==========================================

function startClock(){

    const clock = document.getElementById("liveClock");

    function update(){

        const now = new Date();

        clock.textContent = now.toLocaleTimeString([],{

            hour:'2-digit',

            minute:'2-digit'

        });

    }

    update();

    setInterval(update,1000);

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
