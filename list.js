let tasksBtn = document.querySelector('#tasksBtn');
tasksBtn.addEventListener('click', () => {
    let tasks = document.querySelector('.tasks');
    tasks.insertAdjacentHTML('beforeend', `
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Enter task title:</label>
            <input type="text" class="form-control task-heading" id="exampleFormControlInput1" placeholder="Update Company Policy Manual" style="min-width: 19vw;" required>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Enter Task description:</label>
            <textarea class="form-control task-desc" id="exampleFormControlTextarea1" rows="3" maxlength="50" placeholder="Review and update the company policy manual to ensure it is up-to-date with current regulations and best practices" style="min-height: 20vh; margin-bottom: 50px;" required></textarea>
        </div>
    `);

    let existingConfirmButton = document.querySelector('.button');
    if (existingConfirmButton) {
        existingConfirmButton.remove();
    }

    tasks.insertAdjacentHTML('beforeend', `
        <div style="display: flex; justify-content: center;">
            <button class="button">confirm</button>
        </div>
    `);

    document.querySelector('.button').addEventListener('click', () => {
        const taskHeadings = Array.from(document.querySelectorAll('.task-heading')).map(input => input.value.trim());
        const taskDescriptions = Array.from(document.querySelectorAll('.task-desc')).map(textarea => textarea.value.trim());
    
        // Check if all headings and descriptions are filled
        const allFieldsFilled = taskHeadings.every(heading => heading !== '') && taskDescriptions.every(description => description !== '');
    
        if (!allFieldsFilled) {
            window.alert("Please fill in all task headings and descriptions before confirming.");
            return; // Stop further execution if not all fields are filled
        }
    
        // Store values in localStorage
        localStorage.setItem('taskHeadings', JSON.stringify(taskHeadings));
        localStorage.setItem('taskDescriptions', JSON.stringify(taskDescriptions));
    
        window.location.href = "./result.html";
    });
    
});
function updateCollapseMenus() {
    let onHoldTasksls = JSON.parse(localStorage.getItem('on-hold-tasks')) || [];
    let onGoingTasksls = JSON.parse(localStorage.getItem('on-going-tasks')) || [];
    let completedTasksls = JSON.parse(localStorage.getItem('completed-tasks')) || [];
    console.log(onHoldTasksls);

    let onHoldCollapse = document.getElementById("home-collapse");
    let ongoingCollapse = document.getElementById("dashboard-collapse");
    let completedCollapse = document.getElementById("orders-collapse");

    // Clear existing content
    onHoldCollapse.innerHTML = '';
    ongoingCollapse.innerHTML = '';
    completedCollapse.innerHTML = '';

    onHoldTasksls.forEach((task, index) => {
        if (task && task.heading && task.description) {
            onHoldCollapse.insertAdjacentHTML("beforeend", `
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><a href="#" id="On-Hold-id-${index}" class="link-body-emphasis d-inline-flex text-decoration-none rounded">${task.heading}</a></li>
                </ul>
            `);
        }
    });

    onGoingTasksls.forEach((task, index) => {
        if (task && task.heading && task.description) {
            ongoingCollapse.insertAdjacentHTML("beforeend", `
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><a href="#" id="On-Going-id-${index}" class="link-body-emphasis d-inline-flex text-decoration-none rounded">${task.heading}</a></li>
                </ul>
            `);
        }
    });

    completedTasksls.forEach((task, index) => {
        if (task && task.heading && task.description) {
            completedCollapse.insertAdjacentHTML("beforeend", `
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><a href="#" id="Completed-id-${index}" class="link-body-emphasis d-inline-flex text-decoration-none rounded">${task.heading}</a></li>
                </ul>
            `);
        }
    });

    bindOnHoldClickEvents(onHoldTasksls);
    bindOnGoingClickEvents(onGoingTasksls);
    bindCompletedClickEvents(completedTasksls);
}

