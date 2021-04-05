(
	document.onreadystatechange = () => {
		if (document.readyState === 'complete') {
			var taskInput = document.getElementById("new-task");
			var addButton = document.getElementById("add");
			var incompleteTasksHolder = document.getElementById("incomplete-tasks");
			var completedTasksHolder = document.getElementById("completed-tasks");

			const model = {};

			const controller = {
				createNewTaskElement(taskString, arr) {
					listItem = document.createElement("li");
					checkBox = document.createElement("input");
					label = document.createElement("label");
					editInput = document.createElement("input");
					editButton = document.createElement("button");
					deleteButton = document.createElement("button");

					checkBox.type = "checkbox";
					editInput.type = "text";
					editButton.innerText = "Edit";
					editButton.className = "edit";
					deleteButton.innerText = "Delete";
					deleteButton.className = "delete";
					label.innerText = taskString;

					listItem.appendChild(checkBox);
					listItem.appendChild(label);
					listItem.appendChild(editInput);
					listItem.appendChild(editButton);
					listItem.appendChild(deleteButton);

					return listItem;
				},

				addTask() {
					var listItemName = taskInput.value
					if (!listItemName) {
						return null
					}
					listItem = controller.createNewTaskElement(listItemName)
					incompleteTasksHolder.appendChild(listItem)
					controller.store()
					controller.bindTaskEvents(listItem, controller.taskCompleted)
					taskInput.value = "";
				},

				editTask() {
					var listItem = this.parentNode;
					var editInput = listItem.querySelectorAll("input[type=text]")[0];
					var label = listItem.querySelector("label");
					var button = listItem.getElementsByTagName("button")[0];

					var containsClass = listItem.classList.contains("editMode");
					if (containsClass) {
						label.innerText = editInput.value
						button.innerText = "Edit";
					} else {
						editInput.value = label.innerText
						button.innerText = "Save";
					}
					listItem.classList.toggle("editMode");
					controller.store()
				},

				deleteTask(el) {
					var listItem = this.parentNode;
					var ul = listItem.parentNode;
					ul.removeChild(listItem);
					controller.store()
				},

				taskCompleted(el) {
					var listItem = this.parentNode;
					listItem.querySelectorAll("input[type=checkbox]")[0].setAttribute("checked", "");
					completedTasksHolder.appendChild(listItem);
					controller.bindTaskEvents(listItem, controller.taskIncomplete);
					console.log('from complted', listItem);
					controller.store()
				},

				taskIncomplete() {
					var listItem = this.parentNode;
					listItem.querySelectorAll("input[type=checkbox]")[0].removeAttribute("checked");
					incompleteTasksHolder.appendChild(listItem);
					controller.bindTaskEvents(listItem, controller.taskCompleted);
					controller.store()
				},

				bindTaskEvents(taskListItem, checkBoxEventHandler, cb) {
					var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
					var editButton = taskListItem.querySelectorAll("button.edit")[0];
					var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
					editButton.onclick = controller.editTask;
					deleteButton.onclick = controller.deleteTask;
					checkBox.onchange = checkBoxEventHandler;
				},

				store() {
					window.localStorage.incompleteTasksHolder = incompleteTasksHolder.innerHTML;
					window.localStorage.completedTasksHolder = completedTasksHolder.innerHTML;
				},

				getStore() {
					var completedTasks = window.localStorage.getItem('completedTasksHolder');
					var incompleteTasks = window.localStorage.getItem('incompleteTasksHolder');
					if (completedTasks && incompleteTasks) {
						completedTasksHolder.innerHTML = completedTasks
						incompleteTasksHolder.innerHTML = incompleteTasks
					} else {
						controller.store();
					}
				},

				init() {
					controller.getStore()

					addButton.addEventListener("click", controller.addTask);

					for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
						controller.bindTaskEvents(incompleteTasksHolder.children[i], controller.taskCompleted);
					}
					
					for (var i = 0; i < completedTasksHolder.children.length; i++) {
						controller.bindTaskEvents(completedTasksHolder.children[i], controller.taskIncomplete);
					}
				}
			}
			controller.init();
		}
	}
)();