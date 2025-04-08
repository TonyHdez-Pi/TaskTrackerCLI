// Add, Update, and Delete tasks
// Mark a task as in progress or done
// List all tasks
// List all tasks that are done
// List all tasks that are not done
// List all tasks that are in progress

// commander -> To create commands and options.
// lib/task -> The task logic.
// lib/storage -> To save the data.

// The commands must follow this structure:
// task-cli add "Buy groceries"
// task-cli update 1 "Buy groceries and cook dinner"

const fs = require("fs");
const {
	addTask,
	updateTask,
	deleteTask,
	markDone,
	listTask,
} = require("./lib/task.js");

console.log("Task Tracker CLI");
console.log("Write help to see the command list");

if (process.argv[2].toLowerCase() === "help") {
	console.log("Command List:");
	console.log("Command: add taskToAdd");
	console.log("Command: update id taskToUpdate");
	console.log("Command: delete id");
	console.log("Command: mark-done id");
	console.log("Command: list");
}

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
	case "mark-done": {
		markDone(process.argv[3]);
		break;
	}
	case "list": {
		listTask();
		break;
	}
	default: {
		console.log("Incorrect command");
		break;
	}
}

// how to stop using node index.js add "task" and use task-cli add "task"
// how to tell the user the structure it needs to follow for the commands (1 argument, 2 arguments, 3 arguments).

// first two elements in th process.argv are the node path, and the second its the file path where the
// curren command its being executed.
// and all the arguments i pass to node when initiated will be added to the array from the position 2 and foward.

// node index.js update 1 "buy groceries"
// process.argv.forEach((argument) => {
// this command will give me the following 3 arguments
// update
// 1
// buy groceries
// all thanks to the process.argv
// 	console.log(argument);
// });
