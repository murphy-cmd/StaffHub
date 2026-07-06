// ==========================================
// EMPLOYEES MODULE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeEmployeeModal();

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

        if (staffType.value === "Office Staff") {

            schedule.value = "Fixed";
            schedule.disabled = true;

        }

        else if (staffType.value === "Driver") {

            schedule.value = "Flexible";
            schedule.disabled = true;

        }

        else {

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
