import { supabase } from "../../supabase/supabase-config.js";

// ==========================================
// ATTENDANCE MODULE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeAttendance();

});

// ==========================================
// INITIALIZE
// ==========================================

async function initializeAttendance() {

    startClock();

    await loadAttendanceEmployees();

    initializeSearch();

    initializeFilter();

}

// ==========================================
// LIVE DATE & CLOCK
// ==========================================

function startClock() {

    const dateElement = document.getElementById("liveDate");

    const clockElement = document.getElementById("liveClock");

    updateClock();

    setInterval(updateClock, 1000);

    function updateClock() {

        const now = new Date();

        dateElement.textContent = now.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        clockElement.textContent = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    }

}

// ==========================================
// LOAD EMPLOYEES
// ==========================================

async function loadAttendanceEmployees() {

    const container = document.getElementById("attendanceContainer");

    container.innerHTML = "";

    const { data: employees, error } = await supabase
        .from("employees")
        .select("*")
        .order("full_name");

    if (error) {

        console.error(error);

        return;

    }

    for (const employee of employees) {

        const today = new Date().toISOString().split("T")[0];

        const { data: attendance } = await supabase
            .from("attendance_daily")
            .select("*")
            .eq("employee_id", employee.employee_id)
            .eq("attendance_date", today)
            .maybeSingle();

        const card = document.createElement("div");
        card.innerHTML = createEmployeeCard(employee, attendance);
        container.appendChild(card.firstElementChild);

    }

}
// ==========================================
// CREATE EMPLOYEE CARD
// ==========================================
function createEmployeeCard(employee, attendance) {

    const schedule =
        employee.schedule_mode || "-";

    const type =
        employee.staff_type || "-";

    const initials = employee.full_name
        .split(" ")
        .map(name => name.charAt(0))
        .join("")
        .substring(0,2);

    // ==========================
    // ATTENDANCE DATA
    // ==========================

    const status = attendance
        ? attendance.attendance_status
        : "OFF DUTY";

    const timeIn = attendance?.time_in
        ? new Date(attendance.time_in).toLocaleTimeString()
        : "--";

    const breakTime = attendance?.break_time
        ? new Date(attendance.break_time).toLocaleTimeString()
        : "--";

    const timeOut = attendance?.time_out
        ? new Date(attendance.time_out).toLocaleTimeString()
        : "--";

    const workHours = attendance
        ? attendance.work_minutes
        : 0;

    const otMinutes = attendance
        ? attendance.ot_minutes
        : 0;

    return `

      

<div class="employee-card" data-id="${employee.id}">

    <div class="employee-header">

        <div class="employee-avatar">

            ${initials}

        </div>

        <div class="employee-details">

            <h3>${employee.full_name}</h3>

            <p>${type}</p>

           <span class="status working">
              ${status}
           </span>

        </div>

    </div>

    <div class="employee-info">

        <div class="info-box">

            <span>Schedule</span>

            <strong>${schedule}</strong>

        </div>

        <div class="info-box">

            <span>Attendance</span>

           <strong class="attendanceStatus">
               ${status}
           </strong>

        </div>

    </div>

    <div class="checkbox-group">

        <label class="checkbox-item">

            <input
                type="checkbox"
                class="timeIn"
                data-id="${employee.id}"
            >

            <span>Time In</span>

        </label>

        <label class="checkbox-item">

            <input
                type="checkbox"
                class="breakTime"
                data-id="${employee.id}"
                disabled
            >

            <span>Break</span>

        </label>

        <label class="checkbox-item">

            <input
                type="checkbox"
                class="timeOut"
                data-id="${employee.id}"
                disabled
            >

            <span>Time Out</span>

        </label>

    </div>

 <div class="work-summary">

    <div class="work-card">

        <span>Work Hours</span>

        <h4 class="workHours">
            ${workHours} mins
        </h4>

    </div>

    <div class="work-card">

        <span>OT</span>

        <h4 class="otHours">
            ${otMinutes} mins
        </h4>

    </div>

</div>

<!-- ADD THIS HERE -->

<div class="employee-info">

    <div class="info-box">

        <span>Time In</span>

        <strong>${timeIn}</strong>

    </div>

    <div class="info-box">

        <span>Break</span>

        <strong>${breakTime}</strong>

    </div>

    <div class="info-box">

        <span>Time Out</span>

        <strong>${timeOut}</strong>

    </div>

</div>

<!-- END -->

<div class="card-actions">

    <button
        class="editAttendance"
        data-id="${employee.id}"
    >

            <i class="fa-solid fa-pen"></i>

            Attendance Correction

        </button>

    </div>

</div>

`;

}
// ==========================================
// ATTENDANCE EVENTS
// ==========================================

document.addEventListener("change", async (e)=>{

    if(!e.target.classList.contains("timeIn")) return;

    if(!e.target.checked) return;

    const employeeId = e.target.dataset.id;

    const now = new Date();

    const today = now.toISOString().split("T")[0];

    // Check kung meron na ngayong attendance
    const { data: existing } = await supabase
        .from("attendance_daily")
        .select("*")
        .eq("employee_id", employeeId)
        .eq("attendance_date", today)
        .maybeSingle();

    if(existing){

        alert("Employee already timed in today.");

        e.target.checked = true;

        e.target.disabled = true;

        return;

    }

    const { error } = await supabase

        .from("attendance_daily")

        .insert({

            employee_id: employeeId,

            attendance_date: today,

            time_in: now,

            attendance_status:"Working"

        });

    if(error){

        console.error(error);

        alert("Time In failed.");

        e.target.checked=false;

        return;

    }

    await supabase

        .from("employees")

        .update({

            attendance_status:"Working",

            is_working:true

        })

        .eq("employee_id",employeeId);

    loadAttendanceEmployees();

});
// ==========================================
// COMPUTE WORK HOURS
// ==========================================

function computeAttendance(card){

    const timeIn = new Date(card.dataset.timein);

    const timeOut = new Date(card.dataset.timeout);

    const breakTime = card.dataset.break
        ? new Date(card.dataset.break)
        : null;

    let totalMinutes = Math.floor(
        (timeOut - timeIn) / 60000
    );

    // Temporary Break Deduction
    if(breakTime){

        totalMinutes -= 60;

    }

    if(totalMinutes < 0){

        totalMinutes = 0;

    }

    const hours = Math.floor(totalMinutes / 60);

    const minutes = totalMinutes % 60;

    card.querySelector(".workHours").textContent =
        `${hours}h ${minutes}m`;

    card.querySelector(".attendanceStatus").textContent =
        "Completed";

    card.querySelector(".status").className =
        "status present";

    card.querySelector(".status").textContent =
        "Present";

}
// ==========================================
// SEARCH
// ==========================================

function initializeSearch() {

    const search = document.getElementById("searchEmployee");

    if (!search) return;

    search.addEventListener("input", () => {

        loadAttendanceEmployees();

    });

}

// ==========================================
// FILTER
// ==========================================

function initializeFilter() {

    const filter = document.getElementById("attendanceFilter");

    if (!filter) return;

    filter.addEventListener("change", () => {

        loadAttendanceEmployees();

    });

}
