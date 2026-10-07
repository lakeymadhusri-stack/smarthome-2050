/* =========================================
   SMART HOME 2050
   Frontend demonstration
========================================= */


// ==================================================
// SMART HOME 2050 - AUTHENTICATION (runs first)
// ==================================================

if (localStorage.getItem("smartHomeAuth") !== "true") {
    window.location.replace("Login.html");
}

/* =========================================
   DEVICE MODAL
========================================= */

const deviceModal =
    document.getElementById("deviceModal");

const addDeviceBtn =
    document.getElementById("addDeviceBtn");

const openAddDevice =
    document.getElementById("openAddDevice");

const closeDeviceModal =
    document.getElementById(
        "closeDeviceModal"
    );


function openDeviceModal() {

    deviceModal.classList.add("show");

}


function closeDevice() {

    deviceModal.classList.remove("show");

}


addDeviceBtn.addEventListener(
    "click",
    openDeviceModal
);

openAddDevice.addEventListener(
    "click",
    openDeviceModal
);

closeDeviceModal.addEventListener(
    "click",
    closeDevice
);


/* =========================================
   ADD DEVICE
========================================= */

const saveDevice =
    document.getElementById("saveDevice");

const deviceName =
    document.getElementById("deviceName");

const deviceType =
    document.getElementById("deviceType");

const deviceRoom =
    document.getElementById("deviceRoom");

const deviceGrid =
    document.getElementById("deviceGrid");


saveDevice.addEventListener(
    "click",
    () => {

        const name =
            deviceName.value.trim();

        const icon =
            deviceType.value;

        const room =
            deviceRoom.value;

        if (!name) {

            showToast(
                "Please enter device name"
            );

            return;
        }


        const card =
            document.createElement("div");

        card.className =
            "device-card tilt";


        card.innerHTML = `

            <div class="device-top">

                <div class="device-icon">
                    ${icon}
                </div>

                <button
                    class="device-menu delete-device"
                >
                    🗑
                </button>

            </div>

            <h3>${escapeHTML(name)}</h3>

            <p>${escapeHTML(room)}</p>

            <div class="device-bottom">

                <span>Connected</span>

                <label class="switch">

                    <input
                        type="checkbox"
                        checked
                        class="device-toggle"
                    >

                    <span></span>

                </label>

            </div>
        `;


        deviceGrid.appendChild(card);


        attachDeviceEvents(card);

        attachTilt(card);


        deviceName.value = "";

        closeDevice();

        showToast(
            `${name} connected successfully`
        );

    }
);


/* =========================================
   DEVICE EVENTS
========================================= */

function attachDeviceEvents(card) {

    const toggle =
        card.querySelector(
            ".device-toggle"
        );

    if (toggle) {

        toggle.addEventListener(
            "change",
            () => {

                const title =
                    card.querySelector("h3")
                        ?.textContent ||
                    "Device";

                if (toggle.checked) {

                    showToast(
                        `${title} turned ON`
                    );

                } else {

                    showToast(
                        `${title} turned OFF`
                    );

                }

                updateEnergy();

            }
        );

    }


    const deleteButton =
        card.querySelector(
            ".delete-device"
        );

    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            () => {

                const title =
                    card.querySelector("h3")
                        ?.textContent ||
                    "Device";

                card.remove();

                showToast(
                    `${title} removed`
                );

                updateEnergy();

            }
        );

    }

}


/* Existing devices */

document
    .querySelectorAll(".device-card")
    .forEach(card => {

        attachDeviceEvents(card);

    });


/* =========================================
   ENERGY SYSTEM
========================================= */

const energyUsage =
    document.getElementById(
        "energyUsage"
    );

const energyPercent =
    document.getElementById(
        "energyPercent"
    );


function updateEnergy() {

    const switches =
        document.querySelectorAll(
            ".device-toggle"
        );

    let active = 0;

    switches.forEach(
        toggle => {

            if (toggle.checked) {

                active++;

            }

        }
    );


    const baseEnergy =
        2.5 + active * 0.6;


    energyUsage.textContent =
        baseEnergy.toFixed(1) + " kW";


    const efficiency =
        Math.max(
            40,
            100 - active * 5
        );


    energyPercent.textContent =
        efficiency + "%";

}


/* =========================================
   ROUTINE MODAL
========================================= */

const routineModal =
    document.getElementById(
        "routineModal"
    );

const createRoutineBtn =
    document.getElementById(
        "createRoutineBtn"
    );

const routineBtn =
    document.getElementById(
        "routineBtn"
    );

const closeRoutineModal =
    document.getElementById(
        "closeRoutineModal"
    );


function openRoutineModal() {

    routineModal.classList.add(
        "show"
    );

}


function closeRoutine() {

    routineModal.classList.remove(
        "show"
    );

}


createRoutineBtn.addEventListener(
    "click",
    openRoutineModal
);

routineBtn.addEventListener(
    "click",
    openRoutineModal
);

closeRoutineModal.addEventListener(
    "click",
    closeRoutine
);


/* =========================================
   CREATE ROUTINE
========================================= */

const saveRoutine =
    document.getElementById(
        "saveRoutine"
    );

const routineName =
    document.getElementById(
        "routineName"
    );

const routineAction =
    document.getElementById(
        "routineAction"
    );


