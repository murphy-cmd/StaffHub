import { supabase } from "../../supabase/supabase-config.js";
// ==========================================
// EMPLOYEES MODULE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeEmployeeModal();

    loadEmployees();

});

// ==========================================
// MODAL
// ==========================================

function initializeEmployeeModal() {

    const modal = document.getElementById("employeeModal");

    const addBtn = document.getElementById("addEmployeeBtn");

    const closeBtn = document.getElementById("closeModal");

    const cancelBtn = document.getElementById("cancelEmployee");

    const staffType = document.getElementById("staffType");

    const schedule = document.getElementById("scheduleMode");

    const employeeId = document.getElementById("employeeId");

    // Open Modal
    addBtn.addEventListener("click", () => {

        modal.classList.add("show");

        employeeId.value = generateEmployeeID();

    });

    // Close Modal
    closeBtn.addEventListener("click", () => {

        modal.classList.remove("show");

    });

    cancelBtn.addEventListener("click", () => {

        modal.classList.remove("show");

    });

    // Close kapag click sa labas
    window.addEventListener("click", (e) => {

        if (e.target === modal) {

            modal.classList.remove("show");

        }

    });

    // Automatic Schedule
staffType.addEventListener("change", () => {

    switch (staffType.value) {

        case "Office Staff":

            schedule.value = "Fixed";
            schedule.disabled = true;
            break;

        case "Warehouse Staff":

            // Admin ang pipili kung Fixed o Flexible
            schedule.value = "Fixed";
            schedule.disabled = false;
            break;

        case "Driver":

            schedule.value = "Flexible";
            schedule.disabled = true;
            break;

        default:

            schedule.value = "";
            schedule.disabled = false;

    }

});

}

// ==========================================
// AUTO EMPLOYEE ID
// ==========================================

function generateEmployeeID() {

    const number = Math.floor(Math.random() * 9999) + 1;

    return "EMP-" + number.toString().padStart(4, "0");

}
// ==========================================
// SAVE EMPLOYEE
// ==========================================

document.getElementById("saveEmployee").addEventListener("click", saveEmployee);

async function saveEmployee() {

    const employee_id = document.getElementById("employeeId").value.trim();

    const full_name = document.getElementById("fullName").value.trim();

    const staff_type = document.getElementById("staffType").value;

    const schedule_mode = document.getElementById("scheduleMode").value;

    if (!full_name || !staff_type) {

        alert("Please complete all required fields.");

        return;

    }

    const { error } = await supabase
        .from("employees")
        .insert([
            {
                employee_id,
                full_name,
                staff_type,
                schedule_mode
            }
        ]);

    if (error) {

        console.error(error);

        alert("Failed to save employee.");

        return;

    }

    alert("Employee saved successfully!");

    document.getElementById("employeeModal").classList.remove("show");

    document.getElementById("fullName").value = "";

    document.getElementById("staffType").value = "";

    document.getElementById("scheduleMode").value = "Fixed";

    loadEmployees();

}
// ==========================================
// LOAD EMPLOYEES
// ==========================================

async function loadEmployees() {

    const tbody = document.getElementById("employeeTable");

    tbody.innerHTML = "";

    const { data, error } = await supabase
        .from("employees")
        .select("*")
        .order("employee_id", { ascending: true });

    if (error) {

        console.error(error);

        return;

    }

    data.forEach(emp => {

        let staffClass = "";

        if (emp.staff_type === "Office Staff") {

            staffClass = "office";

        } else if (emp.staff_type === "Warehouse Staff") {

            staffClass = "warehouse";

        } else {

            staffClass = "driver";

        }

        tbody.innerHTML += `
        <tr>

            <td>${emp.employee_id}</td>

            <td>${emp.full_name}</td>

            <td>
                <span class="badge ${staffClass}">
                    ${emp.staff_type}
                </span>
            </td>

            <td>
                <span class="badge ${staffClass}">
                    ${emp.schedule_mode}
                </span>
            </td>

            <td>

                <button class="edit-btn" data-id="${emp.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="delete-btn" data-id="${emp.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </td>

        </tr>
        `;

    });

}
