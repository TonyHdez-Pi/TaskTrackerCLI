// Add, Update, and Delete tasks
// Mark a task as in progress or done
// List all tasks
// List all tasks that are done
// List all tasks that are not done
// List all tasks that are in progress

const fs = require("fs");
const {
	addTask,
	updateTask,
	deleteTask,
	markInProgress,
	markDone,
	listTask,
} = require("./lib/task.js");

console.log("Task Tracker CLI");

console.log("Command List:");
console.log("Command: add taskToAdd");
console.log("Command: update id taskToUpdate");
console.log("Command: delete id");
console.log("Command: mark-progress id");
console.log("Command: mark-done id");
console.log("Command: list");

switch (process.argv[2]) {
	case "add": {
		const task = process.argv[3];
		addTask(task);
		break;
	}
	case "update": {
		updateTask(process.argv[3], process.argv[4]);
		break;
	}
	case "delete": {
		deleteTask(process.argv[3]);
		break;
	}
	case "mark-progress": {
		markInProgress(process.argv[3]);
		break;
	}
	case "mark-done": {
		markDone(process.argv[3]);
		break;
	}
	case "list": {
		listTask(process.argv[3]);
		break;
	}
	default: {
		console.log("unknown command");
		break;
	}
}