function bindOnHoldClickEvents(onHoldTasksls) {
    onHoldTasksls.forEach((task, index) => {
        document.getElementById(`On-Hold-id-${index}`).addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            tasksBtn.remove();
            document.querySelector(".tasks").innerHTML = `
                <div class="card" style="margin-top: 1em;
                background-color: silver;
                min-width:30vw;
                ">
                    <div class="card-body" style="border-bottom: 5px solid black;">
                        ${task.heading}
                    </div>
                    <div class="card-body">
                        ${task.description}
                    </div>
                    <button type="button" class="btn btn-success mark-completed">Mark As Completed</button>
                    <button type="button" class="btn btn-danger clear-task">Clear Task</button>
                </div>
            `;

            // Add event listeners after inserting HTML
            document.querySelector('.mark-completed').addEventListener('click', () => markAsCompleted('on-hold-tasks', task));
            document.querySelector('.clear-task').addEventListener('click', () => clearTask('on-hold-tasks', task));
        });
    });
}

function bindOnGoingClickEvents(onGoingTasksls) {
    onGoingTasksls.forEach((task, index) => {
        document.getElementById(`On-Going-id-${index}`).addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            tasksBtn.remove();

            document.querySelector(".tasks").innerHTML = `
                <div class="card"
                style="margin-top: 1em;
                background-color: silver;
                 min-width:30vw;
                "
                >
                    <div class="card-body"  style="border-bottom: 5px solid black;">
                        ${task.heading}
                    </div>
                    <div class="card-body">
                        ${task.description}
                    </div>
                    <button type="button" class="btn btn-success mark-completed">Mark As Completed</button>
                    <button type="button" class="btn btn-danger clear-task">Clear Task</button>
                </div>
            `;

            // Add event listeners after inserting HTML
            document.querySelector('.mark-completed').addEventListener('click', () => markAsCompleted('on-going-tasks', task));
            document.querySelector('.clear-task').addEventListener('click', () => clearTask('on-going-tasks', task));
        });
    });
}

function bindCompletedClickEvents(completedTasksls) {
    completedTasksls.forEach((task, index) => {
        document.getElementById(`Completed-id-${index}`).addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
                tasksBtn.remove();
            document.querySelector(".tasks").innerHTML = `
                <div class="card" style="margin-top: 1em;
                background-color: silver;
                 min-width:30vw;
                ">
                    <div class="card-body"  style="border-bottom: 5px solid black;">
                        ${task.heading}
                    </div>
                    <div class="card-body">
                        ${task.description}
                    </div>
                    <button type="button" class="btn btn-danger clear-task">Clear Task</button>
                </div>
            `;

            // Add event listeners after inserting HTML
            document.querySelector('.clear-task').addEventListener('click', () => clearTask('completed-tasks', task));
        });
    });
}

function markAsCompleted(listName, task) {
    let tasks = JSON.parse(localStorage.getItem(listName)) || [];
    let completedTasks = JSON.parse(localStorage.getItem('completed-tasks')) || [];

    // Remove the task from the current list
    tasks = tasks.filter(t => t.heading !== task.heading && t.description !== task.description);

    // Add the task to the completed list
    completedTasks.push(task);

    // Update local storage
    localStorage.setItem(listName, JSON.stringify(tasks));
    localStorage.setItem('completed-tasks', JSON.stringify(completedTasks));

    // Refresh the UI
    updateCollapseMenus();
    document.querySelector(".tasks").innerHTML = `
    <h3 style="margin-top: 1em;">Task marked as completed
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>

    </h3> 
    `
}

function clearTask(listName, task) {
    let tasks = JSON.parse(localStorage.getItem(listName)) || [];

    // Remove the task from the current list
    tasks = tasks.filter(t => t.heading !== task.heading && t.description !== task.description);

    // Update local storage
    localStorage.setItem(listName, JSON.stringify(tasks));

    // Refresh the UI
    updateCollapseMenus();
    document.querySelector(".tasks").innerHTML = `
    <h3 style="margin-top: 1em;">Task cleared
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>

    </h3> 
    `
}

// Initial call to populate collapse menus on page load
updateCollapseMenus();
