import { supabase } from "../../supabase/supabase-config.js";

let editingId = null;

document.addEventListener("DOMContentLoaded", () => {

    initializeEmployeeModal();

    loadEmployees();

    initializeSearch();

});

// ==========================================
// MODAL
// ==========================================

function initializeEmployeeModal() {

    const modal = document.getElementById("employeeModal");

    const addBtn = document.getElementById("addEmployeeBtn");

    const closeBtn = document.getElementById("closeModal");

    const cancelBtn = document.getElementById("cancelEmployee");

    const saveBtn = document.getElementById("saveEmployee");

    const staffType = document.getElementById("staffType");

    const schedule = document.getElementById("scheduleMode");

    const employeeId = document.getElementById("employeeId");

    const fullName = document.getElementById("fullName");

    addBtn.addEventListener("click", () => {

        editingId = null;

        modal.classList.add("show");

        employeeId.value = generateEmployeeID();

        fullName.value = "";

        staffType.value = "";

        schedule.value = "Fixed";

        schedule.disabled = false;

        saveBtn.textContent = "Save Employee";

    });

    closeBtn.addEventListener("click", () => {

        modal.classList.remove("show");

    });

    cancelBtn.addEventListener("click", () => {

        modal.classList.remove("show");

    });

    window.addEventListener("click", (e) => {

        if (e.target === modal) {

            modal.classList.remove("show");

        }

    });

    staffType.addEventListener("change", () => {

        switch (staffType.value) {

            case "Office Staff":

                schedule.value = "Fixed";
                schedule.disabled = true;
                break;

            case "Warehouse Staff":

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

    saveBtn.addEventListener("click", saveEmployee);

}

// ==========================================
// AUTO EMPLOYEE ID
// ==========================================

function generateEmployeeID() {

    const number = Math.floor(Math.random() * 9999) + 1;

    return "EMP-" + number.toString().padStart(4, "0");

}

// ==========================================
// SAVE / UPDATE EMPLOYEE
// ==========================================

async function saveEmployee() {

    const modal = document.getElementById("employeeModal");

    const employee_id = document.getElementById("employeeId").value.trim();

    const full_name = document.getElementById("fullName").value.trim();

    const staff_type = document.getElementById("staffType").value;

    const schedule_mode = document.getElementById("scheduleMode").value;

    if (!full_name || !staff_type) {

        alert("Please complete all required fields.");

        return;

    }

    let error;

    // ==========================================
    // UPDATE
    // ==========================================

    if (editingId !== null) {

        ({ error } = await supabase
            .from("employees")
            .update({
                full_name,
                staff_type,
                schedule_mode
            })
            .eq("id", editingId));

        if (!error) {

            alert("Employee updated successfully!");

        }

    }

    // ==========================================
    // INSERT
    // ==========================================

    else {

        ({ error } = await supabase
            .from("employees")
            .insert([
                {
                    employee_id,
                    full_name,
                    staff_type,
                    schedule_mode
                }
            ]));

        if (!error) {

            alert("Employee added successfully!");

        }

    }

    if (error) {

        console.error(error);

        alert(error.message);

        return;

    }

    editingId = null;

    modal.classList.remove("show");

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
        .order("employee_id");

    if (error) {

        console.error(error);

        return;

    }

    data.forEach(emp => {

        let badge = "";

        if (emp.staff_type === "Office Staff") {

            badge = "office";

        }

        else if (emp.staff_type === "Warehouse Staff") {

            badge = "warehouse";

        }

        else {

            badge = "driver";

        }

        tbody.innerHTML += `

        <tr>

            <td>${emp.employee_id}</td>

            <td>${emp.full_name}</td>

            <td>

                <span class="badge ${badge}">

                    ${emp.staff_type}

                </span>

            </td>

            <td>

                <span class="badge ${badge}">

                    ${emp.schedule_mode}

                </span>

            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editEmployee(${emp.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteEmployee(${emp.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}
// ==========================================
// EDIT EMPLOYEE
// ==========================================

window.editEmployee = async function(id){

    const modal = document.getElementById("employeeModal");

    const saveBtn = document.getElementById("saveEmployee");

    const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", id)
        .single();

    if(error){

        console.error(error);

        return;

    }

    editingId = id;

    document.getElementById("employeeId").value = data.employee_id;

    document.getElementById("fullName").value = data.full_name;

    document.getElementById("staffType").value = data.staff_type;

    document.getElementById("scheduleMode").value = data.schedule_mode;

    saveBtn.textContent = "Update Employee";

    modal.classList.add("show");

}
// ==========================================
// DELETE EMPLOYEE
// ==========================================

window.deleteEmployee = async function(id){

    if(!confirm("Are you sure you want to delete this employee?")){

        return;

    }

    const { error } = await supabase
        .from("employees")
        .delete()
        .eq("id", id);

    if(error){

        console.error(error);

        alert(error.message);

        return;

    }

    alert("Employee deleted successfully!");

    loadEmployees();

}
// ==========================================
// SEARCH
// ==========================================

function initializeSearch(){

    const search = document.getElementById("searchEmployee");

    search.addEventListener("keyup", () => {

        const keyword = search.value.toLowerCase();

        document.querySelectorAll("#employeeTable tr").forEach(row => {

            row.style.display =
                row.innerText.toLowerCase().includes(keyword)
                ? ""
                : "none";

        });

    });

}
