const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

function generateTasks(count = 100) {
	const tasks = {};
	const statuses = ["todo", "in-progress", "done"];

	for (let i = 1; i <= count; i++) {
		const id = uuidv4();
		const status = statuses[Math.floor(Math.random() * 3)];
		const createdAt = new Date(
			Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
		).toISOString();

		tasks[id] = {
			name: `Task ${i}`,
			status,
			createdAt,
		};
	}

	return tasks;
}

const tasks = generateTasks();
console.log(tasks);

fs.writeFileSync(`${__dirname}/storage.json`, JSON.stringify(tasks));
