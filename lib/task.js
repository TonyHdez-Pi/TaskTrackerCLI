const { read } = require("fs");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs").promises;

async function readStorage() {
	try {
		const storage = await fs.readFile(`${__dirname}/storage.json`, {
			encoding: "utf-8",
		});
		return storage ? JSON.parse(storage) : {};
	} catch (err) {
		return "There was an error writing the file";
	}
}

async function writeStorage(task) {
	const prevData = await readStorage();
	try {
		await fs.writeFile(
			`${__dirname}/storage.json`,
			JSON.stringify({
				...prevData,
				[uuidv4()]: {
					name: task,
					status: "todo",
					createdAt: new Date(),
				},
			})
		);
		listTask();
	} catch (err) {
		console.log(err);
	}
}

function addTask(task) {
	writeStorage(task);
	console.log(`Task added successfully: ${task}`);
}

function updateTask(id, updatedTask) {
	return readStorage()
		.then((tasks) => {
			tasks[id] = { ...tasks[id], name: updatedTask, updatedAt: new Date() };
			return tasks;
		})
		.then((updatedTasks) => {
			return fs.writeFile(
				`${__dirname}/storage.json`,
				JSON.stringify(updatedTasks)
			);
		})
		.then(() => {
			console.log(`Task with id: ${id} updated correctly`);
		})
		.catch((err) => console.error(err));
}

function deleteTask(id) {
	return readStorage()
		.then((tasks) => {
			if (tasks[id]) {
				delete tasks[id];
				console.log(`Task with id: ${id} deleted successfully`);
			} else {
				console.log("Theres no such id");
			}
			return tasks;
		})
		.then((updatedTask) => {
			return fs.writeFile(
				`${__dirname}/storage.json`,
				JSON.stringify(updatedTask)
			);
		})
		.catch((error) => {
			console.log(error);
		});
}

function markInProgress(id) {
	return readStorage()
		.then((tasks) => {
			if (!tasks[id]) throw new Error("No task with that id");
			tasks[id] = { ...tasks[id], status: "in-progress" };
			console.log(`task ${id} changed to in progress`);
			return tasks;
		})
		.then((updatedTasks) => {
			return fs.writeFile(
				`${__dirname}/storage.json`,
				JSON.stringify(updatedTasks)
			);
		})
		.catch((error) => console.log(error));
}

function markDone(id) {
	return readStorage()
		.then((tasks) => {
			if (!tasks[id]) throw new Error("No task with that id");
			tasks[id] = { ...tasks[id], status: "done" };
			console.log(`task ${id} changed to done`);
			return tasks;
		})
		.then((updatedTasks) => {
			return fs.writeFile(
				`${__dirname}/storage.json`,
				JSON.stringify(updatedTasks)
			);
		})
		.catch((error) => console.log(error));
}

function filterByStatus(status) {
	return readStorage().then((tasks) => {
		return Object.values(tasks).filter((task) => task.status === status);
	});
}

async function listTask(option) {
	const validOptions = ["done", "todo", "in-progress"];
	if (validOptions.includes(option)) {
		const filteredTasks = await filterByStatus(option);
		console.log(filteredTasks);
		return filteredTasks;
	}
	const allTasks = await readStorage();
	console.log(allTasks);
	return allTasks;
}

module.exports = {
	addTask,
	updateTask,
	deleteTask,
	markInProgress,
	markDone,
	listTask,
};
