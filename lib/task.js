const { read } = require("fs");
const { v4: uuidv4 } = require("uuid");

// functions to create, delete, update, etc...
const fs = require("fs").promises;
// fs will allow me to read and write the
// to update the json i first need to convert it into a string????
// no i do not need to convert it to readed just to write it.

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
					status: "in progress",
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

function markDone(id) {
	return readStorage()
		.then((tasks) => {
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

function listTask() {
	return readStorage().then((tasks) => console.log(tasks));
}
module.exports = {
	addTask,
	updateTask,
	deleteTask,
	markDone,
	listTask,
};