saveRoutine.addEventListener(
    "click",
    () => {

        const name =
            routineName.value.trim();

        const action =
            routineAction.value;


        if (!name) {

            showToast(
                "Enter a routine name"
            );

            return;
        }


        const routineGrid =
            document.querySelector(
                ".routine-grid"
            );


        const routine =
            document.createElement(
                "div"
            );

        routine.className =
            "routine-card";


        routine.innerHTML = `

            <div class="routine-icon">
                ⚡
            </div>

            <div>

                <h3>
                    ${escapeHTML(name)}
                </h3>

                <p>
                    ${escapeHTML(action)}
                </p>

            </div>

            <label class="switch">

                <input
                    type="checkbox"
                    checked
                >

                <span></span>

            </label>

        `;


        routineGrid.appendChild(
            routine
        );


        routineName.value = "";

        closeRoutine();

        showToast(
            `Routine "${name}" created`
        );

    }
);


/* =========================================
   NOTIFICATIONS
========================================= */

const notificationBtn =
    document.getElementById(
        "notificationBtn"
    );

const notificationPanel =
    document.getElementById(
        "notificationPanel"
    );

const closeNotifications =
    document.getElementById(
        "closeNotifications"
    );


notificationBtn.addEventListener(
    "click",
    () => {

        notificationPanel.classList.toggle(
            "show"
        );

    }
);


closeNotifications.addEventListener(
    "click",
    () => {

        notificationPanel.classList.remove(
            "show"
        );

    }
);


/* =========================================
   AI ASSISTANT
========================================= */

const aiBtn =
    document.getElementById(
        "aiBtn"
    );


aiBtn.addEventListener(
    "click",
    () => {

        showToast(
            "AI Assistant activated"
        );

        aiBtn.textContent =
            "✦ AI IS MONITORING";

        aiBtn.style.boxShadow =
            "0 0 30px rgba(85,231,255,.5)";

    }
);


/* =========================================
   TEMPERATURE SIMULATION
========================================= */

const temperature =
    document.getElementById(
        "temperature"
    );

const humidity =
    document.getElementById(
        "humidity"
    );


setInterval(
    () => {

        const temp =
            22 +
            Math.random() * 3;

        const hum =
            45 +
            Math.random() * 8;


        temperature.textContent =
            temp.toFixed(1) + "°C";

        humidity.textContent =
            Math.round(hum) + "%";

    },
    4000
);


/* =========================================
   3D CARD MOTION
========================================= */

function attachTilt(card) {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

}

document
    .querySelectorAll(".tilt")
    .forEach(attachTilt);


/* =========================================
   ROOM INTERACTION
========================================= */

document
    .querySelectorAll(".room-card")
    .forEach(room => {

        room.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".room-card"
                    )
                    .forEach(
                        item =>
                            item.classList.remove(
                                "active-room"
                            )
                    );

                room.classList.add(
                    "active-room"
                );


                const roomName =
                    room.querySelector("h3")
                        ?.textContent ||
                    "Room";


                showToast(
                    `${roomName} selected`
                );

            }
        );

    });


/* =========================================
   CHART PERIOD
========================================= */

const chartPeriod =
    document.getElementById(
        "chartPeriod"
    );


chartPeriod.addEventListener(
    "change",
    () => {

        const bars =
            document.querySelectorAll(
                ".chart-bars i"
            );


        bars.forEach(
            bar => {

                const height =
                    30 +
                    Math.random() * 65;

                bar.style.height =
                    height + "%";

            }
        );


        showToast(
            "Energy chart updated"
        );

    }
);


/* =========================================
   TOAST
========================================= */

const toast =
    document.getElementById(
        "toast"
    );

let toastTimer;


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================
   HTML SECURITY
========================================= */

function escapeHTML(value) {

    return value
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================= */

window.addEventListener(
    "click",
    event => {

        if (
            event.target === deviceModal
        ) {

            closeDevice();

        }


        if (
            event.target === routineModal
        ) {

            closeRoutine();

        }

    }
);


/* =========================================
   INITIAL ENERGY
========================================= */

updateEnergy();


/* =========================================
   SYSTEM STARTUP
========================================= */

console.log(
    "SMART HOME 2050 SYSTEM ONLINE"
);

// ==================================================
// CURRENT USER
// ==================================================

let currentUser =
    localStorage.getItem("smartHomeUser") || "User";


// If complete user object was stored, get only the name
try {

    const userData =
        JSON.parse(currentUser);

    if (userData && typeof userData === "object") {

        currentUser =
            userData.fullName ||
            userData.name ||
            userData.email ||
            "User";
    }

} catch (error) {

    // If smartHomeUser is already just a name,
    // keep it as it is.

}


const welcomeUser =
    document.getElementById("welcomeUser");

if (welcomeUser) {

    welcomeUser.textContent =
        `Welcome, ${currentUser} 👋`;
}


const profileButton =
    document.querySelector(".profile-btn");

if (profileButton) {

    profileButton.textContent =
        `👤 ${currentUser}`;
}


// ==================================================
// LOGOUT
// ==================================================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "smartHomeAuth"
            );

            localStorage.removeItem(
                "smartHomeUser"
            );

            localStorage.removeItem(
                "smartHomeEmail"
            );

            window.location.replace("Login.html");
        }
    );
}
